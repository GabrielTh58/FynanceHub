import Image from "next/image";
import logo from "/public/logo.png";
interface LogoProps {
    className?: string
    textSize?: string
}

export function Logo({ className, textSize }: LogoProps) {
    return (
        <div className={`w-full flex  items-center gap-1 lg:flex-row
            ${className ? className : ''}              
        `}>
            <div className="flex flex-col items-center justify-center mx-auto">
                <Image src={logo} alt="logo" className="w-14 h-14" />
                <h1 className={`${textSize ? textSize : 'text-xl md:text-2xl'} text-white font-bold`}>
                    <span className="primary-gradient bg-clip-text text-transparent">Fy</span>nanceHub
                </h1>

            </div>
        </div>
    )
}

