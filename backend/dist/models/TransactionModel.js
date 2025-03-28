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
exports.TransactionModel = void 0;
const client_1 = require("@prisma/client");
class TransactionModel {
    constructor() {
        this.prisma = new client_1.PrismaClient();
    }
    create(data) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.prisma.transaction.create({
                data: {
                    description: data.description,
                    type: data.type,
                    amount: data.amount,
                    category: data.category,
                    userId: data.userId
                }
            });
        });
    }
    findAll(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.prisma.transaction.findMany({
                where: { userId },
            });
        });
    }
    findByType(type) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.prisma.transaction.findMany({
                where: { type }
            });
        });
    }
    findById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.prisma.transaction.findUnique({
                where: { id }
            });
        });
    }
    findByCategory(category) {
        return this.prisma.transaction.findMany({
            where: { category }
        });
    }
    update(id, data) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.prisma.transaction.update({
                where: { id },
                data: Object.assign({}, data)
            });
        });
    }
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.prisma.transaction.delete({
                where: { id }
            });
        });
    }
}
exports.TransactionModel = TransactionModel;
