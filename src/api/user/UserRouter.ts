import express from "express";

import Middlewires from "../../tools/middlewires";
import UserController from "./UserController";

import { API_PATH } from "../../config";

const userRouter = express.Router();

userRouter.post(API_PATH + "/user", UserController.create);
userRouter.get(API_PATH + "/user/me", Middlewires.isAuthenticated, UserController.me);
userRouter.get(API_PATH + "/users", Middlewires.isAuthenticated, UserController.findAll);

export default userRouter;