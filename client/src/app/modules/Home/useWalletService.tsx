import { BrowserProvider, Signer, Contract, formatEther, parseEther } from "ethers";
import { useEffect, useState } from "react";
import { CONTRACT_ADDRESS } from "../../utils/constants";
import { toast } from "sonner";
import Lock_ABI from "../../utils/Lock_ABI.json";

export const useWalletService = () => {
  let provider: BrowserProvider;
  let signer: Signer;
  let contract: Contract;

  const [account, setAccount] = useState<unknown>(null);
  const [balance, setBalance] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);
  const [actionLoading, setActionLoading] = useState<boolean>(false);

  const initialize = async () => {
    if (typeof window.ethereum === "undefined") {
      throw new Error("Please install MetaMask!");
    }

    provider = new BrowserProvider(window.ethereum);
    signer = await provider.getSigner();
    contract = new Contract(CONTRACT_ADDRESS, Lock_ABI, signer);
  };

  const requestAccount = async () => {
    setLoading(true);
    try {
      await initialize();
      const accounts = await provider.send("eth_requestAccounts", []);
      return accounts[0]; // Return the first account
    } catch (error) {
      console.error("Error requesting account:", error.message);
      return null;
    } finally {
      setLoading(false);
    }
  };

  const connectAccount = async () => {
    setActionLoading(true);
    try {
      const userAccount = await requestAccount();
      setAccount(userAccount);
    } catch (error) {
      console.error("Failed to connect wallet: ", error);
    } finally {
      setActionLoading(false);
    }
  };

  const getContractBalanceInETH = async () => {
    setLoading(true);
    try {
      await initialize();
      const balanceWei: bigint = await provider.getBalance(CONTRACT_ADDRESS);
      const balanceEth: string = formatEther(balanceWei); // Convert Wei to ETH string
      return balanceEth;
    } catch (error) {
      toast.error(error?.reason);
    } finally {
      setLoading(false);
    }
  };

  const handleDeposit = async (depositValue: string) => {
    setActionLoading(true);
    try {
      await initialize();
      const ethValue: bigint = parseEther(depositValue);
      const deposit = await contract.deposit({ value: ethValue });
      await deposit.wait();
    } catch (error) {
      toast.error(error?.reason);
    } finally {
      setActionLoading(false);
    }
  };

  const handleWithdraw = async () => {
    setActionLoading(true);
    try {
      await initialize();
      const withdrawTx = await contract.withdraw();
      await withdrawTx.wait();
      console.log("Withdrawal successful!");
    } catch (error) {
      toast.error(error?.reason);
    } finally {
      setActionLoading(false);
    }
  };

  useEffect(() => {
    const fetchBalance = async () => {
      const balanceInETH = await getContractBalanceInETH();
      setBalance(parseInt(balanceInETH as string));
    };
    fetchBalance();
  }, []);

  useEffect(() => {
    const fetchCurAccount = async () => {
      const account = await requestAccount();
      setAccount(account);
    };
    fetchCurAccount();
  }, []);

  useEffect(() => {
    const handleAccountChanged = (newAccounts: any) => setAccount(newAccounts.length > 0 ? newAccounts[0] : null);

    if (window.ethereum) {
      window.ethereum.on("accountsChanged", handleAccountChanged);
    }

    return () => {
      window.ethereum?.removeListener("accountsChanged", handleAccountChanged);
    };
  });

  return { account, balance, handleWithdraw, handleDeposit, getContractBalanceInETH, requestAccount, connectAccount, loading, actionLoading };
};
