"use client";

import * as React from "react";
import { Label, Pie, PieChart } from "recharts";

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
  { mois: "janvier", reservations: 10, fill: "var(--color-janvier)" },
  { mois: "février", reservations: 5, fill: "var(--color-février)" },
  { mois: "mars", reservations: 8, fill: "var(--color-mars)" },
  { mois: "avril", reservations: 15, fill: "var(--color-avril)" },
  { mois: "mai", reservations: 10, fill: "var(--color-mai)" },
  { mois: "juin", reservations: 18, fill: "var(--color-juin)" },
  { mois: "juillet", reservations: 24, fill: "var(--color-juillet)" },
  { mois: "aout", reservations: 25, fill: "var(--color-aout)" },
  { mois: "septembre", reservations: 25, fill: "var(--color-septembre)" },
  { mois: "octobre", reservations: 10, fill: "var(--color-octobre)" },
  { mois: "novembre", reservations: 8, fill: "var(--color-novembre)" },
  { mois: "décembre", reservations: 6, fill: "var(--color-mai)" },
];

const chartConfig = {
  reservations: {
    label: "reservations",
  },
  janvier: {
    label: "janvier",
    color: "hsl(var(--chart-1))",
  },
  février: {
    label: "février",
    color: "hsl(var(--chart-2))",
  },
  mars: {
    label: "mars",
    color: "hsl(var(--chart-3))",
  },
  avril: {
    label: "avril",
    color: "hsl(var(--chart-4))",
  },
  mai: {
    label: "mai",
    color: "hsl(var(--chart-5))",
  },
  juin: {
    label: "juin",
    color: "hsl(var(--chart-6))",
  },
  juillet: {
    label: "juillet",
    color: "hsl(var(--chart-7))",
  },
  aout: {
    label: "aout",
    color: "hsl(var(--chart-8))",
  },
  septembre: {
    label: "septembre",
    color: "hsl(var(--chart-9))",
  },
  octobre: {
    label: "octobre",
    color: "hsl(var(--chart-10))",
  },
  novembre: {
    label: "novembre",
    color: "hsl(var(--chart-11))",
  },
  décembre: {
    label: "décembre",
    color: "hsl(var(--chart-12))",
  },
} satisfies ChartConfig;

type Proptype = {
  title: string;
};

export default function TotalReservations({ title }: Proptype) {
  const totalVisitors = React.useMemo(() => {
    return chartData.reduce((acc, curr) => acc + curr.reservations, 0);
  }, []);

  return (
    <div className="shadow-div rounded-md">
      <Card className="flex flex-col w-96  text-text_color border-2 border-yellow/50  ">
        <CardHeader className="items-center pb-0">
          <CardTitle>{title}</CardTitle>
          <CardDescription className=" text-center">
            Nombre de jours réservés de <br />
            {`Janvier - Décembre ${new Date().getFullYear()}`}
          </CardDescription>
        </CardHeader>
        <CardContent className="flex-1 pb-0">
          <ChartContainer
            config={chartConfig}
            className="mx-auto aspect-square max-h-[250px]"
          >
            <PieChart>
              <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent hideLabel />}
              />
              <Pie
                data={chartData}
                dataKey="reservations"
                nameKey="mois"
                innerRadius={60}
                strokeWidth={5}
              >
                <Label
                  content={({ viewBox }) => {
                    if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                      return (
                        <text
                          x={viewBox.cx}
                          y={viewBox.cy}
                          textAnchor="middle"
                          dominantBaseline="middle"
                        >
                          <tspan
                            x={viewBox.cx}
                            y={viewBox.cy}
                            className="fill-foreground text-3xl font-bold"
                          >
                            {totalVisitors.toLocaleString()}
                          </tspan>
                          <tspan
                            x={viewBox.cx}
                            y={(viewBox.cy || 0) + 24}
                            className="fill-muted-foreground"
                          >
                            {/* Jours de réservations */}
                          </tspan>
                        </text>
                      );
                    }
                  }}
                />
              </Pie>
            </PieChart>
          </ChartContainer>
        </CardContent>
        <CardFooter className="flex-col gap-2 text-sm"></CardFooter>
      </Card>
    </div>
  );
}

