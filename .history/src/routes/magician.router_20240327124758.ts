import express, { Request, Response } from "express";
import { ObjectId } from "mongodb";
import { collections } from "../services/database.service";
import Payment from "../models/payment";
import { checkFreeBurns } from "../functions/Magician";

export const paymentRouter = express.Router();

paymentRouter.use(express.json());

{/* Execute magician */}

paymentRouter.get("/", async (_req: Request, res: Response) => {
    try {
        checkFreeBurns()
        res.status(200).send("Starting Magician...");
    } catch (error: any) {
        res.status(500).send(error.message);
    }
});
