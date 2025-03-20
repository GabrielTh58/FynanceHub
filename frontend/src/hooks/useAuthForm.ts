import { login, registerUser } from "@/services/authService";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";

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

type tTypeForm = "login" | "register"

export function useAuthForm({ type }: { type: tTypeForm }) {
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
    return { isLogin, register, handleSubmit, onSubmit, errors };

}