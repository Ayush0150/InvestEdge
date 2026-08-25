import { model } from "mongoose";
import HoldingSchema from "../schemas/HoldingsSchema";

const HoldingsModel = new model("holding", HoldingSchema);

export default HoldingsModel;
