"use client";

import parc2 from "@/public/parc/Parc-2.webp";
import { Variants } from "framer-motion";
import Image from "next/image";

const sectionVariants: Variants = {
  hide: {
    opacity: 0,
  },
  show: {
    opacity: 1,
    transition: {
      duration: 1,
      delay: 0.3,
    },
  },
};

export default function ImageHomeWebSite() {
  return (
    // <div className=" mt-6 lg:mt-28">
    <div className=" mt-6 lg:mt-14">
      {/* <div className=" flex flex-col items-center md:justify-center md:mt-20 lg:mt-36"> */}
      <div className=" flex flex-col items-center md:justify-center ">
        <div className="home-title flex flex-col justify-center gap-4 md:mb-10">
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
        <Image
          src={parc2}
          // width={900}
          width={1550}
          height={906}
          // sizes="(max-width: 600px) 75vw, (max-width: 800px) 37.5vw, 900px"
          priority={true}
          loading="eager"
          alt="photo du parc"
          // className="object-cover object-center w-11/12 md:w-3/4 max-w-[900px] h-auto rounded-sm"
          className=" h-[40rem] object-cover rounded-sm"
        />
        <div className="image-home-desk absolute flex justify-center items-center bg-[#fdfdfd]/85 rounded-sm w-[22rem] h-[6.5rem] md:w-[25rem] md:h-[7rem] lg:w-[36rem] lg:h-[11rem] tracking-[6px]">
          <h2 className="flex flex-col justify-center items-center w-[20rem] h-[8rem] md:w-[23rem] md:h-[10rem] lg:w-[32rem] lg:h-[14rem] border-[2.3px] border-[#ffffff] font-prata text-[#a18527] uppercase text-2xl lg:text-3xl xl:text-4xl max-[390px]:tracking-[1px] max-[461px]:tracking-[2px] min-[462px]:tracking-[6px]">
            <p className=" ">Gîtes</p>
            <p className=" ">&</p>
            <p className="text-center">Chambres d'Hôtes</p>
          </h2>
        </div>
      </div>
    </div>
  );
}

