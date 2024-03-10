import { ObjectId } from "mongodb";

/* @Attempt model: Defines properties for an attempt */
export default class Attempt {
    constructor(
        public id: ObjectId, // Unique identifier for the attempt
        public FromGroup: string, // Group from which the attempt originated
        public FromAddress: string, // Address from which the attempt originated
        public TokenAddress: string, // Token address associated with the attempt
        public AttemptType: string, // Type of attempt (Free, 1 Credit, 10 Credits)
        public isWin: boolean, // Indicates if the attempt resulted in a win
        public Timestamp: Date // Timestamp for when the attempt occurred
    ) {}
}