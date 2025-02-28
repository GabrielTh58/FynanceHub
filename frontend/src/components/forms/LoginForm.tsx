'use client'

export function LoginForm() {
    return (
        <div>
            login
        </div>


        // <form onSubmit={handleSubmit(handleUserLogin)} className="w-full flex flex-col gap-6 text-xl mt-10 mb-6">
        //     <div className="flex flex-col">
        //         <InputFields
        //             register={register('email')}
        //             label="Email"
        //             placeholder="Digite seu email"
        //             name="email"
        //             type="email"
        //             icon={<IconMail stroke={1} />}
        //         />
        //         {errors.email && <span className="text-sm text-red-500">{errors.email.message}</span>}
        //     </div>

        //     <div className="flex flex-col">
        //         <InputFields
        //             register={register('password')}
        //             label="Senha"
        //             placeholder="Digite a senha"
        //             name="password"
        //             type="password"
        //             icon={<IconEye stroke={1} />}
        //         />
        //         {errors.password && <span className="text-sm text-red-500">{errors.password.message}</span>}
        //         <Link className="self-end text-xs text-zinc-400 mt-2" href="/auth/forgot-password">Esqueceu sua senha?</Link>
        //     </div>

        //     <ButtonForm>Login</ButtonForm>
        // </form>
    )
}