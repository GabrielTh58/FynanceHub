import { Password } from "../shared/Password";
export class User {
    id: number;
    name: string;
    email: string;
    password: string;
    createdAt: Date;
    constructor(id: number, name: string, email: string, password: string, createdAt: Date) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.password = Password.hashPassword(password);
        this.createdAt = createdAt;
    }
}