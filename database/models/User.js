import { model, models } from "mongoose";
import user from "../schemas/user";

export default models.User || model("User", user);
