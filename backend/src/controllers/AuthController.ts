import { Request, Response } from "express";
import AuthServices from "../services/AuthServices";

export default class AuthController {
    private authService: AuthServices
    constructor(){
        this.authService = new AuthServices();
    }

    async login(req: Request, res: Response) {
        try{
            const { email, password } = req.body;

            if(!email || !password){
                return res.status(400).json({error: "All fields are required"})
            }

            const token = await this.authService.login(email, password);

            if(!token){
                res.status(401).json({error: "Invalid credentials"});
            }

            return res.status(200).json({token})
        }catch(e){
            console.error("Error creating user:", e);
        }
    }
}