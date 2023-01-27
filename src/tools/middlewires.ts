import { Request, Response, NextFunction } from "express";

import { TokenService } from "./Token";

import { CustomRequestInt } from "./Interfaces";

export default class Middlewires{
    static async isAuthenticated(req: CustomRequestInt, res: Response, next: NextFunction){
        const { authorization } = req.headers;
      
        if (!authorization) {
            res.status(401);
            const error = new Error("Unauthorized");
            return next(error);
        }
      
        try{
            const token = authorization?.split(' ')[1];
            if (!token){
                res.status(401);
                throw new Error("Token not found");
            }
            const payload = await TokenService.verifyAccessToken(token);
            req.payload = payload;
        }
        catch(error: any){
            res.status(401);
            if (error.name === 'TokenExpiredError') {
                throw new Error(error.name);
            }
            return next(new Error("Token is not valid"));
        }
        return next();
    }
      
    static async customErrorHandler(error: Error, req: CustomRequestInt, res: Response, next: NextFunction) {
        res.json({
            message: error.message,
            stack: error.stack
        });
    }
}