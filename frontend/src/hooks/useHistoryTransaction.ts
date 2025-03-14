import { getTransactionHistory } from "@/services/transactionService";
import { useEffect, useState } from "react";

export function useHistoryTransaction() {
    const [lastTransactions, setLastTransactions] = useState([]);

    useEffect(() => {

        async function fetchTransactions() {
            try {
                const data = await getTransactionHistory();
                if (data) {
                    setLastTransactions(data);
                }
            } catch (e: any) {
                console.error(e)
            }
        }

        fetchTransactions();
    }, [])

    return { lastTransactions}
}