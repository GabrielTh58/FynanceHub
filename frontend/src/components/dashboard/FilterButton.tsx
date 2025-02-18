interface TransactionButtonProps {
    children: React.ReactNode;
    icon?: React.ReactNode;
  }
  
  export function FilterButton({ children, icon, }: TransactionButtonProps) {
    return (
      <button className="flex gap-2 items-center text-sm text-zinc-300 rounded-lg py-1.5 px-4 
        bg-[#1a1f37]
      ">
          {children}
          {icon && icon}
      </button>
    );
  }
  