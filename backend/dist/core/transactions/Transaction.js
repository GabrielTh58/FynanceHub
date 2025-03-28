"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Transaction = void 0;
class Transaction {
    constructor(id, amount, type, description, category, createdAt, userId) {
        this.id = id;
        this.amount = amount;
        this.type = type;
        this.description = description;
        this.category = category;
        this.createdAt = createdAt;
        this.userId = userId;
    }
}
exports.Transaction = Transaction;
