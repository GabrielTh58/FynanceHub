import { listAllTransactions } from "@/services/transactionService";
import { Transaction as TransactionType } from "@/types/transactionTypes";
import { useEffect, useState } from "react";

export function useTransaction() {
    const [transactions, setTransactions] = useState<TransactionType[]>()

    useEffect(() => {
        async function fetchTransactions() {
            const data = await listAllTransactions()
            if (data) {
                setTransactions(data)
            }
        }
        fetchTransactions()
    }, [transactions])

    return { transactions, setTransactions };
}