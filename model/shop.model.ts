import mongoose from "mongoose";

import { shopData } from "../interfaces/allInterfaces";

interface AShop extends shopData, mongoose.Document {}

const shopSchema = new mongoose.Schema<shopData>({
  price: {
    type: String,
  },
  items: {
    type: Number,
  },
  quantity: {
    type: String,
  },
});

const shopModel = mongoose.model<AShop>("shopCollections", shopSchema);

export default shopModel;
