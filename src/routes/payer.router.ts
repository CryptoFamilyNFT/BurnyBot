import express, { Request, Response } from "express";
import { payerWin } from "../functions/PayerWin";

export const payer_ = express.Router();

payer_.use(express.json());

{/* Execute magician */}

payer_.get("/", async (_req: Request, res: Response) => {
    try {
        payerWin()
        res.status(200).send("Starting Magician...");
    } catch (error: any) {
        res.status(500).send(error.message);
    }
});
