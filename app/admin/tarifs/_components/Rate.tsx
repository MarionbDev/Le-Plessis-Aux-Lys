import { updateRentalPrices } from "@/app/api/rentals/route";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useState } from "react";
import { toast, Toaster } from "sonner";

type PropTypes = {
  nameRental: string;
  id: string;
  lowSeasonRateNight: number;
  highSeasonRateNight: number;
  lowSeasonRateWeek: number;
  highSeasonRateWeek: number;
};

type UpdatedRates = {
  lowSeasonRateNight: number | null | undefined;
  highSeasonRateNight: number | null | undefined;
  lowSeasonRateWeek: number | null | undefined;
  highSeasonRateWeek: number | null | undefined;
};

export default function RateRentalCardAdmin({
  id,
  nameRental,
  lowSeasonRateNight,
  highSeasonRateNight,
  lowSeasonRateWeek,
  highSeasonRateWeek,
}: PropTypes) {
  const [rates, setRates] = useState<UpdatedRates>({
    lowSeasonRateNight,
    highSeasonRateNight,
    lowSeasonRateWeek,
    highSeasonRateWeek,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const numericValue = value === "-" ? undefined : parseFloat(value);
    setRates((prevRates) => ({
      ...prevRates,
      [name]: numericValue,
    }));
  };

  const handleSave = async () => {
    try {
      // Initialise updatedRates avec les valeurs actuelles de rates
      const updatedRates: UpdatedRates = {
        lowSeasonRateNight:
          rates.lowSeasonRateNight !== undefined
            ? rates.lowSeasonRateNight
            : undefined,
        highSeasonRateNight:
          rates.highSeasonRateNight !== undefined
            ? rates.highSeasonRateNight
            : undefined,
        lowSeasonRateWeek:
          rates.lowSeasonRateWeek !== undefined
            ? rates.lowSeasonRateWeek
            : undefined,
        highSeasonRateWeek:
          rates.highSeasonRateWeek !== undefined
            ? rates.highSeasonRateWeek
            : undefined,
      };

      await updateRentalPrices(id, updatedRates);
      toast.success("Les tarifs ont été mis à jour avec succès !");
    } catch (error) {
      console.error("Error updating prices:", error);
      toast.error("Erreur de mise à jour des tarifs !");
    }
  };

  const displayValue = (value: number | null | undefined) => {
    if (value == null || isNaN(value)) {
      return "-";
    }
    return value.toString();
  };

  return (
    <div className="flex flex-col shadow-div rounded-md border-2 border-yellow/50 p-4  ">
      <Table className=" w-[30rem] font-text text-gray-800">
        <TableHeader>
          <TableRow>
            <TableHead className="w-[150px] text-center  font-semibold text-[1.1rem]">
              {nameRental.charAt(0).toUpperCase() + nameRental.slice(1)}
            </TableHead>
            <TableHead className=" text-center">Basse Saison</TableHead>
            <TableHead className=" text-center">Haute saison</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell className="font-medium">Nuit</TableCell>
            <TableCell className="flex justify-center items-center text-center ">
              <input
                type="text"
                name="lowSeasonRateNight"
                value={displayValue(rates.lowSeasonRateNight)}
                onChange={handleChange}
                className="w-16 text-center hover:bg-yellow/20 p-1 rounded-md border-2"
              />
              <span className="ml-1">€</span>
            </TableCell>
            <TableCell className=" text-center">
              <input
                type="text"
                name="highSeasonRateNight"
                value={displayValue(rates.highSeasonRateNight)}
                onChange={handleChange}
                className="w-16 text-center hover:bg-yellow/20 p-1 rounded-md border-2"
              />
              <span className="ml-1">€</span>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="font-medium">Semaine</TableCell>
            <TableCell className=" text-center">
              <input
                type="text"
                name="lowSeasonRateWeek"
                value={displayValue(rates.lowSeasonRateWeek)}
                onChange={handleChange}
                className="w-16 text-center hover:bg-yellow/20 p-1 rounded-md border-2"
              />
              <span className="ml-1">€</span>
            </TableCell>
            <TableCell className=" text-center">
              <input
                type="text"
                name="highSeasonRateWeek"
                value={displayValue(rates.highSeasonRateWeek)}
                onChange={handleChange}
                className="w-16 text-center hover:bg-yellow/20 p-1 rounded-md border-2"
              />
              <span className="ml-1">€</span>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
      <div className="flex justify-center">
        <Toaster richColors />
        <Button
          onClick={handleSave}
          className=" font-text hover:text-white hover:bg-gold/80 bg-gold/30 mt-4"
        >
          Enregistrer
        </Button>
      </div>
    </div>
  );
}

