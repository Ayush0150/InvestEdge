import axios from "axios";
import { useEffect, useMemo, useState } from "react";

const Holdings = () => {
  const [allHoldings, setAllHoldings] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:3002/allHoldings").then((res) => {
      setAllHoldings(res.data);
    });
  }, []);

  const totals = useMemo(() => {
    const investment = allHoldings.reduce((total, stock) => {
      return total + Number(stock.avg || 0) * Number(stock.qty || 0);
    }, 0);

    const currentValue = allHoldings.reduce((total, stock) => {
      return total + Number(stock.price || 0) * Number(stock.qty || 0);
    }, 0);

    const pnl = currentValue - investment;
    const pnlPercent = investment === 0 ? 0 : (pnl / investment) * 100;

    return { investment, currentValue, pnl, pnlPercent };
  }, [allHoldings]);

  const formatCurrency = (value) => {
    return Number(value || 0).toLocaleString("en-IN", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  };

  return (
    <>
      <h3 className="title">Holdings ({allHoldings.length})</h3>

      <div className="order-table">
        <table>
          <thead>
            <tr>
              <th>Instrument</th>
              <th>Qty.</th>
              <th>Avg. cost</th>
              <th>LTP</th>
              <th>Cur. val</th>
              <th>P&L</th>
              <th>Net chg.</th>
              <th>Day chg.</th>
            </tr>
          </thead>

          <tbody>
            {allHoldings.map((stock, index) => {
              const curValue = stock.price * stock.qty;
              const isProfit = curValue - stock.avg * stock.qty >= 0;

              const profClass = isProfit ? "profit" : "loss";
              const dayClass = stock.isLoss ? "loss" : "profit";

              return (
                <tr key={index}>
                  <td>{stock.name}</td>
                  <td>{stock.qty}</td>
                  <td>{Number(stock.avg).toFixed(2)}</td>
                  <td>{Number(stock.price).toFixed(2)}</td>
                  <td>{formatCurrency(curValue)}</td>

                  <td className={profClass}>
                    {formatCurrency(curValue - stock.avg * stock.qty)}
                  </td>

                  <td className={profClass}>{stock.net}</td>

                  <td className={dayClass}>{stock.day}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <div className="row">
        <div className="col">
          <h5>{formatCurrency(totals.investment)}</h5>
          <p>Total investment</p>
        </div>

        <div className="col">
          <h5>{formatCurrency(totals.currentValue)}</h5>
          <p>Current value</p>
        </div>

        <div className="col">
          <h5 className={totals.pnl >= 0 ? "profit" : "loss"}>
            {formatCurrency(totals.pnl)} ({totals.pnlPercent.toFixed(2)}%)
          </h5>
          <p>P&L</p>
        </div>
      </div>
    </>
  );
};

export default Holdings;
