import { MonthChartData } from "@/types/chartTypes";
import { listAllTransactions } from "./transactionService";
import { Transaction } from "@/types/transactionTypes";

interface TransactionChartData {
    createdAt: string;
    amount: number;
    type: "INCOME" | "EXPENSE";
}

export async function getIncomeExpenseData(): Promise<MonthChartData[]> {
    const transactions = await listAllTransactions();
    if (!transactions?.length) return [];
  
    const oneMonthAgo = new Date();
    oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1);
  
    const filteredTransactions = transactions.filter((transaction: Transaction) => {
      const transactionDate = new Date(transaction.createdAt);
      return transactionDate >= oneMonthAgo;
    });
  
    const chartDataObj = filteredTransactions.reduce((acc: Record<string, MonthChartData>, { createdAt, amount, type }: TransactionChartData) => {
      //  ISO slice para gerar algo como "2025-02"
      const dateKey = new Date(createdAt).toISOString().slice(0, 7);
      
      if (!acc[dateKey]) {
        acc[dateKey] = { date: dateKey, income: 0, expense: 0 };
      }
  
      if (type === "INCOME") {
        acc[dateKey].income += amount;
      } else if (type === "EXPENSE") {
        acc[dateKey].expense += amount;
      }
  
      return acc;
    }, {} as Record<string, MonthChartData>);
  
    const chartDataArray = Object.values(chartDataObj).sort((a: any, b: any) => new Date(a.date).getTime() - new Date(b.date).getTime()) as MonthChartData[];;
    
    return chartDataArray;
}
  
export async function getExpenseByCategoryData() {
    const transactions = await listAllTransactions();

    if(transactions.length === 0) return [];
    console.log(transactions);    
}   

getExpenseByCategoryData()