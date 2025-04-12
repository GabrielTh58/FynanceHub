interface FilterButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode
  className?: string
}

export function FilterButton({ children, className, ...props }: FilterButtonProps) {
  return (
    <button
      {...props}
      className={`w-48 h-12 rounded-xl font-semibold text-sm border ${className || ""}`}
    >
      {children}
    </button>
  )
}
