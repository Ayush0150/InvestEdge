import { model } from "mongoose";
import FundsSchema from "../schemas/FundsSchema.js";

const FundsModel = new model("Funds", FundsSchema);

export default FundsModel;
