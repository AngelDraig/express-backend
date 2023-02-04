import { Request } from "express";

export interface CustomRequestInt extends Request{
    payload?: any
}

export interface LoggerInt{
    method: string,
    url: string,
    host: string
}