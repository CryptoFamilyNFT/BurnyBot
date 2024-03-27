import * as mongoDB from "mongodb";
import * as dotenv from "dotenv";
import User from "../models/user";
import Group from "../models/group";
import Ad from "../models/ad";
import Payment from "../models/payment";
import Win from "../models/win";
import Attempt from "../models/attempt";
import Relational from "../models/relational";
import FreeBurns from "../models/freeBurns";
import { env } from "process";

export const collections: {
    attempt?: mongoDB.Collection<Attempt | Partial<Attempt>>;
    ad?: mongoDB.Collection<Ad | Partial<Ad>>;
    group?: mongoDB.Collection<Group | Partial<Group>>;
    payment?: mongoDB.Collection<Payment | Partial<Payment>>;
    relational?: mongoDB.Collection<Relational | Partial<Relational>>;
    users?: mongoDB.Collection<User | Partial<User>>
    win?: mongoDB.Collection<Win | Partial<Win>>;
    freeBurns?: mongoDB.Collection<FreeBurns | Partial<FreeBurns>>;
} = {}


export async function connectToDatabase() {
    dotenv.config();

    const client: mongoDB.MongoClient = new mongoDB.MongoClient(env.DB_CONN_STRING || 'mongodb+srv://burnyerc20:E7G9PBm3KcETkMMP@burny.faallsm.mongodb.net/?retryWrites=true&w=majority&appName=Burny');

    await client.connect();

    const db: mongoDB.Db = client.db('burny');

    const BurnyCollectionUsers = db.collection<User | Partial<User>>('user');
    const BurnyCollectionGroup = db.collection<Group | Partial<Group>>('group');
    const BurnyCollectionPayment = db.collection<Payment | Partial<Payment>>('payment');
    const BurnyCollectionRelation = db.collection<Relational | Partial<Relational>>('relational');
    const BurnyCollectionAd = db.collection<Ad | Partial<Ad>>('ad');
    const BurnyCollectionAttempt = db.collection<Attempt | Partial<Attempt>>('attempt');
    const BurnyCollectionFreeBurns = db.collection<Attempt | Partial<Attempt>>('freeBurns');

    collections.users = BurnyCollectionUsers;
    collections.group = BurnyCollectionGroup;
    collections.payment = BurnyCollectionPayment;
    collections.relational = BurnyCollectionRelation;
    collections.ad = BurnyCollectionAd;
    collections.attempt = BurnyCollectionAttempt;
    collections.freeBurns = BurnyCollectionFreeBurns;

    console.log(`Successfully connected to database: ${db.databaseName} and collections: 
    ${BurnyCollectionUsers.collectionName}
    ${BurnyCollectionGroup.collectionName}
    ${BurnyCollectionPayment.collectionName}
    ${BurnyCollectionRelation.collectionName}
    ${BurnyCollectionAd.collectionName}
    ${BurnyCollectionAttempt.collectionName}
    ${BurnyCollectionFreeBurns.collectionName}
    `);
}