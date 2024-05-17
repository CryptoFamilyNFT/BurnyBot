import { ObjectId } from "mongoose";

/* @Ad model: Defines properties for an ad */
export default class Ad {
    constructor(
        public id: ObjectId, // Unique identifier for the ad
        public userId: string, // User ID associated with the ad
        public companyName: string, // Name of the company associated with the ad
        public typeOfAd: string, // Type of ad
        public adInformations: string, // Additional information about the ad
        public paymentAmount: number, // Amount paid for the ad
        public paymentTimestamp: Date, // Timestamp for when the payment occurred
        public promoExpiration: Date, // Timestamp for when the promo expires
        public isActive: boolean, // Bool of active adv
        public isNew: boolean, // Bool of new adv
    ) {}
}