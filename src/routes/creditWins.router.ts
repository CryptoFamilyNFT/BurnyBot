import express, { Request, Response } from "express";
import { ObjectId } from "mongodb";
import { collections } from "../services/database.service";
import creditWins from "../models/creditWins";

export const creditWinsRouter = express.Router();

creditWinsRouter.use(express.json());

{/* Get all creditWinss */}

creditWinsRouter.get("/", async (_req: Request, res: Response) => {
    try {
        const creditWinss = await collections.creditWins?.find({}).toArray();
        res.status(200).send(creditWinss);
    } catch (error: any) {
        res.status(500).send(error.message);
    }
});

{/* Get creditWins by TG ID */}
creditWinsRouter.get("/creditWinsId/:id", async (req: Request, res: Response) => {
    const id = req?.params?.id;

    try {
        const query = { userId: id };
        const creditWins = (await collections.creditWins?.findOne(query));

        if (creditWins) {
            res.status(200).send(creditWins);
        } else {
            res.status(404).send(`User with ID ${id} not found.`);
        }
    } catch (error: any) {
        res.status(404).send(`Unable to find matching document with id: ${req.params.id}`);
    }
});

{/* Get creditWins by ID */}

creditWinsRouter.get("/:id", async (req: Request, res: Response) => {
    const id = req?.params?.id;

    try {
        const query = { _id: new ObjectId(id) };
        const creditWins = (await collections.creditWins?.findOne(query));

        if (creditWins) {
            res.status(200).send(creditWins);
        }
    } catch (error: any) {
        res.status(404).send(`Unable to find matching document with id: ${req.params.id}`);
    }
});

{/* Create a new creditWins */}

creditWinsRouter.post("/", async (req: Request, res: Response) => {
    const creditWinsData = req.body as creditWins;

    try {
        const result = await collections.creditWins?.insertOne(creditWinsData);
        if (result) {
            res.status(201).send(result);
        }
    } catch (error: any) {
        res.status(500).send(error.message);
    }
});

{/* Update a creditWins */}

creditWinsRouter.put("/:id", async (req: Request, res: Response) => {
    const id = req?.params?.id;
    const creditWinsData = req.body as Partial<creditWins>;

    try {
        const query = { _id: new ObjectId(id) };
        const update = {
            $set: creditWinsData
        };
        const result = await collections.creditWins?.updateOne(query, update);

        if (result) {
            res.status(200).send(result);
        }
    } catch (error: any) {
        res.status(500).send(error.message);
    }
});

{/* Delete a creditWins */}

creditWinsRouter.delete("/:id", async (req: Request, res: Response) => {
    const id = req?.params?.id;

    try {
        const query = { _id: new ObjectId(id) };
        const result = await collections.creditWins?.deleteOne(query);

        if (result) {
            res.status(200).send(result);
        }
    } catch (error: any) {
        res.status(500).send(error.message);
    }
});


