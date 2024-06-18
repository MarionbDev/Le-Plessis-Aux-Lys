import RentalPage from "@/app/_components/RentalPage";

const imagesChambre2 = [
  "/chambres/ch-2.jpg",
  "/chambres/ch-2-1.jpg",
  "/chambres/ch-2-2.jpg",
];

export default function RoomsTwo() {
  return (
    <div className=" h-screen">
      <RentalPage
        title="Chambre 2"
        lowSeasonNightRate={75}
        // lowSeasonWeeklyRate={560}
        highSeasonNightRate={75}
        // highSeasonWeeklyRate={680}
        imagesSlide={imagesChambre2}
      />
    </div>
  );
}

