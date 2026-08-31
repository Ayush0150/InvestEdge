import { useState } from "react";
import api from "../api/api";
import "./BuyActionWindow.css";

const SellActionWindow = ({ stock, onClose, onOrderPlaced }) => {
  const [stockQuantity, setStockQuantity] = useState(1);
  const stockPrice = stock.price;

  const totalAmount = Number(stockQuantity) * Number(stockPrice);

const handleSellClick = async () => {
  try {
    await api.post("/newOrder", {
      name: stock.name,
      qty: Number(stockQuantity),
      price: Number(stockPrice),
      mode: "SELL",
    });

    onOrderPlaced();
    onClose();
  } catch (error) {
    alert(error.response?.data || "Sell order failed");
  }
};

  return (
    <div className="buy-window">
      <div className="buy-window-header">
        <h3>Sell {stock.name}</h3>
      </div>

      <div className="buy-window-inputs">
        <fieldset>
          <legend>Qty.</legend>
          <input
            type="number"
            min="1"
            value={stockQuantity}
            onChange={(e) => setStockQuantity(e.target.value)}
          />
        </fieldset>

        <fieldset>
          <legend>Price</legend>
          <input type="number" value={stockPrice} disabled />
        </fieldset>
      </div>

      <div className="buy-window-footer">
        <span>Required amount ₹{totalAmount.toFixed(2)}</span>

        <div>
          <button className="btn btn-red" onClick={handleSellClick}>
            Sell
          </button>

          <button className="btn btn-grey" onClick={onClose}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default SellActionWindow;
