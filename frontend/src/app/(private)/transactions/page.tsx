"use client"

import { AddTransactionButton } from "@/components/Buttons/AddTransactionButton"
import { IconAdjustmentsHorizontal, IconPlus, IconX } from "@tabler/icons-react"
import { FilterButton } from "@/components/Buttons/FilterButton"
import { useEffect, useState } from "react"
import { ModalTransactionForm } from "@/components/Modals/ModalTransactionForm"
import { Transaction } from "@/types/transactionTypes"
import { useTransaction } from "@/hooks/useTransaction"
import { TransactionCategory, translateCategory, translateTransactionType } from "@/utils/transactionsUtils"
import { deleteTransaction } from "@/services/transactionService"

export default function Page() {
    const [isModalOpen, setIsModalOpen] = useState(false)
    const { transactions } = useTransaction()


    const handleOpenModal = () => setIsModalOpen(true);
    const handleCloseModal = () => setIsModalOpen(false);
    const handleDeleteTransaction = async (id: number) => {
        const response = await deleteTransaction(id)
        console.log(response);
    }


    return (
        <section className="
            flex flex-col items-center 
            bg-gradient-to-br from-[#060B26] to-[rgba(0,0,0,0)] shadow-lg rounded-lg p-5
        ">
            <div className={`${isModalOpen ? "blur-sm opacity-50" : ""}`}>
                <div className="w-full flex items-center justify-between mb-7">
                    <div className="flex items-center gap-6">
                        <h2 className="text-2xl font-bold">Transações Recentes</h2>
                        <AddTransactionButton
                            icon={<IconPlus width={16} height={16} />}
                            setIsModalOpen={handleOpenModal}
                        >
                            Nova Transação
                        </AddTransactionButton>
                    </div>

                    <FilterButton icon={<IconAdjustmentsHorizontal width={16} height={16} />}>
                        Filtrar
                    </FilterButton>
                </div>

                <table className="w-full table-fixed border-collapse capitalize">
                    <thead className="text-base font-semibold text-zinc-400 border-b border-zinc-600">
                        <tr>
                            <th className="w-1/5 text-left py-4 px-4">Nome</th>
                            <th className="w-1/5 text-left py-4 px-4">Categoria</th>
                            <th className="w-1/5 text-left py-4 px-4">Valor</th>
                            <th className="w-1/5 text-left py-4 px-4">Data</th>
                            <th className="w-1/5 text-left py-4 px-6">Tipo</th>
                            <th className="w-[5%] text-left py-4 px-4"></th>
                        </tr>
                    </thead>

                    <tbody className="text-sm text-zinc-300 font-semibold">
                        {transactions && transactions.map((transaction: Transaction, index: number) => (
                            <tr key={index} className="border-b border-zinc-700">
                                <td className="w-1/5 py-5 px-4">{transaction.description}</td>
                                <td className="w-1/5 py-5 px-4">
                                    {translateCategory(transaction.category as keyof typeof TransactionCategory)}
                                </td>
                                <td className="w-1/5 py-5 px-4">R$ {transaction.amount.toFixed(2)}</td>
                                <td className="w-1/5 py-5 px-4">
                                    {new Date(transaction.createdAt).toLocaleDateString("pt-BR", {
                                        day: "2-digit",
                                        month: "short",
                                        year: "numeric",
                                    }).replace(/\./g, "").replace(/ de /g, " ")}
                                </td>
                                <td className="w-1/5 py-5 px-4">
                                    <span className={`px-3 py-2 rounded-2xl
                                        ${transaction.type === "INCOME"
                                            ? "text-green-600 bg-green-700 bg-opacity-20"
                                            : "text-red-600 bg-red-700 bg-opacity-20"}`
                                    }>
                                        {translateTransactionType(transaction.type)}
                                    </span>
                                </td>        
                                <td className="w-[5%] py-5 px-4">
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

            {isModalOpen && <ModalTransactionForm setIsModalOpen={handleCloseModal} />}
        </section>
    );
}
