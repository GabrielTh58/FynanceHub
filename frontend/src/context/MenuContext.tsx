'use client'

import { createContext, useEffect, useState } from "react"

interface IMenuContext {
    isMenuOpen: boolean,
    toggleMenu: () => void
}

export const MenuContext = createContext({} as IMenuContext)

export function MenuProvider({ children }: any) {
    const [isMenuOpen, setIsMenuOpen] = useState(false)

    const toggleMenu = () =>  setIsMenuOpen(!isMenuOpen)

    return(
        <MenuContext.Provider value={{isMenuOpen, toggleMenu}}>
            {children}
        </MenuContext.Provider>
    )
} 