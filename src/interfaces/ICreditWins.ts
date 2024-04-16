
/**
 * @class CreditWins 
 * @description Defines properties for a credit win
 */
export default class ICreditWins {
    constructor(
        public id: string, // Unique identifier for the free burn
        public userId: string, // Group ID associated with the free burn
        public amount: number, // Amount of the free burn
        public isVip: boolean, // Indicates if the user is Vip
        public inProgress: boolean, // Indicates if the user is in progress
        public processed: boolean, // Indicates if the user has been processed
        public txHash: string, // Transaction hash associated with the free burn
        public Timestamp?: Date // Timestamp of the free burn
    ) {}
}

