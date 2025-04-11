import axios from "axios"
import Cookies from "js-cookie"
import { jwtDecode } from "jwt-decode"

interface TRegisterDataForm {
    name: string
    email: string
    password: string
}

interface DecodedToken {
    id: number 
}

const api = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL
})

export async function registerUser(data: TRegisterDataForm) {
    try {
        const response = await api.post('/register', data)
        return response
    } catch (error) {
        console.error("Erro ao cadastrar usuário:", error)
        return null
    }
}

export async function login(email: string, password: string) {
    try {
        const response = await api.post('/login', { email, password })
        const token = response.data.token

        if (token) {
            Cookies.set("token", token, { expires: 7, path: "/" })

            const decoded: DecodedToken = jwtDecode(token)
            const userId = decoded.id 

            Cookies.set("userId", String(userId), { expires: 7, path: "/" })

            return userId
        }
        return null
    } catch (error: any) {
        console.error("Erro ao fazer login:", error)
        if (error.response && error.response.data && error.response.data.error) {
            throw new Error(error.response.data.error)
        }

        throw new Error("Erro ao tentar fazer login. Tente novamente mais tarde.")
    }
}

export function logout() {
    try{
        Cookies.remove("token")
        Cookies.remove("userId")
        
    } catch (error) {
        console.error("Erro ao fazer logout:", error)
    }
}