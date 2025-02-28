import Image from "next/image";
import logo from "/public/logo.png";
export default function Layout({ children }: any) {
    return (
        <section className="h-screen flex flex-col items-center justify-center bg-[url('/bg-login.png')]  bg-cover center bg-no-repeat">
            <div className="w-1/3 flex flex-col items-center justify-center rounded-lg bg-black bg-opacity-50 px-14 py-6">
                <div className="flex flex-col items-center mb-12">
                    <Image src={logo} alt="logo" width={90} height={90} />
                    <h1 className="text-3xl text-white font-bold">
                        <span className="primary-gradient bg-clip-text text-transparent">Fy</span>nanceHub
                    </h1>
                </div>

                {children}
            </div>
        </section>
    )
}