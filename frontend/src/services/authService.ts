import { TUserRegisterDataForm } from "@/components/forms/UserRegisterForm";
import Cookies from "js-cookie";
import axios from "axios";

export async function registerUser(data: TUserRegisterDataForm){
    try{
        const response = await axios.post('http://localhost:5000/auth/register', data)
        console.log("Usuário criado:", response.data);
        window.alert("Cadastro realizado com sucesso!");
        return true
    }catch(e){
        console.error(e);
        alert("Erro ao cadastrar usuário");
        return false
    }
}

export async function login(email: string, password: string){
    try{
        const response = await axios.post('http://localhost:5000/auth/login', {email, password});
        const token = response.data.token

        if(token){
            Cookies.set("token", token, { expires: 7, path: "/" }); // Salva o token nos cookies por 7 dias
            return token;
        }
    }catch(e){
        console.error(e);
        alert("Usuário ou senha incorretos");
        return null
    }
}

export function logout(){
    localStorage.removeItem('token');
    window.location.href = '/auth/login';
}