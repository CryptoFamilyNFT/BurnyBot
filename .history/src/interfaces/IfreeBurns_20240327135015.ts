/**
 * @interface IfreeBurns
 * @description Interface for free burns structure
 * @param {string} _id - Unique identifier for the free burn
 * @param {string} groupId - Group ID associated with the free burn
 * @param {number} amount - Amount of the free burn
 * @param {boolean} inProgress - Indicates if the free burn is in progress
 * @param {boolean} processed - Indicates if the free burn has been processed
 * @param {string} txHash - Transaction hash associated with the free burn
 */
export interface IfreeBurns {
    _id: string;
    groupId: string;
    amount: number;
    inProgress: boolean;
    processed: boolean;
    txHash: string;
}