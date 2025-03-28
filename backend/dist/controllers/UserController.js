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
const UserServices_1 = __importDefault(require("../services/UserServices"));
class UserController {
    constructor() {
        this.userService = new UserServices_1.default();
    }
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { email, password, name } = req.body;
                if (!name || !email || !password) {
                    return res.status(400).json({ error: "Todos os campos são obrigatórios" });
                }
                const newUser = yield this.userService.create(email, password, name);
                return res.status(201).json(newUser);
            }
            catch (e) {
                console.error("Erro ao criar usuário:", e);
                return res.status(400).json({ error: e.message });
            }
        });
    }
    findById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const id = parseInt(req.params.id);
                if (isNaN(id)) {
                    return res.status(400).json({ error: "ID inválido" });
                }
                const findUser = yield this.userService.findById(id);
                if (!findUser) {
                    return res.status(404).json({ error: "Usuário não encontrado" });
                }
                return res.status(200).json(findUser);
            }
            catch (e) {
                console.error("Erro ao buscar usuário:", e);
                return res.status(500).json({ error: "Erro interno do servidor" });
            }
        });
    }
    findByEmail(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { email } = req.query;
                if (!email) {
                    return res.status(400).json({ error: "Email é obrigatório" });
                }
                const findUser = yield this.userService.findByEmail(email);
                if (!findUser) {
                    return res.status(404).json({ error: "Usuário não encontrado" });
                }
                return res.status(200).json(findUser);
            }
            catch (e) {
                console.error("Erro ao buscar usuário por email:", e);
                return res.status(500).json({ error: "Erro interno do servidor" });
            }
        });
    }
    updateUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const id = parseInt(req.params.id);
                const { email, password, name } = req.body;
                if (isNaN(id) || (!email && !password && !name)) {
                    return res.status(400).json({ error: "ID inválido ou nenhum campo fornecido para atualização" });
                }
                const updatedUser = yield this.userService.updateUser(id, { email, password, name });
                if (!updatedUser) {
                    return res.status(404).json({ error: "Usuário não encontrado" });
                }
                return res.status(200).json({ message: "Usuário atualizado com sucesso", user: updatedUser });
            }
            catch (e) {
                console.error("Erro ao atualizar usuário:", e);
                return res.status(500).json({ error: "Erro interno do servidor" });
            }
        });
    }
    deleteUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const id = parseInt(req.params.id);
                if (isNaN(id)) {
                    return res.status(400).json({ error: "ID inválido" });
                }
                const deletedUser = yield this.userService.deleteUser(id);
                if (!deletedUser) {
                    return res.status(404).json({ error: "Usuário não encontrado" });
                }
                return res.status(200).json({ message: "Usuário deletado com sucesso" });
            }
            catch (e) {
                console.error("Erro ao deletar usuário:", e);
                return res.status(500).json({ error: "Erro interno do servidor" });
            }
        });
    }
    resetPassword(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { email, currentPassword, newPassword } = req.body;
                if (!email || !currentPassword || !newPassword) {
                    return res.status(400).json({ error: "Todos os campos são obrigatórios" });
                }
                const resetPassword = yield this.userService.resetPassword(email, currentPassword, newPassword);
                if (!resetPassword) {
                    return res.status(404).json({ error: "Usuário não encontrado" });
                }
                return res.status(200).json({ message: "Senha redefinida com sucesso" });
            }
            catch (e) {
                console.error("Erro ao redefinir senha:", e);
                return res.status(500).json({ error: "Erro interno do servidor" });
            }
        });
    }
}
exports.default = UserController;
