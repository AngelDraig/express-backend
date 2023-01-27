import { Request, Response, NextFunction } from "express";
import { LoginService } from "./LoginService";

export class LoginController{
    static async login(req: Request, res: Response, next: NextFunction){
        try{
            const {email, password} = req.body;

            if (!password || password.length < 8){
                res.status(404);
                return next(new Error("Password is short. Password need 8 and more symbols"));
            }
            res.json(await LoginService.login(email, password));
        }
        catch(error){
            res.status(404);
            return next(error);
        }
    }

    static async logout(req: Request, res: Response, next: NextFunction){
        try{
            
        }
        catch(error){
            return next(error);
        }
    }
}