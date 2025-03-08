import { SideBar } from "@/components/dashboard/SideBar";
import { Header } from "@/components/Header";
import React from "react";

export default function Layout({ children }: any) {
    return (
        <div className="flex min-h-screen bg-gray-950">
            <SideBar />
            <main className="w-full py-6 px-6 bg-gray-950">
                <Header />
                {children}
            </main>

        </div>
    )
}