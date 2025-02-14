export class Transaction {
    id: number;
    amount: number;
    type: string;
    description: string;
    createdAt: Date;

    constructor(id: number, amount: number, type: string, description: string, createdAt: Date) {
        this.id = id;
        this.amount = amount;
        this.type = type;
        this.description = description;
        this.createdAt = createdAt;
    }
}