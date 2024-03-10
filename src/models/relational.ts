//todo: { type: Schema.Types.ObjectId, ref: 'Todo' }

import { ObjectId } from "mongodb";

/* @Payment model: Defines properties for a payment */ 
export default class Relational {
    constructor(
        public id: ObjectId, // Unique identifier for the payment
        public tokenAddress: string, // tokenAddress
        public NextFreeAttempt: number, // Next Free Attempt for the user
        public lastGroupIdUse: string, // lastGroupIdUse
    ) {}
}