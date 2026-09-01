import { useMemo, useState } from "react";

import { Grow, Tooltip } from "@mui/material";

import {
  BarChartOutlined,
  Close,
  ContentCopy,
  Delete,
  KeyboardArrowDown,
  KeyboardArrowUp,
  MoreHoriz,
  NotificationsNone,
} from "@mui/icons-material";

import { watchlist as defaultWatchlist } from "../data/data";
import BuyActionWindow from "./BuyActionWindow";
import { DoughnutChart } from "./DoughnutChart";
import SellActionWindow from "./SellActionWindow";

const WatchList = ({ onOrderPlaced }) => {
  const [watchlistItems, setWatchlistItems] = useState(defaultWatchlist);
  const [isBuyWindowOpen, setIsBuyWindowOpen] = useState(false);
  const [isSellWindowOpen, setIsSellWindowOpen] = useState(false);
  const [selectedStock, setSelectedStock] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [analyticsStock, setAnalyticsStock] = useState(null);
  const [activeMoreStock, setActiveMoreStock] = useState(null);
  const [toastMessage, setToastMessage] = useState("");

  const filteredWatchlist = watchlistItems.filter((stock) => {
    const query = searchTerm.trim().toLowerCase();

    if (!query) {
      return true;
    }

    return stock.name.toLowerCase().includes(query);
  });

  const data = useMemo(
    () => ({
      labels: filteredWatchlist.map((stock) => stock.name),
      datasets: [
        {
          label: "Price",
          data: filteredWatchlist.map((stock) => Number(stock.price || 0)),
          backgroundColor: [
            "rgba(255, 99, 132, 0.5)",
            "rgba(54, 162, 235, 0.5)",
            "rgba(255, 206, 86, 0.5)",
            "rgba(75, 192, 192, 0.5)",
            "rgba(153, 102, 255, 0.5)",
            "rgba(255, 159, 64, 0.5)",
          ],
          borderColor: [
            "rgba(255, 99, 132, 1)",
            "rgba(54, 162, 235, 1)",
            "rgba(255, 206, 86, 1)",
            "rgba(75, 192, 192, 1)",
            "rgba(153, 102, 255, 1)",
            "rgba(255, 159, 64, 1)",
          ],
          borderWidth: 1,
        },
      ],
    }),
    [filteredWatchlist]
  );

  const showToast = (message) => {
    setToastMessage(message);
    window.setTimeout(() => setToastMessage(""), 1800);
  };

  const handleOpenBuyWindow = (stock) => {
    setSelectedStock(stock);
    setIsSellWindowOpen(false);
    setActiveMoreStock(null);
    setIsBuyWindowOpen(true);
  };

  const handleOpenSellWindow = (stock) => {
    setSelectedStock(stock);
    setIsBuyWindowOpen(false);
    setActiveMoreStock(null);
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

  const handleAnalyticsClick = (stock) => {
    setAnalyticsStock(stock);
    setActiveMoreStock(null);
  };

  const handleMoreClick = (stock) => {
    setActiveMoreStock((currentStock) =>
      currentStock?.name === stock.name ? null : stock
    );
  };

  const handleCopyText = async (text, message) => {
    try {
      await navigator.clipboard.writeText(text);
      showToast(message);
    } catch {
      showToast(text);
    }
    setActiveMoreStock(null);
  };

  const handleAddAlert = (stock) => {
    showToast(`Alert set for ${stock.name} at ${stock.price}`);
    setActiveMoreStock(null);
  };

  const handleRemoveStock = (stock) => {
    setWatchlistItems((currentItems) =>
      currentItems.filter((item) => item.name !== stock.name)
    );

    if (analyticsStock?.name === stock.name) {
      setAnalyticsStock(null);
    }

    setActiveMoreStock(null);
    showToast(`${stock.name} removed from watchlist`);
  };

  return (
    <div className="watchlist-container">
      <div className="search-container">
        <input
          type="text"
          name="search"
          id="search"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search eg:infy, bse, nifty fut weekly, gold mcx"
          className="search"
        />
        <span className="counts">{filteredWatchlist.length} / 50</span>
      </div>

      <ul className="list">
        {filteredWatchlist.map((stock, index) => {
          return (
            <WatchListItem
              stock={stock}
              key={index}
              onBuyClick={handleOpenBuyWindow}
              onSellClick={handleOpenSellWindow}
              onAnalyticsClick={handleAnalyticsClick}
              onMoreClick={handleMoreClick}
              onCopyName={(stock) =>
                handleCopyText(stock.name, `${stock.name} copied`)
              }
              onCopyPrice={(stock) =>
                handleCopyText(String(stock.price), `${stock.name} price copied`)
              }
              onAddAlert={handleAddAlert}
              onRemoveStock={handleRemoveStock}
              isMoreOpen={activeMoreStock?.name === stock.name}
            />
          );
        })}
      </ul>

      {filteredWatchlist.length > 0 && <DoughnutChart data={data} />}

      {filteredWatchlist.length === 0 && (
        <div className="watchlist-empty">No stocks found</div>
      )}

      {analyticsStock && (
        <WatchListAnalytics
          stock={analyticsStock}
          onClose={() => setAnalyticsStock(null)}
        />
      )}

      {toastMessage && <div className="watchlist-toast">{toastMessage}</div>}

      {isBuyWindowOpen && selectedStock && (
        <BuyActionWindow
          stock={selectedStock}
          onClose={handleCloseBuyWindow}
          onOrderPlaced={onOrderPlaced}
        />
      )}

      {isSellWindowOpen && selectedStock && (
        <SellActionWindow
          stock={selectedStock}
          onClose={handleCloseSellWindow}
          onOrderPlaced={onOrderPlaced}
        />
      )}
    </div>
  );
};

export default WatchList;

const WatchListItem = ({
  stock,
  onBuyClick,
  onSellClick,
  onAnalyticsClick,
  onMoreClick,
  onCopyName,
  onCopyPrice,
  onAddAlert,
  onRemoveStock,
  isMoreOpen,
}) => {
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
      {(showWatchlistActions || isMoreOpen) && (
        <WatchListActions
          stock={stock}
          onBuyClick={onBuyClick}
          onSellClick={onSellClick}
          onAnalyticsClick={onAnalyticsClick}
          onMoreClick={onMoreClick}
        />
      )}
      {isMoreOpen && (
        <WatchListMoreMenu
          stock={stock}
          onCopyName={onCopyName}
          onCopyPrice={onCopyPrice}
          onAddAlert={onAddAlert}
          onRemoveStock={onRemoveStock}
        />
      )}
    </li>
  );
};

const WatchListActions = ({
  stock,
  onBuyClick,
  onSellClick,
  onAnalyticsClick,
  onMoreClick,
}) => {
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
          <button className="action" onClick={() => onAnalyticsClick(stock)}>
            <BarChartOutlined className="icon" />
          </button>
        </Tooltip>
        <Tooltip title="More" placement="top" arrow TransitionComponent={Grow}>
          <button className="action" onClick={() => onMoreClick(stock)}>
            <MoreHoriz className="icon" />
          </button>
        </Tooltip>
      </span>
    </span>
  );
};

const WatchListMoreMenu = ({
  stock,
  onCopyName,
  onCopyPrice,
  onAddAlert,
  onRemoveStock,
}) => {
  return (
    <div className="watchlist-more-menu">
      <button onClick={() => onCopyName(stock)}>
        <ContentCopy className="menu-icon" />
        Copy name
      </button>
      <button onClick={() => onCopyPrice(stock)}>
        <ContentCopy className="menu-icon" />
        Copy price
      </button>
      <button onClick={() => onAddAlert(stock)}>
        <NotificationsNone className="menu-icon" />
        Set alert
      </button>
      <button className="danger" onClick={() => onRemoveStock(stock)}>
        <Delete className="menu-icon" />
        Remove
      </button>
    </div>
  );
};

const WatchListAnalytics = ({ stock, onClose }) => {
  const price = Number(stock.price || 0);
  const percent = Number(String(stock.percent).replace("%", "") || 0);
  const previousClose = percent === 0 ? price : price / (1 + percent / 100);
  const dayMove = price - previousClose;

  return (
    <div className="watchlist-analytics">
      <div className="watchlist-analytics-header">
        <div>
          <h4>{stock.name}</h4>
          <p>Quick analytics</p>
        </div>
        <button onClick={onClose} aria-label="Close analytics">
          <Close className="menu-icon" />
        </button>
      </div>

      <div className="watchlist-analytics-grid">
        <div>
          <span>LTP</span>
          <strong>{price.toFixed(2)}</strong>
        </div>
        <div>
          <span>Change</span>
          <strong className={stock.isDown ? "loss" : "profit"}>
            {stock.percent}
          </strong>
        </div>
        <div>
          <span>Day move</span>
          <strong className={dayMove < 0 ? "loss" : "profit"}>
            {dayMove.toFixed(2)}
          </strong>
        </div>
        <div>
          <span>Trend</span>
          <strong className={stock.isDown ? "loss" : "profit"}>
            {stock.isDown ? "Down" : "Up"}
          </strong>
        </div>
      </div>
    </div>
  );
};
