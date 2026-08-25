import Apps from "./Apps.jsx";
import Funds from "./Funds.jsx";
import Holdings from "./Holdings.jsx";
import { Route, Routes } from "react-router-dom";
import Orders from "./Orders.jsx";
import Positions from "./Positions.jsx";
import Summary from "./Summary.jsx";
import WatchList from "./WatchList.jsx";

const Dashboard = () => {
  return (
    <div className="dashboard-container">
      <WatchList />

      <div className="content">
        <Routes>
          <Route exact path="/" element={<Summary />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/holdings" element={<Holdings />} />
          <Route path="/positions" element={<Positions />} />
          <Route path="/funds" element={<Funds />} />
          <Route path="/apps" element={<Apps />} />
        </Routes>
      </div>
    </div>
  );
};

export default Dashboard;
