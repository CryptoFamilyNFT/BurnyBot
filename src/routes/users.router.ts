import express, { Request, Response } from "express";
import { ObjectId } from "mongodb";
import { collections } from "../services/database.service";
import User from "../models/user";

export const userRouter = express.Router();

userRouter.use(express.json());

{/* Get ALL user */}
userRouter.get("/", async (_req: Request, res: Response) => {
    try {
        const users = await collections.users?.find({}).toArray() as User[];
        res.status(200).send(users);
    } catch (error: any) {
        res
    }

});


userRouter.get("/:id", async (req: Request, res: Response) => {
    const id = req?.params?.id;

    try {
        const query = { userId: id };
        const game = (await collections.users?.findOne(query));

        if (game) {
            res.status(200).send(game);
        } else {
            res.status(500).send('NOT FOUND');
        }
    } catch (error: any) {
        res.status(404).send(`Unable to find matching document with id: ${req.params.id}`);
    }
});


{/* Get user by address */}
userRouter.get("/address:id", async (req: Request, res: Response) => {
    const id = req?.params?.id;
    try {
        const query = { Address: id };
        const user = await collections.users?.findOne(query);
        if (user) {
            res.status(200).send(user);
        } else {
            res.status(404).send(`User with ID ${query.Address} not found.`);
        }
    } catch (error: any) {
        res.status(500).send(error.message);
    }
});

{/* Get user by telegram ID */}
userRouter.get("/telegramId", async (req: Request, res: Response) => {
    const userData = req.body as User;
    try {
        const query = { userId: userData.userId };
        const user = await collections.users?.findOne(query);
        if (user) {
            res.status(200).send(user);
        } else {
            res.status(404).send(`User with ID ${userData.userId} not found.`);
        }
    } catch (error: any) {
        res.status(500).send(error.message);
    }
});

{/* Create new user */}
userRouter.post("/", async (req: Request, res: Response) => {
    const userData = req.body as Partial<User>;
    try {
        const result = await collections.users?.insertOne(userData);
        res.status(201).send(result?.insertedId);
    } catch (error: any) {
        console.log(error)
        res.status(500).send(error.message);
    }
});

{/* Update user */}
userRouter.put("/:id", async (req: Request, res: Response) => {
    const id = req.params.id;
    const updatedData = req.body as Partial<User>;

    try {
        const result = await collections.users?.updateOne({ userId: id }, { $set: updatedData });
        res.status(200).send(result);
    } catch (error: any) {
        res.status(500).send(error.message);
    }
});

{/* Delete user */}
userRouter.delete("/:id", async (req: Request, res: Response) => {
    const id = req.params.id;
    try {
        const result = await collections.users?.deleteOne({ _id: new ObjectId(id) });
        res.status(200).send(result);
    } catch (error: any) {
        res.status(500).send(error.message);
    }
});
