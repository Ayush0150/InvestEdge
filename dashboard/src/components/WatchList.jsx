import { useState } from "react";

import { Grow, Tooltip } from "@mui/material";

import {
  BarChartOutlined,
  KeyboardArrowDown,
  KeyboardArrowUp,
  MoreHoriz,
} from "@mui/icons-material";

import { watchlist } from "../data/data";
import BuyActionWindow from "./BuyActionWindow";
import SellActionWindow from "./SellActionWindow";

const WatchList = () => {
  const [isBuyWindowOpen, setIsBuyWindowOpen] = useState(false);
  const [isSellWindowOpen, setIsSellWindowOpen] = useState(false);
  const [selectedStock, setSelectedStock] = useState(null);

  const handleOpenBuyWindow = (stock) => {
    setSelectedStock(stock);
    setIsSellWindowOpen(false);
    setIsBuyWindowOpen(true);
  };

  const handleOpenSellWindow = (stock) => {
    setSelectedStock(stock);
    setIsBuyWindowOpen(false);
    setIsSellWindowOpen(true);
  };

  const handleCloseBuyWindow = () => {
    setSelectedStock(null);
    setIsBuyWindowOpen(false);
  };

  const handleCloseSellWindow = () => {
    setSelectedStock(null);
    setIsSellWindowOpen(false);
  };

  return (
    <div className="watchlist-container">
      <div className="search-container">
        <input
          type="text"
          name="search"
          id="search"
          placeholder="Search eg:infy, bse, nifty fut weekly, gold mcx"
          className="search"
        />
        <span className="counts"> {watchlist.length} / 50</span>
      </div>

      <ul className="list">
        {watchlist.map((stock, index) => {
          return (
            <WatchListItem
              stock={stock}
              key={index}
              onBuyClick={handleOpenBuyWindow}
              onSellClick={handleOpenSellWindow}
            />
          );
        })}
      </ul>

      {isBuyWindowOpen && selectedStock && (
        <BuyActionWindow stock={selectedStock} onClose={handleCloseBuyWindow} />
      )}

      {isSellWindowOpen && selectedStock && (
        <SellActionWindow
          stock={selectedStock}
          onClose={handleCloseSellWindow}
        />
      )}
    </div>
  );
};

export default WatchList;

const WatchListItem = ({ stock, onBuyClick, onSellClick }) => {
  const [showWatchlistActions, setShowWatchlistActions] = useState(false);

  const handleMouseEnter = () => {
    setShowWatchlistActions(true);
  };

  const handleMouseLeave = () => {
    setShowWatchlistActions(false);
  };

  return (
    <li onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
      <div className="item">
        <p className={stock.isDown ? "down" : "up"}>{stock.name}</p>
        <div className="itemInfo">
          <span className="percent">{stock.percent}</span>
          {stock.isDown ? (
            <KeyboardArrowDown className="down" />
          ) : (
            <KeyboardArrowUp className="up" />
          )}
          <span className="price">{stock.price}</span>
        </div>
      </div>
      {showWatchlistActions && (
        <WatchListActions
          stock={stock}
          onBuyClick={onBuyClick}
          onSellClick={onSellClick}
        />
      )}
    </li>
  );
};

const WatchListActions = ({ stock, onBuyClick, onSellClick }) => {
  return (
    <span className="actions">
      <span>
        <Tooltip
          title="Buy (B)"
          placement="top"
          arrow
          TransitionComponent={Grow}
        >
          <button className="buy" onClick={() => onBuyClick(stock)}>
            Buy
          </button>
        </Tooltip>
        <Tooltip
          title="Sell (S)"
          placement="top"
          arrow
          TransitionComponent={Grow}
        >
          <button className="sell" onClick={() => onSellClick(stock)}>
            Sell
          </button>
        </Tooltip>
        <Tooltip
          title="Analytics (A)"
          placement="top"
          arrow
          TransitionComponent={Grow}
        >
          <button className="action">
            <BarChartOutlined className="icon" />
          </button>
        </Tooltip>
        <Tooltip title="More" placement="top" arrow TransitionComponent={Grow}>
          <button className="action">
            <MoreHoriz className="icon" />
          </button>
        </Tooltip>
      </span>
    </span>
  );
};
