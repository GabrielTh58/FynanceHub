import { IconExclamationCircle, IconX } from "@tabler/icons-react";
import React from "react";
import { Modal } from "./Modal";

interface ModalConfirmationProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => void;
    title: string;
    description?: string;
    confirmText: string;
    cancelText: string;
    icon?: boolean
}

export function ModalConfirmation({
    isOpen,
    onClose,
    onConfirm,
    title,
    icon,
    description,
    confirmText = "Confirmar",
    cancelText = "Cancelar",
}: ModalConfirmationProps) {
    if (!isOpen) return null

    return (
        <Modal isGradient>
            <div className="flex flex-col gap-6">
                <div className="flex items-center justify-end w-full">
                    <button
                        onClick={() => onClose()}
                        className="rounded-full p-[1px] cursor-pointer hover:bg-red-600"
                    >
                        <IconX />
                    </button>
                </div>
            </div>

            <div className="mb-4">
                {icon && (
                    <IconExclamationCircle stroke={1} className="w-14 h-14 mx-auto text-primary" />
                )}
            </div>
            <div className="text-center">
                <h2 className="text-xl font-semibold">{title}</h2>
                {description && <p className="text-gray-400 mt-3">{description}</p>}
            </div>

            
            <div className="flex justify-center gap-4 mt-6">
                <button
                    onClick={onClose}
                    className="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400"
                >
                    {cancelText}
                </button>
                <button
                    onClick={onConfirm}
                    className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
                >
                    {confirmText}
                </button>
            </div>
        </Modal>
    )
}