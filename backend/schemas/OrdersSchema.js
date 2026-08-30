import { Schema } from "mongoose";

const OrdersSchema = new Schema({
  name: String,
  qty: Number,
  price: Number,
  mode: String,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default OrdersSchema;
