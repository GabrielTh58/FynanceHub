interface ButtonFormProps {
    children: React.ReactNode
}

export function ButtonForm({ children }: ButtonFormProps) {
    return (
        <button
            type="submit"
            className="w-full h-12 py-2 rounded-lg  mt-4 bg-gradient-to-r from-blue-700 to-blue-900">
            {children}
        </button>
    )
}