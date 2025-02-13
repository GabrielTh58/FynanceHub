'use client'
import { InputFields } from "./InputFields";
import { ButtonForm } from "../shared/ButtonForm";
import { useForm } from "react-hook-form";
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { registerUser } from "@/services/authService";
import { useRouter } from "next/navigation";

const userRegisterFormSchema = z.object({
    name: z.string().min(3, { message: "O nome deve ter pelo menos 3 caracteres" }),
    email: z.string().email({ message: "Digite um email válido" }),
    password: z.string().min(6, { message: "A senha deve ter pelo menos 6 caracteres" })
});


export type TUserRegisterDataForm = z.infer<typeof userRegisterFormSchema>

export function UserRegisterForm() {
    const router = useRouter()

    const { register, handleSubmit,  formState: { errors } } = useForm<TUserRegisterDataForm>({
        resolver: zodResolver(userRegisterFormSchema)
    });

    async function handleCreateUser(data: TUserRegisterDataForm) {
        const userCreated = await registerUser(data);
        if(userCreated){
            router.push('/auth/login')
        }
    }

    return (
        <form onSubmit={handleSubmit(handleCreateUser)} className="w-full flex flex-col gap-4 text-xl mb-12">
            <div>
                <InputFields
                    register={register('name')}
                    label="Nome"
                    placeholder="Digite seu nome"
                    id="name"
                    type="text"
                />
                {errors.name && <span className="text-sm text-red-500">{errors.name.message}</span>}
            </div>
            <div>
                <InputFields
                    register={register('email')}
                    label="Email"
                    placeholder="Digite seu email"
                    id="email"
                    type="email"
                />
                {errors.name && <span className="text-sm text-red-500">{errors.name.message}</span>}
            </div>
            <div>
                <InputFields
                    register={register('password')}
                    label="Senha"
                    placeholder="Digite a senha"
                    id="password"
                    type="password"
                />
                {errors.name && <span className="text-sm text-red-500">{errors.name.message}</span>}
            </div>

            <ButtonForm>Cadastrar-se</ButtonForm>
        </form>

    )
}