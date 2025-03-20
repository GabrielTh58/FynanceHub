"use client";

import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

import { useIncomeData } from "@/hooks/useIncomeData";

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
  const { incomeChartData } = useIncomeData();

  return (
    <Card>
      <CardHeader>
        <CardTitle>Receitas X Despesas</CardTitle>
        <CardDescription>Desempenho financeiro dos últimos 30 dias</CardDescription>
      </CardHeader>
      <CardContent  className="h-80">
        <ChartContainer config={chartConfig}  className="h-80 w-full py-4">
          <AreaChart
            data={[...incomeChartData].reverse()}
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
                const months = [
                  "Jan", "Fev", "Mar", "Abr", "Mai", "Jun",
                  "Jul", "Ago", "Set", "Out", "Nov", "Dez"
                ];

                const monthIndex = parseInt(value.slice(5, 7), 10) - 1;
                return months[monthIndex] || value;
              }}
            />

            <YAxis
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value) => `R$ ${value}`}
            />

            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="line" />}
            />

            <Area
              dataKey="expense"
              type="natural"
              fill="var(--color-income)"
              fillOpacity={0.4}
              stroke="var(--color-income)"
              stackId="a"
            />
            <Area
              dataKey="income"
              type="natural"
              fill="var(--color-expense)"
              fillOpacity={0.4}
              stroke="var(--color-expense)"
              stackId="a"
            />

            <ChartLegend
              content={<ChartLegendContent />}
              formatter={(value) => value === "expense" ? "Despesa" : value === "income" ? "Receita" : ""}
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
