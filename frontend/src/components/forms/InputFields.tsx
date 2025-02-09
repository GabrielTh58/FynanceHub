import { useForm } from "react-hook-form"

interface InputFieldsProps {
    label: string
    placeholder: string
    id: string
    type: string
    icon?: React.ReactNode
    register?: any
}

export function InputFields({ label, placeholder, id, type, icon }: InputFieldsProps) {
    const { register, handleSubmit } = useForm();

    return (
        <>
            <label htmlFor={id} className="text-zinc-400">{label}</label>
            <div className="flex justify-between items-center rounded-lg bg-zinc-950 px-2">
            <input 
                {...(register ? register(id, { required: true }) : {})}                 
                id={id}
                type={type}
                placeholder={placeholder}
                className="w-full flex bg-zinc-950 py-2 rounded-lg px-2 outline-none" />
                {icon && (
                    icon                
                )}
            </div>
        </>
    )
}