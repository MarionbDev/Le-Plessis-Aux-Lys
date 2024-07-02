"use client";

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

type PropTypes = {
  nameRental: string;
  lowSeasonRateNight: string;
  highSeasonRateNight: string;
  lowSeasonRateWeek: string;
  highSeasonRateWeek: string;
  onSave: (UpdatedRates: UpdatedRates) => void;
};

type UpdatedRates = {
  lowSeasonRateNight: string;
  highSeasonRateNight: string;
  lowSeasonRateWeek: string;
  highSeasonRateWeek: string;
};

export default function RateRentalCardAdmin({
  nameRental,
  lowSeasonRateNight,
  highSeasonRateNight,
  lowSeasonRateWeek,
  highSeasonRateWeek,
  onSave,
}: PropTypes) {
  const [rates, setRates] = useState<UpdatedRates>({
    lowSeasonRateNight,
    highSeasonRateNight,
    lowSeasonRateWeek,
    highSeasonRateWeek,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setRates((prevRates) => ({ ...prevRates, [name]: value }));
  };

  const handleSave = () => {
    onSave(rates);
  };

  return (
    <div className="flex flex-col shadow-div rounded-md border-2 border-yellow/50 p-4  ">
      <Table className=" w-[30rem] font-text text-gray-800">
        <TableHeader>
          <TableRow>
            <TableHead className="w-[150px] text-center  font-semibold text-[1.1rem]">
              {nameRental}
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
                value={rates.lowSeasonRateNight}
                onChange={handleChange}
                className="w-16 text-center hover:bg-yellow/20 p-1 rounded-md"
              />{" "}
              <span>€</span>
            </TableCell>
            <TableCell className=" text-center">
              {highSeasonRateNight} €
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="font-medium">Semaine</TableCell>
            <TableCell className=" text-center">
              {lowSeasonRateWeek} €
            </TableCell>
            <TableCell className=" text-center">
              {highSeasonRateWeek} €
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
      <div className="flex justify-center">
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

