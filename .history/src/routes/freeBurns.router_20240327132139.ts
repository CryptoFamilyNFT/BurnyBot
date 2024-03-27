import express, { Request, Response } from "express";
import { ObjectId } from "mongodb";
import { collections } from "../services/database.service";
import freeBurns from "../models/freeBurns";

export const freeBurnsRouter = express.Router();

freeBurnsRouter.use(express.json());

{/* Get all freeBurnss */}

freeBurnsRouter.get("/", async (_req: Request, res: Response) => {
    try {
        const freeBurnss = await collections.freeBurns?.find({}).toArray();
        res.status(200).send(freeBurnss);
    } catch (error: any) {
        res.status(500).send(error.message);
    }
});

{/* Get freeBurns by ID */}
freeBurnsRouter.get("/:id", async (req: Request, res: Response) => {
    const id = req?.params?.id;

    try {
        const query = { _id: new ObjectId(id) };
        const freeBurns = (await collections.freeBurns?.findOne(query));

        if (freeBurns) {
            res.status(200).send(freeBurns);
        }
    } catch (error: any) {
        res.status(404).send(`Unable to find matching document with id: ${req.params.id}`);
    }
});

{/* Get freeBurns from userId */}

freeBurnsRouter.get("/groupId/:id", async (req: Request, res: Response) => {
    const id = req?.params?.id

    try {
        const query = { groupId: id  };
        const freeBurns = (await collections.freeBurns?.findOne(query));

        if (freeBurns) {
            res.status(200).send(freeBurns);
        }
    } catch (error: any) {
        res.status(404).send(`Unable to find matching document with id: ${id}`);
    }
});

{/* Create a new freeBurns */}
freeBurnsRouter.post("/", async (req: Request, res: Response) => {
    const freeBurnsData = req.body as freeBurns;

    try {
        const result = await collections.freeBurns?.insertOne(freeBurnsData);
        res.status(201).send(result);
    } catch (error: any) {
        res.status(500).send(error.message);
    }
});

{/* Update a freeBurns */}
freeBurnsRouter.put("/:id", async (req: Request, res: Response) => {
    const id = req?.params?.id;
    const freeBurnsData = req.body as Partial<freeBurns>;

    try {
        const query = { _id: new ObjectId(id) };
        const result = await collections.freeBurns?.replaceOne(query, freeBurnsData);
        res.status(200).send(result);
    } catch (error: any) {
        res.status(500).send(error.message);
    }
});

{/* Delete a freeBurns */}
freeBurnsRouter.delete("/:id", async (req: Request, res: Response) => {
    const id = req?.params?.id;

    try {
        const query = { _id: new ObjectId(id) };
        const result = await collections.freeBurns?.deleteOne(query);
        res.status(200).send(result);
    } catch (error: any) {
        res.status(500).send(error.message);
    }
});
