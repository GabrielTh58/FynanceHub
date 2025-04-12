"use client"

import { ActionButton } from "@/components/buttons/ActionButton"
import { IconAdjustmentsHorizontal, IconPlus, IconX } from "@tabler/icons-react"
import { useState } from "react"
import { ModalTransactionForm } from "@/components/components/modals/ModalTransactionForm"
import { Transaction } from "@/types/transactionTypes"
import { useTransaction } from "@/hooks/useTransaction"
import { TransactionCategory, translateCategory, translateTransactionType } from "@/utils/transactionsUtils"
import { deleteTransaction } from "@/services/transactionService"
import { ModalFilter } from "@/components/components/modals/ModalFilter"

export default function Page() {
    const [isModalTransactionOpen, setisModalTransactionOpen] = useState(false)
    const [isModalFilterOpen, setisModalFilterOpen] = useState(false)
    const [filterType, setFilterType] = useState<"INCOME" | "EXPENSE" | "ALL">("ALL")

    const { transactions } = useTransaction()

    const handleFilter = (type: "INCOME" | "EXPENSE" | "ALL") => {
        setFilterType(type)
    } 

    const handleModalFilterOpen = () => setisModalFilterOpen(true)
    const handleModalFilterClose = () => setisModalFilterOpen(false)
    const handleDeleteTransaction = async (id: number) => {
        await deleteTransaction(id)
    }

    const filteredTransactions = transactions?.filter(transaction => {
        if (filterType === "ALL") return true
        return transaction.type === filterType
    })

    return (
        <section className="flex flex-col items-center bg-gradient-to-br from-[#060B26] to-[rgba(0,0,0,0)] shadow-lg rounded-lg p-5">
            <div className={`${isModalTransactionOpen ? "blur-sm opacity-50" : ""}`}>
                <div className="w-full mb-8">
                    <div className="md:flex md:items-center md:gap-6 md:justify-between">
                        <h2 className="text-center text-xl font-bold mb-7 md:mb-0 md:flex md:items-center md:justify-between md:text-start lg:text-2xl">
                            Transações Recentes
                        </h2>

                        <div className="flex items-center justify-between gap-5">
                            <ActionButton
                                icon={<IconPlus width={16} height={16} />}
                                onClick={() => setisModalTransactionOpen(true)}
                            >
                                Nova Transação
                            </ActionButton>
                            <button 
                                onClick={handleModalFilterOpen}
                                className="flex gap-2 items-center text-sm text-zinc-300 rounded-lg py-1.5 px-4 bg-[#1a1f37] hover:bg-opacity-50"
                            >
                                <IconAdjustmentsHorizontal width={16} height={16} />
                                Filtrar
                            </button>
                        </div>
                    </div>
                </div>

                <table className="w-full table-fixed border-collapse capitalize">
                    <thead className="text-base font-semibold text-zinc-400 border-b border-zinc-600">
                        <tr>
                            <th className="w-1/5 text-left py-4 pl-1 pr-4 md:px-4">Nome</th>
                            <th className="hidden md:block w-1/5 text-left py-4 pl-1 pr-4 md:px-4">Categoria</th>
                            <th className="w-1/5 text-left py-4 pl-1 pr-4 md:px-4">Valor</th>
                            <th className="hidden md:block w-1/5 text-left py-4 pl-1 pr-4 md:px-4">Data</th>
                            <th className="w-1/5 text-left py-4 px-6">Tipo</th>
                            <th className="w-[5%] text-left py-4 pl-1 pr-4 md:px-4"></th>
                        </tr>
                    </thead>

                    <tbody className="text-sm text-zinc-300 font-semibold">
                        {filteredTransactions?.map((transaction: Transaction, index: number) => (
                            <tr key={index} className="border-b border-zinc-700 text-xs md:text-sm">
                                <td className="w-1/5 py-5 pl-1 pr-4 md:px-4">{transaction.description}</td>
                                <td className="hidden md:block w-1/5 py-5 pl-1 pr-4 md:px-4">
                                    {translateCategory(transaction.category as keyof typeof TransactionCategory)}
                                </td>
                                <td className="w-1/5 py-5 pl-1 pr-4 md:px-4">R$ {transaction.amount.toFixed(2)}</td>
                                <td className="hidden md:inline w-1/5 py-5 pl-1 pr-4 md:px-4">
                                    {new Date(transaction.createdAt).toLocaleDateString("pt-BR", {
                                        day: "2-digit",
                                        month: "short",
                                        year: "numeric",
                                    }).replace(/\./g, "").replace(/ de /g, " ")}
                                </td>
                                <td className="w-1/5 py-5 pl-1 pr-4 md:px-4">
                                    <span className={`px-3 py-2 rounded-2xl
                                        ${transaction.type === "INCOME"
                                            ? "text-green-600 bg-green-700 bg-opacity-20"
                                            : "text-red-600 bg-red-700 bg-opacity-20"}`}
                                    >
                                        {translateTransactionType(transaction.type)}
                                    </span>
                                </td>
                                <td className="w-[5%] py-5 pl-1 pr-4 md:px-4">
                                    <button
                                        onClick={() => handleDeleteTransaction(transaction.id)}
                                        className="rounded-full p-[1px] cursor-pointer hover:bg-red-600"
                                    >
                                        <IconX width={16} height={16} />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {isModalTransactionOpen && <ModalTransactionForm handleModalTransactionClose={() => setisModalTransactionOpen(false)} />}

            {isModalFilterOpen && (
                <ModalFilter
                    handleModalFilterClose={handleModalFilterClose}
                    handleFilterTransaction={handleFilter}
                />
            )}
        </section>
    )
}
