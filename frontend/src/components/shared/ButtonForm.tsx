interface ButtonFormProps {
    children: React.ReactNode
}

export function ButtonForm({ children }: ButtonFormProps) {
    return (
        <button
            type="submit"
            className="w-full h-12 py-2 rounded-lg primary-gradient hover:bg-green-700">
            {children}
        </button>
    )
}