'use client'
import { IconEye, IconMail } from "@tabler/icons-react"
import Link from "next/link"
import { InputFields } from "./InputFields"
import { ButtonForm } from "../shared/ButtonForm"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { login } from "@/services/authService"
import { useRouter } from "next/navigation"

const loginFormSchema = z.object({
    email: z.string().email(),
    password: z.string().min(6)
})

type TLoginDataForm = z.infer<typeof loginFormSchema>
export function LoginForm() {
    const router = useRouter()

    const { register, handleSubmit, formState: { errors } } = useForm<TLoginDataForm>({
        resolver: zodResolver(loginFormSchema)
    });


    async function handleUserLogin(data: TLoginDataForm) {
        try{    
            const token = await login(data.email, data.password);
            console.log(token);        
                
            if(token){
                router.push('/dashboard')
            }
        }catch(e){
            console.error(e);
            alert("Erro ao logar");
        }
    }


    return (
        <form onSubmit={handleSubmit(handleUserLogin)} className="w-full flex flex-col gap-6 text-xl mt-10 mb-6">
            <div className="flex flex-col">
                <InputFields
                    register={register('email')}
                    label="Email"
                    placeholder="Digite seu email"
                    id="email"
                    type="email"
                    icon={<IconMail stroke={1} />}
                />
                {errors.email && <span className="text-sm text-red-500">{errors.email.message}</span>}
            </div>

            <div className="flex flex-col">
                <InputFields
                    register={register('password')}
                    label="Senha"
                    placeholder="Digite a senha"
                    id="password"
                    type="password"
                    icon={<IconEye stroke={1} />}
                />
                {errors.password && <span className="text-sm text-red-500">{errors.password.message}</span>}
                <Link className="self-end text-xs text-zinc-400 mt-2" href="/auth/forgot-password">Esqueceu sua senha?</Link>
            </div>

            <ButtonForm>Login</ButtonForm>
        </form>
    )
}