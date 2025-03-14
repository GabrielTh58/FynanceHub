import React from "react";
import { useTransactionSummary } from "../../hooks/useTransactionSummary";
interface AnalyticsCardsProps{
    title: string
    icon: React.ReactNode
}

export function AnalyticsCards({title, icon}: AnalyticsCardsProps){
    const {summary, error } = useTransactionSummary()
    const positive = summary.income > summary.expense

    return(
        <div className="flex-1 p-5 bg-custom-gradient-card rounded-lg">
            <div className="flex items-center justify-between">
                <div>
                    <h3 className="text-xs text-zinc-400 mb-2">{title}</h3>
                    {error && <p className="text-xs text-zinc-400">{error}</p>}
                    
                    <p className="text-lg">                        
                        R$ {title === "Saldo" ? summary.total.toFixed(2) : title === "Entrada" ? summary.income.toFixed(2) : summary.expense.toFixed(2)} 
                        <span className={`
                            ml-2 text-sm
                            ${title === "Entrada" ? "text-green-600" : title === "Saída" ? "text-red-600" : positive ? "text-green-600" : "text-red-600"}
                        `}>
                            +55%
                        </span>
                    </p>
                </div>

                <div className="flex items-center justify-center w-10 h-10 bg-blue-600 rounded-lg p-1">
                    {icon}
                </div>
            </div>
        </div>
    )
}