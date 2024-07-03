"use client";

import { getPrice } from "@/app/api/prices/route";
import { useEffect, useState } from "react";

// type UpdatedRates = {
//   lowSeasonRateNight: string;
//   highSeasonRateNight: string;
//   lowSeasonRateWeek: string;
//   highSeasonRateWeek: string;
// };

type Price = {
  id: string;
  name_rental: string;
  season: string;
  rate_type: string;
  price: number;
};

export default function RentalRates() {
  // Logique pour gérer la mise à jour des tarifs
  // Appeler l'API

  const [prices, setPrices] = useState<Price[]>([]);

  const fetchPrices = async () => {
    try {
      const fetchedPrices = await getPrice();
      setPrices(fetchedPrices);
    } catch (error) {
      console.error("Error fetching prices,", error);
    }
  };

  useEffect(() => {
    fetchPrices();
  }, []);

  // const handleSaveRates = (nameRental: string, updateRates: UpdatedRates) => {
  //   console.log(`Tarifs mis à jour pour ${nameRental}:`, updateRates);
  // };
  return (
    <>
      <div className="flex flex-wrap gap-16 gap-x-32 mx-10 justify-center my-20">
        {prices.map((price) => (
          <div key={price.id} className="p-4 border border-gray-300 rounded-md">
            <p>ID: {price.id}</p>
            <p>Name Rental: {price.name_rental}</p>
            <p>Season: {price.season}</p>
            <p>Rate Type: {price.rate_type}</p>
            <p>Price: {price.price} €</p>
          </div>
        ))}
        {/* 
          // <RateRentalCardAdmin
          //   nameRental={"Gîte"}
          //   lowSeasonRateNight={
          //     price.rate_type === "night" && price.season === "low"
          //       ? price.price.toString()
          //       : "N/A"
          //   }
          //   highSeasonRateNight={
          //     price.rate_type === "night" && price.season === "high"
          //       ? price.price.toString()
          //       : "N/A"
          //   }
          //   lowSeasonRateWeek={
          //     price.rate_type === "week" && price.season === "low"
          //       ? price.price.toString()
          //       : "N/A"
          //   }
          //   highSeasonRateWeek={
          //     price.rate_type === "week" && price.season === "high"
          //       ? price.price.toString()
          //       : "N/A"
          //   }
          //   onSave={(updatedRates) => handleSaveRates("Gîte", updatedRates)}
          // />
        // ))} */}
        {/* <RateRentalCardAdmin
          nameRental="Chambre 1"
          lowSeasonRateNight="75"
          highSeasonRateNight="75"
          lowSeasonRateWeek="75"
          highSeasonRateWeek="75"
          onSave={(updatedRates) => handleSaveRates("Chambre 1", updatedRates)}
        />
        <RateRentalCardAdmin
          nameRental="Chambre 2"
          lowSeasonRateNight="75"
          highSeasonRateNight="75"
          lowSeasonRateWeek="75"
          highSeasonRateWeek="75"
          onSave={(updatedRates) => handleSaveRates("Chambre 2", updatedRates)}
        />
        <RateRentalCardAdmin
          nameRental="Chambre 3"
          lowSeasonRateNight="75"
          highSeasonRateNight="75"
          lowSeasonRateWeek="75"
          highSeasonRateWeek="75"
          onSave={(updatedRates) => handleSaveRates("Chambre 3", updatedRates)}
        /> */}
      </div>
    </>
  );
}

