"use client";

import RateRentalCardAdmin from "./components/Rate";

type UpdatedRates = {
  lowSeasonRateNight: string;
  highSeasonRateNight: string;
  lowSeasonRateWeek: string;
  highSeasonRateWeek: string;
};

export default function RentalRates() {
  // Logique pour gérer la mise à jour des tarifs
  // Appeler l'API

  const handleSaveRates = (nameRental: string, updateRates: UpdatedRates) => {
    console.log(`Tarifs mis à jour pour ${nameRental}:`, updateRates);
  };
  return (
    <>
      <div className="flex flex-wrap gap-16 gap-x-32 mx-10 justify-center my-20">
        <RateRentalCardAdmin
          nameRental="Gîte"
          lowSeasonRateNight="90"
          highSeasonRateNight="110"
          lowSeasonRateWeek="560"
          highSeasonRateWeek="960"
          onSave={(updatedRates) => handleSaveRates("Gîte", updatedRates)}
        />
        <RateRentalCardAdmin
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
        />
      </div>
    </>
  );
}

