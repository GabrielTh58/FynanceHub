import { AddTransactionButton } from "@/components/dashboard/AddTransactionButton";
import { IconAdjustmentsHorizontal, IconFilter, IconPlus } from "@tabler/icons-react";
import { FilterButton } from "@/components/dashboard/FilterButton";

export default function Page() {
    return (
        <section className="bg-gradient-to-br from-[#060B26] to-[rgba(0,0,0,0)] shadow-lg rounded-lg p-5">
            <div className="flex items-center justify-between mb-7">
                <div className="flex items-center gap-6">
                    <h2 className="text-2xl font-bold">Transações Recentes</h2>
                    <AddTransactionButton icon={<IconPlus width={16} height={16} />}>
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
                    <tr className="border-b border-zinc-700">
                        <td className="w-1/5 py-5 px-4">Aluguel</td>
                        <td className="w-1/5 py-5 px-4">Despesa</td>
                        <td className="w-1/5 py-5 px-4">1000</td>
                        <td className="w-1/5 py-5 px-4">01/01/2023</td>
                        <td className="w-1/5 py-5 px-4">
                            <span className="px-3 py-2 rounded-2xl text-red-600 bg-red-700 bg-opacity-20">Saída</span>
                        </td>
                    </tr>
                    <tr className="border-b border-zinc-700">
                        <td className="w-1/5 py-5 px-4">Salário</td>
                        <td className="w-1/5 py-5 px-4">Receita</td>
                        <td className="w-1/5 py-5 px-4">2000</td>
                        <td className="w-1/5 py-5 px-4">05/01/2023</td>
                        <td className="w-1/5 py-5 px-4">
                            <span className="px-3 py-2 rounded-2xl text-green-500 bg-green-600 bg-opacity-20">Entrada</span>
                        </td>
                    </tr>
                </tbody>
            </table>


        </section>
    );
}