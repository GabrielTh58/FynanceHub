interface ActionButtonProps {
    onClick: () => void
    children: React.ReactNode
    className?: string
}

export function ActionButton({ onClick, children, className}: ActionButtonProps) {
    return (
        <button
            onClick={onClick}
            className={`text-xs rounded-md bg-custom-gradient py-2 px-2 mt-8 ${className}`}
        >
            {children}
        </button>
    );
}
