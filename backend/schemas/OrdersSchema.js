import { Schema } from "mongoose";

const OrdersSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
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
