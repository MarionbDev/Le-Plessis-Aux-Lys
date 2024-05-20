"use client";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { EmblaOptionsType } from "embla-carousel";
import Autoplay from "embla-carousel-autoplay";
import useEmblaCarousel from "embla-carousel-react";
import Image from "next/image";

type PropType = {
  slides: string[];
  options?: EmblaOptionsType;
};

export default function EmblaCarousel(props: PropType) {
  const { slides, options } = props;
  const [emblaRef] = useEmblaCarousel(options);

  return (
    <Carousel
      opts={{ loop: true, duration: 40 }}
      plugins={[
        Autoplay({
          delay: 10000,
          stopOnMouseEnter: true,
        }),
      ]}
      ref={emblaRef}
      className=" "
    >
      <CarouselContent className="">
        {slides.map((slide, index) => (
          <CarouselItem key={index}>
            <Image
              src={slide}
              width={600}
              height={200}
              alt={`Photo ${index + 1}`}
              className="h-48 w-full object-scale-down md:h-[32rem] "
            />
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  );
}

