import express, { Application } from "express";

import cors from "cors";
import morgan from "morgan";
import authRoute from "../router/user.routes";
import shopModel from "../model/shop.model";
import shopRoute from "../router/shop.routes";

const appConfig = (app: Application) => {
  app.use(express.json()).use(cors()).use(morgan("dev"));
  app.use("/api/auth", authRoute);
  app.use("/api", shopRoute);
};

export default appConfig;
