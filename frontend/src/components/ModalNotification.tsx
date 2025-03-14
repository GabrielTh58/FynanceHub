"use client";

import { IconReport } from "@tabler/icons-react";
import { Dispatch, SetStateAction, useEffect } from "react";

interface ModalNotificationlProps {
    setIsModalOpen: Dispatch<SetStateAction<boolean>>;
    hasNotifications: boolean
}

export function ModalNotification({ hasNotifications, setIsModalOpen }: ModalNotificationlProps) {

    function handleDownloadReport() {
        try {
            localStorage.setItem("lastReportDate", new Date().toISOString());
            localStorage.removeItem("hasNewReport"); // Desativar notificação
            setIsModalOpen(false);

            console.log("Relatório baixado com sucesso!");
        } catch (error) {
            console.error("Erro ao atualizar localStorage:", error);
        }
    }

    return (
        <div className="flex items-center justify-center fixed inset-0 bg-black bg-opacity-50">
            <div className="bg-[#060B26] p-6 rounded-lg shadow-lg w-96">
                {hasNotifications ? (
                    <>
                        <div className="flex items-center gap-2 mb-4">                            
                            <IconReport  className="text-primary"/>
                            <h2 className="text-lg font-bold "> Relatório </h2>
                        </div>
                        
                        <p className="text-base text-zinc-400 mt-2">
                            Você ainda não baixou o relatório deste mês. Deseja baixá-lo agora?
                        </p>
                        <div className="flex justify-center gap-4 mt-6">
                            <button className="bg-tertiary rounded-lg px-4 py-2 hover:bg-opacity-50"
                                onClick={() => setIsModalOpen(false)}>
                                Cancelar
                            </button>
                            <button className="bg-primary text-white rounded-lg px-4 py-2 hover:bg-gradient-to-r from-blue-700 to-blue-900"
                                onClick={handleDownloadReport}>
                                Baixar Relatório
                            </button>
                        </div>
                    </>
                ) : (
                    <div className="flex flex-col items-center">
                        <div className="flex items-center gap-2 mb-4">                            
                            <IconReport  className="text-primary"/>
                            <h2 className="text-lg font-bold "> Relatórios</h2>
                        </div>

                        <p className="text-base text-zinc-400 mb-6">Nenhuma nova notificação no momento.</p>
                        <button className="bg-tertiary rounded-lg px-4 py-2 hover:bg-opacity-50"
                            onClick={() => setIsModalOpen(false)}>
                            Voltar
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}
