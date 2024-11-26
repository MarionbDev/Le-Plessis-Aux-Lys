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
import { Save } from "lucide-react";
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
    <div className=" flex flex-col shadow-md rounded-md border-2  pb-2 md:p-4  ">
      <Table className="text-text_color text-[0.9rem] min-w-[22rem] sm:w-[35rem] font-text ">
        <TableHeader>
          <TableRow>
            <TableHead className="w-[40px] md:w-[150px] text-center  font-semibold sm:text-[1rem]">
              {nameRental.charAt(0).toUpperCase() + nameRental.slice(1)}
            </TableHead>
            <TableHead className=" text-center w-[50px] md:w-[150px]">
              Basse Saison
            </TableHead>
            <TableHead className=" text-center w-[50px] md:w-[150px]">
              Haute saison
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell className="font-medium">Nuit</TableCell>
            <TableCell className=" text-center p-1 ">
              <input
                type="text"
                name="lowSeasonRateNight"
                value={displayValue(rates.lowSeasonRateNight)}
                onChange={handleChange}
                className="w-12 md:w-16 text-center hover:bg-yellow/20 p-1 rounded-md border-2"
              />
              <span className="ml-1">€</span>
            </TableCell>
            <TableCell className=" text-center p-1">
              <input
                type="text"
                name="highSeasonRateNight"
                value={displayValue(rates.highSeasonRateNight)}
                onChange={handleChange}
                className="w-12 md:w-16 text-center hover:bg-yellow/20 p-1 rounded-md border-2"
              />
              <span className="ml-1">€</span>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="font-medium">Semaine</TableCell>
            <TableCell className=" text-center p-1">
              <input
                type="text"
                name="lowSeasonRateWeek"
                value={displayValue(rates.lowSeasonRateWeek)}
                onChange={handleChange}
                className="w-12 md:w-16 text-center hover:bg-yellow/20 p-1 rounded-md border-2"
              />
              <span className="ml-1">€</span>
            </TableCell>
            <TableCell className=" text-center p-1">
              <input
                type="text"
                name="highSeasonRateWeek"
                value={displayValue(rates.highSeasonRateWeek)}
                onChange={handleChange}
                className="w-12 md:w-16 text-center hover:bg-yellow/20 p-1 rounded-md border-2"
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
          className=" font-text gap-2 text-text_color  hover:text-white hover:bg-gold/80 bg-gold/30 mt-4"
        >
          <Save size="16" /> Enregistrer
        </Button>
      </div>
    </div>
  );
}

