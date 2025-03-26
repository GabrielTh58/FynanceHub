import Image from "next/image";
import logo from "/public/logo.png";
import { IconX } from "@tabler/icons-react";
import { useContext } from "react";
import { MenuContext } from "@/context/MenuContext";
interface LogoProps {
    className?: string
    textSize?: string
}

export function Logo({className, textSize }: LogoProps) {
    const { toggleMenu } = useContext(MenuContext)

    return (
        <div className={`w-full flex  items-center gap-1 lg:flex-row
            ${className ? className : ''}              
        `}>
            <button                
                onClick={toggleMenu}
                className="fixed w-6 h-6 self-start lg:hidden"
            >                
                <IconX className="text-white" />
            </button>

            <div className="flex flex-col items-center justify-center mx-auto">
                <Image src={logo} alt="logo" className="w-14 h-14" />
                <h1 className={`${textSize ? textSize : 'text-3xl'} text-white font-bold`}>
                    <span className="primary-gradient bg-clip-text text-transparent">Fy</span>nanceHub
                </h1>

            </div>

        </div>
    )
}