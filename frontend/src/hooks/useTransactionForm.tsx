import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import Cookies from "js-cookie";
import { useForm } from "react-hook-form";
import { createTransaction } from "@/services/transactionService";


const modalFormSchema = z.object({
    description: z.string().min(3, "Descrição deve ter pelo menos 3 caracteres"),
    amount: z.coerce.number().min(1, "Valor deve ser maior que 0"),
    type: z.enum(['INCOME', 'EXPENSE']),
    category: z.enum([
        'SALES', 'REFUND', 'INVESTMENT', 'SUPPLIERS', 'OPERATING_COSTS',
        'SALARIES', 'MARKETING', 'TAXES', 'EQUIPMENT', 'TRANSPORT', 'OTHER'
    ]),
});

type TModalForm = z.infer<typeof modalFormSchema>;


export function useModalForm(setIsModalOpen: () => void) {
    
    const { register, handleSubmit, formState: { errors } } = useForm<TModalForm>({
        resolver: zodResolver(modalFormSchema)
    });

    const userId = Cookies.get("userId");
    const parsedUserId = userId ? Number(userId) : null;

    async function handleCreateTransaction(data: TModalForm) {
        if (!parsedUserId || isNaN(parsedUserId)) {
            return alert("Usuário não autenticado!");
        }
        console.log(data);

        try {
            const transactionCreated = await createTransaction(
                data.description,
                data.amount,
                data.type,
                data.category,
                parsedUserId
            );

            if (transactionCreated) {
                setIsModalOpen();
            }
        } catch (e) {
            console.error(e);
            alert("Erro ao criar transação");
        }
    }

    function handleClose(e: React.MouseEvent) {
        if (e.target === e.currentTarget) {
            setIsModalOpen();
        }
    }

    return { register, handleSubmit, errors, handleCreateTransaction, handleClose };

}