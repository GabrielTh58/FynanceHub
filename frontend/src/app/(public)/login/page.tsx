import Link from "next/link";
import { AuthForm } from "@/components/forms/AuthForm";

export default function Page() {
    return (
        <>
            <div className="text-center">
                <h2 className="text-3xl font-bold mb-1">Bem Vindo de Volta!</h2>
                <p className="text-base text-zinc-400">Entre com sua conta!</p>
            </div>

            <AuthForm type="login" />

            <div className="w-full flex items-center justify-between gap-4">
                <div className="flex-1 h-px w-full bg-zinc-600"></div>
                <span className="text-zinc-400">ou</span>
                <div className="flex-1 h-px w-full bg-zinc-600"></div>
            </div>


            <div className="flex items-center justify-center w-12 h-12 rounded-full bg-slate-900 mt-5 mb-3">
                <Link href="#">G</Link>
            </div>

            <div className="text-sm">
                <p>Ainda não possui uma conta?
                    <Link className="font-bold text-blue-500 hover:text-blue-700 " href="/register"> Cadastre-se <span className="underline">aqui</span></Link>
                </p>
                <p className="text-zinc-400">Ou faça login pelo Google clicando no G acima</p>
            </div>
        </>
    )
}