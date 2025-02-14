import { PrismaClient, TransactionType } from "@prisma/client";
import { Transaction } from "../core/transactions/Transaction";

export class TransactionModel {
    private prisma: PrismaClient

    constructor() {
        this.prisma = new PrismaClient();
    }

    async create(data: Omit<Transaction, "id">): Promise<Transaction> {
        console.log(data);
        
        return await this.prisma.transaction.create({
            data: {
                amount: data.amount,
                type: data.type,
                description: data.description,
                userId: data.userId
            }
        })
    }

    async findAll(): Promise<Transaction[]> {
        return await this.prisma.transaction.findMany();
    }

    async findByType(type: TransactionType): Promise<Transaction[]> {
        return await this.prisma.transaction.findMany({
            where: { type }
        })
    }

    async findById(id: number): Promise<Transaction | null> {
        return await this.prisma.transaction.findUnique({
            where: { id }
        })
    }

    async update(id: number, data: Partial<Transaction>): Promise<Transaction> {
        return await this.prisma.transaction.update({
            where: { id },
            data: {
                ...data
            }
        })
    }
    async delete(id: number): Promise<Transaction> {
        return await this.prisma.transaction.delete({
            where: { id }
        })
    }
}