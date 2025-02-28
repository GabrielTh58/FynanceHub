'use client'
import { AddTransactionButton } from "@/components/transaction/AddTransactionButton";
import { IconAdjustmentsHorizontal, IconFilter, IconPlus } from "@tabler/icons-react";
import { FilterButton } from "@/components/shared/FilterButton";
import { useEffect, useState } from "react";
import { ModalForm } from "@/components/transaction/ModalForm";
import { listAllTransactions } from "@/services/transactionService";
import { Transaction } from "@/types/transactionTypes";

export default function Page() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [transactions, setTransactions] = useState<Transaction[]>();
    // CUSTOM HOOK
    const handleOpenModal = () => {
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };
    
    useEffect(() => {
        async function fetchTransactions() {
            const data = await listAllTransactions();
            if(data){
                setTransactions(data);
            }
        }
        fetchTransactions();
    }, []);

    console.log(transactions);

    return (
        <section className="flex flex-col items-center bg-gradient-to-br from-[#060B26] to-[rgba(0,0,0,0)] shadow-lg rounded-lg p-5">
            <div className="w-full flex items-center justify-between mb-7">
                <div className="flex items-center gap-6">
                    <h2 className="text-2xl font-bold">Transações Recentes</h2>
                    <AddTransactionButton icon={<IconPlus width={16} height={16} />} setIsModalOpen={handleOpenModal} >
                        Nova Transação
                    </AddTransactionButton>
                </div>

                <FilterButton icon={<IconAdjustmentsHorizontal width={16} height={16} />} >
                    Filtrar
                </FilterButton>
            </div>

            <table className="w-full table-fixed border-collapse">
                <thead className="text-base font-semibold text-zinc-400 border-b border-zinc-600">
                    <tr>
                        <th className="w-1/5 text-left py-4 px-4">Nome</th>
                        <th className="w-1/5 text-left py-4 px-4">Categoria</th>
                        <th className="w-1/5 text-left py-4 px-4">Valor</th>
                        <th className="w-1/5 text-left py-4 px-4">Data</th>
                        <th className="w-1/5 text-left py-4 px-4">Tipo</th>
                    </tr>
                </thead>
                <tbody className="text-sm text-zinc-300 font-semibold">
                    {transactions && transactions.map((transaction: Transaction, index: number) => (
                        <tr key={index} className="border-b border-zinc-700">
                            <td className="w-1/5 py-5 px-4">{transaction.description}</td>
                            <td className="w-1/5 py-5 px-4">{transaction.category}</td>
                            <td className="w-1/5 py-5 px-4">R$ {transaction.amount.toFixed(2)}</td>
                            <td className="w-1/5 py-5 px-4">{transaction.createdAt.toLocaleString()}</td>
                            <td className="w-1/5 py-5 px-4">
                                <span className="px-3 py-2 rounded-2xl text-red-600 bg-red-700 bg-opacity-20">{transaction.type}</span>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {isModalOpen &&
                <ModalForm setIsModalOpen={handleCloseModal} />
            }


        </section>
    );
}