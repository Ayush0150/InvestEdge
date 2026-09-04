import { useEffect, useState } from "react";
import api from "../api/api";

const Funds = ({ refreshKey }) => {
  const [funds, setFunds] = useState({
    availableCash: 0,
    openingBalance: 0,
    usedMargin: 0,
    currentValue: 0,
    accountValue: 0,
  });
  const [amount, setAmount] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    api.get("/funds").then((res) => {
      setFunds(res.data);
    });
  }, [refreshKey]);

  const formatCurrency = (value) => {
    return Number(value || 0).toLocaleString("en-IN", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  };

  const handleAddFunds = async () => {
    setMessage("");
    try {
      const res = await api.post("/funds/add", {
        amount: Number(amount),
      });

      setFunds(res.data);
      setAmount("");
    } catch (error) {
      setMessage(error.response?.data || "Could not add funds");
    }
  };

  const handleWithdrawFunds = async () => {
    setMessage("");
    try {
      const res = await api.post("/funds/withdraw", {
        amount: Number(amount),
      });

      setFunds(res.data);
      setAmount("");
    } catch (error) {
      setMessage(error.response?.data || "Could not withdraw funds");
    }
  };

  return (
    <div className="funds-page">
      <div className="funds-header">
        <div>
          <h3 className="title">Funds</h3>
          <p>Equity account</p>
        </div>

        <div className="funds-actions">
          <input
            className="fund-input"
            type="number"
            min="1"
            placeholder="Amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
          <button className="btn btn-green" onClick={handleAddFunds}>
            Add funds
          </button>
          <button className="btn btn-blue" onClick={handleWithdrawFunds}>
            Withdraw
          </button>
        </div>
      </div>
      {message && (
        <div className="flash-message flash-message-error">{message}</div>
      )}

      <div className="funds-metrics">
        <div className="fund-metric fund-metric-primary">
          <p>Available cash</p>
          <h4>{formatCurrency(funds.availableCash)}</h4>
        </div>

        <div className="fund-metric">
          <p>Invested amount</p>
          <h4>{formatCurrency(funds.usedMargin)}</h4>
        </div>

        <div className="fund-metric">
          <p>Current holdings value</p>
          <h4>{formatCurrency(funds.currentValue)}</h4>
        </div>

        <div className="fund-metric">
          <p>Account value</p>
          <h4>{formatCurrency(funds.accountValue)}</h4>
        </div>
      </div>
    </div>
  );
};

export default Funds;
