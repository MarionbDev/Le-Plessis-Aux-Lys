"use client";

import { EmblaOptionsType } from "embla-carousel";
import Autoplay from "embla-carousel-autoplay";
import useEmblaCarousel from "embla-carousel-react";
import { ArrowRightLeft } from "lucide-react";
import Image from "next/image";
import React from "react";
import styles from "./Carousel.module.css";

type PropType = {
  slides?: string[];
  options?: EmblaOptionsType;
};

const EmblaCarousel: React.FC<PropType> = ({ slides = [], options }) => {
  const [emblaRef, emblaApi] = useEmblaCarousel(options, [Autoplay()]);

  // const {
  //   prevBtnDisabled,
  //   nextBtnDisabled,
  //   onPrevButtonClick,
  //   onNextButtonClick,
  // } = usePrevNextButtons(emblaApi);

  return (
    <section className={styles.embla}>
      <div className={styles.embla__viewport} ref={emblaRef}>
        <div className={styles.embla__container}>
          {slides.map((slide, index) => (
            <div className={styles.embla__slide} key={index}>
              <div className={styles.embla__slide__image}>
                <div className="relative overflow-hidden group cursor-pointer">
                  <Image
                    src={slide}
                    width={600}
                    height={200}
                    alt={`Photo ${index + 1}`}
                    className="  object-scale-down h-[33rem] group  "
                  />
                  <div className="absolute inset-0  flex items-center mx-[17.5rem]  ">
                    <p className="text-lg font-semibold  opacity-0 group-hover:opacity-100 transition duration-500 bg-white/70 rounded-full p-4 text-black/80 ">
                      <ArrowRightLeft size={20} />
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>{" "}
    </section>
  );
};

export default EmblaCarousel;

