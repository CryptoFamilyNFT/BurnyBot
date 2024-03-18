import { ObjectId } from "mongodb";

/* @Payment model: Defines properties for a payment */
export default class Payment {
    constructor(
        public id: ObjectId, // Unique identifier for the payment
        public addressFrom: string, // Address from which the payment originated
        public userId: string, // Address from which the payment originated
        public Amount: number, // Amount of the payment
        public creditcalculated: number, // Calculated credits
        public Timestamp: Date, // Timestamp for when the payment occurred
        public BalanceUpdated: boolean // Indicates if the balance is updated
    ) {}
}