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
                <div className="   flex flex-col justify-center items-center  ">
                  <div className=" relative overflow-hidden rounded-md ">
                    <Image
                      src={slide.image_path}
                      width={800}
                      height={144}
                      sizes="(max-width: 600px) 75vw, (max-width: 800px) 37.5vw, 256px"
                      alt={`Photo ${index + 1}`}
                      className="object-scale-down h-auto shadow-md shadow-slate-400 opacity-90   "
                    />

                    <div className="absolute top-1/2 transform -translate-y-1/2 mx-8 left-0 right-0  bg-opacity-20 backdrop-blur-xl flex items-center text-white rounded-md border-white border-2 ">
                      <p className="px-2 py-1 w-full text-[14px] font-bold text-center ">
                        {slide.title}
                      </p>
                    </div>
                  </div>
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

