import { getIncomeExpenseData } from "@/services/chartsService";
import { useEffect, useState } from "react";
import { TIncomeChartData } from "@/types/chartTypes";

export function useIncomeExpenseChartData() {
    const [chartData, setChartData] = useState<TIncomeChartData[]>([]);

    useEffect(() => {
        async function fetchChartData() {
            try {
                const data = await getIncomeExpenseData();
                if (!data) return
                setChartData(data);
            } catch (e: any) {
                console.error(e)
            }
        }

        fetchChartData();
    }, [])

    return { chartData }
}