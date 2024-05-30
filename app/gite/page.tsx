import EmblaCarousel from "../_components/EmblaCarousel";

export default function Gîte() {
  const imagesGite = ["/gite/gite.jpg", "/gite/gite2.jpg", "/gite/gite3.jpg"];
  return (
    <>
      <h3 className="ml-10 mt-32 lg:text-lg">Notre Gîte</h3>
      <EmblaCarousel slides={imagesGite} />
    </>
  );
}

