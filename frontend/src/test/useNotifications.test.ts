import { renderHook } from "@testing-library/react"
import { useNotifications } from "@/hooks/useNotifications"
import * as storage from "@/utils/storage"

describe("useNotifications", () => {
  const getStorageItemMock = jest.spyOn(storage, "getStorageItem")

  afterEach(() => {
    jest.clearAllMocks()
  })

  it("deve retornar true se hasNewReport for 'true'", () => {
    getStorageItemMock.mockImplementation((key: string) => {
      if (key === "hasNewReport") return "true"
      return null
    })

    const { result } = renderHook(() => useNotifications())
    expect(result.current).toBe(true)
  })

  it("deve retornar true se for um novo mês e houver um relatório gerado", () => {
    const lastMonth = new Date()
    lastMonth.setMonth(lastMonth.getMonth() - 1)

    getStorageItemMock.mockImplementation((key: string) => {
      if (key === "lastReportDate") return lastMonth.toISOString()
      if (key === "lastGeneratedReport") return "existe"
      return null
    })

    const { result } = renderHook(() => useNotifications())
    expect(result.current).toBe(true)
  })

  it("deve retornar false se não houver notificações pendentes", () => {
    const currentDate = new Date().toISOString()

    getStorageItemMock.mockImplementation((key: string) => {
      if (key === "lastReportDate") return currentDate
      if (key === "lastGeneratedReport") return null
      if (key === "hasNewReport") return "false"
      return null
    })

    const { result } = renderHook(() => useNotifications())
    expect(result.current).toBe(false)
  })
})
