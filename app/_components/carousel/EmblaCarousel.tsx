"use client";

import { EmblaOptionsType } from "embla-carousel";
import Autoplay from "embla-carousel-autoplay";
import useEmblaCarousel from "embla-carousel-react";
import Image from "next/image";
import React from "react";
import {
  NextButton,
  PrevButton,
  usePrevNextButtons,
} from "../carousel/EmblaCarouselArrowButtons";
import styles from "./Carousel.module.css";

type PropType = {
  slides?: string[];
  options?: EmblaOptionsType;
};

const EmblaCarousel: React.FC<PropType> = ({ slides = [], options }) => {
  const [emblaRef, emblaApi] = useEmblaCarousel(options, [Autoplay()]);

  const {
    prevBtnDisabled,
    nextBtnDisabled,
    onPrevButtonClick,
    onNextButtonClick,
  } = usePrevNextButtons(emblaApi);

  return (
    <section className={styles.embla}>
      <div className={styles.embla__viewport} ref={emblaRef}>
        <div className={styles.embla__container}>
          {slides.map((slide, index) => (
            <div className={styles.embla__slide} key={index}>
              <div className={styles.embla__slide__image}>
                <Image
                  src={slide}
                  width={600}
                  height={200}
                  alt={`Photo ${index + 1}`}
                  className="  object-scale-down h-[33rem] "
                />
              </div>
            </div>
          ))}
        </div>
      </div>{" "}
      <div className={styles.embla__controls}>
        <div className={styles.embla__buttons}>
          <PrevButton onClick={onPrevButtonClick} disabled={prevBtnDisabled} />
          <NextButton onClick={onNextButtonClick} disabled={nextBtnDisabled} />
        </div>
      </div>
    </section>
  );
};

export default EmblaCarousel;

