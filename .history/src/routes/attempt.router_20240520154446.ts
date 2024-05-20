import express, { Request, Response } from "express";
import { ObjectId } from "mongodb";
import { collections } from "../services/database.service";
import Attempt from "../models/attempt";

export const attemptRouter = express.Router();

attemptRouter.use(express.json());

{/* Get all attempts */}
attemptRouter.get("/", async (_req: Request, res: Response) => {
    try {
        const attempts = await collections.attempt?.find({}).toArray();
        res.status(200).send(attempts);
    } catch (error: any) {
        res.status(500).send(error.message);
    }
});

{/* Get attempt by ID */}
attemptRouter.get("/:id", async (req: Request, res: Response) => {
    const id = req?.params?.id;

    try {
        const query = { _id: new ObjectId(id) };
        const attempt = await collections.attempt?.findOne(query);

        if (attempt) {
            res.status(200).send(attempt);
        } else {
            res.status(404).send(`Unable to find matching document with id: ${req.params.id}`);
        }
    } catch (error: any) {
        res.status(500).send(error.message);
    }
});

{/* Get attempt by Type */}
attemptRouter.get("/type/:id", async (req: Request, res: Response) => {
    const id = req?.params?.id;

    try {
        const query = { AttemptType: id };
        const attempt = await collections.attempt?.findOne(query);

        if (attempt) {
            res.status(200).send(attempt);
        } else {
            res.status(404).send(`Unable to find matching document with type: ${req.params.id}`);
        }
    } catch (error: any) {
        res.status(500).send(error.message);
    }
});

{/* Get attempt by timestamp */}
attemptRouter.get("/timestamp/:id", async (req: Request, res: Response) => {
    const id = req?.params?.id;

    try {
        const query = { Timestamp: id };
        const attempt = await collections.attempt?.findOne(query);

        if (attempt) {
            res.status(200).send(attempt);
        } else {
            res.status(404).send(`Unable to find matching document with timestamp: ${req.params.id}`);
        }
    } catch (error: any) {
        res.status(500).send(error.message);
    }
});

{/* Get attempts by type and timestamp */}
attemptRouter.get("/type/:type/timestamp/:timestamp", async (req: Request, res: Response) => {
    const { type, timestamp } = req.params;

    try {
        const query = { AttemptType: type, Timestamp: timestamp };
        const attempts = await collections.attempt?.find(query).toArray();

        if (attempts && attempts.length > 0) {
            res.status(200).send(attempts);
        } else {
            res.status(404).send(`Unable to find matching documents with type: ${type} and timestamp: ${timestamp}`);
        }
    } catch (error: any) {
        res.status(500).send(error.message);
    }
});

{/* Create a new attempt */}
attemptRouter.post("/", async (req: Request, res: Response) => {
    const attemptData = req.body as Attempt;

    try {
        const result = await collections.attempt?.insertOne(attemptData);
        res.status(201).send(result);
    } catch (error: any) {
        res.status(500).send(error.message);
    }
});

{/* Update an attempt */}
attemptRouter.put("/:id", async (req: Request, res: Response) => {
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
attemptRouter.delete("/:id", async (req: Request, res: Response) => {
    const id = req?.params?.id;

    try {
        const query = { _id: new ObjectId(id) };
        const result = await collections.attempt?.deleteOne(query);
        res.status(200).send(result);
    } catch (error: any) {
        res.status(500).send(error.message);
    }
});
