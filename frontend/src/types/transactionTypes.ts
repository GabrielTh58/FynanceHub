export interface Transaction {
    id: number;
    description: string;
    amount: number;
    type: string;
    category: string;
    createdAt: Date;
    userId: number;
}