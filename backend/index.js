import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";
import FundsModel from "./model/FundsModel.js";
import HoldingsModel from "./model/HoldingsModel.js";
import OrdersModel from "./model/OrdersModel.js";

dotenv.config();
const PORT = process.env.PORT || 3002;
const uri = process.env.MONGO_URL;

const app = express();

app.use(express.json());
app.use(cors());

mongoose
  .connect(uri)
  .then(() => console.log("database connected successfully"))
  .catch((e) => {
    console.log("MongoDB connection failed:", e);
  });

app.get("/", (req, res) => {
  res.send("Backend is working!");
});

const getFundsAccount = async () => {
  let funds = await FundsModel.findOne({});

  if (!funds) {
    funds = await FundsModel.create({
      openingBalance: 100000,
      availableCash: 100000,
    });
  }

  return funds;
};

const getPortfolioSummary = async () => {
  const holdings = await HoldingsModel.find({});
  const funds = await getFundsAccount();

  const investment = holdings.reduce((total, stock) => {
    return total + Number(stock.avg || 0) * Number(stock.qty || 0);
  }, 0);

  const currentValue = holdings.reduce((total, stock) => {
    return total + Number(stock.price || 0) * Number(stock.qty || 0);
  }, 0);

  const pnl = currentValue - investment;
  const pnlPercent = investment === 0 ? 0 : (pnl / investment) * 100;

  return {
    holdingsCount: holdings.length,
    investment,
    currentValue,
    pnl,
    pnlPercent,
    availableCash: funds.availableCash,
    openingBalance: funds.openingBalance,
    usedMargin: investment,
    accountValue: funds.availableCash + currentValue,
  };
};

// app.get("/addHoldings", async (req, res) => {
//   let tempHoldings = [
//     {
//       name: "BHARTIARTL",
//       qty: 2,
//       avg: 538.05,
//       price: 541.15,
//       net: "+0.58%",
//       day: "+2.99%",
//     },
//     {
//       name: "HDFCBANK",
//       qty: 2,
//       avg: 1383.4,
//       price: 1522.35,
//       net: "+10.04%",
//       day: "+0.11%",
//     },
//     {
//       name: "HINDUNILVR",
//       qty: 1,
//       avg: 2335.85,
//       price: 2417.4,
//       net: "+3.49%",
//       day: "+0.21%",
//     },
//     {
//       name: "INFY",
//       qty: 1,
//       avg: 1350.5,
//       price: 1555.45,
//       net: "+15.18%",
//       day: "-1.60%",
//       isLoss: true,
//     },
//     {
//       name: "ITC",
//       qty: 5,
//       avg: 202.0,
//       price: 207.9,
//       net: "+2.92%",
//       day: "+0.80%",
//     },
//     {
//       name: "KPITTECH",
//       qty: 5,
//       avg: 250.3,
//       price: 266.45,
//       net: "+6.45%",
//       day: "+3.54%",
//     },
//     {
//       name: "M&M",
//       qty: 2,
//       avg: 809.9,
//       price: 779.8,
//       net: "-3.72%",
//       day: "-0.01%",
//       isLoss: true,
//     },
//     {
//       name: "RELIANCE",
//       qty: 1,
//       avg: 2193.7,
//       price: 2112.4,
//       net: "-3.71%",
//       day: "+1.44%",
//     },
//     {
//       name: "SBIN",
//       qty: 4,
//       avg: 324.35,
//       price: 430.2,
//       net: "+32.63%",
//       day: "-0.34%",
//       isLoss: true,
//     },
//     {
//       name: "SGBMAY29",
//       qty: 2,
//       avg: 4727.0,
//       price: 4719.0,
//       net: "-0.17%",
//       day: "+0.15%",
//     },
//     {
//       name: "TATAPOWER",
//       qty: 5,
//       avg: 104.2,
//       price: 124.15,
//       net: "+19.15%",
//       day: "-0.24%",
//       isLoss: true,
//     },
//     {
//       name: "TCS",
//       qty: 1,
//       avg: 3041.7,
//       price: 3194.8,
//       net: "+5.03%",
//       day: "-0.25%",
//       isLoss: true,
//     },
//     {
//       name: "WIPRO",
//       qty: 4,
//       avg: 489.3,
//       price: 577.75,
//       net: "+18.08%",
//       day: "+0.32%",
//     },
//   ];

//   tempHoldings.forEach((holding) => {
//     let newHolding = new HoldingsModel({
//       name: holding.name,
//       qty: holding.qty,
//       avg: holding.avg,
//       price: holding.price,
//       net: holding.net,
//       day: holding.day,
//     });

//     newHolding.save();
//   });
//   res.send("holdings data saved!");
// });

// app.get("/addPositions", (req, res) => {
//   const tempPositions = [
//     {
//       product: "CNC",
//       name: "EVEREADY",
//       qty: 2,
//       avg: 316.27,
//       price: 312.35,
//       net: "+0.58%",
//       day: "-1.24%",
//       isLoss: true,
//     },
//     {
//       product: "CNC",
//       name: "JUBLFOOD",
//       qty: 1,
//       avg: 3124.75,
//       price: 3082.65,
//       net: "+10.04%",
//       day: "-1.35%",
//       isLoss: true,
//     },
//   ];

//   tempPositions.forEach((position) => {
//     let newPosition = new PositionsModel({
//       product: position.product,
//       name: position.name,
//       qty: position.qty,
//       avg: position.avg,
//       price: position.price,
//       net: position.net,
//       day: position.day,
//       isLoss: position.isLoss,
//     });
//     newPosition.save();
//   });
//   res.send("postions data saved");
// });

app.get("/allHoldings", async (req, res) => {
  let allHoldings = await HoldingsModel.find({});
  res.json(allHoldings);
});

app.get("/allPositions", async (req, res) => {
  const allOrders = await OrdersModel.find({}).sort({ createdAt: 1 });
  const positionsMap = new Map();

  allOrders.forEach((order) => {
    const name = order.name;
    const orderQty = Number(order.qty || 0);
    const orderPrice = Number(order.price || 0);

    if (!positionsMap.has(name)) {
      positionsMap.set(name, {
        product: "CNC",
        name: name,
        qty: 0,
        buyValue: 0,
        buyQty: 0,
        price: orderPrice,
      });
    }

    const position = positionsMap.get(name);

    if (order.mode === "BUY") {
      position.qty += orderQty;
      position.buyQty += orderQty;
      position.buyValue += orderQty * orderPrice;
    }

    if (order.mode === "SELL") {
      position.qty -= orderQty;
    }

    position.price = orderPrice;
  });

  const allPositions = Array.from(positionsMap.values())
    .filter((position) => position.qty !== 0)
    .map((position) => {
      const avg = position.buyQty === 0 ? position.price : position.buyValue / position.buyQty;
      const pnl = (position.price - avg) * position.qty;
      const day = avg === 0 ? 0 : ((position.price - avg) / avg) * 100;

      return {
        product: position.product,
        name: position.name,
        qty: position.qty,
        avg: avg,
        price: position.price,
        pnl: pnl,
        day: `${day.toFixed(2)}%`,
        isLoss: pnl < 0,
      };
    });

  res.json(allPositions);
});

app.post("/newOrder", async (req, res) => {
  try {
    const { name, qty, price, mode } = req.body;

    const orderQty = Number(qty);
    const orderPrice = Number(price);
    const orderMode = String(mode).toUpperCase();
    const orderValue = orderQty * orderPrice;

    if (!name || orderQty <= 0 || orderPrice <= 0) {
      return res.status(400).send("Invalid order data");
    }
  
    if (orderMode !== "BUY" && orderMode !== "SELL") {
      return res.status(400).send("Invalid order mode");
    }
  
    const funds = await getFundsAccount();
    const existingHolding = await HoldingsModel.findOne({ name: name });
  
    if (orderMode === "BUY") {
      if (funds.availableCash < orderValue) {
        return res.status(400).send("Insufficient funds");
      }
  
      if (existingHolding) {
        const oldQty = existingHolding.qty;
        const oldAvg = existingHolding.avg;
  
        const newQty = oldQty + orderQty;
        const newAvg = (oldQty * oldAvg + orderQty * orderPrice) / newQty;
  
        existingHolding.qty = newQty;
        existingHolding.avg = newAvg;
        existingHolding.price = orderPrice;
  
        await existingHolding.save();
      } else {
        const newHolding = new HoldingsModel({
          name: name,
          qty: orderQty,
          avg: orderPrice,
          price: orderPrice,
          net: "0.00%",
          day: "0.00%",
        });
  
        await newHolding.save();
      }
  
      funds.availableCash = funds.availableCash - orderValue;
      await funds.save();
    }
  
    if (orderMode === "SELL") {
      if (!existingHolding) {
        return res.status(400).send("You do not own this stock");
      }
  
      if (existingHolding.qty < orderQty) {
        return res.status(400).send("Not enough quantity to sell");
      }
  
      existingHolding.qty = existingHolding.qty - orderQty;
      existingHolding.price = orderPrice;
  
      if (existingHolding.qty === 0) {
        await HoldingsModel.deleteOne({ _id: existingHolding._id });
      } else {
        await existingHolding.save();
      }
  
      funds.availableCash = funds.availableCash + orderValue;
      await funds.save();
    }
  
    const newOrder = new OrdersModel({
      name: name,
      qty: orderQty,
      price: orderPrice,
      mode: orderMode,
    });
  
    await newOrder.save();
  
    res.send("Order saved and holdings updated");
  } catch (error) {
    console.log("Order failed:", error);
    res.status(500).send("Order failed");
  }
});

app.get("/allOrders", async (req, res) => {
  const allOrders = await OrdersModel.find({}).sort({ createdAt: -1 });
  res.json(allOrders);
});

app.get("/portfolioSummary", async (req, res) => {
  res.json(await getPortfolioSummary());
});

app.get("/funds", async (req, res) => {
  res.json(await getPortfolioSummary());
});

app.post("/funds/add", async (req, res) => {
  const amount = Number(req.body.amount);

  if (amount <= 0) {
    return res.status(400).send("Invalid amount");
  }

  const funds = await getFundsAccount();
  funds.availableCash = funds.availableCash + amount;
  funds.openingBalance = funds.openingBalance + amount;
  await funds.save();

  res.json(await getPortfolioSummary());
});

app.post("/funds/withdraw", async (req, res) => {
  const amount = Number(req.body.amount);

  if (amount <= 0) {
    return res.status(400).send("Invalid amount");
  }

  const funds = await getFundsAccount();

  if (funds.availableCash < amount) {
    return res.status(400).send("Insufficient available cash");
  }

  funds.availableCash = funds.availableCash - amount;
  funds.openingBalance = funds.openingBalance - amount;
  await funds.save();

  res.json(await getPortfolioSummary());
});

app.listen(PORT, () => {
  console.log("Server running on port 3002");
});
