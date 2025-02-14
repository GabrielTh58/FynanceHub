import { User } from "../core/users/User";
import { UserModel } from "../models/UserModel";
import bcrypt from "bcrypt";
export default class UserServices {
    private user: UserModel

    constructor() {
        this.user = new UserModel();
    }

    async create(email: string, password: string, name: string) {
        const existingUser = await this.user.findByEmail(email);

        if (existingUser) {
            throw new Error("User already exists.");
        }

        if(password.length < 6){
            throw new Error("Password must be at least 6 characters long.");
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = await this.user.create({
            email,
            password: hashedPassword,
            name,
            createdAt: new Date(),
        });

        if (!newUser.id) {
            throw new Error("Failed to create user. ID not generated.");
        }

        return { id: newUser.id, email: newUser.email, name: newUser.name };
        
    }

    async findById(id: number) {
        return this.user.findById(id);
    }

    async findByEmail(email: string) {
        return this.user.findByEmail(email);
    }
    
    async deleteUser(id:number){
        return this.user.deleteUser(id);
    }

    async updateUser(id: number, data: Partial<User>) {
        if (data.password) {
            if (data.password.length < 6) {
                throw new Error("Password must be at least 6 characters long.");
            }
            data.password = await bcrypt.hash(data.password, 10);
        }
    
        return await this.user.update(id, data);
    }
}