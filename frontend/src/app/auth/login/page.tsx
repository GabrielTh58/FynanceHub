import { LoginForm } from "@/components/forms/LoginForm";
import Image from "next/image";
import Link from "next/link";

export default function Page() {
    return (
        <div>
            <div className="h-screen flex flex-col items-center justify-center bg-zinc-950">
                <div className="w-1/3 flex flex-col items-center justify-center rounded-lg bg-zinc-900 px-14 py-6">
                    <div className="mb-8">
                        <Image src="/logo.png" alt="logo" width={100} height={100} />
                        <h1 className="text-4xl"><span className="text-green-600">Fy</span>nanceHub</h1>
                    </div>

                    <h2 className="text-2xl font-bold">Entre com sua conta</h2>
                    
                    <LoginForm />

                    <div className="w-full flex items-center justify-between gap-4">
                        <div className="flex-1 h-px w-full bg-zinc-600"></div>
                        <span className="text-zinc-400">ou</span>
                        <div className="flex-1 h-px w-full bg-zinc-600"></div>
                    </div>


                    <div className="flex items-center justify-center w-12 h-12 rounded-full bg-[#ef4444] mt-5 mb-3">
                        <Link href="#">G</Link>
                    </div>

                    <div className="text-sm">
                        <p>Ainda não possui uma conta?
                            <Link className="font-bold text-green-600 hover:text-green-700 " href="/auth/register"> Cadastre-se <span className="underline">aqui</span></Link>
                        </p>
                        <p className="text-zinc-400">Ou faça login pelo Google clicando no G acima</p>
                    </div>

                </div>
            </div>
        </div>
    )
}