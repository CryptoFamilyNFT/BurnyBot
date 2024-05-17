import express, { Request, Response } from "express";
import { ObjectId } from "mongodb";
import { collections } from "../services/database.service";
import Ad from "../models/ad";

export const adRouter = express.Router();

adRouter.use(express.json());

{/* Get all ads */}
adRouter.get("/", async (_req: Request, res: Response) => {
    try {
        const ads = await collections.ad?.find({}).toArray();
        res.status(200).send(ads);
    } catch (error: any) {
        res.status(500).send(error.message);
    }
});

{/* Get ad by ID */}

adRouter.get("/:id", async (req: Request, res: Response) => {
    const id = req?.params?.id;

    try {
        const query = { _id: new ObjectId(id) };
        const ad = (await collections.ad?.findOne(query));

        if (ad) {
            res.status(200).send(ad);
        }
    } catch (error: any) {
        res.status(404).send(`Unable to find matching document with id: ${req.params.id}`);
    }
});

{/* Get ad by active status */}

adRouter.get("/active", async (req: Request, res: Response) => {

    try {
        const query = { isActive: true };
        const ad = (await collections.ad?.findOne(query));

        if (ad) {
            res.status(200).send(ad);
        }
    } catch (error: any) {
        res.status(404).send(`Unable to find matching document with id: ${req.params.id}`);
    }
});

{/* Get ad by new status */}

adRouter.get("/new", async (req: Request, res: Response) => {

    try {
        const query = { isNew: true };
        const ad = (await collections.ad?.findOne(query));

        if (ad) {
            res.status(200).send(ad);
        }
    } catch (error: any) {
        res.status(404).send(`Unable to find matching document with id: ${req.params.id}`);
    }
});

{/* Create a new ad */}

adRouter.post("/", async (req: Request, res: Response) => {
    const adData = req.body as Ad;

    try {
        const result = await collections.ad?.insertOne(adData);
        res.status(201).send(result);
    } catch (error: any) {
        res.status(500).send(error.message);
    }
});

{/* Update an ad */}

adRouter.put("/:id", async (req: Request, res: Response) => {
    const id = req?.params?.id;
    const adData = req.body as Partial<Ad>;

    try {
        const query = { _id: new ObjectId(id) };
        const result = await collections.ad?.updateOne(query, { $set: adData });
        res.status(200).send(result);
    } catch (error: any) {
        res.status(500).send(error.message);
    }
});

{/* Delete an ad */}

adRouter.delete("/:id", async (req: Request, res: Response) => {
    const id = req?.params?.id;

    try {
        const query = { _id: new ObjectId(id) };
        const result = await collections.ad?.deleteOne(query);
        res.status(200).send(result);
    } catch (error: any) {
        res.status(500).send(error.message);
    }
});
