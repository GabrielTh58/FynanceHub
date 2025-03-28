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
Object.defineProperty(exports, "__esModule", { value: true });
const TransactionModel_1 = require("../models/TransactionModel");
const UserModel_1 = require("../models/UserModel");
class TransactionServices {
    constructor() {
        this.transaction = new TransactionModel_1.TransactionModel();
        this.user = new UserModel_1.UserModel();
    }
    create(description, type, amount, category, userId) {
        return __awaiter(this, void 0, void 0, function* () {
            if (amount <= 0) {
                throw new Error("Amount must be a positive integer.");
            }
            const userExists = yield this.user.findById(userId);
            if (!userExists) {
                throw new Error("Usuario nao encontrado.");
            }
            const newTransaction = {
                description,
                type,
                amount,
                userId,
                category,
                createdAt: new Date(),
            };
            return yield this.transaction.create(newTransaction);
        });
    }
    update(id, data) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.transaction.update(id, data);
        });
    }
    findAll(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.transaction.findAll(userId); // Agora busca apenas do usuário logado
        });
    }
    findByType(type) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.transaction.findByType(type);
        });
    }
    findById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.transaction.findById(id);
        });
    }
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.transaction.delete(id);
        });
    }
}
exports.default = TransactionServices;
