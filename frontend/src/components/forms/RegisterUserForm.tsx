import Link from "next/link";
import { InputFields } from "./InputFields";
import { ButtonForm } from "../shared/ButtonForm";
import { useForm } from "react-hook-form";

type TDataForm = { name:string, email:string, password:string }
export function RegisterUserForm() {
    const { register, handleSubmit } = useForm<TDataForm>();
    function onSubmit (e: TDataForm) {
        console.log(e);
    } 

    return (
        <div className="w-1/3 flex flex-col items-center justify-center rounded-lg bg-zinc-900 px-14 py-6">
            <h2 className="text-lg font-bold mb-4">Cadastrar</h2>

            <form onSubmit={handleSubmit(onSubmit)} className="w-full flex flex-col gap-4 text-xl mb-12">
                <div>
                   <InputFields 
                        register={register}
                        label="Nome" 
                        placeholder="Digite seu nome" 
                        id="name" 
                        type="text" 
                    />
                </div>
                <div>
                    <InputFields 
                        register={register}
                        label="Email" 
                        placeholder="Digite seu email" 
                        id="email" 
                        type="email" 
                    />
                </div>
                <div>
                    <InputFields 
                        register={register}
                        label="Senha" 
                        placeholder="Digite a senha" 
                        id="password" 
                        type="password" 
                    />
                </div>

                <ButtonForm>Cadastrar-se</ButtonForm>
            </form>
            
            <p className="text-xl text-zinc-400">Ja possui uma conta? <Link href="/auth/login" className="text-green-600 hover:text-green-700">Faça Login</Link></p>
        </div>
    )
}