import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { useForm } from "react-hook-form"
import { createTransaction } from "@/services/transactionService"
import { useTransaction } from "./useTransaction"


const modalFormSchema = z.object({
    description: z.string().min(3, "Descrição deve ter pelo menos 3 caracteres"),
    amount: z.coerce.number().min(1, "Valor deve ser maior que 0"),
    type: z.enum(['INCOME', 'EXPENSE']),
    category: z.enum([
        'SALES', 'REFUND', 'INVESTMENT', 'SUPPLIERS', 'OPERATING_COSTS',
        'SALARIES', 'MARKETING', 'TAXES', 'EQUIPMENT', 'TRANSPORT', 'OTHER'
    ]),
})

type TModalForm = z.infer<typeof modalFormSchema>

export function useModalTransactionForm(handleModalClose: () => void) {
    const { transactions, setTransactions } = useTransaction()
    
    const { register, handleSubmit, formState: { errors } } = useForm<TModalForm>({
        resolver: zodResolver(modalFormSchema)
    })

    async function handleCreateTransaction(data: TModalForm) {
        try {
            const transactionCreated = await createTransaction(
                data.description,
                data.amount,
                data.type,
                data.category,                
            )

            if (transactionCreated) {
                setTransactions([...(transactions ?? []), transactionCreated])
                handleModalClose()
            }
        } catch (e) {
            console.error(e)
            alert("Erro ao criar transação")
        }
    }

    return { register, handleSubmit, errors, handleCreateTransaction }

}