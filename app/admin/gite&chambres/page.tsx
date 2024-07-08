import CardPhotosAdmin from "@/app/_components/CardPhotoAdmin";

export default function GiteAndRooms() {
  const gite = [
    { url: "/gite/gite.jpg", orientation: "horizontal" as "horizontal" },
    { url: "/gite/gite2.jpg", orientation: "vertical" as "vertical" },
    { url: "/gite/gite3.jpg", orientation: "vertical" as "vertical" },
  ];

  const chambre1 = [
    { url: "/chambres/ch-1.jpg", orientation: "horizontal" as "horizontal" },
    { url: "/chambres/ch-1-1.jpg", orientation: "horizontal" as "horizontal" },
  ];
  const chambre2 = [
    {
      url: "/chambres/ch-2.jpg",
      orientation: "horizontal" as "horizontal",
    },
  ];
  const chambre3 = [
    {
      url: "/chambres/ch-3.jpg",
      orientation: "horizontal" as "horizontal",
    },
    { url: "/chambres/ch-3-1.jpg", orientation: "horizontal" as "horizontal" },
  ];
  return (
    <div className=" my-20 ">
      <div className="flex justify-around gap-y-20 flex-wrap mx-20 mt-10 ">
        <CardPhotosAdmin title="Gîte" slides={gite} />
        <CardPhotosAdmin title="Chambre 1" slides={chambre1} />
        <CardPhotosAdmin title="Chambre 2" slides={chambre2} />
        <CardPhotosAdmin title="Chambre 3" slides={chambre3} />
      </div>
    </div>
  );
}

