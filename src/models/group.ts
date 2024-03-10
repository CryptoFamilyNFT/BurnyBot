import { ObjectId } from "mongodb";

/* @Group model: Defines properties for a group */
export default class Group {
    constructor(
        public id: ObjectId, // Unique identifier for the group
        public groupId: string, // Group ID
        public tokenAddress: string, // Token address associated with the group
        public poolType: string, // Type of pool associated with the group
        public tokenBoughtBurned: number, // Number of tokens bought and burned
        public Wins: number, // Number of wins associated with the group
        public Loss: number, // Number of losses associated with the group
        public AllAttempts: number, // Total number of attempts made by the group
    ) {}
}