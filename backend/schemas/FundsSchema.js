import { Schema } from "mongoose";

const FundsSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  openingBalance: {
    type: Number,
    default: 100000,
  },
  availableCash: {
    type: Number,
    default: 100000,
  },
});

export default FundsSchema;
