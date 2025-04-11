import { useState } from "react";
import { FilterButton } from "../Buttons/FilterButton";
import { Modal } from "./Modal";

type TTypeTransaction = "INCOME" | "EXPENSE" | "ALL"

interface IModalFilterProps{
    handleModalFilterClose: () => void
    handleFilterTransaction: (type: TTypeTransaction) => void
}
export function ModalFilter({handleModalFilterClose, handleFilterTransaction}: IModalFilterProps) {
    const [type, setType] = useState<TTypeTransaction>("ALL")

    const handleApplyFilter = (type: TTypeTransaction) => {
        handleFilterTransaction(type)
        handleModalFilterClose()
    } 
        

    return (
        <Modal handleClose={handleModalFilterClose}>
            <div className="flex items-center justify-between mb-7">
                <span className="text-base text-zinc-300">Filtrar por:</span>

                <button onClick={() => setType("ALL")} 
                    className="text-base font-semibold text-primary
                ">
                    Reset
                </button>
            </div>

            <div className="flex items-center gap-3">
                <FilterButton onClick={() => setType("INCOME")}
                    className={`${type === "INCOME" ? "text-primary border-primary" : ""}
                `}>
                        Entrada
                </FilterButton>

                <FilterButton
                    onClick={() => setType("EXPENSE")}
                    className={`${type === "EXPENSE" ? "text-primary border-primary" : ""}
                `}>
                    Saída
                </FilterButton>

                <FilterButton
                    onClick={() => setType("ALL")}
                    className={`${type === "ALL" ? "text-primary border-primary" : ""}
                `}>
                    Todos
                </FilterButton>
            </div>

            <div className="w-full h-[1px] bg-zinc-300 my-6"></div>

            <div className="flex items-center gap-3">
                <FilterButton onClick={handleModalFilterClose}
                    className="text-primary bg-slate-200 rounded-md border-none
                ">
                    Cancelar
                </FilterButton>

                <FilterButton 
                    className="border-none bg-custom-gradient" onClick={() => handleApplyFilter(type)}>
                    Aplicar Filtro
                </FilterButton>
            </div>
        </Modal>
    )
}