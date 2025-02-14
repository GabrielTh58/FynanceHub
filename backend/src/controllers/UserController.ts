import { Request, Response } from "express";
import UserServices from "../services/UserServices";


export default class UserController{
    private userService: UserServices;
    constructor() {
        this.userService = new UserServices();
    }
    async create(req: Request, res: Response) {
        try{
            const { email, password, name } = req.body;

            if(!name || !email || !password){
                return res.status(400).json({error: "Todos os campos sao obrigatorio"})
            }

            const newUser = await this.userService.create(email, password, name);

            return res.status(201).json(newUser)
            
        }catch(e:any){
            console.error("Erro ao criar usuário:", e);
            return res.status(400).json({ error: e.message })
        }
    }

    async findById(req: Request, res: Response) {
        try{
            const id = parseInt(req.params.id);

            if(!id){
                return res.status(400).json({error: "ID é obrigatorio"})
            }

            const findUser = await this.userService.findById(id);

            if(!findUser){
                return res.status(404).json({error: "Usuario nao encontrado"})
            }

            return res.status(200).json(findUser)

        }catch(e){
           console.log("Erro ao buscar usuário:", e);
                       
        }
    }

    async findByEmail(req: Request, res: Response) {        
        try{
            const { email } = req.query as { email: string };

            if(!email){
                return res.status(400).json({error: "Email é obrigatorio"})	
            }

            const findUser = await this.userService.findByEmail(email);

            if(!findUser){
                return res.status(404).json({error: "Usuario nao encontrado"})
            }

            return(res.status(200).json(findUser))
        }catch(e){
            console.log("Erro ao buscar usuário por email:", e);
        }
    }

    async updateUser(req: Request, res: Response) {
        try{
            const id = parseInt(req.params.id);
            const { email, password, name } = req.body;

            if(!id){
                return res.status(400).json({error: "Alguns campos estão faltando"})
            }

            const updatedUser = await this.userService.updateUser(id, {email, password, name});

            if(!updatedUser){
                return res.status(404).json({error: "Usuario nao encontrado"})
            }

            return res.status(200).json({message: "Usuario atualizado com sucesso"})
        }catch(e){
            console.log("Erro ao atualizar usuário:", e);
        }
    }

    async deleteUser(req: Request, res: Response) {
        try{
            const id = parseInt(req.params.id);

            if(!id){
                return res.status(400).json({error: "ID é obrigatorio"})
            }

            const findUser = await this.userService.deleteUser(id);

            if(!findUser){
                return res.status(404).json({error: "Usuario nao encontrado"})
            }

            return res.status(200).json({message: "Usuario deletado com sucesso"})
        }catch(e){
            console.log("Erro ao deletar usuário:", e);
        }
    }

   
}