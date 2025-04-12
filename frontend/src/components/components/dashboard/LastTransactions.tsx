import { useDateFormatter } from "@/hooks/useDateFormatter";
import { useHistoryTransaction } from "@/hooks/useHistoryTransaction";
import { Transaction } from "@/types/transactionTypes";
import { IconArrowDown, IconArrowUp } from "@tabler/icons-react";

enum TransactionCategory {
    SALES = "SALES",
    REFUND = "REFUND",
    INVESTMENT = "INVESTMENT",
    SUPPLIERS = "SUPPLIERS",
    OPERATING_COSTS = "OPERATING_COSTS",
    SALARIES = "SALARIES",
    MARKETING = "MARKETING",
    TAXES = "TAXES",
    EQUIPMENT = "EQUIPMENT",
    TRANSPORT = "TRANSPORT",
    OTHER = "OTHER"
}

const categoryMap: Record<TransactionCategory, string> = {
    [TransactionCategory.SALES]: "Vendas",
    [TransactionCategory.REFUND]: "Reembolso",
    [TransactionCategory.INVESTMENT]: "Investimento",
    [TransactionCategory.SUPPLIERS]: "Fornecedores",
    [TransactionCategory.OPERATING_COSTS]: "Custos Operacionais",
    [TransactionCategory.SALARIES]: "Salários",
    [TransactionCategory.MARKETING]: "Marketing",
    [TransactionCategory.TAXES]: "Impostos",
    [TransactionCategory.EQUIPMENT]: "Equipamentos",
    [TransactionCategory.TRANSPORT]: "Transporte",
    [TransactionCategory.OTHER]: "Outros"
}

export function LastTransactions() {
    const { lastTransactions } = useHistoryTransaction();
    const { formatDate } = useDateFormatter();

    return (
        <div>
            <div className="flex flex-col">
                {lastTransactions.length === 0 && (
                    <p className="font-semibold text-base text-zinc-400">
                        Você ainda não possui transações.
                    </p>
                )}

                {lastTransactions.map((transaction: Transaction, index: number) => (
                    <div key={index} className="flex items-center py-6 border-b border-slate-700">

                        <div className="bg-slate-800 p-2 mr-4 rounded-lg">
                            {transaction.type === "INCOME" ? (
                                <IconArrowUp width={24} height={24} className="text-green-600" />
                            ) : (
                                <IconArrowDown width={24} height={24} className="text-red-600" />
                            )}
                        </div>

                        <div className="flex justify-between w-full">
                            <div className="flex flex-col justify-center">
                                <p className="font-semibold capitalize">{transaction.description}</p>
                                <p className="text-xs text-zinc-400">
                                    {categoryMap[transaction.category as TransactionCategory] ?? transaction.category}
                                </p>
                            </div>

                            <div className="flex flex-col items-end">
                                <p className="font-semibold">
                                    R$ {transaction.amount.toFixed(2)}
                                </p>
                                <p className="text-xs text-zinc-400">
                                    {formatDate(transaction.createdAt.toLocaleString())}
                                </p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
