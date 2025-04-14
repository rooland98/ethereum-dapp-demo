import { BrowserProvider, Signer, Contract, formatEther, parseEther } from "ethers";
import { useState } from "react";
import { CONTRACT_ADDRESS } from "../../utils/constants";
import { toast } from "sonner";
import Lock_ABI from "../../utils/Lock_ABI.json";

export const useWalletService = () => {
  let provider: BrowserProvider;
  let signer: Signer;
  let contract: Contract;

  const [account, setAccount] = useState(null);
  const [balance, setBalance] = useState(0);

  const initialize = async () => {
    if (typeof window.ethereum === "undefined") {
      throw new Error("Please install MetaMask!");
    }

    provider = new BrowserProvider(window.ethereum);
    signer = await provider.getSigner();
    contract = new Contract(CONTRACT_ADDRESS, Lock_ABI, signer);
  };

  const requestAccount = async () => {
    try {
      await initialize();
      const accounts = await provider.send("eth_requestAccounts", []);
      return accounts[0]; // Return the first account
    } catch (error) {
      console.error("Error requesting account:", error.message);
      return null;
    }
  };

  const getContractBalanceInETH = async () => {
    try {
      await initialize();
      const balanceWei: bigint = await provider.getBalance(CONTRACT_ADDRESS);
      const balanceEth: string = formatEther(balanceWei); // Convert Wei to ETH string
      return balanceEth;
    } catch (error) {
      toast.error(error?.reason);
    }
  };

  const handleDeposit = async (depositValue: string) => {
    try {
      await initialize();
      const ethValue: bigint = parseEther(depositValue);
      const deposit = await contract.deposit({ value: ethValue });
      await deposit.wait();
    } catch (error) {
      toast.error(error?.reason);
    }
  };

  const handleWithdraw = async () => {
    try {
      await initialize();
      const withdrawTx = await contract.withdraw();
      await withdrawTx.wait();
      console.log("Withdrawal successful!");
    } catch (error) {
      toast.error(error?.reason);
    }
  };

  return { account, balance, handleWithdraw, handleDeposit, getContractBalanceInETH, requestAccount };
};
