import axios from "axios";
import { Transaction } from "../types/transactionTypes";

const API_URL = 'http://localhost:5000/dashboard/transactions';

export async function createTransaction(description: string, amount: number, type: string, category: string, userId: number) {
    try {
        const response = await axios.post(API_URL, { 
            description, 
            amount, 
            type, 
            category, 
            userId 
        });

        console.log("Transação criada:", response.data);
        return response.data;
    } catch (e) {
        console.error("Erro ao criar transação:", e);
        return null;
    }
}

export async function updateTransaction(id: number, data: Transaction){
    try{
        const response = await axios.put(`${API_URL}/${id}`, data);
        console.log("Transação atualizada:", response.data);
        
        return response.data
        
    }catch(e){
        console.error("Erro ao atualizar transação:", e);
        return null
    }
}

export async function deleteTransaction(id: number){}

export async function listAllTransactions(){
    try{
        const response = await axios.get(API_URL);
        console.log("Transações listadas:", response.data);
        return response.data
    }catch(e){
        console.error("Erro ao listar transações:", e);
        return false
    }
}

listAllTransactions();
