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
            <div className={`${isGradient ? "bg-custom-gradient-card" : "bg-[#060B26]"}  p-6 rounded-lg shadow-lg w-96`}>
                {children}
            </div>
        </div>
    )
}
//bg-custom-gradient-card