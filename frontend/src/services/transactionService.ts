import axios from "axios";
import { Transaction } from "@/types/transactionTypes";


const API_URL = 'http://localhost:5000/transactions';

export async function createTransaction(description: string, amount: number, type: string, category: string, userId: number) {
    try {
        const response = await axios.post(API_URL, {
            description,
            amount,
            type,
            category,
            userId
        });

        return response.data;
    } catch (e) {
        console.error("Erro ao criar transação:", e);
        return null;
    }
}

export async function updateTransaction(id: number, data: Transaction) {
    try {
        const response = await axios.put(`${API_URL}/${id}`, data);
        console.log("Transação atualizada:", response.data);

        return response.data

    } catch (e) {
        console.error("Erro ao atualizar transação:", e);
        return null
    }
}

export async function deleteTransaction(id: number) { }

export async function listAllTransactions() {
    try {
        const response = await axios.get(API_URL);
        return response.data
    } catch (e) {
        console.error("Erro ao listar transações:", e);
        return false
    }
}

export async function getTransactionSummary() {
    const transaction = await listAllTransactions();
    if (!transaction) return { entrada: 0, saida: 0, total: 0 };

    const summary = transaction.reduce((acc: any, transaction: Transaction) => {
        if (transaction.type === 'INCOME') {
            acc.income += transaction.amount;
        } else {
            acc.expense += transaction.amount;
        }

        acc.total = acc.income - acc.expense;

        return acc;
    }, { income: 0, expense: 0, total: 0 })

    console.log(summary);
    return summary
    
}

export async function getTransactionHistory() {
    const transactions = await listAllTransactions();
    if (!transactions || transactions.length === 0) return [];

    return transactions
        .slice()
        .sort((a: Transaction, b: Transaction) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
        .slice(0, 4);
}
