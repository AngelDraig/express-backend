import { Request } from "express";

export interface CustomRequestInt extends Request{
    payload?: any
}