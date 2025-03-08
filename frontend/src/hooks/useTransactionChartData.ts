import { getIncomeExpenseData } from "@/services/chartsService";
import { useEffect, useState } from "react";
import { MonthChartData } from "@/types/chartTypes";

export function useTransactionChartData(){
    const [chartData, setChartData] = useState<MonthChartData[]>([]);

    useEffect(() => {
        async function fetchChartData() {
            try {
                const data = await getIncomeExpenseData();
                if(!data) return
                setChartData(data);
            }catch(e: any){
                console.error(e)
            }
        }

        fetchChartData();
    }, [])
    
    return {chartData}
}