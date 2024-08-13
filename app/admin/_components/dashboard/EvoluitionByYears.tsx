"use client";

import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";

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
const chartData = [
  { years: "2024", gite: 186, chambre1: 80, chambre2: 200, chambre3: 220 },
  { years: "2025", gite: 305, chambre1: 154, chambre2: 150, chambre3: 158 },
  { years: "2027", gite: 237, chambre1: 120, chambre2: 198, chambre3: 178 },
];

const chartConfig = {
  gite: {
    label: "Gîte",
    color: "hsl(var(--chart-1))",
  },
  chambre1: {
    label: "Chambre1",
    color: "hsl(var(--chart-2))",
  },
  chambre2: {
    label: "Chambre2",
    color: "hsl(var(--chart-3))",
  },
  chambre3: {
    label: "Chambre3",
    color: "hsl(var(--chart-4))",
  },
} satisfies ChartConfig;

export default function EvolutionByYears() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Evolution des réservations par années</CardTitle>
        <CardDescription></CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart accessibilityLayer data={chartData}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="years"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => value.slice(0, 4)}
            />
            <ChartTooltip content={<ChartTooltipContent hideLabel />} />
            <ChartLegend content={<ChartLegendContent />} />
            <Bar
              dataKey="gite"
              stackId="a"
              fill="var(--color-gite)"
              radius={[0, 0, 4, 4]}
            />
            <Bar
              dataKey="chambre1"
              stackId="a"
              fill="var(--color-chambre1)"
              radius={[4, 4, 0, 0]}
            />
            <Bar
              dataKey="chambre2"
              stackId="a"
              fill="var(--color-chambre2)"
              radius={[4, 4, 0, 0]}
            />{" "}
            <Bar
              dataKey="chambre3"
              stackId="a"
              fill="var(--color-chambre3)"
              radius={[4, 4, 0, 0]}
            />
          </BarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm"></CardFooter>
    </Card>
  );
}

