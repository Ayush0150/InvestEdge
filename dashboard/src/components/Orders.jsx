import { useEffect, useState } from "react";
import api from "../api/api";

const Orders = ({ refreshKey }) => {
    const [allOrders, setAllOrders] = useState([]);

    useEffect(() => {
        api.get("/allOrders")
            .then((res) => {
                setAllOrders(res.data)
            })
    }, [refreshKey]);

  return (
    <>
      <h3 className="title">Orders ({allOrders.length})</h3>

      {allOrders.length === 0 ? (
        <div className="orders">
          <div className="no-orders">
            <p>You haven't placed any orders today</p>
          </div>
        </div>
      ) : (
        <div className="order-table">
          <table>
            <thead>
              <tr>
                <th>Instrument</th>
                <th>Qty.</th>
                <th>Price</th>
                <th>Mode</th>
                <th>Time</th>
              </tr>
            </thead>

            <tbody>
              {allOrders.map((order, index) => {
                return (
                  <tr key={index}>
                    <td>{order.name}</td>
                    <td>{order.qty}</td>
                    <td>{Number(order.price).toFixed(2)}</td>
                    <td>
                      <p className={order.mode === "BUY" ? "profit" : "loss"}>
                        {order.mode}
                      </p>
                    </td>
                    <td>{new Date(order.createdAt).toLocaleString()}</td>
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

export default Orders;
