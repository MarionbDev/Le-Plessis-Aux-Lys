"use client";

import { EmblaOptionsType } from "embla-carousel";
import Autoplay from "embla-carousel-autoplay";
import useEmblaCarousel from "embla-carousel-react";
import Image from "next/image";
import React from "react";

import { Slide } from "@/app/types";
import { useRouter } from "next/navigation";
import styles from "./Carousel.module.css";

type PropType = {
  slides: Slide[];
  options?: EmblaOptionsType;
};

const CarouselActivity: React.FC<PropType> = ({ slides, options }) => {
  const [emblaRef, emblaApi] = useEmblaCarousel(options, [Autoplay()]);

  const router = useRouter();

  return (
    <>
      <section className={styles.embla_activity}>
        <div className={styles.embla__viewport} ref={emblaRef}>
          <div className={styles.embla__container_activity}>
            {slides.map((slide, index) => (
              <div className={styles.embla__slide_activity} key={index}>
                {/* <Link
                href={"/user/activites"}
                onClick={() => router.push("/user/activites")}
              > */}
                <div className="cursor-pointer  flex flex-col justify-center items-center ">
                  <Image
                    src={slide.image_path}
                    width={256}
                    height={144}
                    sizes="(max-width: 600px) 75vw, (max-width: 800px) 37.5vw, 256px"
                    alt={`Photo ${index + 1}`}
                    className="object-scale-down  "
                  />

                  <p className="mt-2 text-sm font-semibold ">{slide.title}</p>
                </div>
                {/* </Link> */}
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default CarouselActivity;

