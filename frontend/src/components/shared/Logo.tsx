import Image from "next/image";

interface LogoProps {
    width?: number;
    height?: number;
    className?: string
}

export function Logo({width, height, className}: LogoProps){
    return (
        <div className={`flex items-center justify-center gap-1 
            ${className ? className : ''}    
        `}>
            <Image src="/public/globe.png" alt="logo" width={width} height={height} />
            <h1 className="text-lg"><span className="text-green-600">Fy</span>nanceHub</h1>
        </div>
    )
}