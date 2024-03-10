import { ObjectId } from "mongodb";

/* @User model: Defines properties for a user */
export default class User {
    constructor(
        public userId: string, // Unique identifier for the user
        public Address: string, // User's address
        public Credits: number, // Number of credits the user has
        public VipCredits: number, // Number of VIP credits the user has
        public Wins: number, // Number of wins the user has
        public paidProbability: string, // Probability of payment for the user
        public id?: ObjectId // Optional MongoDB ObjectId
    ) {}
}

