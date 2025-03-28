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
const TransactionController_1 = __importDefault(require("../controllers/TransactionController"));
const router = (0, express_1.Router)();
const transactionController = new TransactionController_1.default();
router.post("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield transactionController.create(req, res);
    }
    catch (e) {
        console.error("Erro ao criar transação:", e);
        res.status(500).json({ error: "Erro interno do servidor" });
    }
}));
router.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield transactionController.findAll(req, res);
    }
    catch (e) {
        console.error("Erro ao buscar transações:", e);
        res.status(500).json({ error: "Erro interno do servidor" });
    }
}));
router.get("/type/:type", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield transactionController.findByType(req, res);
    }
    catch (e) {
        console.error("Erro ao buscar transações por tipo:", e);
        res.status(500).json({ error: "Erro interno do servidor" });
    }
}));
router.get("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield transactionController.findById(req, res);
    }
    catch (e) {
        console.error("Erro ao buscar transação por ID:", e);
        res.status(500).json({ error: "Erro interno do servidor" });
    }
}));
router.put("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield transactionController.update(req, res);
    }
    catch (e) {
        console.error("Erro ao atualizar transação:", e);
        res.status(500).json({ error: "Erro interno do servidor" });
    }
}));
router.delete("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield transactionController.delete(req, res);
    }
    catch (e) {
        console.error("Erro ao excluir transação:", e);
        res.status(500).json({ error: "Erro interno do servidor" });
    }
}));
exports.default = router;
