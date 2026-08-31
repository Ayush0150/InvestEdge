import { useState } from "react";
import { Route, Routes } from "react-router-dom";
import Apps from "./Apps.jsx";
import Funds from "./Funds.jsx";
import Holdings from "./Holdings.jsx";
import Orders from "./Orders.jsx";
import Positions from "./Positions.jsx";
import Summary from "./Summary.jsx";
import WatchList from "./WatchList.jsx";

const Dashboard = () => {
  const [refreshKey, setRefreshKey] = useState(0);

  const handlePortfolioRefresh = () => {
    setRefreshKey((currentKey) => currentKey + 1);
  };

  return (
    <div className="dashboard-container">
      <WatchList onOrderPlaced={handlePortfolioRefresh} />

      <div className="content">
        <Routes>
          <Route exact path="/" element={<Summary refreshKey={refreshKey} />} />
          <Route path="/orders" element={<Orders refreshKey={refreshKey} />} />
          <Route path="/holdings" element={<Holdings refreshKey={refreshKey} />} />
          <Route path="/positions" element={<Positions refreshKey={refreshKey} />} />
          <Route path="/funds" element={<Funds refreshKey={refreshKey} />} />
          <Route path="/apps" element={<Apps />} />
        </Routes>
      </div>
    </div>
  );
};

export default Dashboard;
