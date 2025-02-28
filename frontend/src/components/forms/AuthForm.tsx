'use client'
import { IconEye, IconMail } from "@tabler/icons-react";
import Link from "next/link";
import { InputFields } from "./InputFields";
import { ButtonForm } from "../shared/ButtonForm";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { login, registerUser } from "@/services/authService";

const formSchemas = {
    login: z.object({
        email: z.string().email(),
        password: z.string().min(6)
    }),
    register: z.object({
        name: z.string().min(3, { message: "O nome deve ter pelo menos 3 caracteres" }),
        email: z.string().email({ message: "Digite um email válido" }),
        password: z.string().min(6, { message: "A senha deve ter pelo menos 6 caracteres" })
    })
};

type tTypeFOrm = "login" | "register";

export function AuthForm({ type }: { type: tTypeFOrm }) {
    const router = useRouter();
    const isLogin = type === "login";
    
    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: zodResolver(formSchemas[type])
    });

    async function onSubmit(data: any) {
        try {
            if (isLogin) {
                const token = await login(data.email, data.password);
                if (token) router.push("/");
            } else {
                const userCreated = await registerUser(data);
                if (userCreated) router.push("/login");
            }
        } catch (e) {
            console.error(e);
            alert(isLogin ? "Erro ao logar" : "Erro ao cadastrar-se");
        }
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="w-full flex flex-col gap-6 text-xl mt-10 mb-6">
            {!isLogin && (
                <div>
                    <InputFields
                        register={register("name")}
                        label="Nome"
                        placeholder="Digite seu nome"
                        name="name"
                        type="text"
                    />
                    {errors.name && <span className="text-sm text-red-500">{String(errors.name.message)}</span>}
                </div>
            )}

            <div>
                <InputFields
                    register={register("email")}
                    label="Email"
                    placeholder="Digite seu email"
                    name="email"
                    type="email"
                    icon={<IconMail stroke={1} />}
                />
                {errors.email && <span className="text-sm text-red-500">{String(errors.email.message)}</span>}
            </div>

            <div>
                <InputFields
                    register={register("password")}
                    label="Senha"
                    placeholder="Digite a senha"
                    name="password"
                    type="password"
                    icon={<IconEye stroke={1} />}
                />
                {errors.password && <span className="text-sm text-red-500">{String(errors.password.message)}</span>}
                {isLogin && (
                    <Link className="self-end text-xs text-zinc-400 mt-2" href="/auth/forgot-password">Esqueceu sua senha?</Link>
                )}
            </div>

            <ButtonForm>{isLogin ? "Login" : "Cadastrar-se"}</ButtonForm>
        </form>
    );
}
