const jwt = require("jsonwebtoken");

import prismaClient from "../../prisma/PrismaConnect";

export class TokenService{
    static async generateAccessToken(userId: string | number) {
        return jwt.sign({ userId: userId }, process.env.JWT_ACCESS_SECRET, {
            expiresIn: "1d",
        });
    }
    
    static async generateRefreshToken(userId: string | number, jti: string) {
        return jwt.sign({userId: userId, jti}, process.env.JWT_REFRESH_SECRET, {
            expiresIn: "15d",
        });
    }
    
    static async generateTokens(userId: string, jti: string){
        const accessToken = await this.generateAccessToken(userId);
        const refreshToken = await this.generateRefreshToken(userId, jti);


        await this.addTokenToWhiteList(userId, refreshToken);
    
        return {
            accessToken,
            refreshToken,
        };
    }

    static async addTokenToWhiteList(userId: string, newToken: string){
        const foundedUser = await prismaClient.user.findUnique({
            where: {
                id: userId
            }
        });

        if (foundedUser){
            await prismaClient.user.update({
                where: {
                    id: userId
                },
                data: {
                    tokens: [...foundedUser.tokens, newToken]
                }
            });
        }
        else{
            return new Error("User not found");
        }
    }

    static async verifyAccessToken(token: string){
        try{
            const payload = jwt.verify(token, process.env.JWT_ACCESS_SECRET);
            return payload;
        }
        catch(error){
            throw new Error("Token is not valid");
        }
    }
    
    static async verifyRefreshToken(token: string){
        try{
            const payload = jwt.verify(token, process.env.JWT_REFRESH_SECRET);
            return payload;
        }
        catch(error){
            throw new Error("Token is not valid");
        }
    }
}