'use client';

import { useEffect } from "react";
import { SideBar } from "@/components/Dashboard/sidebar/SideBar";
import { Header } from "@/components/Layout/Header";
import { toast } from "react-toastify";

export default function Layout({ children }: any) {
    useEffect(() => {
        const hasNewReport = localStorage.getItem("hasNewReport");

        if (hasNewReport === "true") {
            toast.success("Download Completo.");
            localStorage.setItem("hasNewReport", "false");
        }
    }, []);

    return (
        <div className="flex min-h-screen bg-gray-950">
            <SideBar />
            <main 
                className="w-full p-4 bg-gray-950 transition-all duration-300"
            >
                <Header />
                {children}
            </main>
        </div>
    );
}
