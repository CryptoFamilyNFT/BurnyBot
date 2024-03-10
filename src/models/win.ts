import { ObjectId } from "mongodb";

/* @Win model: Defines properties for a win */
export default class Win {
    constructor(
        public id: ObjectId, // Unique identifier for the win
        public FromAddress: string, // Address from which the win originated
        public TokenAddress: string, // Token address associated with the win
        public ClaimOrBurn: boolean, // Indicates whether the win is a claim or burn
        public FromFreeAttempt: boolean, // Indicates if the win is from a free attempt
        public Timestamp: Date // Timestamp for when the win occurred
    ) {}
}