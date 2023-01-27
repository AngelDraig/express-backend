import { Request, Response, NextFunction } from "express";

import UserService from "./UserService";

import { CustomRequestInt } from "../../tools/Interfaces";

export default class UserController{
    static async create(req: Request, res: Response, next: NextFunction){
        try{
            const user = {
                email: req.body.email,
                password: req.body.password,
                first_name: req.body.first_name,
                last_name: req.body.last_name,
            }
    
            const userCreated = await UserService.create(user);
            res.json(userCreated);
        } 
        catch(error){
            next(error);
        }
    }

    static async me(req: CustomRequestInt, res: Response, next: NextFunction){
        try{
            const { userId } = req.payload;

            if (!userId){
                throw new Error("User not found");
            }

            const user = await UserService.me(userId);
            res.json(user);
        }
        catch(error){
            next(error);
        }
    }

    static async findAll(req: CustomRequestInt, res: Response, next: NextFunction){
        try{
            const { userId } = req.payload;

            if (!userId){
                throw new Error("User not found");
            }

            const users = await UserService.findAll();
            res.json(users);
        }
        catch(error){
            next(error);
        }
    }
}