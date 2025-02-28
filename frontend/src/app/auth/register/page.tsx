'use client'
import Link from "next/link";
import { AuthForm } from "@/components/forms/AuthForm";

export default function Page() {
    return (
        <>
            <div className="self-start mb-6">
                <h2 className="text-3xl font-bold mb-1 x">Cadastrar</h2>
                <p className="text-base text-zinc-400">Preencha os campos abaixo!</p>
            </div>

            <AuthForm type="register" />

            <p className="text-xl text-zinc-400">Ja possui uma conta?
                <Link href="/auth/login" className="text-green-600 hover:text-green-700">Faça Login</Link>
            </p>
        </>
    )
}