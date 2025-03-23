import Image from "next/image";
import logo from "/public/logo.png";
interface LogoProps {
    width?: number;
    height?: number;
    className?: string
    textSize?: string
}

export function Logo({ width, height, className, textSize }: LogoProps) {
    return (
        <div className={`flex items-center justify-center gap-1 
            ${className ? className : ''}              
        `}>
            
            <Image src={logo} alt="logo" width={width} height={height}/>

            <h1 className={`${textSize ? textSize : 'text-3xl'} text-white font-bold`}>
                <span className="primary-gradient bg-clip-text text-transparent">Fy</span>nanceHub
            </h1>
        </div>
    )
}