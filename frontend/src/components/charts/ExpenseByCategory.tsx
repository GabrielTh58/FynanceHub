import { Bar, BarChart, CartesianGrid, LabelList, XAxis } from "recharts"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
} from "@/components/ui/chart"
import { useCategoryExpense } from "@/hooks/useCategoryExpense"

// Configuração do gráfico
const chartConfig = {
  desktop: {
    label: "Desktop",
    color: "hsl(var(--chart-1))",
  },
} satisfies ChartConfig

// Tradução das categorias
const TransactionCategoryPT: Record<string, string> = {
  SALES: "Vendas",
  REFUND: "Reembolso",
  INVESTMENT: "Investimentos",
  SUPPLIERS: "Fornecedores",
  OPERATING_COSTS: "Custos Operacionais",
  SALARIES: "Salários",
  MARKETING: "Marketing",
  TAXES: "Impostos",
  EQUIPMENT: "Equipamentos",
  TRANSPORT: "Transporte",
  OTHER: "Outros",
}

export function ExpenseByCategory() {
  const { categoryExpense } = useCategoryExpense()

  return (
    <Card>
      <CardHeader>
        <CardTitle>Despesas por Categoria</CardTitle>
        <CardDescription>Últimos 30 dias</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart
            accessibilityLayer
            data={categoryExpense}
            margin={{
              top: 20,
            }}
          >
            <CartesianGrid vertical={false} />

            <XAxis
              dataKey="category"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => TransactionCategoryPT[value] || value}
            />

            <ChartTooltip
              cursor={false}
              content={({ active, payload }) => {
                if (!active || !payload || payload.length === 0) return null;

                return (
                  <div className="text-white bg-slate-900 px-2 py-1 shadow-md rounded-md">
                    <p className="text-base">
                      R$ {Number(payload[0].value).toFixed(2)}
                    </p>
                  </div>
                );
              }}
            />

            <Bar dataKey="amount" fill="var(--color-desktop)" radius={8}>
              <LabelList
                position="top"
                offset={12}
                className="fill-foreground"
                fontSize={12}
              />
            </Bar>
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
