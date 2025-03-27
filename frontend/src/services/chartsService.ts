import { TCategoryExpenseChartData, TIncomeChartData } from "@/types/chartTypes";
import { listAllTransactions } from "./transactionService";
import { Transaction } from "@/types/transactionTypes";
import { expenseCategories } from "@/utils/expenseCategories";

interface TransactionChartData {
  createdAt: string;
  amount: number;
  type: "INCOME" | "EXPENSE";
}

export async function getIncomeExpenseData(): Promise<TIncomeChartData[]> {
  const transactions = await listAllTransactions();
  if (!transactions?.length) {
    throw new Error("Nenhum dado encontrado");
  };

  const oneMonthAgo = new Date();
  oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1);

  const filteredTransactions = transactions.filter((transaction: Transaction) => {
    const transactionDate = new Date(transaction.createdAt);
    return transactionDate >= oneMonthAgo;
  })

  const chartDataObj = filteredTransactions.reduce((acc: Record<string, TIncomeChartData>, { createdAt, amount, type }: TransactionChartData) => {
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
  }, {} as Record<string, TIncomeChartData>);
  
  const sortedChartData = (a: any, b: any) => new Date(b.date).getTime() - new Date(a.date).getTime();
  const chartDataArray = Object.values(chartDataObj).sort(sortedChartData) as TIncomeChartData[];

  return chartDataArray;
}

export async function getExpenseByCategoryData(): Promise<TCategoryExpenseChartData[]> {
  const transactions = await listAllTransactions();

  if (!transactions?.length) {
    throw new Error('Nenhum dado encontrado');
  }

  const lastMonth = new Date();
  lastMonth.setMonth(lastMonth.getMonth() - 1);

  const filteredTransactions = transactions.filter((transaction: Transaction) => {
    const transactionDate = new Date(transaction.createdAt)
    return transactionDate >= lastMonth && expenseCategories.has(transaction.category)
  });

  const chartDataObj = filteredTransactions.reduce((acc: Record<string, TCategoryExpenseChartData>, transaction: Transaction) => {
    if (!acc[transaction.category]) {
      acc[transaction.category] = {
        category: transaction.category,
        amount: 0
      };    
    }
    acc[transaction.category].amount += transaction.amount;
    return acc;
  }, {});    

  const sortedChartData = (a: any, b: any) => b.amount - a.amount,
        chartDataArray = Object.values(chartDataObj).sort(sortedChartData) as TCategoryExpenseChartData[];

  console.log(chartDataArray);
  return chartDataArray;
}
