'use client'

import { SideBar } from "@/components/dashboard/sidebar/SideBar"
import { Header } from "@/components/layout/Header"
import { MenuContext } from "@/context/MenuContext"
import React, { useContext } from "react"

export default function Layout({ children }: any) {
    const { isMenuOpen } = useContext(MenuContext)

    return (
        <div className="flex min-h-screen bg-gray-950">           
            <SideBar />
            <main 
                className={`w-full p-4 bg-gray-950 transition-all duration-300 ${isMenuOpen ? "blur-sm z-5" : "blur-none"}`}
            >
                <Header />
                {children}
            </main>
        </div>
    )
}