import { InputFields } from "../auth_forms/InputFields";
import { ButtonForm } from "../shared/ButtonForm";
import { IconX } from "@tabler/icons-react";
import { useModalForm } from "@/hooks/useTransactionForm";
import { useState } from "react";

interface ModalFormProps {
    setIsModalOpen: () => void;
}
export function ModalForm({ setIsModalOpen }: ModalFormProps) {
    const { register, handleSubmit, errors, handleCreateTransaction, handleClose } = useModalForm(setIsModalOpen);
    const [type, setType] = useState("INCOME");
    const [category, setCategory] = useState("");

    const incomeCategories = ["SALES", "REFUND", "INVESTMENT"];
    const expenseCategories = ["SUPPLIERS", "OPERATING_COSTS", "SALARIES", "MARKETING", "TAXES", "EQUIPMENT", "TRANSPORT", "OTHER"];
    const categories = type === "INCOME" ? incomeCategories : expenseCategories;
   
    return (
        <div
            onClick={handleClose}
            className="
            absolute w-1/4 flex flex-col items-center justify-center rounded-lg
            bg-custom-gradient-card px-14 py-6
        ">
            <div className="flex justify-between items-center w-full">
                <h3 className="w-full text-2xl text-center font-bold">Criar Transação</h3>
                <button onClick={() => setIsModalOpen()}>
                    <IconX />
                </button>
            </div>

            <form onSubmit={handleSubmit(handleCreateTransaction)}
                className="w-full flex flex-col gap-6 text-base text-white mt-10 mb-6 
            ">
                <div className="flex flex-col">
                    <InputFields
                        register={register('description')}
                        label="Descrição"
                        name="description"
                        type="text"
                    />
                    {errors.description && <span className="text-sm text-red-500">{errors.description.message}</span>}
                </div>

                <div className="flex flex-col">
                    <InputFields
                        register={register('amount')}
                        label="Valor"
                        name="amount"
                        type="number"
                    />
                    {errors.amount && <span className="text-sm text-red-500">{errors.amount.message}</span>}
                </div>

                <div className="flex flex-col">
                    <label htmlFor="type" className="mb-1">Tipo</label>
                    <select
                        {...register('type', { required: "O tipo é obrigatório", onChange: (e) => setType(e.target.value) })}
                        value={type}
                        id="type"
                        className="
                            flex justify-between items-center text-base text-zinc-400
                            rounded-lg bg-transparent border border-slate-700 p-3 outline-none
                    ">
                        <option value="">Selecione</option>
                        <option value="INCOME">Entrada</option>
                        <option value="EXPENSE">Saída</option>
                    </select>
                    {errors.type && <span className="text-sm text-red-500">{errors.type.message}</span>}
                </div>

                <div className="flex flex-col">
                    <label htmlFor="category" className="mb-1">Categoria</label>
                    <select
                        {...register('category', { required: "A categoria é obrigatória", onChange: (e) => setCategory(e.target.value) })} 
                        value={category}
                        id="category"
                        className="
                            flex justify-between items-center text-base text-zinc-400
                            rounded-lg bg-transparent border border-slate-700 p-3 outline-none
                            active:bg-slate-600
                    ">
                        <option value="">Selecione</option>
                        {categories.map((category, index) => (
                            <option key={category} value={category}>{category}</option>
                        ))}
                    </select>
                    {errors.category && <span className="text-sm text-red-500">{errors.category.message}</span>}
                </div>

                <ButtonForm>Criar</ButtonForm>
            </form>
        </div>
    );
}
