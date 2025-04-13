import { useState, useEffect } from "react"
import { getStorageItem } from "@/utils/storage"

export function useNotifications() {
  const [hasNotifications, setHasNotifications] = useState(false)

  useEffect(() => {
    try {
      const lastReportDate = getStorageItem<string>("lastReportDate")
      const lastGeneratedReport = getStorageItem<string>("lastGeneratedReport")
      const hasNewReport = getStorageItem<string>("hasNewReport") === "true"

      const today = new Date()
      const firstDayOfMonth = new Date(today.getFullYear(), today.getMonth(), 1)
      const isNewMonth = !lastReportDate || new Date(lastReportDate) < firstDayOfMonth
      const hasPendingReport = !!lastGeneratedReport && isNewMonth

      setHasNotifications(Boolean(hasNewReport || hasPendingReport))
    } catch (error) {
      console.error("Erro ao acessar localStorage:", error)
    }
  }, [])

  return hasNotifications
}
