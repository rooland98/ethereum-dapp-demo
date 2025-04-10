export const useWalletService = () => {
  const [account, setAccount] = useState(null);
  const [balance, setBalance] = useState(0);
  const handleDeposit = async () => {
    try {
      await depositFund(depositValue);
    } catch (error) {
      toast.error(error?.reason);
    }
  };

  const handleWithdraw = async () => {
    try {
      await withdrawFund();
    } catch (error) {
      toast.error(error?.reason);
    }
  };

  return { account, balance, handleWithdraw, handleDeposit };
};
