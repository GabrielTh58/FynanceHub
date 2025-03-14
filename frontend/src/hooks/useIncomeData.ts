import { getIncomeExpenseData } from "@/services/chartsService";
import { useEffect, useState } from "react";
import { TIncomeChartData } from "@/types/chartTypes";

export function useIncomeData() {
    const [incomeChartData, setincomeChartData] = useState<TIncomeChartData[]>([]);

    useEffect(() => {
        async function fetchChartData() {
            try {
                const data = await getIncomeExpenseData();
                if (!data) return
                setincomeChartData(data);
            } catch (e: any) {
                console.error(e)
            }
        }

        fetchChartData();
    }, [])

    return { incomeChartData }
}