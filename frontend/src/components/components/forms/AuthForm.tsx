'use client'

import { IconEye, IconEyeOff, IconMail } from "@tabler/icons-react";
import Link from "next/link";
import { InputFields } from "@/components/components/forms/InputFields";
import { ButtonForm } from "@/components/buttons/ButtonForm";
import { useAuthForm } from "@/hooks/useAuthForm";
import { useState } from "react";

type tTypeForm = "login" | "register";

export function AuthForm({ type }: { type: tTypeForm }) {
    const [isPasswordVisible, setIsPasswordVisible] = useState(false)

    const { register, handleSubmit, errors, onSubmit, isLogin } = useAuthForm({ type })

    const handlePasswordVisible = () => setIsPasswordVisible(!isPasswordVisible)

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="w-full flex flex-col gap-5 text-xl mb-6 shadow-xl mt-6 md:mt-10">
            {!isLogin && (
                <div>
                    <InputFields
                        register={register("name")}
                        label="Nome"
                        placeholder="Digite seu nome"
                        name="name"
                        type="text"
                    />
                </div>
            )}

            <div>
                <InputFields
                    register={register("email")}
                    label="Email"
                    placeholder="example@mail.com"
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
                    placeholder="Pelo menos 6 caracteres"
                    name="password"
                    type="password"
                    typeVisible={isPasswordVisible ? "text" : "password"} 
                    icon={isPasswordVisible ? <IconEye stroke={1} /> : <IconEyeOff stroke={1} />}
                    iconAction={handlePasswordVisible}
                />
                {errors.password && <span className="text-sm text-red-500">{String(errors.password.message)}</span>}

                {isLogin && (
                    <p>
                        <Link className="self-end text-xs text-zinc-400 mt-2" href="/auth/forgot-password">Esqueceu sua senha?</Link>
                    </p>
                )}
            </div>

            <ButtonForm>{isLogin ? "Login" : "Cadastrar-se"}</ButtonForm>
        </form>
    )
}
