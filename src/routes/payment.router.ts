import express, { Request, Response } from "express";
import { ObjectId } from "mongodb";
import { collections } from "../services/database.service";
import Payment from "../models/payment";

export const paymentRouter = express.Router();

paymentRouter.use(express.json());

{/* Get all payments */}

paymentRouter.get("/", async (_req: Request, res: Response) => {
    try {
        const payments = await collections.payment?.find({}).toArray();
        res.status(200).send(payments);
    } catch (error: any) {
        res.status(500).send(error.message);
    }
});

{/* Get payment by ID */}
paymentRouter.get("/:id", async (req: Request, res: Response) => {
    const id = req?.params?.id;

    try {
        const query = { _id: new ObjectId(id) };
        const payment = (await collections.payment?.findOne(query));

        if (payment) {
            res.status(200).send(payment);
        }
    } catch (error: any) {
        res.status(404).send(`Unable to find matching document with id: ${req.params.id}`);
    }
});

{/* Create a new payment */}
paymentRouter.post("/", async (req: Request, res: Response) => {
    const paymentData = req.body as Payment;

    try {
        const result = await collections.payment?.insertOne(paymentData);
        res.status(201).send(result);
    } catch (error: any) {
        res.status(500).send(error.message);
    }
});

{/* Update a payment */}
paymentRouter.put("/:id", async (req: Request, res: Response) => {
    const id = req?.params?.id;
    const paymentData = req.body as Payment;

    try {
        const query = { _id: new ObjectId(id) };
        const result = await collections.payment?.replaceOne(query, paymentData);
        res.status(200).send(result);
    } catch (error: any) {
        res.status(500).send(error.message);
    }
});

{/* Delete a payment */}
paymentRouter.delete("/:id", async (req: Request, res: Response) => {
    const id = req?.params?.id;

    try {
        const query = { _id: new ObjectId(id) };
        const result = await collections.payment?.deleteOne(query);
        res.status(200).send(result);
    } catch (error: any) {
        res.status(500).send(error.message);
    }
});
