'use client'
import Link from "next/link";
import { AuthForm } from "@/components/auth_forms/AuthForm";

export default function Page() {
    return (
        <>
            <div className="text-center">
                <h2 className="text-3xl font-bold mb-1 x">Cadastrar</h2>
                <p className="text-base text-zinc-400">Preencha os campos abaixo!</p>
            </div>

            <AuthForm type="register" />

            <p className="text-base text-zinc-400 my-6">Ja possui uma conta?
                <Link href="/login" className="text-blue-500 hover:text-blue-700"> Faça Login</Link>
            </p>
        </>
    )
}