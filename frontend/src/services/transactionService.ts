import axios from "axios";
import Cookies from "js-cookie";
import { Transaction } from "@/types/transactionTypes";

const API_URL = 'http://localhost:5000/transactions';

export async function createTransaction(
    description: string, 
    amount: number, 
    type: string, 
    category: string
) {
    try {
        const userId = Cookies.get("userId");
        if (!userId) throw new Error("Usuário não autenticado");

        const response = await axios.post(API_URL, {
            description,
            amount,
            type,
            category,
            userId: Number(userId)
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

export async function listAllTransactions() {
    try {
        const userId = Cookies.get("userId");
        if (!userId) throw new Error("Usuário não autenticado");

        const response = await axios.get(`${API_URL}?userId=${userId}`); // Filtra por usuário
        return response.data;
    } catch (e) {
        console.error("Erro ao listar transações:", e);
        return [];
    }
}

export async function getTransactionSummary() {
    const transactions = await listAllTransactions()

    if (!transactions || transactions.length === 0) {
        return { 
            income: 0, 
            expense: 0, 
            total: 0, 
            percentageIncome: 0, 
            percentageExpense: 0, 
            percentageTotal: 0 
        }
    }

    const today = new Date();
    const firstDayOfCurrentMonth = new Date(today.getFullYear(), today.getMonth(), 1)
    const firstDayOfPreviousMonth = new Date(today.getFullYear(), today.getMonth() - 1, 1)
    const lastDayOfPreviousMonth = new Date(today.getFullYear(), today.getMonth(), 0)

    // Filtrar transações do mês atual
    const currentMonthTransactions = transactions.filter((transaction: Transaction) => {
        const transactionDate = new Date(transaction.createdAt);
        return transactionDate >= firstDayOfCurrentMonth;
    })

    // Filtrar transações do mês anterior
    const previousMonthTransactions = transactions.filter((transaction: Transaction) => {
        const transactionDate = new Date(transaction.createdAt);
        return transactionDate >= firstDayOfPreviousMonth && transactionDate <= lastDayOfPreviousMonth;
    })

    // Função para calcular os totais de um conjunto de transações
    function calculateTotals(transactions: Transaction[]) {
        return transactions.reduce(
            (acc: any, transaction: Transaction) => {
                if (transaction.type === 'INCOME') {
                    acc.income += transaction.amount;
                } else if (transaction.type === 'EXPENSE') {
                    acc.expense += transaction.amount;
                }
                acc.total = acc.income - acc.expense;
                return acc;
            },
            { income: 0, expense: 0, total: 0 }
        );
    }

    // Totais do mês atual e do mês anterior
    const currentSummary = calculateTotals(currentMonthTransactions);
    const previousSummary = calculateTotals(previousMonthTransactions);

    // Função para calcular a variação percentual
    function calculatePercentageChange(previous: number, current: number) {
        return previous === 0 ? (current === 0 ? 0 : 100) : ((current - previous) / previous) * 100;
    }

    const percentageIncome = calculatePercentageChange(previousSummary.income, currentSummary.income);
    const percentageExpense = calculatePercentageChange(previousSummary.expense, currentSummary.expense);
    const percentageTotal = calculatePercentageChange(previousSummary.total, currentSummary.total);

    return {
        ...currentSummary,
        percentageIncome,
        percentageExpense,
        percentageTotal
    };
}

export async function getTransactionHistory() {
    const transactions = await listAllTransactions();
    if (!transactions || transactions.length === 0) return [];

    return transactions
        .slice()
        .sort((a: Transaction, b: Transaction) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
        .slice(0, 4);
}

export async function deleteTransaction(id: number) {
    try {
        const response = await axios.delete(`${API_URL}/${id}`);

        return response.data
    } catch (e: any) {
        if (axios.isAxiosError(e)) {
            console.error("Erro ao excluir transação:", e.response?.data || e.message);
        } else {
            console.error("Erro desconhecido ao excluir transação:", e);
        }

        return null
    }
}
