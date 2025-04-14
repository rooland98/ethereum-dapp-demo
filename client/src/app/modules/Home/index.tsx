import { useState } from "react";
import { useWalletService } from "./useWalletService";

const Home = () => {
  const { account, balance, handleDeposit } = useWalletService();

  const [depositValue, setDepositValue] = useState<string>("");

  return (
    <div className="p-12 flex flex-col space-y-4 text-white">
      <header className="space-y-4 border rounded-lg p-4 w-full max-w-[600px]">
        <p className="text-xl">Connected Account:</p>
        <p className="text-lg">ETH Amount:</p>
      </header>
      <section className="space-y-6">
        <p className="text-xl">Deposit/Withdraw</p>
        <div className="flex flex-col space-y-2 w-fit">
          <label htmlFor="deposit_amount">Amount in ETH</label>
          <input className="base-input" onChange={(e) => setDepositValue(e.target.value)} placeholder="Amount in ETH" value={depositValue} />
        </div>
        <button
          className="btn-success"
          type="button"
          onClick={() => {
            handleDeposit(depositValue);
          }}
        >
          Deposit
        </button>
      </section>
    </div>
  );
};

export default Home;
