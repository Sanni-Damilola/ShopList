import mongoose from "mongoose";

import { shopData } from "../interfaces/allInterfaces";

interface AShop extends shopData, mongoose.Document {}

const wishSchema = new mongoose.Schema<shopData>({
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

const wishModel = mongoose.model<AShop>("wishlistcollections", wishSchema);

export default wishModel;
