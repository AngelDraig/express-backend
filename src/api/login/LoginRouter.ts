import express from "express";

import { LoginController } from "./LoginController";

import { API_PATH } from "../../config";

const loginRouter = express.Router();

loginRouter.post(API_PATH + "/login", LoginController.login);
loginRouter.get(API_PATH + "/logout", LoginController.logout);

export default loginRouter;