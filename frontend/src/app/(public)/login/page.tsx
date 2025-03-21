import Link from "next/link";
import { AuthForm } from "@/components/auth_forms/AuthForm";

export default function Page() {
    return (
        <>
            <div className="text-center text-white">
                <h2 className="text-3xl font-bold mb-1">Bem Vindo de Volta!</h2>
                <p className="text-base text-zinc-400">Entre com sua conta!</p>
            </div>

            <AuthForm type="login" />

            <div className="w-full flex items-center justify-between gap-4">
                <div className="flex-1 h-px w-full bg-zinc-600"></div>
                <span className="text-zinc-400">ou</span>
                <div className="flex-1 h-px w-full bg-zinc-600"></div>
            </div>


            <div className="text-sm">
                <p>Ainda não possui uma conta?
                    <Link className="font-bold text-blue-500 hover:text-blue-700 " href="/register"> Cadastre-se <span className="underline">aqui</span></Link>
                </p>
            </div>
        </>
    )
}