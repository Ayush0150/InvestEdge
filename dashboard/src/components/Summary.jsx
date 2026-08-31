import { useEffect, useState } from "react";
import api from "../api/api";

const Summary = ({ refreshKey }) => {
  const [user, setUser] = useState(null);
  const [summary, setSummary] = useState({
    holdingsCount: 0,
    investment: 0,
    currentValue: 0,
    pnl: 0,
    pnlPercent: 0,
    availableCash: 0,
    openingBalance: 0,
    usedMargin: 0,
  });

  useEffect(() => {
    api.get("/funds").then((res) => {
      setSummary(res.data);
    });

    api.get("/me").then((res) => {
      setUser(res.data);
    });
  }, [refreshKey]);

  const formatCurrency = (value) => {
    return Number(value || 0).toLocaleString("en-IN", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  };

  const formatCompact = (value) => {
    return Number(value || 0).toLocaleString("en-IN", {
      notation: "compact",
      maximumFractionDigits: 2,
    });
  };

  const pnlClass = summary.pnl >= 0 ? "profit" : "loss";

  return (
    <>
      <div className="username">
        <h6>Hi, {user?.name || "User"}!</h6>
        <hr className="divider" />
      </div>

      <div className="section">
        <span>
          <p>Equity</p>
        </span>

        <div className="data">
          <div className="first">
            <h3>{formatCompact(summary.availableCash)}</h3>
            <p>Margin available</p>
          </div>
          <hr />

          <div className="second">
            <p>
              Margins used <span>{formatCurrency(summary.usedMargin)}</span>{" "}
            </p>
            <p>
              Opening balance <span>{formatCurrency(summary.openingBalance)}</span>{" "}
            </p>
          </div>
        </div>
        <hr className="divider" />
      </div>

      <div className="section">
        <span>
          <p>Holdings ({summary.holdingsCount})</p>
        </span>

        <div className="data">
          <div className="first">
            <h3 className={pnlClass}>
              {formatCompact(summary.pnl)}{" "}
              <small>{summary.pnlPercent.toFixed(2)}%</small>{" "}
            </h3>
            <p>P&L</p>
          </div>
          <hr />

          <div className="second">
            <p>
              Current Value <span>{formatCurrency(summary.currentValue)}</span>{" "}
            </p>
            <p>
              Investment <span>{formatCurrency(summary.investment)}</span>{" "}
            </p>
          </div>
        </div>
        <hr className="divider" />
      </div>
    </>
  );
};

export default Summary;
