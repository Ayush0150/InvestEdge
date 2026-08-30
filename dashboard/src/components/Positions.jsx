import axios from "axios";
import { useEffect, useState } from "react";

const Positions = () => {
  const [allPositions, setAllPositions] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:3002/allPositions").then((res) => {
      setAllPositions(res.data);
    });
  }, []);

  return (
    <>
      <h3 className="title">Positions ({allPositions.length})</h3>

      {allPositions.length === 0 ? (
        <div className="orders">
          <div className="no-orders">
            <p>No open positions</p>
          </div>
        </div>
      ) : (
        <div className="order-table">
          <table>
            <thead>
              <tr>
                <th>Product</th>
                <th>Instrument</th>
                <th>Qty.</th>
                <th>Avg.</th>
                <th>LTP</th>
                <th>P&L</th>
                <th>Chg.</th>
              </tr>
            </thead>

            <tbody>
              {allPositions.map((stock, index) => {
                const pnl = Number(stock.pnl || 0);
                const profClass = pnl >= 0 ? "profit" : "loss";
                const dayClass = stock.isLoss ? "loss" : "profit";

                return (
                  <tr key={index}>
                    <td>{stock.product}</td>
                    <td>{stock.name}</td>
                    <td>{stock.qty}</td>
                    <td>{Number(stock.avg).toFixed(2)}</td>
                    <td>{Number(stock.price).toFixed(2)}</td>
                    <td className={profClass}>{pnl.toFixed(2)}</td>
                    <td className={dayClass}>{stock.day}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
};

export default Positions;
