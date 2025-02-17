import { AnalyticsCards } from "@/components/dashboard/AnalyticsCards";
import { IconArrowRight, IconMoneybag } from "@tabler/icons-react";

export default function Page() {
    return (
        <>
            <section className="flex items-center gap-4 mb-5">
                <AnalyticsCards title="Saldo" value="50,00" icon={<IconMoneybag className="text-blue-500" />} />
                <AnalyticsCards title="Entrada" value="500,00" icon={<IconMoneybag className="text-blue-500" />} />
                <AnalyticsCards title="Saída" value="00,00" icon={<IconMoneybag className="text-blue-500" />} />
            </section>

            <section>
                <div className="grid grid-cols-4 gap-4 h-[400px]">
                    <div className="col-span-2 flex flex-col bg-[url('/background.png')] bg-center bg-contain bg-no-repeat py-9 pl-7 rounded-2xl">
                        <div className="col-span-2 flex flex-col flex-1">
                            <div className="flex flex-col items-start ">
                                <p className="text-zinc-400 text-sm">Bem vindo de volta</p>
                                <p className="font-bold text-2xl mb-4 mt-2">Gabriel Correia</p>
                                <p className="text-zinc-400 text-sm">Fico feliz em vê-lo novamente</p>
                            </div>
                        </div>

                        <button className="w-36 flex justify-between items-center text-xs 
                                hover:text-blue-400  
                            ">
                            Registrar Transação
                            <IconArrowRight className="w-4 h-4" />
                        </button>
                    </div>
                </div>
            </section>
        </>
    )
}