import userModel from "../model/user.model";
import { Request, Response, NextFunction } from "express";
import bcrypt from "bcrypt";
import { asyncHandler } from "../utils/AsyncHandler";
import { HttpCodes, AppError } from "../utils/AppError";
import { userData } from "../interfaces/allInterfaces";

export const register = asyncHandler(
  async (
    req: Request<{}, {}, userData>,
    res: Response,
    next: NextFunction
  ): Promise<Response> => {
    const { name, email, password } = req.body;

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = await userModel.create({
      name,
      email,
      password: hashedPassword,
    });
    if (!user) {
      next(
        new AppError({
          message: "Account not created",
          httpCode: HttpCodes.BAD_REQUEST,
          isOperational: true,
        })
      );
    }

    return res.status(200).json({
      user,
    });
  }
);

export const loginUser = asyncHandler(
  async (
    req: Request<{}, {}, userData>,
    res: Response,
    next: NextFunction
  ): Promise<Response> => {
    const { email, password } = req.body;
    if (!email) {
      next(
        new AppError({
          message: "invalid email , please enter a valid a email",
          httpCode: HttpCodes.NOT_FOUND,
          isOperational: true,
        })
      );
    }

    const user = await userModel.findOne({ email });
    if (!user) {
      next(
        new AppError({
          message: "user not found",
          httpCode: HttpCodes.NOT_FOUND,
          isOperational: true,
        })
      );
    }

    const passwordCheck = await bcrypt.compare(password, user!.password);

    if (!passwordCheck) {
      next(
        new AppError({
          message: "wrong password",
          httpCode: HttpCodes.UNAUTHORIZED,
          isOperational: true,
        })
      );
    }

    return res.status(200).json({
      message: `welcome ${user?.name}`,
    });
  }
);

export const getAllUsers = asyncHandler(
  async (
    req: Request<{}, {}, userData>,
    res: Response,
    next: NextFunction
  ): Promise<Response> => {
    const user = await userModel.find();

    next(
      new AppError({
        message: "an error occurred",
        httpCode: HttpCodes.BAD_REQUEST,
        isOperational: false,
      })
    );

    return res.status(200).json({
      message: `we have ${user.length}(s)`,
      data: user,
    });
  }
);
