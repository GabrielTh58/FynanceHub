import { useState } from "react";

export function useModalConfirm() {
    const [isConfirmed, setIsConfirmed] = useState(false)

    return {isConfirmed, setIsConfirmed};
}