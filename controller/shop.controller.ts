import shopModel from "../model/shop.model";
import mongoose from "mongoose";
import { Request, Response, NextFunction } from "express";
import { asyncHandler } from "../utils/AsyncHandler";
import userModel from "../model/user.model";
import { shopData } from "../interfaces/allInterfaces";
import { AppError, HttpCodes } from "../utils/AppError";

//get all

// export const getAllDetails = asyncHandler(
//   async (
//     req: Request,
//     res: Response,
//     next: NextFunction
//   ): Promise<Response> => {
//     const getId = await userModel.findById(req.params.userID);

//   }
// );

//create

export const createDetails = asyncHandler(
  async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response> => {
    const { price, items, quantity } = req.body;
    const getId = await userModel.findById(req.params.userID);
    const user = await shopModel.create({
      price,
      items,
      quantity,
    });

    if (!user) {
      next(
        new AppError({
          message: "fill in the required details",
          httpCode: HttpCodes.BAD_REQUEST,

          isOperational: true,
        })
      );
    }
    await getId?.shop.push(new mongoose.Types.ObjectId(user._id));

    return res.status(201).json({
      message: "details added successfully",
      data: user,
    });
  }
);
