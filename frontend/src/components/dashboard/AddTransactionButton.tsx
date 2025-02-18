interface TransactionButtonProps {
  children: React.ReactNode;
  icon?: React.ReactNode;
}

export function AddTransactionButton({ children, icon, }: TransactionButtonProps) {
  return (
    <button className="flex gap-2 items-center text-sm text-white py-1.5 px-4 rounded-lg
      bg-gradient-to-r from-[#121241] to-[#2E2EA7]
    ">
        {icon && icon}
        {children}
    </button>
  );
}
