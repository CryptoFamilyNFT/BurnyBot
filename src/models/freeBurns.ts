import { ObjectId } from "mongodb";

/* @FreeBurns model: Defines properties for a free burn */
export default class FreeBurns {
    constructor(
        public id: ObjectId, // Unique identifier for the free burn
        public groupId: string, // Group ID associated with the free burn
        public amount: number, // Amount of the free burn
        public inProgress: boolean, // Indicates if the free burn is in progress
        public processed: boolean, // Indicates if the free burn has been processed
        public txHash: string // Transaction hash associated with the free burn
    ) {}
}

