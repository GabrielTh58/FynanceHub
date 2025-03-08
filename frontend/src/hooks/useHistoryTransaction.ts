import { getTransactionHistory } from "@/services/transactionService";
import { useEffect, useState } from "react";

export function useHistoryTransaction() {
    const [lastTransactions, setlastTransactions] = useState([]);

    useEffect(() => {

        async function fetchTransactions() {
            try {
                const data = await getTransactionHistory();
                if (data) {
                    setlastTransactions(data);
                }
            } catch (e: any) {
                console.error(e)
            }
        }

        fetchTransactions();
    }, [])

    return { lastTransactions }
}