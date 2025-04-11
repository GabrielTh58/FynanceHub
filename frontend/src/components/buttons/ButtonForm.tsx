interface ButtonFormProps {
    children: React.ReactNode
}

export function ButtonForm({ children }: ButtonFormProps) {
    return (
        <button
            type="submit"
            className="w-full  py-2 rounded-lg text-base mt-4 btn-gradient-auth md:h-12 md:py-2 md:text-lg">
            {children}
        </button>
    )
}