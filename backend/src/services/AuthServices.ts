import jwt from 'jsonwebtoken';
import { UserRepository } from '../models/UserRepositories';
import bcrypt from 'bcrypt';

export default class AuthServices {
    private repo: UserRepository;

    constructor() {
        this.repo = new UserRepository();
    }

    async login(email: string, password: string) {
        const userExists = await this.repo.findByEmail(email);
        if (!userExists) throw new Error('User not found');

        console.log(userExists);
        
        const loginCorrect = await bcrypt.compare(password, userExists.password);
        if (!loginCorrect) throw new Error('Invalid credentials');

              
        const token = jwt.sign({ email, id: userExists.id }, process.env.ACCESS_TOKEN_SECRET as string, { expiresIn: '1d' });

        console.log("Generated Token:", token); // Teste se o token está sendo gerado corretamente

        return token;
    }
}
