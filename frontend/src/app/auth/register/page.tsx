'use client'
import { UserRegisterForm } from "@/components/forms/UserRegisterForm";
import Link from "next/link";

export default function Page() {
    return (
        <div className="h-screen flex flex-col items-center justify-center bg-zinc-950">
            <div className="w-1/3 flex flex-col items-center justify-center rounded-lg bg-zinc-900 px-14 py-6">
                <h2 className="text-lg font-bold mb-4">Cadastrar</h2>

                <UserRegisterForm />

                <p className="text-xl text-zinc-400">Ja possui uma conta? 
                    <Link href="/auth/login" className="text-green-600 hover:text-green-700"> Faça Login</Link>
                </p>
            </div>
        </div>
    )
}