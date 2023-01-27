import { Router } from "express";
import {
  getAllUsers,
  loginUser,
  register,
} from "../controller/user.controller";

const authRoute = Router();

authRoute.route("/").get(getAllUsers);
authRoute.route("/register").post(register);
authRoute.route("/login").post(loginUser);

export default authRoute;
