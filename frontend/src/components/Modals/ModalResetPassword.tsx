import { IconEye, IconMail, IconX } from "@tabler/icons-react";
import { useResetPassword } from "@/hooks/useResetPassword";
import { InputFields } from "../forms/InputFields";
import { ButtonForm } from "../buttons/ButtonForm";
import { Modal } from "./Modal";
interface ModalFormProps {
    handleModalClose: () => void
}

export function ModalResetPassword({ handleModalClose }: ModalFormProps) {
    const { register, handleSubmit, errors, onSubmit } = useResetPassword()

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
                            icon={<IconEye stroke={1} />}
                            register={register("currentPassword")}
                        />
                        {errors.currentPassword && <span className="text-sm text-red-500">{String(errors.currentPassword.message)}</span>}
                    </div>

                    <div>
                        <InputFields
                            label="Nova Senha"
                            name="newPassword"
                            type="password"
                            icon={<IconEye />}
                            register={register("newPassword")}
                        />
                        {errors.newPassword && <span className="text-sm text-red-500">{String(errors.newPassword.message)}</span>}
                    </div>

                    <ButtonForm>Alterar</ButtonForm>
                </form>
            </div>
        </Modal>
    )
}