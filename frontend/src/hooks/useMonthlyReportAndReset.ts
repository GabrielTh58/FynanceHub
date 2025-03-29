import { useEffect } from "react"
import jsPDF from "jspdf"
import autoTable from "jspdf-autotable"
import { Transaction } from "@/types/transactionTypes"

interface UseMonthlyReportProps {
    lastTransactions: Transaction[]
    setLastTransactions: (transactions: Transaction[]) => void
}

interface jsPDFWithAutoTable extends jsPDF {
    lastAutoTable?: { finalY: number }
}

export function useMonthlyReportAndReset({ lastTransactions, setLastTransactions }: UseMonthlyReportProps) {
    useEffect(() => {
        const currentMonth = new Date().getMonth()
        const storedMonth = Number(localStorage.getItem("lastMonth"))

        if (storedMonth === currentMonth || lastTransactions.length === 0) return

        generatePDFReport()
        resetTransactions()
        
        localStorage.setItem("lastMonth", String(currentMonth))
        localStorage.setItem("hasNewReport", "true") // Notificação ativada
    }, []) 

    const generatePDFReport = () => {
        const doc: jsPDFWithAutoTable = new jsPDF()
        doc.text("Relatório Mensal de Transações", 20, 20)

        const transactionsByWeek = classifyTransactionsByWeek(lastTransactions)

        let totalIncome = 0
        let totalExpense = 0
        let yOffset = 30

        Object.keys(transactionsByWeek).forEach((weekKey) => {
            const weekNumber = Number(weekKey)
            if (transactionsByWeek[weekNumber].length > 0) {
                doc.text(`Semana ${weekNumber}`, 20, yOffset)
                yOffset += 10

                let weekIncome = 0
                let weekExpense = 0

                autoTable(doc, {
                    startY: yOffset,
                    head: [["Descrição", "Categoria", "Valor", "Data"]],
                    body: transactionsByWeek[weekNumber].map((transaction: Transaction) => {
                        if (transaction.amount > 0) {
                            weekIncome += transaction.amount
                        } else {
                            weekExpense += Math.abs(transaction.amount)
                        }

                        return [
                            transaction.description,
                            transaction.category,
                            `R$ ${transaction.amount.toFixed(2)}`,
                            new Date(transaction.createdAt).toLocaleDateString("pt-BR"),
                        ]
                    }),
                })

                yOffset = doc.lastAutoTable?.finalY ? doc.lastAutoTable.finalY + 10 : yOffset + 10

                doc.text(`Total da Semana ${weekNumber}: Receita: R$ ${weekIncome.toFixed(2)}, Despesa: R$ ${weekExpense.toFixed(2)}`, 20, yOffset)
                yOffset += 10

                totalIncome += weekIncome
                totalExpense += weekExpense
            }
        })

        const date = new Date()
        const reportName = `relatorio_mensal_${date.getFullYear()}_${(date.getMonth() + 1).toString().padStart(2, '0')}.pdf`

        doc.text(`Total do Mês: Receita: R$ ${totalIncome.toFixed(2)}, Despesa: R$ ${totalExpense.toFixed(2)}`, 20, yOffset + 10)
        doc.save(reportName)
    }

    const classifyTransactionsByWeek = (transactions: Transaction[]): Record<number, Transaction[]> => {
        const weeks: Record<number, Transaction[]> = {
            1: [], 2: [], 3: [], 4: [], 5: [],
        }

        transactions.forEach((transaction) => {
            const day = new Date(transaction.createdAt).getDate()
            const weekNumber = Math.ceil(day / 7)
            weeks[weekNumber].push(transaction)
        })

        return weeks
    }

    const resetTransactions = () => {
        setLastTransactions([])
        localStorage.setItem("transactions", JSON.stringify([]))
    }
}
