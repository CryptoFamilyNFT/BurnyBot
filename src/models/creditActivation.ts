import { ObjectId } from "mongodb";

/* @CreditActivation model: Defines properties for a free burn */
export default class CreditActivation {
    constructor(
        public id: ObjectId, // Unique identifier for the free burn
        public groupId: string, // Group ID associated with the free burn
        public amount: number, // Amount of the free burn
        public isVip: boolean, // Indicates if the group is Vip
        public inProgress: boolean, // Indicates if the group is in progress
        public processed: boolean, // Indicates if the group has been processed
        public txHash: string, // Transaction hash associated with the free burn
        public Timestamp?: Date // Timestamp of the free burn
    ) {}
}

