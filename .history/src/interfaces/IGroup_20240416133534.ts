export interface IGroup {
    _id: string;
    groupId: string;
    projectName: string;
    pairAddress: string;
    tokenAddress: string;
    poolType: string;
    tokenBoughtBurned: number;
    Wins: number;
    Loss: number;
    AllAttempts: number;
    joinTimestamp: number;
}
