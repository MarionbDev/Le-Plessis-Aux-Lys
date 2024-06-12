import RentalPage from "@/app/_components/RentalPage";

const imagesChambre3 = ["/chambres/ch-3.jpg", "/chambres/ch-3-1.jpg"];

export default function RoomThree() {
  return (
    <div className=" h-screen">
      <RentalPage
        title="Chambre 3"
        lowSeasonNightRate={75}
        // lowSeasonWeeklyRate={75}
        highSeasonNightRate={75}
        // highSeasonWeeklyRate={75}
        imagesSlide={imagesChambre3}
      />
    </div>
  );
}

