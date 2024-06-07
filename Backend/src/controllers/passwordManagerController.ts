import { Request, Response } from "express";
import NodeCache from "node-cache";

const myCache = new NodeCache();

export const fetchPasswords = async (req : Request, res: Response) => {
    return res.status(200).json({message: "test", value: myCache.get("test") });
}

export const addPassword = async (req : Request, res: Response) => {
    return res.status(200).json({result: true});
}