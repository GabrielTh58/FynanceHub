import Link from "next/link";
import { AuthForm } from "@/components/components/forms/AuthForm";

export default function Page() {
    return (
        <>
            <div className="text-center text-white">
                <h2 className="text-base font-bold mb-1 sm:text-lg md:text-2xl lg:text-3xl">Bem Vindo de Volta!</h2>
                <p className="text-xs text-zinc-400 sm:text-sm md:text-base">Entre com sua conta!</p>
            </div>

            <AuthForm type="login" />

            <div className="text-xs md:text-sm">
                <p>Ainda não possui uma conta?
                    <Link className="font-bold text-blue-500 hover:text-blue-700 " href="/register"> Cadastre-se <span className="underline">aqui</span></Link>
                </p>
            </div>
        </>
    )
}