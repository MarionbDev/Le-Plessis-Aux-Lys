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

const EmblaCarousel: React.FC<PropType> = (props) => {
  const { slides, options } = props;
  const [emblaRef] = useEmblaCarousel(options, [Autoplay(), Fade()]);

  return (
    <div className="embla">
      <div className="embla_viewport" ref={emblaRef}>
        <div className="embla_container">
          {slides.map((slide, index) => (
            <div className="embla_slide " key={index}>
              <Image
                src={slide}
                width={600}
                height={200}
                alt={`Photo ${index + 1}`}
                className=" h-48 w-full object-scale-down md:h-[32rem]  shadow-2xl shadow-slate-700 "
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default EmblaCarousel;

