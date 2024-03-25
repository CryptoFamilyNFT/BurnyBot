import express, { Request, Response } from "express";
import { ObjectId } from "mongodb";
import { collections } from "../services/database.service";
import Relational from "../models/relational";

export const relationalRouter = express.Router();

relationalRouter.use(express.json());

{/* Get all relationals */}

relationalRouter.get("/", async (_req: Request, res: Response) => {
    try {
        const relationals = await collections.relational?.find({}).toArray();
        res.status(200).send(relationals);
    } catch (error: any) {
        res.status(500).send(error.message);
    }
});

{/* Get relational by ID */}

relationalRouter.get("/:id", async (req: Request, res: Response) => {
    const id = req?.params?.id;

    try {
        const query = { _id: new ObjectId(id) };
        const relational = (await collections.relational?.findOne(query));

        if (relational) {
            res.status(200).send(relational);
        }
    } catch (error: any) {
        res.status(404).send(`Unable to find matching document with id: ${req.params.id}`);
    }
});

{/* Get relational by tokenAddress */}

relationalRouter.get("/0x/:id", async (req: Request, res: Response) => {
    const id = req?.params?.id; // tokenAddress

    try {
        const query = { tokenAddress: id};
        const relational = (await collections.relational?.findOne(query));

        if (relational) {
            res.status(200).send(relational);
        } else {
            res.status(400).send(`Maybe no here... ${req.params.id}`);
        }
    } catch (error: any) {
        res.status(404).send(`Unable to find matching document with id: ${req.params.id}`);
    }
});

{/* Create a new relational */}

relationalRouter.post("/", async (req: Request, res: Response) => {
    const relationalData = req.body as Relational;

    try {
        const result = await collections.relational?.insertOne(relationalData);
        res.status(201).send(result);
    } catch (error: any) {
        res.status(500).send(error.message);
    }
});

{/* Update a relational */}

relationalRouter.put("/:id", async (req: Request, res: Response) => {
    const id = req?.params?.id;
    const relationalData = req.body as Partial<Relational>;

    try {
        const query = { _id: new ObjectId(id) };
        const result = await collections.relational?.replaceOne(query, relationalData);
        res.status(200).send(result);
    } catch (error: any) {
        res.status(500).send(error.message);
    }
});

{/* Update a relational by 0x */}

relationalRouter.put("/0x/:id", async (req: Request, res: Response) => {
    const id = req?.params?.id;
    const relationalData = req.body as Partial<Relational>;

    try {
        const query = { tokenAddress: id };
        const result = await collections.relational?.replaceOne(query, relationalData);
        res.status(200).send(result);
    } catch (error: any) {
        res.status(500).send(error.message);
    }
});

{/* Delete a relational */}

relationalRouter.delete("/:id", async (req: Request, res: Response) => {
    const id = req?.params?.id;

    try {
        const query = { _id: new ObjectId(id) };
        const result = await collections.relational?.deleteOne(query);
        res.status(200).send(result);
    } catch (error: any) {
        res.status(500).send(error.message);
    }
});
