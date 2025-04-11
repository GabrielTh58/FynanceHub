import { IconEye, IconEyeOff, IconMail, IconX } from "@tabler/icons-react";
import { useResetPassword } from "@/hooks/useResetPassword";
import { InputFields } from "../Forms/InputFields";
import { ButtonForm } from "../Buttons/ButtonForm";
import { Modal } from "./Modal";
import { useState } from "react";
interface ModalFormProps {
    handleModalClose: () => void
}

export function ModalResetPassword({ handleModalClose }: ModalFormProps) {
    const [isCurrentPasswordVisible, setIsCurrentPasswordVisible] = useState(false)
    const [isNewPasswordVisible, setIsNewPasswordVisible] = useState(false)   

    const { register, handleSubmit, errors, onSubmit } = useResetPassword()

    const handleCurrentPasswordVisible = () => setIsCurrentPasswordVisible(!isCurrentPasswordVisible)
    const handleNewPasswordVisible = () => setIsNewPasswordVisible(!isNewPasswordVisible)

    return (
        <Modal isGradient handleClose={handleModalClose}>
            <div className="flex flex-col gap-6">
                <div className="flex items-center justify-between w-full">
                    <h3 className="w-full text-2xl text-center font-bold">Alterar Senha</h3>
                    <button
                        onClick={() => handleModalClose()}
                        className="rounded-full p-[1px] cursor-pointer hover:bg-red-600"
                    >
                        <IconX />
                    </button>
                </div>

                <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="flex flex-col gap-5"
                >
                    <div>
                        <InputFields
                            register={register("email")}
                            label="Email"
                            placeholder="example@mail.com"
                            name="email"
                            type="email"
                            icon={<IconMail stroke={1} />}
                        />
                        {errors.email && <span className="text-sm text-red-500">{String(errors.email.message)}</span>}
                    </div>

                    <div>
                        <InputFields
                            label="Senha Atual"
                            name="currentPassword"
                            type="password"
                            typeVisible={isCurrentPasswordVisible ? "text" : "password"}
                            icon={isCurrentPasswordVisible ? <IconEye stroke={1} /> : <IconEyeOff stroke={1} />}
                            register={register("currentPassword")}
                            iconAction={handleCurrentPasswordVisible}
                        />
                        {errors.currentPassword && <span className="text-sm text-red-500">{String(errors.currentPassword.message)}</span>}
                    </div>

                    <div>
                        <InputFields
                            label="Nova Senha"
                            name="newPassword"
                            type="password"
                            typeVisible={isNewPasswordVisible ? "text" : "password"}
                            icon={isNewPasswordVisible ? <IconEye stroke={1} /> : <IconEyeOff stroke={1} />}
                            register={register("newPassword")}
                            iconAction={handleNewPasswordVisible}
                        />
                        {errors.newPassword && <span className="text-sm text-red-500">{String(errors.newPassword.message)}</span>}
                    </div>

                    <ButtonForm>Alterar</ButtonForm>
                </form>
            </div>
        </Modal>
    )
}