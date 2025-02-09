import bcrypt from "bcrypt";

export class Password{
    static hashPassword(password: string): string{
        return bcrypt.hashSync(password, 5);
    }
}