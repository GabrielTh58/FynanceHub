import {z} from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form';
import { resetPassword } from '@/services/userServices';

const changePasswordSchema = z.object({
    email: z.string().email({message: 'Digite um email válido'}),
    currentPassword: z.string().min(6, {message: 'A senha atual deve ter pelo menos 6 caracteres'}),
    newPassword: z.string().min(6, {message: 'A nova senha deve ter pelo menos 6 caracteres'}),
})

type ResetPasswordFormData = z.infer<typeof changePasswordSchema>;
export function useResetPassword() {
    const { register, handleSubmit, formState: { errors } } = useForm<ResetPasswordFormData>({
        resolver: zodResolver(changePasswordSchema)
    })

    async function onSubmit(data: ResetPasswordFormData) {
        try {
            const response = await resetPassword(data.email, data.currentPassword, data.newPassword);
            return response
        } catch (e) {
            console.error("Erro ao redefinir senha: ", e)
            return e
        }
    }
    

    return { register, handleSubmit, onSubmit, errors }
}