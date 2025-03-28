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
const UserModel_1 = require("../models/UserModel");
const bcrypt_1 = __importDefault(require("bcrypt"));
class UserServices {
    constructor() {
        this.user = new UserModel_1.UserModel();
    }
    create(email, password, name) {
        return __awaiter(this, void 0, void 0, function* () {
            const existingUser = yield this.user.findByEmail(email);
            if (existingUser) {
                throw new Error("Usuário ja cadastrado.");
            }
            if (password.length < 6) {
                throw new Error("Senha deve ter pelo menos 6 caracteres.");
            }
            const hashedPassword = yield bcrypt_1.default.hash(password, 10);
            const newUser = yield this.user.create({
                email,
                password: hashedPassword,
                name,
                createdAt: new Date(),
            });
            if (!newUser.id) {
                throw new Error("Falha ao criar o usuário. Id não fornecido.");
            }
            return { id: newUser.id, email: newUser.email, name: newUser.name };
        });
    }
    findById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.user.findById(id);
        });
    }
    findByEmail(email) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.user.findByEmail(email);
        });
    }
    deleteUser(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.user.deleteUser(id);
        });
    }
    updateUser(id, data) {
        return __awaiter(this, void 0, void 0, function* () {
            if (data.password) {
                if (data.password.length < 6) {
                    throw new Error("Senha deve ter pelo menos 6 caracteres.");
                }
                data.password = yield bcrypt_1.default.hash(data.password, 10);
            }
            return yield this.user.update(id, data);
        });
    }
    resetPassword(email, currentPassword, newPassword) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield this.user.findByEmail(email);
            if (!user)
                return null;
            const isPasswordCorrect = yield bcrypt_1.default.compare(currentPassword, user.password);
            if (!isPasswordCorrect) {
                throw new Error("Usuário ou senha inválidos");
            }
            const hashedPassword = yield bcrypt_1.default.hash(newPassword, 10);
            const updatedUser = yield this.user.update(user.id, { password: hashedPassword });
            return updatedUser ? true : false;
        });
    }
}
exports.default = UserServices;
