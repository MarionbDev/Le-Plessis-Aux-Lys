"use client";

import { EmblaOptionsType } from "embla-carousel";
import Autoplay from "embla-carousel-autoplay";
import Fade from "embla-carousel-fade";
import useEmblaCarousel from "embla-carousel-react";
import Image from "next/image";
import React from "react";

type PropType = {
  slides: string[];
  options?: EmblaOptionsType;
};

const Embla: React.FC<PropType> = (props) => {
  const { slides, options } = props;
  const [emblaRef] = useEmblaCarousel(options, [Autoplay(), Fade()]);

  return (
    <div className="embla">
      <div className="embla__viewport" ref={emblaRef}>
        <div className="embla__container">
          {slides.map(
            (
              slide,
              index, // Correction ici
            ) => (
              <div className="embla__slide" key={index}>
                {" "}
                {/* Correction ici */}
                <Image
                  src={slide}
                  width={600}
                  height={200}
                  alt={`Photo ${index + 1}`}
                  className="h-48 w-full object-scale-down md:h-[32rem] "
                />
              </div>
            ),
          )}
        </div>
      </div>
    </div>
  );
};

export default Embla;

