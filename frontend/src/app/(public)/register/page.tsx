'use client'
import Link from "next/link";
import { AuthForm } from "@/components/forms/AuthForm";

export default function Page() {
    return (
        <>
            <div className="text-center">
                <h2 className="text-base font-bold mb-1 sm:text-lg md:text-2xl lg:text-3xl">Cadastrar</h2>
                <p className="text-xs text-zinc-400 sm:text-sm md:text-base">Preencha os campos abaixo!</p>
            </div>

            <AuthForm type="register" />

            <p className="text-base text-zinc-400 my-6">Ja possui uma conta?
                <Link href="/login" className="text-blue-500 ml-1 hover:text-blue-700">Faça Login</Link>
            </p>
        </>
    )
}