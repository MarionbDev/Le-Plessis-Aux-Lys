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

  return (
    <section className={styles.embla_rental}>
      <div className={styles.embla__viewport_rental} ref={emblaRef}>
        <div className={styles.embla__container_rental}>
          {slides.map((slide, index) => (
            <div className={styles.embla__slide_rental} key={index}>
              <div className={styles.embla__slide__image_rental}>
                <div className="relative flex justify-center overflow-hidden group cursor-pointer">
                  <Image
                    src={slide}
                    width={600}
                    height={200}
                    alt={`Photo ${index + 1}`}
                    className="  object-scale-down h-[20rem] lg:h-[33rem] w-auto group  "
                  />
                  <div className="absolute inset-0  flex justify-center items-center  ">
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

