// hooks/useNotifications.ts
import { useState, useEffect } from "react";

export function useNotifications() {
    const [hasNotifications, setHasNotifications] = useState(false);

    useEffect(() => {
        try {
            const lastReportDate = localStorage.getItem("lastReportDate");
            const lastGeneratedReport = localStorage.getItem("lastGeneratedReport");
            const hasNewReport = localStorage.getItem("hasNewReport") === "true";

            const today = new Date();
            const firstDayOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
            const isNewMonth = !lastReportDate || new Date(lastReportDate) < firstDayOfMonth;
            const hasPendingReport = !!lastGeneratedReport && isNewMonth;

            setHasNotifications(Boolean(hasNewReport || hasPendingReport));
        } catch (error) {
            console.error("Erro ao acessar localStorage:", error);
        }
    }, []);

    return hasNotifications;
}
