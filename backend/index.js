import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";
import FundsModel from "./model/FundsModel.js";
import HoldingsModel from "./model/HoldingsModel.js";
import OrdersModel from "./model/OrdersModel.js";

import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import authMiddleware from "./middleware/authMiddleware.js";
import UserModel from "./model/UserModel.js";

dotenv.config();
const PORT = process.env.PORT || 3002;
const uri = process.env.MONGO_URL;
const requiredEnv = ["MONGO_URL", "JWT_SECRET", "FRONTEND_URL"];
const missingEnv = requiredEnv.filter((name) => !process.env[name]);

if (missingEnv.length) {
  throw new Error(
    `Missing required environment variables: ${missingEnv.join(", ")}`
  );
}

const allowedOrigins = (process.env.FRONTEND_URL || "")
  .split(",")
  .map((origin) => origin.trim())
  .filter(Boolean);

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(
  cors(
    allowedOrigins.length
      ? {
          origin: allowedOrigins,
          credentials: true,
        }
      : undefined
  )
);

app.get("/", (req, res) => {
  res.send("Backend is working!");
});

const getFundsAccount = async (userId) => {
  let funds = await FundsModel.findOne({ userId });

  if (!funds) {
    funds = await FundsModel.create({
      userId,
      openingBalance: 100000,
      availableCash: 100000,
    });
  }

  return funds;
};

const getAccountSummary = async (userId) => {
  const holdings = await HoldingsModel.find({ userId });
  const funds = await getFundsAccount(userId);

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

app.get("/allHoldings", authMiddleware, async (req, res) => {
  let allHoldings = await HoldingsModel.find({ userId: req.user.id });
  res.json(allHoldings);
});

app.get("/allPositions", authMiddleware, async (req, res) => {
  const allOrders = await OrdersModel.find({ userId: req.user.id }).sort({
    createdAt: 1,
  });
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
      const avg =
        position.buyQty === 0
          ? position.price
          : position.buyValue / position.buyQty;
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

app.post("/newOrder", authMiddleware, async (req, res) => {
  try {
    const userId = req.user.id;
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

    const funds = await getFundsAccount(userId);
    const existingHolding = await HoldingsModel.findOne({ userId, name: name });

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
          userId,
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
        await HoldingsModel.deleteOne({ _id: existingHolding._id, userId });
      } else {
        await existingHolding.save();
      }

      funds.availableCash = funds.availableCash + orderValue;
      await funds.save();
    }

    const newOrder = new OrdersModel({
      userId,
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

app.get("/allOrders", authMiddleware, async (req, res) => {
  const allOrders = await OrdersModel.find({ userId: req.user.id }).sort({
    createdAt: -1,
  });
  res.json(allOrders);
});

app.get("/funds", authMiddleware, async (req, res) => {
  res.json(await getAccountSummary(req.user.id));
});

app.post("/funds/add", authMiddleware, async (req, res) => {
  const amount = Number(req.body.amount);

  if (amount <= 0) {
    return res.status(400).send("Invalid amount");
  }

  const funds = await getFundsAccount(req.user.id);
  funds.availableCash = funds.availableCash + amount;
  funds.openingBalance = funds.openingBalance + amount;
  await funds.save();

  res.json(await getAccountSummary(req.user.id));
});

app.post("/funds/withdraw", authMiddleware, async (req, res) => {
  const amount = Number(req.body.amount);

  if (amount <= 0) {
    return res.status(400).send("Invalid amount");
  }

  const funds = await getFundsAccount(req.user.id);

  if (funds.availableCash < amount) {
    return res.status(400).send("Insufficient available cash");
  }

  funds.availableCash = funds.availableCash - amount;
  funds.openingBalance = funds.openingBalance - amount;
  await funds.save();

  res.json(await getAccountSummary(req.user.id));
});

app.get("/me", authMiddleware, async (req, res) => {
  const user = await UserModel.findById(req.user.id).select("-password");

  if (!user) {
    return res.status(404).send("User not found");
  }

  res.json({
    id: user._id,
    name: user.name,
    email: user.email,
  });
});

app.post("/signup", async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).send("All fields are required");
  }

  const existingUser = await UserModel.findOne({ email: email });

  if (existingUser) {
    return res.status(400).send("User already exists");
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = new UserModel({
    name: name,
    email: email,
    password: hashedPassword,
  });

  await newUser.save();

  res.send("User registered successfully");
});

app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ message: "Email and password are required" });
  }

  const user = await UserModel.findOne({ email: email });

  if (!user) {
    return res.status(400).json({ message: "Invalid email or password" });
  }

  const isPasswordCorrect = await bcrypt.compare(password, user.password);

  if (!isPasswordCorrect) {
    return res.status(400).json({ message: "Invalid email or password" });
  }

  const token = jwt.sign(
    {
      id: user._id,
      email: user.email,
    },
    process.env.JWT_SECRET,
    { expiresIn: "1d" }
  );

  res.cookie("token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
    maxAge: 24 * 60 * 60 * 1000,
  });

  res.json({
    message: "Login successful",
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
    },
  });
});

app.post("/logout", (req, res) => {
  res.clearCookie("token", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
  });
  res.sendStatus(204);
});

mongoose
  .connect(uri)
  .then(() => {
    console.log("database connected successfully");
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error("MongoDB connection failed:", error);
    process.exit(1);
  });
