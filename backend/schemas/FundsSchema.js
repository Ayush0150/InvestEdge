import { Schema } from "mongoose";

const FundsSchema = new Schema({
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
