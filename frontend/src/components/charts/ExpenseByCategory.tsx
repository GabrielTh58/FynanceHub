"use client";

import { Bar, BarChart, CartesianGrid, LabelList, XAxis } from "recharts";
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
  ChartTooltip,
} from "@/components/ui/chart";
import { useCategoryExpenseChartData } from "@/hooks/useCategoryExpenseChartData";
import { TransactionCategory, translateCategory } from "@/utils/transactionsUtils";

// Configuração do gráfico
const chartConfig = {
  desktop: {
    label: "Desktop",
    color: "hsl(var(--chart-1))",
  },
} satisfies ChartConfig;

export function ExpenseByCategory() {
  const { categoryExpense } = useCategoryExpenseChartData();

  return (
    <Card>
      <CardHeader>
        <CardTitle>Despesas por Categoria</CardTitle>
        <CardDescription>Últimos 30 dias</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart
            data={categoryExpense}
            margin={{ top: 20 }}
            barSize={40} 
          >
            <CartesianGrid vertical={false} strokeDasharray="3 3" stroke="#ccc" />

            <XAxis
              dataKey="category"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value: keyof typeof TransactionCategory) => translateCategory(value)}
            />

            <ChartTooltip
              cursor={false}
              content={({ active, payload }) => {
                if (!active || !payload || payload.length === 0) return null;

                return (
                  <div className="text-white bg-slate-900 px-2 py-1 shadow-md rounded-md">
                    <p className="text-base">
                      <strong>R$ {Number(payload[0].value).toFixed(2)}</strong>
                    </p>
                  </div>
                );
              }}
            />

            <Bar dataKey="amount" fill="var(--color-desktop)" radius={8} isAnimationActive={true}>
              <LabelList
                position="top"
                offset={12}
                className="fill-foreground"
                fontSize={12}
                formatter={(value:any) => `R$ ${value.toFixed(2)}`}  // Formatação de valor na label
              />
            </Bar>
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
