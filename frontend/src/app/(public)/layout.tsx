import backImage from "/public/bg-login.png";
import { Logo } from "@/components/layout/Logo";
export default function Layout({ children }: any) {
    return (
        <section className="h-screen flex flex-col items-center justify-center bg-cover bg-center bg-no-repeat"
            style={{ backgroundImage: `url(${backImage.src})` }}
        >
            <div className="2xl:w-1/3 flex flex-col items-center justify-center rounded-lg bg-black bg-opacity-50 lg:px-14 px-6 py-6">
                <div className="mb-6 md:mb-12">
                    <Logo className="self-start" />
                </div>

                {children}
            </div>
        </section>
    )
}