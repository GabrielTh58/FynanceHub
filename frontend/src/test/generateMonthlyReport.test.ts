import { generateMonthlyReport } from "@/services/reportService"
import jsPDF from "jspdf"
import autoTable from "jspdf-autotable"
import { Transaction } from "@/types/transactionTypes"

// Mock jsPDF e autoTable
jest.mock("jspdf")
jest.mock("jspdf-autotable")

describe("generateMonthlyReport", () => {
  const saveMock = jest.fn()
  const textMock = jest.fn()

  beforeEach(() => {
    jest.clearAllMocks();
    (jsPDF as unknown as jest.Mock).mockImplementation(() => ({
      text: textMock,
      save: saveMock,
      lastAutoTable: { finalY: 50 },
    }))
  })

  it("deve gerar e salvar um arquivo PDF com base nas transações fornecidas", () => {
    const transactions: Transaction[] = [
      {
        id: 1,
        description: "Salário",
        amount: 3000,
        type: "income",
        category: "Trabalho",
        date: new Date("2024-03-01"),
        createdAt: new Date("2024-03-01"),
        userId: 1,
      },
      {
        id: 2,
        description: "Mercado",
        amount: -500,
        type: "expense",
        category: "Alimentação",
        date: new Date("2024-03-05"),
        createdAt: new Date("2024-03-05"),
        userId: 1,
      },
    ]

    generateMonthlyReport(transactions)

    expect(jsPDF).toHaveBeenCalled()
    expect(autoTable).toHaveBeenCalled()
    expect(saveMock).toHaveBeenCalledWith(expect.stringMatching(/relatorio_mensal_/))
  })
})
