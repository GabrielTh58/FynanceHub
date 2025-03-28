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
const AuthServices_1 = __importDefault(require("../services/AuthServices"));
class AuthController {
    constructor() {
        this.authService = new AuthServices_1.default();
    }
    login(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { email, password } = req.body;
                if (!email || !password) {
                    return res.status(400).json({ error: "Todos os campos sao obrigatorio" });
                }
                const token = yield this.authService.login(email, password);
                if (!token) {
                    return res.status(401).json({ error: "Credenciais invalidas" });
                }
                return res.status(200).json({ token });
            }
            catch (e) {
                console.error("Erro ao realizar login:", e);
                return res.status(500).json({ error: e.message || "Erro interno do servidor" });
            }
        });
    }
}
exports.default = AuthController;
