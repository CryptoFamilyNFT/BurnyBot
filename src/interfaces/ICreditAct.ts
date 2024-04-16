
interface ICreditActivation {
    _id: string; // Unique identifier for the free burn
    groupId: string; // Group ID associated with the free burn
    amount: number; // Amount of the free burn
    isVip: boolean; // Indicates if the group is Vip
    inProgress: boolean; // Indicates if the group is in progress
    processed: boolean; // Indicates if the group has been processed
    txHash: string; // Transaction hash associated with the free burn
    Timestamp?: Date; // Timestamp of the free burn
}

export default ICreditActivation;
