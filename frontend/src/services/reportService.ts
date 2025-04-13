import jsPDF from "jspdf"
import autoTable from "jspdf-autotable"
import { Transaction } from "@/types/transactionTypes"
import { setStorageItem } from "@/utils/storage"

interface jsPDFWithAutoTable extends jsPDF {
  lastAutoTable?: { finalY: number }
}

export const classifyTransactionsByWeek = (transactions: Transaction[]): Record<number, Transaction[]> => {
  const weeks: Record<number, Transaction[]> = { 1: [], 2: [], 3: [], 4: [], 5: [] }

  transactions.forEach((transaction) => {
    const day = new Date(transaction.createdAt).getDate()
    const weekNumber = Math.ceil(day / 7)
    weeks[weekNumber].push(transaction)
  })

  return weeks
}


export const generateMonthlyReport = (transactions: Transaction[]) => {
  const doc: jsPDFWithAutoTable = new jsPDF()  
  doc.text("Relatório Mensal de Transações", 20, 20)

  const transactionsByWeek = classifyTransactionsByWeek(transactions)
  console.log(transactionsByWeek);
  

  let totalIncome = 0
  let totalExpense = 0
  let yOffset = 30

  Object.entries(transactionsByWeek).forEach(([weekKey, trans]) => {
    if (trans.length === 0) return

    doc.text(`Semana ${weekKey}`, 20, yOffset)
    yOffset += 10

    let weekIncome = 0
    let weekExpense = 0

    autoTable(doc, {
      startY: yOffset,
      head: [["Descrição", "Categoria", "Valor", "Data"]],
      body: trans.map((t) => {
        if (t.amount > 0) weekIncome += t.amount
        else weekExpense += Math.abs(t.amount)

        return [
          t.description,
          t.category,
          `R$ ${t.amount.toFixed(2)}`,
          new Date(t.createdAt).toLocaleDateString("pt-BR"),
        ]
      }),
    })

    yOffset = doc.lastAutoTable?.finalY ? doc.lastAutoTable.finalY + 10 : yOffset + 10

    doc.text(
      `Total da Semana ${weekKey}: Receita: R$ ${weekIncome.toFixed(2)}, Despesa: R$ ${weekExpense.toFixed(2)}`,
      20,
      yOffset
    )

    yOffset += 10
    totalIncome += weekIncome
    totalExpense += weekExpense
  })

  doc.text(
    `Total do Mês: Receita: R$ ${totalIncome.toFixed(2)}, Despesa: R$ ${totalExpense.toFixed(2)}`,
    20,
    yOffset + 10
  )

  const date = new Date()
  const reportName = `relatorio_mensal_${date.getFullYear()}_${String(
    date.getMonth() + 1
  ).padStart(2, "0")}.pdf`

  doc.save(reportName)

  setStorageItem("lastReportDate", new Date().toISOString())
}


export function resetTransactionsStorage(setLastTransactions: (transactions: Transaction[]) => void) {
    setLastTransactions([])
    setStorageItem("transactions", [])
}
