"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const UserModel_1 = require("../models/UserModel");
const bcrypt_1 = __importDefault(require("bcrypt"));
class AuthServices {
    constructor() {
        this.user = new UserModel_1.UserModel();
    }
    login(email, password) {
        return __awaiter(this, void 0, void 0, function* () {
            const userExists = yield this.user.findByEmail(email);
            if (!userExists)
                throw new Error('Usuário nao encontrado');
            const loginCorrect = yield bcrypt_1.default.compare(password, userExists.password);
            if (!loginCorrect)
                throw new Error('Credenciais incorretas');
            const token = jsonwebtoken_1.default.sign({ id: userExists.id }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '1d' });
            return token;
        });
    }
}
exports.default = AuthServices;
