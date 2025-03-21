'use client'

import { IncomeExpenseChart } from "@/components/charts/IncomeExpenseChart";
import { ExpenseByCategory } from "@/components/charts/ExpenseByCategory";
import { AnalyticsCards } from "@/components/dashboard/AnalyticsCards";
import { LastTransactions } from "@/components/dashboard/LastTransactions";
import { IconArrowRight, IconCreditCardPay, IconCreditCardRefund, IconWallet } from "@tabler/icons-react";
import Link from "next/link";
import { getUser } from "@/services/userServices";
import { useEffect, useState } from "react";
import { useMonthlyReset } from "@/hooks/useMonthlyReset";
import { Transaction } from "@/types/transactionTypes";

export default function Page() {
    const [user, setUser] = useState<string | null>(null);
    const [transactions, setTransactions] = useState<Transaction[]>([]);

    useEffect(() => {
        async function fetchUser() {
            const data = await getUser();
            if (data) {
                setUser(data.name);
            }
        }
        fetchUser();
    }, []);

    useEffect(() => {
        const storedTransactions = localStorage.getItem("transactions");
        if (storedTransactions) {
            setTransactions(JSON.parse(storedTransactions));
        }
    }, []);

    useEffect(() => {
        if (transactions.length > 0) {
            useMonthlyReset({ lastTransactions: transactions, setLastTransactions: setTransactions });
        }
    }, [transactions])

    return (
        <>
            <section className="flex items-center gap-4 mb-5">
                <AnalyticsCards title="Saldo" icon={<IconWallet />} />
                <AnalyticsCards title="Entrada" icon={<IconCreditCardRefund />} />
                <AnalyticsCards title="Saída" icon={<IconCreditCardPay />} />
            </section>

            <section className="block">
                <div className="grid grid-cols-5 grid-rows-5 gap-4 mb-6">
                    <div className="col-span-3 row-span-5 h-full w-full flex flex-col bg-[url('/background.png')] bg-center bg-cover bg-no-repeat py-9 pl-7 rounded-2xl">
                        <div className="col-span-2 flex flex-col flex-1">
                            <div className="flex flex-col items-start ">
                                <p className="text-zinc-400 text-sm">Bem vindo de volta</p>
                                <p className="font-bold text-2xl mb-4 mt-2">
                                    {user}
                                </p>
                                <p className="text-zinc-400 text-sm">Fico feliz em vê-lo novamente</p>
                            </div>
                        </div>

                        <Link href="/transactions" className="w-1/5 flex justify-between items-center text-sm hover:text-blue-400">
                            Registrar Transação
                            <IconArrowRight className="w-4 h-4" />
                        </Link>
                    </div>

                    <div className="flex flex-col col-span-2 row-span-5 w-full bg-custom-gradient-card rounded-2xl p-5">
                        <h2 className="text-xl font-bold mb-5">Transações Recentes</h2>

                        <div className="w-full h-[1px] bg-zinc-800 mb-4"></div>

                        <LastTransactions />
                    </div>
                </div>
                
                <div className="grid grid-cols-5 gap-4">
                    <div className="col-span-3 chart-gradient shadow-lg rounded-2xl">
                        <IncomeExpenseChart />                     
                    </div>
                    <div className="col-span-2 chart-gradient shadow-lg rounded-2xl">
                        <ExpenseByCategory />
                    </div>
                </div>
            </section>
        </>
    )
}