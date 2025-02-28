import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { InputFields } from "../forms/InputFields";
import { ButtonForm } from "../shared/ButtonForm";
import { createTransaction } from "@/services/transactionService";
import Cookies from "js-cookie";

interface ModalFormProps {
    setIsModalOpen: () => void;
}

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

export function ModalForm({ setIsModalOpen }: ModalFormProps) {
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

    return (
        <div className="absolute w-1/4 flex flex-col items-center justify-center rounded-lg bg-zinc-900 px-14 py-6">
            <h3 className="text-2xl font-bold">Criar Transação</h3>
            <form onSubmit={handleSubmit(handleCreateTransaction)} className="w-full flex flex-col gap-6 text-xl mt-10 mb-6">
                
                {/* Descrição */}
                <div className="flex flex-col">
                    <InputFields
                        register={register('description')}
                        label="Descrição"
                        name="description"
                        type="text"
                    />
                    {errors.description && <span className="text-sm text-red-500">{errors.description.message}</span>}
                </div>

                {/* Valor */}
                <div className="flex flex-col">
                    <InputFields
                        register={register('amount')}
                        label="Valor"
                        name="amount"
                        type="number"
                    />
                    {errors.amount && <span className="text-sm text-red-500">{errors.amount.message}</span>}
                </div>

                {/* Tipo */}
                <div className="flex flex-col">
                    <label htmlFor="type" className="text-zinc-400">Tipo</label>
                    <select {...register('type', { required: "O tipo é obrigatório" })} id="type" className="flex justify-between items-center text-base text-zinc-400 rounded-lg bg-zinc-950 p-3 outline-none">
                        <option value="">Selecione</option>
                        <option value="INCOME">Entrada</option>
                        <option value="EXPENSE">Saída</option>
                    </select>
                    {errors.type && <span className="text-sm text-red-500">{errors.type.message}</span>}
                </div>

                {/* Categoria */}
                <div className="flex flex-col">
                    <label htmlFor="category" className="text-zinc-400">Categoria</label>
                    <select {...register('category', { required: "A categoria é obrigatória" })} id="category" className="flex justify-between items-center text-base text-zinc-400 rounded-lg bg-zinc-950 p-3 outline-none">
                        <option value="">Selecione</option>
                        <option value="SALES">Vendas</option>
                        <option value="REFUND">Reembolso</option>
                        <option value="INVESTMENT">Investimento</option>
                        <option value="SUPPLIERS">Fornecedores</option>
                        <option value="OPERATING_COSTS">Custos Operacionais</option>
                        <option value="SALARIES">Salários</option>
                        <option value="MARKETING">Marketing</option>
                        <option value="TAXES">Impostos</option>
                        <option value="EQUIPMENT">Equipamentos</option>
                        <option value="TRANSPORT">Transporte</option>
                        <option value="OTHER">Outro</option>
                    </select>
                    {errors.category && <span className="text-sm text-red-500">{errors.category.message}</span>}
                </div>

                {/* Botão de Envio */}
                <ButtonForm>Criar</ButtonForm>
            </form>
        </div>
    );
}
