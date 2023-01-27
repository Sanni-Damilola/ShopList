import { Router } from "express";
import { createDetails } from "../controller/shop.controller";

const shopRoute = Router();

shopRoute.route("/new").post(createDetails);

export default shopRoute;
