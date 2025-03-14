export interface Transaction {
    date: string | number | Date;
    id: number;
    description: string;
    amount: number;
    type: string;
    category: string;
    createdAt: Date;
    userId: number;
}