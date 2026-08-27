import { model } from "mongoose";
import PositionsSchema from "../schemas/PositionsSchema.js";

const PostionsModel = new model("Postions", PositionsSchema);

export default PostionsModel;
