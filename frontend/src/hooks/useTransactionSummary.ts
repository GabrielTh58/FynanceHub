import { useEffect, useState } from "react";
import { getTransactionSummary } from "../services/transactionService";

export function useTransactionSummary() {
    const [summary, setSummary] = useState({
        income: 0,
        expense: 0,
        total: 0,
        percentageIncome: 0,
        percentageExpense: 0,
        percentageTotal: 0
    });

    useEffect(() => {
        async function fetchSummary() {
            try {
                const data = await getTransactionSummary();
                
                setSummary(prevSummary => 
                    JSON.stringify(prevSummary) !== JSON.stringify(data) ? data : prevSummary
                )
            } catch (e:any) {
                console.log(`Erro ao buscar resumo de transações: ${e.message}`);
            }
        }
    
        fetchSummary();
    }, []);

    return { summary };
}
