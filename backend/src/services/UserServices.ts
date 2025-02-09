import { User } from "../core/users/User";
import { UserRepository } from "../models/UserRepositories";
import bcrypt from "bcrypt";
export default class UserServices {
    private repo: UserRepository

    constructor() {
        this.repo = new UserRepository();
    }

    async create(email: string, password: string, name: string) {
        const existingUser = await this.repo.findByEmail(email);

        if (existingUser) {
            throw new Error("User already exists.");
        }

        if(password.length < 6){
            throw new Error("Password must be at least 6 characters long.");
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = await this.repo.create({
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
        return this.repo.findById(id);
    }

    async findByEmail(email: string) {
        return this.repo.findByEmail(email);
    }
    
    async deleteUser(id:number){
        return this.repo.deleteUser(id);
    }

    async updateUser(id: number, data: Partial<User>) {
        if (data.password) {
            if (data.password.length < 6) {
                throw new Error("Password must be at least 6 characters long.");
            }
            data.password = await bcrypt.hash(data.password, 10);
        }
    
        return await this.repo.update(id, data);
    }
}