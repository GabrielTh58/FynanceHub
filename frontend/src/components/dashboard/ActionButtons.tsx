interface ActionButtonsProps{
    children: React.ReactNode
}

export function ActionButtons({children}: ActionButtonsProps){
    return(
        <button className="
            min-w-72 h-16 rounded-lg text-center p-4
            bg-gradient-to-br from-[#060B26]/[0.74] to-[#1A1F37]/[0.50] hover:bg-slate-800 
        ">
            {children}
        </button>
    )
}