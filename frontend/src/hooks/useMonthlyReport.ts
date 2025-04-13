import { useEffect } from "react"
import { Transaction } from "@/types/transactionTypes"
import { generateMonthlyReport, resetTransactionsStorage } from "@/services/reportService"
import { getStorageItem, setStorageItem } from "@/utils/storage"

interface UseMonthlyReportProps {
  lastTransactions: Transaction[]
  setLastTransactions: (transactions: Transaction[]) => void
}

export function useMonthlyReport({ lastTransactions, setLastTransactions }: UseMonthlyReportProps) {
  useEffect(() => {
    const currentMonth = new Date().getMonth()
    const storedMonth = getStorageItem<number>("lastMonth")

    if (storedMonth === currentMonth || lastTransactions.length === 0) return

    generateMonthlyReport(lastTransactions)
    resetTransactionsStorage(setLastTransactions)

    setStorageItem("lastMonth", currentMonth)
    setStorageItem("hasNewReport", true)
  }, [])
}
