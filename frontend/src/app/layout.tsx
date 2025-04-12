import type { Metadata } from "next"
import { Poppins } from "next/font/google"
import "./globals.css"
import { ToastContainer } from "react-toastify"
import { MenuProvider } from "@/context/MenuContext"

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-poppins",
})

export const metadata: Metadata = {
  title: "FynanceHub",
  description: "Aplicação para registrar entradas e despesas, visualizar o fluxo de caixa e gerar relatórios financeiros pessoais.",
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <MenuProvider>
        <body className={`${poppins.variable} antialiased`}>
          {children}
          <ToastContainer position="top-right" autoClose={3000} />
        </body>
      </MenuProvider>
    </html>
  )
}
