import axios from "axios";
import Cookies from "js-cookie";
const API_URL = `${process.env.NEXT_PUBLIC_API_URL?.replace(/\/$/, "")}/users`

export async function getUser() { 
    try{
        const userId = Cookies.get("userId");
        const response = await axios.get(`${API_URL}/${userId}`);
                
        return response.data
    }catch(e:any){
        console.error("Erro ao buscar usuário:", e);
        return null
    }
}

export async function resetPassword(email: string, currentPassword: string, newPassword: string) {
    try{
        const response = await axios.post(`${API_URL}/reset-password`, {
            email,
            currentPassword,
            newPassword
        })

        return response.data
    }catch (e: any) {
        console.error("Erro ao redefinir senha:", e.response?.data || e.message);
        throw new Error(e.response?.data?.error || "Erro ao redefinir senha");
    }
}

export async function deleteUser(id:number){
    try{
        const response = await axios.delete(`${API_URL}/${id}`)
        if(response.status === 200){
            Cookies.remove("token");
        }
        return response.data
    }catch (e: any) {
        console.error("Erro ao deletar usuário:", e.response?.data || e.message)
        throw new Error(e.response?.data?.error || "Erro ao deletar usuário")
    }
}

