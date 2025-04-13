// __tests__/useMonthlyReport.test.tsx
import { renderHook } from "@testing-library/react"
import { useMonthlyReport } from "@/hooks/useMonthlyReport"
import * as storage from "@/utils/storage"
import * as reportService from "@/services/reportService"
import { Transaction } from "@/types/transactionTypes"

describe("useMonthlyReport", () => {
  const mockTransactions: Transaction[] = [
    {
      id: 1,
      description: "Venda de livros",
      amount: 2220.5,
      type: "Entrada",
      category: "Educação",
      date: new Date(),
      createdAt: new Date(),
      userId: 101,
    },
  ]

  const setLastTransactionsMock = jest.fn()

  beforeEach(() => {
    jest.clearAllMocks()
  })

  it("não faz nada se o mês atual for o mesmo do armazenado ou não houver transações", () => {
    jest.spyOn(storage, "getStorageItem").mockReturnValue(new Date().getMonth())
    const generateMonthlyReportSpy = jest.spyOn(
      reportService,
      "generateMonthlyReport"
    )
    const resetTransactionsStorageSpy = jest.spyOn(
      reportService,
      "resetTransactionsStorage"
    )

    renderHook(() =>
      useMonthlyReport({
        lastTransactions: [],
        setLastTransactions: setLastTransactionsMock,
      })
    )

    expect(generateMonthlyReportSpy).not.toHaveBeenCalled()
    expect(resetTransactionsStorageSpy).not.toHaveBeenCalled()
  })

  it("gera relatório e reseta transações se for um novo mês", () => {
    jest
      .spyOn(storage, "getStorageItem")
      .mockReturnValue(new Date().getMonth() - 1)
    const generateMonthlyReportSpy = jest.spyOn(
      reportService,
      "generateMonthlyReport"
    )
    const resetTransactionsStorageSpy = jest.spyOn(
      reportService,
      "resetTransactionsStorage"
    )
    const setStorageItemSpy = jest.spyOn(storage, "setStorageItem")

    renderHook(() =>
      useMonthlyReport({
        lastTransactions: mockTransactions,
        setLastTransactions: setLastTransactionsMock,
      })
    )

    expect(generateMonthlyReportSpy).toHaveBeenCalledWith(mockTransactions)
    expect(resetTransactionsStorageSpy).toHaveBeenCalledWith(
      setLastTransactionsMock
    )
    expect(setStorageItemSpy).toHaveBeenCalledWith(
      "lastMonth",
      new Date().getMonth()
    )
    expect(setStorageItemSpy).toHaveBeenCalledWith("hasNewReport", true)
  })
})
