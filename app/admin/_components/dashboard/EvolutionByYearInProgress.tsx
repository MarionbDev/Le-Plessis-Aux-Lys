"use client";

import { CartesianGrid, Line, LineChart, XAxis } from "recharts";

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
  ChartTooltipContent,
} from "@/components/ui/chart";
const chartData = [
  { month: "January", gite: 4, chambre1: 8, chambre2: 8, chambre3: 10 },
  { month: "February", gite: 10, chambre1: 10, chambre2: 10, chambre3: 10 },
  { month: "March", gite: 8, chambre1: 8, chambre2: 12, chambre3: 14 },
  { month: "April", gite: 15, chambre1: 12, chambre2: 15, chambre3: 10 },
  { month: "May", gite: 20, chambre1: 4, chambre2: 16, chambre3: 14 },
  { month: "June", gite: 20, chambre1: 20, chambre2: 17, chambre3: 15 },
  { month: "Juillet", gite: 20, chambre1: 20, chambre2: 17, chambre3: 15 },
  { month: "Aout", gite: 20, chambre1: 20, chambre2: 17, chambre3: 15 },
  { month: "Septembre", gite: 20, chambre1: 20, chambre2: 17, chambre3: 15 },
  { month: "Octobre", gite: 20, chambre1: 20, chambre2: 17, chambre3: 15 },
  { month: "Novembre", gite: 20, chambre1: 20, chambre2: 17, chambre3: 15 },
  { month: "Décembre", gite: 20, chambre1: 20, chambre2: 17, chambre3: 15 },
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

export default function EvolutionByYearInProgress() {
  return (
    <div className="shadow-div rounded-md">
      <Card className="w-[30rem] text-text_color border-2 border-yellow/50  ">
        <CardHeader>
          <CardTitle>Evolution des réservations de l'année en-cours</CardTitle>
          <CardDescription>{`Janvier - Décembre ${new Date().getFullYear()}`}</CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer config={chartConfig}>
            <LineChart
              accessibilityLayer
              data={chartData}
              margin={{
                left: 12,
                right: 12,
              }}
            >
              <CartesianGrid vertical={false} />
              <XAxis
                dataKey="month"
                tickLine={false}
                axisLine={false}
                tickMargin={8}
                tickFormatter={(value) => value.slice(0, 3)}
              />
              <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
              <Line
                dataKey="gite"
                type="monotone"
                stroke="var(--color-gite)"
                strokeWidth={2}
                dot={false}
              />
              <Line
                dataKey="chambre1"
                type="monotone"
                stroke="var(--color-chambre1)"
                strokeWidth={2}
                dot={false}
              />
              <Line
                dataKey="chambre2"
                type="monotone"
                stroke="var(--color-chambre2)"
                strokeWidth={2}
                dot={false}
              />{" "}
              <Line
                dataKey="chambre3"
                type="monotone"
                stroke="var(--color-chambre3)"
                strokeWidth={2}
                dot={false}
              />{" "}
            </LineChart>
          </ChartContainer>
        </CardContent>
        <CardFooter></CardFooter>
      </Card>
    </div>
  );
}

