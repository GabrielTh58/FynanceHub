import { getExpenseByCategoryData } from "@/services/chartsService";
import { TCategoryExpenseChartData } from "@/types/chartTypes";
import { useEffect, useState } from "react";

export function useCategoryExpenseChartData() {
    const [categoryExpense, setCategoryExpense] = useState<TCategoryExpenseChartData[]>([]);

    useEffect(() => {
        async function fetchCategoryExpense() {
            try {
                const data = await getExpenseByCategoryData();
                if (!data) return;
                setCategoryExpense(data);
            } catch (e: any) {
                console.error(e);
            }
        }

        fetchCategoryExpense();
    }, []);

    return { categoryExpense };
}
