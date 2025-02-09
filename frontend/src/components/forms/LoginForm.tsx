import { IconEye, IconMail } from "@tabler/icons-react"
import Image from "next/image"
import Link from "next/link"
import { InputFields } from "./InputFields"
import { ButtonForm } from "../shared/ButtonForm"
import { useForm } from "react-hook-form"

type TDataForm = { email:string, password:string }
export function LoginForm() {
    const { register, handleSubmit } = useForm<TDataForm>();

    function onSubmit (e: TDataForm) {
        console.log(e);
    } 


    return (
        <div className="w-1/3 flex flex-col items-center justify-center rounded-lg bg-zinc-900 px-14 py-6">
            <div className="mb-8">
                <Image src="/logo.png" alt="logo" width={100} height={100} />
                <h1 className="text-4xl"><span className="text-green-600">Fy</span>nanceHub</h1>
            </div>

            <h2 className="text-2xl font-bold">Entre com sua conta</h2>

            <form onSubmit={handleSubmit(onSubmit)} className="w-full flex flex-col gap-6 text-xl mt-10 mb-6">
                <div className="flex flex-col">
                    <InputFields 
                        register={register} 
                        label="Email" 
                        placeholder="Digite seu email" 
                        id="email" 
                        type="email" 
                        icon={<IconMail stroke={1} />}
                    />                   
                </div>

                <div className="flex flex-col">
                    <InputFields 
                        register={register}
                        label="Senha"
                        placeholder="Digite a senha"
                        id="password" 
                        type="password" 
                        icon={<IconEye stroke={1} />}
                    />
                    <Link className="self-end text-xs text-zinc-400 mt-2" href="/auth/forgot-password">Esqueceu sua senha?</Link>                   
                </div>

                <ButtonForm>Login</ButtonForm>
            </form>


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
    )
}