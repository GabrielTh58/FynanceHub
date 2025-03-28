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
const express_1 = require("express");
const UserController_1 = __importDefault(require("../controllers/UserController"));
const AuthController_1 = __importDefault(require("../controllers/AuthController"));
const router = (0, express_1.Router)();
const userController = new UserController_1.default();
const authController = new AuthController_1.default();
router.post("/register", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield userController.create(req, res);
    }
    catch (error) {
        console.error("Erro ao registrar usuário:", error);
        res.status(500).json({ error: "Erro interno do servidor" });
    }
}));
router.post("/login", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield authController.login(req, res);
    }
    catch (error) {
        console.error("Erro ao realizar login:", error);
        res.status(500).json({ error: "Erro interno do servidor" });
    }
}));
exports.default = router;
