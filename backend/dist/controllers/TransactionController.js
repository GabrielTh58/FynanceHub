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
const TransactionServices_1 = __importDefault(require("../services/TransactionServices"));
const client_1 = require("@prisma/client");
class TransactionController {
    constructor() {
        this.transactionService = new TransactionServices_1.default();
    }
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { description, type, amount, category, userId } = req.body;
                if (!description || !type || !amount || !userId || !category) {
                    return res.status(400).json({ error: "Todos os campos são obrigatórios" });
                }
                const newTransaction = yield this.transactionService.create(description, type, +amount, category, +userId);
                return res.status(201).json(newTransaction);
            }
            catch (e) {
                console.error("Erro ao criar transação:", e);
                return res.status(500).json({ error: "Erro interno do servidor ao criar transação" });
            }
        });
    }
    findAll(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const userId = Number(req.query.userId);
                if (!userId || isNaN(userId) || userId <= 0) {
                    return res.status(400).json({ error: "ID do usuário inválido" });
                }
                const transactions = yield this.transactionService.findAll(userId);
                return res.status(200).json(transactions);
            }
            catch (e) {
                console.error("Erro ao buscar transações:", e);
                return res.status(500).json({ error: "Erro interno do servidor" });
            }
        });
    }
    findById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const id = parseInt(req.params.id);
                if (!id || isNaN(id) || id <= 0) {
                    return res.status(400).json({ error: "ID inválido" });
                }
                const transaction = yield this.transactionService.findById(id);
                if (!transaction) {
                    return res.status(404).json({ error: "Transação não encontrada" });
                }
                return res.status(200).json(transaction);
            }
            catch (e) {
                console.error("Erro ao buscar transação por ID:", e);
                return res.status(500).json({ error: "Erro interno do servidor" });
            }
        });
    }
    findByType(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const type = req.params.type;
                if (!type) {
                    return res.status(400).json({ error: "O tipo da transação é obrigatório" });
                }
                if (!Object.values(client_1.TransactionType).includes(type)) {
                    return res.status(400).json({ error: "Tipo de transação inválido. Os tipos válidos são: " + Object.values(client_1.TransactionType).join(", ") });
                }
                const transactions = yield this.transactionService.findByType(type);
                if (!transactions || transactions.length === 0) {
                    return res.status(404).json({ error: "Nenhuma transação encontrada para esse tipo" });
                }
                return res.status(200).json(transactions);
            }
            catch (e) {
                console.error("Erro ao buscar transações por tipo:", e);
                return res.status(500).json({ error: "Erro interno do servidor" });
            }
        });
    }
    update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const id = parseInt(req.params.id);
                const { description, type, amount, userId } = req.body;
                if (!id || isNaN(id) || id <= 0) {
                    return res.status(400).json({ error: "ID inválido" });
                }
                const amountNumber = Number(amount);
                if (isNaN(amountNumber) || amountNumber <= 0) {
                    return res.status(400).json({ error: "Amount deve ser um número positivo válido" });
                }
                const userIdNumber = Number(userId);
                if (isNaN(userIdNumber) || userIdNumber <= 0) {
                    return res.status(400).json({ error: "userId deve ser um número válido e maior que 0" });
                }
                const updatedTransaction = yield this.transactionService.update(id, { description, type, amount: amountNumber, userId: userIdNumber });
                if (!updatedTransaction) {
                    return res.status(404).json({ error: "Transação não encontrada" });
                }
                return res.status(200).json({ message: "Transação atualizada com sucesso", updatedTransaction });
            }
            catch (e) {
                console.error("Erro ao atualizar transação:", e);
                return res.status(500).json({ error: "Erro interno do servidor" });
            }
        });
    }
    delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const id = parseInt(req.params.id);
                if (!id || isNaN(id) || id <= 0) {
                    return res.status(400).json({ error: "ID inválido" });
                }
                const deletedTransaction = yield this.transactionService.delete(id);
                if (!deletedTransaction) {
                    return res.status(404).json({ error: "Transação não encontrada" });
                }
                return res.status(200).json({ message: "Transação excluída com sucesso" });
            }
            catch (e) {
                console.error("Erro ao excluir transação:", e);
                return res.status(500).json({ error: "Erro interno do servidor" });
            }
        });
    }
}
exports.default = TransactionController;
