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
    
    static async generateTokens(userId: string | number, jti: string){
        const accessToken = await this.generateAccessToken(userId);
        const refreshToken = await this.generateRefreshToken(userId, jti);
    
        return {
            accessToken,
            refreshToken,
        };
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
    
    static async addUserToken(){
    
    }
}