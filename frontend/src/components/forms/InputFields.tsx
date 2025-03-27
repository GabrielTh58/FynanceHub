import React from "react"

interface InputFieldsProps {
    label: string
    placeholder?: string
    name: string
    type: string
    typeVisible?: string; 
    icon?: React.ReactNode
    register: any
    iconAction?: () => void
}

export function InputFields({ label, placeholder, name, type, typeVisible, icon, register, iconAction }: InputFieldsProps) {
     
    return (
        <>
            <label htmlFor={name} className="text-base font-medium text-white">{label}</label>
            <div className="flex justify-between items-center border border-slate-700 rounded-md px-2 mt-1">
                <input 
                    {...register}
                    name={name}
                    type={typeVisible || type}
                    placeholder={placeholder}
                    className="w-full flex bg-transparent py-2 rounded-lg px-2 outline-none placeholder:text-sm placeholder:text-zinc-500" />
                    {icon && (
                        <button type="button" onClick={iconAction}>
                            {icon}                
                        </button>
                    )}
            </div>
        </>
    )
}