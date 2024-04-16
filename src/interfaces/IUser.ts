export interface IUser {
    userId: string,
    Address: string,
    Credits: number, // Number of credits the user has
    VipCredits: number,
    Wins: number,
    paidProbability: [number, number], // Probability of payment for the user
    id: string
}