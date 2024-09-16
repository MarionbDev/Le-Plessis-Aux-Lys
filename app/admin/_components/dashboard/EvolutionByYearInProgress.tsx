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
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { useEffect, useState } from "react";
import { CartesianGrid, Line, LineChart, XAxis } from "recharts";

// Définir un type pour les types de location
type RentalType =
  | "petiteOurse"
  | "grandeOurse"
  | "orion"
  | "cassiopee"
  | "andromede"
  | "pegase";
type Year = number;

// Définir la configuration du graphique
const chartConfig: Record<RentalType, { label: string; color: string }> = {
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
};

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

// Fonction pour obtenir le nom du mois
const getMonthName = (monthIndex: number) => {
  const months = [
    "Janvier",
    "Février",
    "Mars",
    "Avril",
    "Mai",
    "Juin",
    "Juillet",
    "Août",
    "Septembre",
    "Octobre",
    "Novembre",
    "Décembre",
  ];
  return months[monthIndex];
};

// Fonction pour calculer les jours réservés par mois et par type de location
const calculateDaysReserved = (
  reservations: ReservationInput[],
  year: number,
) => {
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

    if (startDate.getFullYear() === year) {
      const startMonth = startDate.getMonth();
      const endMonth = endDate.getMonth();

      for (let month = startMonth; month <= endMonth; month++) {
        const daysInMonth = new Date(year, month + 1, 0).getDate();
        const start = month === startMonth ? startDate.getDate() : 1;
        const end = month === endMonth ? endDate.getDate() : daysInMonth;
        const days = end - start + 1;

        daysReserved[month][reservation.rental_type] += days;
      }
    }
  });

  return daysReserved.map((data, index) => ({
    month: getMonthName(index),
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

export default function EvolutionByYearInProgress() {
  const [chartData, setChartData] = useState<any[]>([]);
  const [year, setYear] = useState<Year>(new Date().getFullYear());
  const [selectedRentalType, setSelectedRentalType] =
    useState<RentalType>("petiteOurse");

  // Liste des années allant de 2023 à l'année en cours
  const years = generateYearOptions(2024, new Date().getFullYear());

  useEffect(() => {
    const fetchReservations = async () => {
      try {
        // Fetch all reservations for the selected rental type
        const calendarEvents = await getAllCalendar(selectedRentalType);
        const reservations: ReservationInput[] =
          convertToReservationInput(calendarEvents);
        const daysReservedData = calculateDaysReserved(reservations, year);
        setChartData(daysReservedData);
      } catch (error) {
        console.error("Error fetching reservations:", error);
      }
    };

    fetchReservations();
  }, [year, selectedRentalType]);

  return (
    <div className="shadow-div rounded-md">
      <Card className="w-[30rem] text-text_color border-2 border-yellow/50">
        <CardHeader>
          <CardTitle>Évolution des réservations de l'année</CardTitle>
          <CardDescription>{`Janvier - Décembre ${year}`}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-4 mb-4">
            {/* Filtre pour l'année */}
            <div>
              <label htmlFor="year" className="mr-2">
                Année :
              </label>
              <select
                id="year"
                value={year}
                onChange={(e) => setYear(parseInt(e.target.value))}
              >
                {years.map((year) => (
                  <option key={year} value={year}>
                    {year}
                  </option>
                ))}
              </select>
            </div>

            {/* Filtre pour le type de location */}
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
                {Object.keys(chartConfig).map((key) => (
                  <option key={key} value={key}>
                    {chartConfig[key as RentalType].label}
                  </option>
                ))}
              </select>
            </div>
          </div>
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
              {Object.keys(chartConfig).map((key) => (
                <Line
                  key={key}
                  dataKey={key}
                  type="monotone"
                  stroke={chartConfig[key as RentalType].color}
                  strokeWidth={2}
                  dot={false}
                />
              ))}
            </LineChart>
          </ChartContainer>
        </CardContent>
        <CardFooter></CardFooter>
      </Card>
    </div>
  );
}

