import { TransactionType } from "@prisma/client";
import { TransactionModel } from "../models/TransactionModel";
import { Transaction } from "../core/transactions/Transaction";
import { UserModel } from "../models/UserModel";

export default class TransactionServices {
    private transaction : TransactionModel
    private user: UserModel
    constructor(){
        this.transaction= new TransactionModel();
        this.user = new UserModel();
    }

    async create(type: TransactionType, description: string, amount: number, userId: number) {
        if (amount <= 0) {
            throw new Error("Amount must be a positive integer.");
        }

        const userExists = await this.user.findById(userId);

        if (!userExists) {
            throw new Error("Usuario nao encontrado.");
        }

        const newTransaction = {
            type,
            description,
            amount,
            userId,
            createdAt: new Date(),
        }
        return await this.transaction.create(newTransaction);   
    }

    async update(id:number, data: Partial<Transaction>){
        return await this.transaction.update(id, data);

    }

    async findAll(){
        return await this.transaction.findAll();
    }

    async findByType(type: TransactionType){
        return await this.transaction.findByType(type);
    }

    async findById(id: number){
        return await this.transaction.findById(id);
    }

    async delete(id:number){
        return await this.transaction.delete(id);
    }
}