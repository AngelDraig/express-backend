import prismaClient from "../../../prisma/PrismaConnect";
import CryptoJS, { SHA256 } from "crypto-js";

import { defineModel } from "../../tools/Functions";
import { userModel } from "./UserModel";
import { TokenService } from "../../tools/Token";

export default class UserService{
    static async create(userData: {email: string, password: string, first_name: string, last_name: string}){

        const user = await prismaClient.user.create({
            data: {
                email: userData.email,
                password: SHA256(userData.password).toString(CryptoJS.enc.Hex),
                first_name: userData.first_name,
                last_name: userData.last_name,
            },
            select: defineModel(userModel)
        });

        return user;
    }

    static async me(userId: string){
        const user = await prismaClient.user.findUniqueOrThrow({
            where: {
                id: userId
            },
            select: {
                id: true,
                email: true,
                first_name: true,
                last_name: true,
                role: true,
                image: true
            },
        });
        return user;
    }

    static async findAll(){
        const users = await prismaClient.user.findMany({
            select: {
                id: true,
                email: true,
                first_name: true,
                last_name: true,
                role: true,
                image: true
            },
        });
        return users;
    }
}
