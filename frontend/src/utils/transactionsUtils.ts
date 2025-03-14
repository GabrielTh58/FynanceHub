export const translateTransactionType = (type: string) => {
    return type === "INCOME" ? "Receita" : "Despesa";
}

// Tradução das categorias
export enum TransactionCategory {
    SALES = "Vendas",
    REFUND = "Reembolso",
    INVESTMENT = "Investimento",
    SUPPLIERS = "Fornecedores",
    OPERATING_COSTS = "Custos Operacionais",
    SALARIES = "Salários",
    MARKETING = "Marketing",
    TAXES = "Impostos",
    EQUIPMENT = "Equipamentos",
    TRANSPORT = "Transporte",
    OTHER = "Outros"
}

export const translateCategory = (category: keyof typeof TransactionCategory) => {
    return TransactionCategory[category] || category;
}