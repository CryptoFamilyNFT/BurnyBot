import express, { Request, Response } from "express";
import { ObjectId } from "mongodb";
import { collections } from "../services/database.service";
import creditActivation from "../models/creditActivation";

export const creditActivationRouter = express.Router();

creditActivationRouter.use(express.json());

{/* Get all creditActivations */}

creditActivationRouter.get("/", async (_req: Request, res: Response) => {
    try {
        const creditActivations = await collections.creditActivation?.find({}).toArray();
        res.status(200).send(creditActivations);
    } catch (error: any) {
        res.status(500).send(error.message);
    }
});

{/* Get creditActivation by TG ID */}
creditActivationRouter.get("/creditActivationId/:id", async (req: Request, res: Response) => {
    const id = req?.params?.id;

    try {
        const query = { groupId: id };
        const creditActivation = (await collections.creditActivation?.findOne(query));

        if (creditActivation) {
            res.status(200).send(creditActivation);
        } else {
            res.status(404).send(`User with ID ${id} not found.`);
        }
    } catch (error: any) {
        res.status(404).send(`Unable to find matching document with id: ${req.params.id}`);
    }
});

{/* Get creditActivation by ID */}

creditActivationRouter.get("/:id", async (req: Request, res: Response) => {
    const id = req?.params?.id;

    try {
        const query = { _id: new ObjectId(id) };
        const creditActivation = (await collections.creditActivation?.findOne(query));

        if (creditActivation) {
            res.status(200).send(creditActivation);
        }
    } catch (error: any) {
        res.status(404).send(`Unable to find matching document with id: ${req.params.id}`);
    }
});

{/* Create a new creditActivation */}

creditActivationRouter.post("/", async (req: Request, res: Response) => {
    const creditActivationData = req.body as creditActivation;

    try {
        const result = await collections.creditActivation?.insertOne(creditActivationData);
        if (result) {
            res.status(201).send(result);
        }
    } catch (error: any) {
        res.status(500).send(error.message);
    }
});

{/* Update a creditActivation */}

creditActivationRouter.put("/:id", async (req: Request, res: Response) => {
    const id = req?.params?.id;
    const creditActivationData = req.body as Partial<creditActivation>;

    try {
        const query = { _id: new ObjectId(id) };
        const update = {
            $set: creditActivationData
        };
        const result = await collections.creditActivation?.updateOne(query, update);

        if (result) {
            res.status(200).send(result);
        }
    } catch (error: any) {
        res.status(500).send(error.message);
    }
});

{/* Delete a creditActivation */}

creditActivationRouter.delete("/:id", async (req: Request, res: Response) => {
    const id = req?.params?.id;

    try {
        const query = { _id: new ObjectId(id) };
        const result = await collections.creditActivation?.deleteOne(query);

        if (result) {
            res.status(200).send(result);
        }
    } catch (error: any) {
        res.status(500).send(error.message);
    }
});


