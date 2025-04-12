"use client";

import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
} from "@/components/components/ui/chart";

import { useIncomeExpenseChartData } from "@/hooks/useIncomeExpenseChartData";

const chartConfig = {
  expense: {
    label: "Despesa",
    color: "hsl(var(--chart-1))",
  },
  income: {
    label: "Receita",
    color: "hsl(var(--chart-2))",
  },
} satisfies ChartConfig;

export function IncomeExpenseChart() {
  const { chartData } = useIncomeExpenseChartData()

  return (
    <Card>
      <CardHeader>
        <CardTitle>Receitas X Despesas</CardTitle>
        <CardDescription>Desempenho financeiro dos últimos 30 dias</CardDescription>
      </CardHeader>
      <CardContent className="h-80">
        <ChartContainer config={chartConfig} className="h-80 w-full py-4">
          <AreaChart
            data={chartData}
            margin={{
              left: 12,
              right: 12,
            }}
          >
            <CartesianGrid vertical={false} />

            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value) => {
                const date = new Date(value);
                return `${String(date.getDate()).padStart(2, '0')}/${String(date.getMonth() + 1).padStart(2, '0')}`;
              }}
            />

            <YAxis
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value) => `R$ ${value}`}
            />

            <ChartTooltip
              cursor={{ strokeDasharray: "3 3" }}
              content={({ payload }) => {
                if (!payload || payload.length === 0) return null;
                const data = payload[0].payload;
                return (
                  <div className="rounded bg-background p-2 text-sm shadow-sm border w-40">
                    <div><strong>Data:</strong> {new Date(data.date).toLocaleDateString()}</div>
                    <div><strong>Receita:</strong> R$ {data.income.toFixed(2)}</div>
                    <div><strong>Despesa:</strong> R$ {data.expense.toFixed(2)}</div>
                  </div>
                );
              }}
            />

            {/* Despesa (base do gráfico) */}
            <Area
              dataKey="expense"
              type="natural"
              fill="var(--color-expense)"
              fillOpacity={0.3}
              stroke="var(--color-expense)"
              stackId="a"
            />

            {/* Receita (topo do gráfico) */}
            <Area
              dataKey="income"
              type="natural"
              fill="var(--color-income)"
              fillOpacity={0.4}
              stroke="var(--color-income)"
              stackId="a"
            />

            <ChartLegend
              content={<ChartLegendContent />}
              formatter={(value) =>
                value === "expense" ? "Despesa" : value === "income" ? "Receita" : ""
              }
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
