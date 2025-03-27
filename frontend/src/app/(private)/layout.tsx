'use client'

import { SideBar } from "@/components/dashboard/sidebar/SideBar"
import { Header } from "@/components/layout/Header"

export default function Layout({ children }: any) {

    return (
        <div className="flex min-h-screen bg-gray-950">           
            <SideBar />
            <main 
                className={`w-full p-4 bg-gray-950 transition-all duration-300 }`}
            >
                <Header />
                {children}
            </main>
        </div>
    )
}