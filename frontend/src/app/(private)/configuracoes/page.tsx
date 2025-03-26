"use client"

import { useEffect, useState } from "react"
import { deleteUser, getUser } from "@/services/userServices"
import { SettingsNavLink } from "@/components/SettingNavLink"
import { SettingsInfoText } from "@/components/SettingsInfoText"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { ModalResetPassword } from "@/components/Modals/ModalResetPassword"
import { ModalConfirmation } from "@/components/Modals/ModalConfirmation"
import { ActionButton } from "@/components/buttons/AddTransactionButton"

interface User {
    id: number
    name: string
    email: string
    password: string
    createdAt: Date
}

export default function Page() {
    const [user, setUser] = useState<User | null>(null)
    const [isModalChangePasswordOpen, setIsModalChangePasswordOpen] = useState(false)
    const [isModalConfirmationOpen, setIsModalConfirmationOpen] = useState(false)

    const router = useRouter()

    const handleModalCloseChangePassword = () => setIsModalChangePasswordOpen(false)

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const data = await getUser()
                if (data) setUser(data)
            } catch (error) {
                console.error("Erro ao buscar usuário:", error)
            }
        }

        fetchUser()
    }, [])

    const handleDeleteUser = async () => {
        if (!user) return

        try {
            await deleteUser(user.id)
            localStorage.removeItem("token")
            setUser(null)
            setIsModalConfirmationOpen(false)
            router.replace("/login")
        } catch (e: any) {
            console.error("Erro ao excluir usuário:", e);
        }
    }

    return (
        <div className="flex flex-col items-center">
            <div className="sm:w-full">
                <nav className="flex items-center gap-14 text-lg mb-14">
                    <SettingsNavLink href="/configuracoes">Conta</SettingsNavLink>
                    <SettingsNavLink href="/configuracoes/aparencia">Aparência</SettingsNavLink>
                </nav>
            </div>

            <div className="flex flex-col justify-center sm:w-full sm:flex-row sm: sm:justify-between">
                <div className="order-2 flex flex-col gap-10 sm:order-1">
                    <SettingsInfoText title="Nome" value={user?.name || "Carregando..."} />
                    <SettingsInfoText title="Email" value={user?.email || "Carregando..."} />
                    <SettingsInfoText title="Senha" value="*********" />
                </div>

                <div className="order-1 w-44 h-40 mb-8 sm:mb-0  sm:w-56 sm:h-52 bg-custom-gradient-card sm:order-2 sm:mr-12">
                    <Image src="/logo.png" alt="logo" width={100} height={100} className="w-full" />
                </div>
            </div>

            <div className="flex items-center justify-center gap-3 mt-10 sm:justify-start sm:w-full">
                <ActionButton onClick={() => setIsModalChangePasswordOpen(true)}>
                    Modificar senha
                </ActionButton>

                <ActionButton onClick={() => setIsModalConfirmationOpen(true)}>
                    Excluir Conta
                </ActionButton>
            </div>


            {isModalChangePasswordOpen && (
                <ModalResetPassword handleModalClose={handleModalCloseChangePassword} />
            )}

            {isModalConfirmationOpen && (
                <ModalConfirmation
                    isOpen={isModalConfirmationOpen}
                    onClose={() => setIsModalConfirmationOpen(false)}
                    onConfirm={handleDeleteUser}
                    title="Tem certeza que deseja excluir sua conta?"
                    description="Esta ação não pode ser desfeita e todos os seus dados serão removidos permanentemente."
                    confirmText="Excluir"
                    cancelText="Cancelar"
                    icon
                />
            )}
        </div>
    )
}
