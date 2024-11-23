import { EmblaOptionsType } from "embla-carousel";
import { Slide } from "../types";
import CarouselActivity from "./carousel/CarouselActivity";

type ActivityUserCarouselProps = {
  slides: Slide[];
};

const OPTIONS: EmblaOptionsType = {
  loop: true,
  skipSnaps: false,
  align: "start",
};

export default function ActivityUserCarousel({
  slides,
}: ActivityUserCarouselProps) {
  const imagePaths: string[] = slides
    .map((slide) => slide.image_path)
    .filter((path): path is string => path !== undefined);

  return (
    <>
      {slides.length > 0 && (
        <CarouselActivity slides={slides} options={OPTIONS} />
      )}
    </>
  );
}

