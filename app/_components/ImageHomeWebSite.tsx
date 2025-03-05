"use client";

import cassio from "@/public/chambres/cassiopee/ch-2-2.webp";
import orion from "@/public/chambres/orion/ch2.jpg";
import mare from "@/public/parc/eau.webp";
import parc2 from "@/public/parc/Parc-2.webp";
import parc3 from "@/public/parc/parc3.jpg";
import gite from "@/public/petite-ourse/Gite.webp";
import Image from "next/image";
// import parc3 from "@/public/parc/Parc-6.webp";
import { useEffect, useState } from "react";

const images = [parc3, orion, mare, cassio, parc2, gite];

export default function ImageHomeWebSite() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className=" mt-6 md:mt-[5rem] ">
      <div className="hidden lg:flex bg-yellow/50 w-full h-[20rem] "></div>
      <div className=" flex flex-col items-center md:justify-center ">
        {/* <div className=" flex flex-col items-center md:justify-center "> */}
        <div className="home-title flex flex-col justify-center gap-4 md:mb-10  ">
          <h1 className=" font-title-home text-title_color italic font-extralight ml-4 md:ml-10 mt-20 md:mt-0 text-4xl md:text-[3rem] tracking-[3px]">
            Le Plessis Aux Lys
          </h1>
          <span className="w-[7rem] md:w-[8rem]  ml-4 md:ml-10 border-t-2 border-separator"></span>
        </div>
        <div className="image-home">
          <h2 className="flex flex-col justify-center items-center mt-12 mb-10 md:mb-20 font-prata text-[#a18527] uppercase mx-2 text-3xl md:text-4xl lg:text-3xl xl:text-4xl max-[390px]:tracking-[1px] max-[461px]:tracking-[2px] min-[462px]:tracking-[6px]">
            <p className="">Gîtes</p>
            <p className=" ">&</p>
            <p className="text-center">Chambres d'Hôtes</p>
          </h2>
        </div>
        <div className="image-home flex justify-center mb-28   ">
          {images.map((image, index) => (
            <Image
              key={index}
              src={image}
              width={1550}
              height={906}
              sizes="(max-width: 600px) 75vw, (max-width: 800px) 37.5vw, 900px"
              loading="eager"
              priority={true}
              alt={`Slide ${index + 1}`}
              className={`absolute object-cover  object-center w-11/12 md:w-3/4 h-[14rem] sm:h-[18rem] transition-opacity duration-1000 shadow-md shadow-slate-400 ${
                index === currentIndex ? "opacity-100" : "opacity-0"
              }`}
            />
          ))}
        </div>
        {images.map((image, index) => (
          <Image
            key={index}
            src={image}
            width={1550}
            height={906}
            sizes="(max-width: 600px) 75vw, (max-width: 800px) 37.5vw, 900px"
            loading="eager"
            priority={true}
            alt={`Slide ${index + 1}`}
            className={`image-home-desk absolute object-cover  object-center  max-w-[980px] h-[28rem] transition-opacity duration-1000 shadow-md shadow-slate-400  ${
              index === currentIndex ? "opacity-100" : "opacity-0"
            }`}
          />
        ))}
        <div className="image-home-desk absolute flex justify-center items-center bg-slate-200/80 rounded-sm w-[22rem] h-[6.5rem] md:w-[25rem] md:h-[7rem] lg:w-[36rem] lg:h-[11rem] tracking-[6px]">
          <h2 className="flex flex-col justify-center items-center w-[20rem] h-[8rem] md:w-[23rem] md:h-[10rem] lg:w-[32rem] lg:h-[14rem] border-[2.3px] border-[#ffffff] font-prata text-[#a18527] uppercase text-2xl lg:text-3xl xl:text-4xl max-[390px]:tracking-[1px] max-[461px]:tracking-[2px] min-[462px]:tracking-[6px] ">
            <p className=" ">Gîtes</p>
            <p className=" ">&</p>
            <p className="text-center">Chambres d'Hôtes</p>
          </h2>
        </div>
      </div>
    </div>
  );
}

