import Link from "next/link";
import { InputFields } from "./InputFields";
import { ButtonForm } from "../shared/ButtonForm";
import { useForm } from "react-hook-form";
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { registerUser } from "@/services/authService";
import { useRouter } from "next/navigation";

const registerFormSchema = z.object({
    name: z.string().min(3),
    email: z.string().email(),
    password: z.string().min(6)
})

export type TRegisterDataForm = z.infer<typeof registerFormSchema>
export function RegisterUserForm() {
    const router = useRouter()
    
    const { register, handleSubmit } = useForm<TRegisterDataForm>({
        resolver: zodResolver(registerFormSchema)
    });

    async function onSubmit (data: TRegisterDataForm) {
        try{
            const userCreated = await registerUser(data)
            if(userCreated){
                router.push('/auth/login')
            }            
        }catch(e){
            console.error(e)
            alert("Erro ao logar");
        }
    } 

    return (      

            <form onSubmit={handleSubmit(onSubmit)} className="w-full flex flex-col gap-4 text-xl mb-12">
                <div>
                   <InputFields 
                        register={register('name')}
                        label="Nome" 
                        placeholder="Digite seu nome" 
                        name="name" 
                        type="text" 
                    />
                </div>
                <div>
                    <InputFields 
                        register={register('email')}
                        label="Email" 
                        placeholder="Digite seu email" 
                        name="email" 
                        type="email" 
                    />
                </div>
                <div>
                    <InputFields 
                        register={register('password')}
                        label="Senha" 
                        placeholder="Digite a senha" 
                        name="password" 
                        type="password" 
                    />
                </div>

                <ButtonForm>Cadastrar-se</ButtonForm>
            </form>
            

    )
}