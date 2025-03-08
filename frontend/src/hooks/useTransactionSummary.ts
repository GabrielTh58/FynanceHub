import { useEffect, useState } from "react";
import { getTransactionSummary } from "../services/transactionService";

export function useTransactionSummary(){
    const [summary, setSummary] = useState({income: 0, expense: 0, total: 0})
    const [error, setError] = useState(null);

    useEffect(() => {
        async function fetchSummary() {
            try{
                const data = await getTransactionSummary();
                setSummary(data);
            }catch(e: any){
                setError(e)
            }
        }

        fetchSummary();
    },[])

    return {summary, error}
}