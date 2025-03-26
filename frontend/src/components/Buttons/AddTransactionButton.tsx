interface ActionButtonProps {
  children: React.ReactNode;
  icon?: React.ReactNode;
  onClick?: () => void
}

export function ActionButton({ children, icon, onClick }: ActionButtonProps) {
  return (
    <button onClick={onClick}
      className="flex gap-2 items-center text-sm text-white py-1.5 px-4 rounded-lg
                bg-gradient-to-r from-[#121241] to-[#2E2EA7] 
                hover:bg-blue-950
    ">
        {icon && icon}
        {children}
    </button>
  );
}
            