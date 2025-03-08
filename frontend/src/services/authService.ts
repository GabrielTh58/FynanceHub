import axios from "axios";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";

interface TRegisterDataForm {
    name: string;
    email: string;
    password: string;
}

interface DecodedToken {
    id: number; 
}

const api = axios.create({
    baseURL: "http://localhost:5000/"
});

export async function registerUser(data: TRegisterDataForm) {
    try {
        const response = await api.post('/register', data);
        console.log("Usuário criado:", response.data);
        return true;
    } catch (error) {
        console.error("Erro ao cadastrar usuário:", error);
        return false;
    }
}

export async function login(email: string, password: string) {
    try {
        const response = await api.post('/login', { email, password });
        const token = response.data.token;

        if (token) {
            Cookies.set("token", token, { expires: 7, path: "/" });

            const decoded: DecodedToken = jwtDecode(token);
            const userId = decoded.id; 

            Cookies.set("userId", String(userId), { expires: 7, path: "/" });

            return userId;
        }
        return null;
    } catch (error) {
        console.error("Erro ao fazer login:", error);
        return null;
    }
}
export function logout() {
    try{
        Cookies.remove("token");
        Cookies.remove("userId");
    } catch (error) {
        console.error("Erro ao fazer logout:", error);
    }
}