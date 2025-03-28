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
  const transactions = await listAllTransactions()
  if (!transactions?.length) {
    throw new Error("Nenhum dado encontrado")
  }

  const today = new Date()
  const oneMonthAgo = new Date()
  oneMonthAgo.setDate(today.getDate() - 29); // últimos 30 dias (incluindo hoje)

  // Cria um mapa com todos os dias zerados
  const chartDataObj: Record<string, TIncomeChartData> = {}
  for (let i = 0; i < 30; i++) {
    const date = new Date(oneMonthAgo);
    date.setDate(oneMonthAgo.getDate() + i);
    const dateKey = date.toISOString().slice(0, 10);
    chartDataObj[dateKey] = { date: dateKey, income: 0, expense: 0 };
  }

  // Soma as transações no dia correto
  transactions.forEach(({ createdAt, amount, type }: TransactionChartData) => {
    const dateKey = new Date(createdAt).toISOString().slice(0, 10);
    if (dateKey in chartDataObj) {
      if (type === "INCOME") chartDataObj[dateKey].income += amount;
      if (type === "EXPENSE") chartDataObj[dateKey].expense += amount;
    }
  });

  // Retorna em ordem crescente
  const chartDataArray = Object.values(chartDataObj).sort((a, b) =>
    new Date(a.date).getTime() - new Date(b.date).getTime()
  )

  return chartDataArray;
}

export async function getExpenseByCategoryData(): Promise<TCategoryExpenseChartData[]> {
  const transactions = await listAllTransactions();
  if (!transactions?.length) {
    throw new Error('Nenhum dado encontrado');
  }

  const today = new Date()
  const lastMonth = new Date()
  lastMonth.setDate(today.getDate() - 29);

  // Filtra transações do último mês e que pertencem a categorias de despesa válidas
  const filteredTransactions = transactions.filter((transaction: Transaction) => {
    const transactionDate = new Date(transaction.createdAt);
    return transactionDate >= lastMonth && expenseCategories.has(transaction.category);
  });

  // Reduz as transações filtradas para um objeto onde a chave é a categoria e o valor é o total gasto naquela categoria
  const chartDataObj = filteredTransactions.reduce((acc: Record<string, TCategoryExpenseChartData>, transaction: Transaction) => {
    if (!acc[transaction.category]) {
      acc[transaction.category] = {
        category: transaction.category,
        amount: 0
      };    
    }
    // Soma o valor da transação ao total da categoria
    acc[transaction.category].amount += transaction.amount;
    return acc;
  }, {});

  return Object.values(chartDataObj);
}

