import { Request, Response, NextFunction } from "express";
import { access } from "fs";
import { LoginService } from "./LoginService";

export class LoginController{
    static async login(req: Request, res: Response, next: NextFunction){
        try{
            const {email, password} = req.body;

            if (!email){
                res.status(404);
                return next(new Error("Email is requaired"));
            }

            if (!password || password.length < 8){
                res.status(404);
                return next(new Error("Password is short. Password need 8 and more symbols"));
            }
            const {accessToken, refreshToken} = await LoginService.login(email, password);
            
            res.cookie('refresh', refreshToken, { httpOnly: true, secure: true, sameSite: 'none', maxAge: 24 * 60 * 60 * 1000 * 30 });
            res.json({accessToken});
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
            res.status(401);
            return next(error);
        }
    }
    static async refresh(req: Request, res: Response, next: NextFunction){
        try{
            const { refreshToken } = req.body;
            if (!refreshToken){
                res.status(404);
                return next(new Error("Password is short. Password need 8 and more symbols"));
            }
            const userId = await LoginService.verifyRefreshToken(refreshToken);

            const newTokens = await LoginService.updateRefreshToken(userId, refreshToken);

            if (!newTokens){
                res.clearCookie('refresh', { httpOnly: true, secure: true, sameSite: 'none', maxAge: 24 * 60 * 60 * 1000 * 30 });
                res.status(401);
                res.redirect("/login");
                return next(new Error("Token is dead"));
            }

            const access = newTokens.accessToken;

            res.cookie('refresh', newTokens.refreshToken, { httpOnly: true, secure: true, sameSite: 'none', maxAge: 24 * 60 * 60 * 1000 * 30 });
            res.json({access});
        }
        catch(error){
            res.clearCookie('refresh', { httpOnly: true, secure: true, sameSite: 'none', maxAge: 24 * 60 * 60 * 1000 * 30 });
            res.status(401);
            res.redirect("/login");
            return next(error);
        }
    }
}