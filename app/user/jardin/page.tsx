import Image from "next/image";
import jardin1 from "../../../public/parc/jardin1.jpg";
import jardin2 from "../../../public/parc/jardin2.jpg";
import mare from "../../../public/parc/mare.jpg";
import parc1 from "../../../public/parc/parc1.jpg";
import parc2 from "../../../public/parc/parc2.jpg";
import parc3 from "../../../public/parc/parc3.jpg";
import parc4 from "../../../public/parc/parc4.jpg";
import parc5 from "../../../public/parc/parc5.jpg";
import parc6 from "../../../public/parc/parc6.jpg";

export default function Garden() {
  const images = [
    { src: parc2, orientation: "horizontal" as const, alt: "photo jardin" },
    { src: parc3, orientation: "horizontal" as const, alt: "photo jardin" },
    { src: parc1, orientation: "horizontal" as const, alt: "photo jardin" },
    { src: parc6, orientation: "horizontal" as const, alt: "photo jardin" },
    { src: parc4, orientation: "vertical" as const, alt: "photo jardin" },
    { src: parc5, orientation: "vertical" as const, alt: "photo jardin" },
    { src: jardin2, orientation: "horizontal" as const, alt: "photo jardin" },
    { src: jardin1, orientation: "horizontal" as const, alt: "photo jardin" },
    { src: mare, orientation: "horizontal" as const, alt: "photo jardin" },
  ];

  return (
    <div className="mx-20 flex flex-col items-center">
      {/* <h2 className="mt-40 mb-20">Jardin</h2> */}
      <div className="mt-40 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10">
        {images.map((image, index) => (
          <div key={index} className="flex justify-center items-center ">
            <Image
              src={image.src}
              width={image.orientation === "horizontal" ? 420 : 320}
              height={image.orientation === "horizontal" ? 300 : 200}
              alt={image.alt}
              className="p-0 shadow-basic"
            />
          </div>
        ))}
      </div>
    </div>
  );
}

