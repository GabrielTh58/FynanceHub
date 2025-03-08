import { useDateFormatter } from "@/hooks/useDateFormatter";
import { useHistoryTransaction } from "@/hooks/useHistoryTransaction";
import { Transaction } from "@/types/transactionTypes";
import { IconArrowDown, IconArrowUp } from "@tabler/icons-react";

export function LastTransactions() {
    const { lastTransactions } = useHistoryTransaction();
    const { formatDate } = useDateFormatter()
    
    return (
        <div>
            <div className="flex flex-col">
                {lastTransactions.length === 0 &&
                    <p className="font-semidbol text-base text-zinc-400">Você ainda nao possui Transações</p>
                }

                {lastTransactions
                    .map((transaction: Transaction, index: number) => (
                        <div key={index} className="flex items-center py-6 border-b border-slate-700">

                            <div className="bg-slate-700 p-2 mr-4 rounded-lg">
                                {
                                    transaction.type === 'INCOME' ?
                                        <IconArrowUp width={24} height={24} className="text-green-600" />
                                        :
                                        <IconArrowDown width={24} height={24} className="text-red-600" />
                                }
                            </div>

                            <div className="flex justify-between w-full ">
                                <div className="flex flex-col justify-center capitalize">
                                    <p className="font-semibold ">{transaction.description}</p>
                                    <p className="text-xs text-zinc-400 lowercase">{transaction.category}</p>
                                </div>

                                <div className="flex flex-col items-end">
                                    <p className="font-semibold">R$ {transaction.amount.toFixed(2)}</p>
                                    <p className="text-xs text-zinc-400">
                                        {formatDate(transaction.createdAt.toLocaleString())}
                                    </p>
                                </div>
                            </div>
                        </div>
                    ))}
            </div>
        </div>
    )
}