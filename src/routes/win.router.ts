import express, { Request, Response } from "express";
import { ObjectId } from "mongodb";
import { collections } from "../services/database.service";
import Win from "../models/win";

export const winRouter = express.Router();

winRouter.use(express.json());

{/* Get all wins */}
winRouter.get("/win", async (_req: Request, res: Response) => {
    try {
        const wins = await collections.win?.find({}).toArray();
        res.status(200).send(wins);
    } catch (error: any) {
        res.status(500).send(error.message);
    }
});

{/* Get win by ID */}
winRouter.get("/win/:id", async (req: Request, res: Response) => {
    const id = req?.params?.id;

    try {
        const query = { _id: new ObjectId(id) };
        const win = (await collections.win?.findOne(query));

        if (win) {
            res.status(200).send(win);
        }
    } catch (error: any) {
        res.status(404).send(`Unable to find matching document with id: ${req.params.id}`);
    }
});

{/* Create a new win */}
winRouter.post("/win", async (req: Request, res: Response) => {
    const winData = req.body as Win;

    try {
        const result = await collections.win?.insertOne(winData);
        res.status(201).send(result);
    } catch (error: any) {
        res.status(500).send(error.message);
    }
});

{/* Update a win */}
winRouter.put("/win/:id", async (req: Request, res: Response) => {
    const id = req?.params?.id;
    const winData = req.body as Win;

    try {
        const query = { _id: new ObjectId(id) };
        const result = await collections.win?.replaceOne(query, winData);
        res.status(200).send(result);
    } catch (error: any) {
        res.status(500).send(error.message);
    }
});

{/* Delete a win */}
winRouter.delete("/win/:id", async (req: Request, res: Response) => {
    const id = req?.params?.id;

    try {
        const query = { _id: new ObjectId(id) };
        const result = await collections.win?.deleteOne(query);
        res.status(200).send(result);
    } catch (error: any) {
        res.status(500).send(error.message);
    }
});
