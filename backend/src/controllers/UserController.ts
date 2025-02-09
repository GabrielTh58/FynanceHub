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
                return res.status(400).json({error: "All fields are required"})
            }

            const newUser = await this.userService.create(email, password, name);

            return res.status(201).json(newUser)
            
        }catch(e:any){
            console.error("Error creating user:", e);
            return res.status(400).json({ error: e.message })
        }
    }

    async findById(req: Request, res: Response) {
        try{
            const id = parseInt(req.params.id);

            if(!id){
                return res.status(400).json({error: "ID is required"})
            }

            const findUser = await this.userService.findById(id);

            if(!findUser){
                res.status(404).json({error: "User not found"})
            }

            return res.status(200).json(findUser)

        }catch(e){
           console.log("Error getting user by ID:", e);
                       
        }
    }

    async findByEmail(req: Request, res: Response) {        
        try{
            const { email } = req.query as { email: string };

            if(!email){
                return res.status(400).json({error: "Email is required"})
            }

            const findUser = await this.userService.findByEmail(email);

            if(!findUser){
                res.status(404).json({error: "User not found"})
            }

            return(res.status(200).json(findUser))
        }catch(e){
            console.log("Error getting user by email:", e);
        }
    }

    async updateUser(req: Request, res: Response) {
        try{
            const id = parseInt(req.params.id);
            const { email, password, name } = req.body;

            if(!id){
                return res.status(400).json({error: "Some fields are missing"})
            }

            const updatedUser = await this.userService.updateUser(id, {email, password, name});

            if(!updatedUser){
                res.status(404).json({error: "User not found"})
            }

            return res.status(200).json({message: "User updated successfully"})
        }catch(e){
            console.log("Error updating user:", e);
        }
    }

    async deleteUser(req: Request, res: Response) {
        try{
            const id = parseInt(req.params.id);

            if(!id){
                return res.status(400).json({error: "ID is required"})
            }

            const findUser = await this.userService.deleteUser(id);

            if(!findUser){
                res.status(404).json({error: "User not found"})
            }

            res.status(200).json({message: "User deleted successfully"})
        }catch(e){
            console.log("Error deleting user:", e);
        }
    }

   
}