import { Request, Response, NextFunction } from "express";

import { CustomRequestInt } from "../tools/Interfaces";

export default class AdminController{
    static async adminLogin(req: Request, res: Response, next: NextFunction){
        try{
            res.render('login');
        }
        catch(error){
            res.status(401);
            return next(error);
        }
    }

    static async adminDashboard(req: Request, res: Response, next: NextFunction){
        try{
            res.render('dashboard');
        }
        catch(error){
            res.status(401);
            return next(error);
        }
    }
}