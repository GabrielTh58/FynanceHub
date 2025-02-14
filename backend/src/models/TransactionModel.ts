import { PrismaClient } from "@prisma/client";

export class TransactionModel {
    private prisma: PrismaClient

    constructor() {
        this.prisma = new PrismaClient();
    }

    async create(data: any) {
        
    }
}