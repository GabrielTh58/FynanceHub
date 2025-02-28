import axios from "axios";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";
import { TRegisterDataForm } from "@/components/forms/RegisterUserForm"; 

// Criar uma instância do Axios com URL base
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

interface DecodedToken {
    id: number; // Certifique-se de que o backend retorna o ID do usuário no token
}

export async function login(email: string, password: string) {
    try {
        const response = await api.post('/login', { email, password });
        const token = response.data.token;

        if (token) {
            Cookies.set("token", token, { expires: 7, path: "/" });

            const decoded: DecodedToken = jwtDecode(token);
            const userId = decoded.id; // Pegando o ID do usuário no token

            Cookies.set("userId", String(userId), { expires: 7, path: "/" });

            return userId;
        }
        return null;
    } catch (error) {
        console.error("Erro ao fazer login:", error);
        return null;
    }
}

// export function logout() {
//     Cookies.remove("token");
//     const router = useRouter();
//     router.push('/auth/login'); 
// }
