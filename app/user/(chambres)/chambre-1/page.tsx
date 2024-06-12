import RentalPage from "@/app/_components/RentalPage";

const imagesChambre1 = ["/chambres/ch-1.jpg", "/chambres/ch-1-1.jpg"];

export default function RoomsOne() {
  return (
    <div className=" h-screen">
      <RentalPage
        title="Chambre 1"
        lowSeasonNightRate={75}
        // lowSeasonWeeklyRate={75}
        highSeasonNightRate={75}
        // highSeasonWeeklyRate={75}
        imagesSlide={imagesChambre1}
      />
    </div>
  );
}

