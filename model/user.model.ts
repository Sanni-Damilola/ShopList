import mongoose from "mongoose";
import { userData } from "../interfaces/allInterfaces";

interface user extends userData, mongoose.Document {}

const userSchema = new mongoose.Schema<userData>({
  name: {
    type: String,
    trim: true,
    required: [true, "please enter your name"],
  },
  email: {
    type: String,
    unique: true,
    required: [true, "please enter your email"],
    trim: true,

    lowercase: true,
  },
  password: {
    type: String,
    minlength: 6,
    required: [true, "please enter your password"],
  },
  shop: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "shopCollections",
    },
  ],
  // WishList: [
  //   {
  //     type: mongoose.Schema.Types.ObjectId,
  //     ref: "wishlistcollections",
  //   },
  // ],
});

const userModel = mongoose.model<user>("userLoginDetails", userSchema);

export default userModel;
