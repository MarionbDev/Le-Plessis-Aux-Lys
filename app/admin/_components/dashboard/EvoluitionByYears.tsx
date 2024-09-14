"use client";

import { getAllCalendar } from "@/app/api/calendar/route";
import { CalendarEvent, ReservationInput } from "@/app/types";
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
import { useEffect, useState } from "react";
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";

// Types pour les types de location et les années
type RentalType =
  | "petiteOurse"
  | "grandeOurse"
  | "orion"
  | "cassiopee"
  | "andromede"
  | "pegase";
type Year = number;

// Fonction pour convertir CalendarEvent en ReservationInput
const convertToReservationInput = (
  events: CalendarEvent[],
): ReservationInput[] => {
  return events
    .filter((event) => event.id !== undefined) // Filtrer pour ne garder que les événements avec id défini
    .map((event) => ({
      id: event.id as string, // Assertion que id est une chaîne
      rental_type: event.rental_type as RentalType,
      start_date: event.start_date,
      end_date: event.end_date,
      type: event.type,
    }));
};

// Fonction pour calculer les jours réservés par mois et par type de location
const calculateDaysReserved = (reservations: ReservationInput[]) => {
  const daysReserved = Array(12)
    .fill(null)
    .map(() => ({
      petiteOurse: 0,
      grandeOurse: 0,
      orion: 0,
      cassiopee: 0,
      andromede: 0,
      pegase: 0,
    }));

  reservations.forEach((reservation) => {
    const startDate = new Date(reservation.start_date);
    const endDate = new Date(reservation.end_date);

    const startMonth = startDate.getMonth();
    const endMonth = endDate.getMonth();
    const currentYear = new Date().getFullYear();

    if (startDate.getFullYear() === currentYear) {
      for (let month = startMonth; month <= endMonth; month++) {
        const daysInMonth = new Date(currentYear, month + 1, 0).getDate();
        const start = month === startMonth ? startDate.getDate() : 1;
        const end = month === endMonth ? endDate.getDate() : daysInMonth;
        const days = end - start + 1;

        daysReserved[month][reservation.rental_type] += days;
      }
    }
  });

  return daysReserved.map((data, index) => ({
    month: new Intl.DateTimeFormat("fr-FR", { month: "long" }).format(
      new Date(0, index),
    ),
    ...data,
  }));
};

// Fonction pour générer une liste d'années
const generateYearOptions = (startYear: number, endYear: number) => {
  const years = [];
  for (let year = startYear; year <= endYear; year++) {
    years.push(year);
  }
  return years;
};

export default function EvolutionByYears() {
  const [chartData, setChartData] = useState<any[]>([]);
  const [selectedYear, setSelectedYear] = useState<Year>(
    new Date().getFullYear(),
  );
  const [selectedRentalType, setSelectedRentalType] =
    useState<RentalType>("petiteOurse");
  const [chartConfig, setChartConfig] = useState<ChartConfig>({});
  // Liste des années allant de 2023 à l'année en cours
  const years = generateYearOptions(2024, new Date().getFullYear());

  useEffect(() => {
    const fetchReservations = async () => {
      try {
        // Fetch all reservations for the selected rental type
        const calendarEvents = await getAllCalendar(selectedRentalType);
        const allReservations: ReservationInput[] =
          convertToReservationInput(calendarEvents);
        const daysReservedData = calculateDaysReserved(allReservations);
        setChartData(daysReservedData);
      } catch (error) {
        console.error("Error fetching reservations:", error);
      }
    };

    fetchReservations();
  }, [selectedYear, selectedRentalType]);

  useEffect(() => {
    // Update chart config when the rental type changes
    setChartConfig({
      petiteOurse: {
        label: "Logis de la petite Ourse",
        color: "hsl(var(--chart-1))",
      },
      orion: {
        label: "Orion",
        color: "hsl(var(--chart-2))",
      },
      cassiopee: {
        label: "Cassiopé",
        color: "hsl(var(--chart-3))",
      },
      andromede: {
        label: "Andromède",
        color: "hsl(var(--chart-4))",
      },
      grandeOurse: {
        label: "Logis de la grande Ourse",
        color: "hsl(var(--chart-5))",
      },
      pegase: {
        label: "Pégase",
        color: "hsl(var(--chart-1))",
      },
    });
  }, [selectedRentalType]);

  return (
    <Card className="w-[25rem]">
      <CardHeader>
        <CardTitle>Évolution des réservations</CardTitle>
        <CardDescription>Janvier - Décembre</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-4 mb-4">
          {/* Filter for year */}
          <div>
            <label htmlFor="year" className="mr-2">
              Année :
            </label>
            <select
              id="year"
              value={selectedYear}
              onChange={(e) => setSelectedYear(parseInt(e.target.value))}
            >
              {/* Generate options for years */}
              {years.map((year) => (
                <option key={year} value={year}>
                  {year}
                </option>
              ))}
            </select>
          </div>

          {/* Filter for rental type */}
          <div>
            <label htmlFor="rentalType" className="mr-2">
              Type de location :
            </label>
            <select
              id="rentalType"
              value={selectedRentalType}
              onChange={(e) =>
                setSelectedRentalType(e.target.value as RentalType)
              }
            >
              <option value="petiteOurse">Logis de la petite Ourse</option>
              <option value="grandeOurse">Logis de la grande Ourse</option>
              <option value="orion ">Orion</option>
              <option value="cassiopee">Cassiopée</option>
              <option value="andromede">Andromède</option>
              <option
                value="pegase
              "
              >
                Pégase
              </option>
            </select>
          </div>
        </div>
        <ChartContainer config={chartConfig}>
          <BarChart accessibilityLayer data={chartData}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="month"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <ChartTooltip content={<ChartTooltipContent hideLabel />} />
            <ChartLegend content={<ChartLegendContent />} />
            {Object.keys(chartConfig).map((key) => (
              <Bar
                key={key}
                dataKey={key}
                stackId="a"
                fill={chartConfig[key as keyof ChartConfig].color}
                radius={[4, 4, 0, 0]}
              />
            ))}
          </BarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm"></CardFooter>
    </Card>
  );
}

