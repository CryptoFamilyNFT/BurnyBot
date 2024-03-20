import express, { Request, Response } from "express";
import { ObjectId } from "mongodb";
import { collections } from "../services/database.service";
import Attempt from "../models/attempt";

export const attemptRouter = express.Router();

attemptRouter.use(express.json());

{/* Get all attempts */}
attemptRouter.get("/attempt", async (_req: Request, res: Response) => {
    try {
        const attempts = await collections.attempt?.find({}).toArray();
        res.status(200).send(attempts);
    } catch (error: any) {
        res.status(500).send(error.message);
    }
});

{/* Get attempt by ID */}

attemptRouter.get("/attempt/:id", async (req: Request, res: Response) => {
    const id = req?.params?.id;

    try {
        const query = { _id: new ObjectId(id) };
        const attempt = (await collections.attempt?.findOne(query));

        if (attempt) {
            res.status(200).send(attempt);
        }
    } catch (error: any) {
        res.status(404).send(`Unable to find matching document with id: ${req.params.id}`);
    }
});

{/* Create a new attempt */}

attemptRouter.post("/attempt", async (req: Request, res: Response) => {
    const attemptData = req.body as Attempt;

    try {
        const result = await collections.attempt?.insertOne(attemptData);
        res.status(201).send(result);
    } catch (error: any) {
        res.status(500).send(error.message);
    }
});

{/* Update an attempt */}

attemptRouter.put("/attempt/:id", async (req: Request, res: Response) => {
    const id = req?.params?.id;
    const attemptData = req.body as Partial<Attempt>;

    try {
        const query = { _id: new ObjectId(id) };
        const result = await collections.attempt?.replaceOne(query, attemptData);
        res.status(200).send(result);
    } catch (error: any) {
        res.status(500).send(error.message);
    }
});

{/* Delete an attempt */}

attemptRouter.delete("/attempt/:id", async (req: Request, res: Response) => {
    const id = req?.params?.id;

    try {
        const query = { _id: new ObjectId(id) };
        const result = await collections.attempt?.deleteOne(query);
        res.status(200).send(result);
    } catch (error: any) {
        res.status(500).send(error.message);
    }
});
