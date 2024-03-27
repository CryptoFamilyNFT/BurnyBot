import express, { Request, Response } from "express";
import { checkFreeBurns } from "../functions/Magician";

export const magician = express.Router();

magician.use(express.json());

{/* Execute magician */}

magician.get("/", async (_req: Request, res: Response) => {
    try {
        checkFreeBurns()
        res.status(200).send("Starting Magician...");
    } catch (error: any) {
        res.status(500).send(error.message);
    }
});
