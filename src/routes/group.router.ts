import express, { Request, Response } from "express";
import { ObjectId } from "mongodb";
import { collections } from "../services/database.service";
import Group from "../models/group";

export const groupRouter = express.Router();

groupRouter.use(express.json());

{/* Get all groups */}

groupRouter.get("/", async (_req: Request, res: Response) => {
    try {
        const groups = await collections.group?.find({}).toArray();
        res.status(200).send(groups);
    } catch (error: any) {
        res.status(500).send(error.message);
    }
});

{/* Get group by TG ID */}
groupRouter.get("/telegramId", async (req: Request, res: Response) => {
    const userData = req.body as Group;

    try {
        const query = { groupId: userData.groupId };
        const group = (await collections.group?.findOne(query));

        if (group) {
            res.status(200).send(group);
        }
    } catch (error: any) {
        res.status(404).send(`Unable to find matching document with id: ${req.params.id}`);
    }
});

{/* Get group by ID */}

groupRouter.get("/:id", async (req: Request, res: Response) => {
    const id = req?.params?.id;

    try {
        const query = { _id: new ObjectId(id) };
        const group = (await collections.group?.findOne(query));

        if (group) {
            res.status(200).send(group);
        }
    } catch (error: any) {
        res.status(404).send(`Unable to find matching document with id: ${req.params.id}`);
    }
});

{/* Create a new group */}

groupRouter.post("/", async (req: Request, res: Response) => {
    const groupData = req.body as Group;

    try {
        const result = await collections.group?.insertOne(groupData);
        if (result) {
            res.status(201).send(result);
        }
    } catch (error: any) {
        res.status(500).send(error.message);
    }
});

{/* Update a group */}

groupRouter.put("/:id", async (req: Request, res: Response) => {
    const id = req?.params?.id;
    const groupData = req.body as Group;

    try {
        const query = { _id: new ObjectId(id) };
        const update = {
            $set: {
                groupId: groupData.groupId,
                tokenAddress: groupData.tokenAddress,
                poolType: groupData.poolType,
                tokenBoughtBurned: groupData.tokenBoughtBurned,
                Wins: groupData.Wins,
                Loss: groupData.Loss,
                AllAttempts: groupData.AllAttempts
            }
        };
        const result = await collections.group?.updateOne(query, update);

        if (result) {
            res.status(200).send(result);
        }
    } catch (error: any) {
        res.status(500).send(error.message);
    }
});

{/* Delete a group */}

groupRouter.delete("/:id", async (req: Request, res: Response) => {
    const id = req?.params?.id;

    try {
        const query = { _id: new ObjectId(id) };
        const result = await collections.group?.deleteOne(query);

        if (result) {
            res.status(200).send(result);
        }
    } catch (error: any) {
        res.status(500).send(error.message);
    }
});


