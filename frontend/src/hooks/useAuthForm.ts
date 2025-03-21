import { login, registerUser } from "@/services/authService";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { toast } from "react-toastify";

export type tTypeForm = "login" | "register";


const formSchemas = {
    login: z.object({
        email: z.string().email("Digite um email válido"),
        password: z.string().min(6, "A senha deve ter pelo menos 6 caracteres"),
    }),
    register: z.object({
        name: z.string().min(3, "O nome deve ter pelo menos 3 caracteres"),
        email: z.string().email("Digite um email válido"),
        password: z.string().min(6, "A senha deve ter pelo menos 6 caracteres"),
    }),
} as const;

type FormData<T extends tTypeForm> = z.infer<(typeof formSchemas)[T]>;

export function useAuthForm({ type }: { type: tTypeForm }) {
    const router = useRouter();
    const isLogin = type === "login";

    const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<FormData<typeof type>>({
        resolver: zodResolver(formSchemas[type]),
        mode: "onBlur",
    })

    const onSubmit = async (data: FormData<typeof type>) => {
        try {
            const response = isLogin
                ? await login(data.email, data.password)
                : await registerUser(data as FormData<"register">);

            if (response) {
                toast.success(isLogin ? "Login realizado com sucesso!" : "Cadastro realizado!");
                router.push(isLogin ? "/" : "/login");
            }
        } catch (e: any) {
            console.error("Erro na autenticação:", e);
            toast.error(e.response?.data?.error || "Credenciais inválidas.");
        }
    }

    return { isLogin, register, handleSubmit, onSubmit, errors, isSubmitting };
}
