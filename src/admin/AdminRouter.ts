import express from "express";

import AdminController from "./AdminController";

const adminRouter = express.Router();

adminRouter.get("/admin", AdminController.adminLogin);
adminRouter.get("/admin/dashboard", AdminController.adminDashboard);

export default adminRouter;