import React from "react";

interface ModalProps {
    children: React.ReactNode
    handleClose?: () => void
    isGradient?: boolean
}

export function Modal({ children, handleClose, isGradient}: ModalProps) {
    return (

        <div 
            onClick={handleClose}
            className="flex items-center justify-center fixed inset-0 bg-black bg-opacity-50">
            <div className={`
                w-72 p-3 rounded-lg shadow-lg sm:w-96 sm:p-6
                ${isGradient ? "bg-custom-gradient-card" : "bg-[#060B26]"} rounded-`}
            >
                {children}
            </div>
        </div>
    )
}