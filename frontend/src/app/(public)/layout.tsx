import Image from "next/image";
import logo from "/public/logo.png";
import backImage from "/public/bg-login.png";
import { Logo } from "@/components/shared/Logo";
export default function Layout({ children }: any) {
    return (
        <section className="h-screen flex flex-col items-center justify-center bg-cover bg-center bg-no-repeat"
            style={{ backgroundImage: `url(${backImage.src})` }}
        >
            <div className="w-1/3 flex flex-col items-center justify-center rounded-lg bg-black bg-opacity-50 px-14 py-6">
                <div className="mb-12">
                    <Logo width={80} height={80} className="self-start" />
                </div>

                {children}
            </div>
        </section>
    )
}