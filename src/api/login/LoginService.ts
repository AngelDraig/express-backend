import CryptoJS, { SHA256 } from "crypto-js";
const { v4: uuidv4 } = require('uuid');
import { User } from "@prisma/client";

import { TokenService } from "../../tools/Token";
import prismaClient from "../../../prisma/PrismaConnect";

export class LoginService{

    static async checkUser(email: string, password: string){
        if (!email || !password){
            throw new Error("Неверные учётные данные");
        }

        const user: User = await prismaClient.user.findFirstOrThrow({
            where: {
                email: email,
                password: SHA256(password).toString(CryptoJS.enc.Hex),
            }
        });

        return user.id;
    }

    static async login(email: string, password: string){
        const userId = await this.checkUser(email, password);

        if (!userId){
            throw new Error("Пользователь не найден");
        }

        const jti = uuidv4();
        return await TokenService.generateTokens(userId, jti);
    }

    static async logout(){

    }
}