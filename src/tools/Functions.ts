import { Response, NextFunction } from "express";

import prismaClient from "../../prisma/PrismaConnect";

import { CustomRequestInt } from "./Interfaces";


export const defineModel = (model: Array<string>) => {

    const result: Record<string, boolean> = {};

    for (let item of model){
        result[item as keyof typeof result] = true;
    }

    return result;
}

export const verifyRole = async (allowedRoles: Array<string>) => {
    return async (req: CustomRequestInt, res: Response, next: NextFunction) => {
        if (!req?.payload){
            res.sendStatus(401);
            return next(new Error("Недостаточно прав"));
        }
        
        const userId = req.payload.id;

        if (!userId){
            res.sendStatus(400);
            return next(new Error("Error"));
        }

        const userRole = await prismaClient.user.findUnique({
            where: {
                id: userId
            },
            select: {
                role: true
            }
        });

        if (!userRole){
            res.sendStatus(400);
            return next(new Error("Error"));
        }

        const result = allowedRoles.includes(userRole.role);
        if (!result){
            res.sendStatus(401);
            return next(new Error("Недостаточно прав"));
        }
        next();
    }
}