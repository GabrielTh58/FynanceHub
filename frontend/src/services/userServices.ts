import axios from "axios";
import Cookies from "js-cookie";

const baseURL = "http://localhost:5000/users";
export async function getUser() { 
    try{
        const userId = Cookies.get("userId");
        const response = await axios.get(`${baseURL}/${userId}`);        
        return response.data
    }catch(e:any){
        console.error("Erro ao buscar usuário:", e);
        return null
    }
}