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
const router = (0, express_1.Router)();
const userController = new UserController_1.default();
router.get("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield userController.findById(req, res);
    }
    catch (error) {
        console.error("Erro ao buscar usuário:", error);
        res.status(500).json({ error: "Erro interno do servidor" });
    }
}));
router.get("/email", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield userController.findByEmail(req, res);
    }
    catch (error) {
        console.error("Erro ao buscar usuário por e-mail:", error);
        res.status(500).json({ error: "Erro interno do servidor" });
    }
}));
router.put("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield userController.updateUser(req, res);
    }
    catch (e) {
        console.error("Erro ao atualizar usuário:", e);
        res.status(500).json({ error: "Erro interno do servidor" });
    }
}));
router.delete("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield userController.deleteUser(req, res);
    }
    catch (error) {
        console.error("Erro ao excluir usuário:", error);
        res.status(500).json({ error: "Erro interno do servidor" });
    }
}));
router.post("/reset-password", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield userController.resetPassword(req, res);
    }
    catch (error) {
        console.error("Erro ao redefinir senha:", error);
        res.status(500).json({ error: "Erro interno do servidor" });
    }
}));
exports.default = router;
