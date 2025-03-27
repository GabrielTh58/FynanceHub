import React from "react";
import { useTransactionSummary } from "../../hooks/useTransactionSummary";
interface AnalyticsCardsProps {
    title: string
    icon: React.ReactNode
}

export function AnalyticsCards({ title, icon }: AnalyticsCardsProps) {
    const { summary } = useTransactionSummary()

    const positive = summary.income > summary.expense

    return (
        <div className="p-5 bg-custom-gradient-card rounded-lg w-full sm:w-1/3 ">
            <div className="flex items-center justify-between">
                <div>
                    <h3 className="text-xs text-zinc-400 mb-2">{title}</h3>

                    <p className="text-base md:text-lg">
                        R$ {title === "Saldo" ? summary.total.toFixed(2) : title === "Entrada" ? summary.income.toFixed(2) : summary.expense.toFixed(2)}
                        <span className={`
                            ml-2 text-sm
                            ${title === "Entrada"
                                ? "text-green-600" : title === "Saída"
                                    ? "text-red-600" : positive
                                        ? "text-green-600" : "text-red-600"
                            }
                        `}>
                            <span className="text-xs tracking-wide">
                                {title === "Entrada"
                                    ? summary.percentageIncome.toFixed() + "%" : title === "Saída"
                                        ? summary.percentageExpense.toFixed() + "%" : + summary.percentageTotal.toFixed() + "%"
                                }
                            </span>
                        </span>
                    </p>
                </div>


                <div className="sm:hidden md:flex flex items-center justify-center w-10 h-10 bg-blue-600 rounded-lg p-1">
                    {icon}
                </div>
            </div>
        </div >
    )
}