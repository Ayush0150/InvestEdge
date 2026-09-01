import { useEffect, useMemo, useState } from "react";
import api from "../api/api";
import VerticalGraph from "./VerticalGraph";

const Holdings = ({ refreshKey }) => {
  const [allHoldings, setAllHoldings] = useState([]);

  useEffect(() => {
    api.get("/allHoldings").then((res) => {
      setAllHoldings(res.data);
    });
  }, [refreshKey]);

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

  // const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];

  // export const data = {
  //   labels,
  //   datasets: [
  //     {
  //       label: 'Dataset 1',
  //       data: labels.map(() => faker.datatype.number({ min: 0, max: 1000 })),
  //       backgroundColor: 'rgba(255, 99, 132, 0.5)',
  //     },
  //     {
  //       label: 'Dataset 2',
  //       data: labels.map(() => faker.datatype.number({ min: 0, max: 1000 })),
  //       backgroundColor: 'rgba(53, 162, 235, 0.5)',
  //     },
  //   ],
  // };

  const labels = allHoldings.map((stock) => stock.name);

  const data = {
    labels,
    datasets: [
      {
        label: "Current Value",
        data: allHoldings.map(
          (stock) => Number(stock.price || 0) * Number(stock.qty || 0)
        ),
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
    ],
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
              const dayClass = String(stock.day).trim().startsWith("-") ? "loss" : "profit";

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
      <VerticalGraph data={data} />
    </>
  );
};

export default Holdings;
