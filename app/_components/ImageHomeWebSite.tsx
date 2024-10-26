"use client";

import { Variants, motion } from "framer-motion";
import Image from "next/image";
//optimisation des images

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
    <div className=" lg:mt-28">
      <motion.section
        initial="hide"
        whileInView="show"
        exit="hide"
        variants={sectionVariants}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="flex justify-center items-center  "
        >
          <Image
            src={"/parc/parc2.jpg"}
            width={1000}
            height={800}
            alt="parc"
            className="   lg:h-[29rem] 2xl:h-[30rem] 3xl:h-[40rem] object-cover object-center rounded-sm shadow-basic  "
          />

          <div className="absolute flex justify-center items-center bg-[#fdfdfd]/85  rounded-sm w-[22rem] h-[6.5rem] lg:w-[36rem] lg:h-[11rem] tracking-[6px] ">
            {/* <div className=" w-full h-full absolute" /> */}
            <h2 className="flex flex-col justify-center items-center w-[20rem] h-[8rem] lg:w-[32rem] lg:h-[14rem] border-[2.3px] border-[#ffffff] font-prata  text-[#a18527] uppercase  text-2xl lg:text-3xl xl:text-4xl max-[390px]:tracking-[1px] max-[461px]:tracking-[2px] min-[462px]:tracking-[6px]  ">
              <p className=" ">Gîte</p>
              <p className=" ">&</p>
              <p className=" ">Chambres d'Hôtes</p>
            </h2>
          </div>
        </motion.div>
      </motion.section>
    </div>
  );
}

// relative z-100 font-prata  text-[#a18527] uppercase font-prata text-2xl lg:text-3xl xl:text-4xl max-[390px]:tracking-[1px] max-[461px]:tracking-[2px] min-[462px]:tracking-[6px] text-center

// style de base : text-[#e9e7e7] bg-[#64641fd8] Image : w-full lg:w-full
// et <div className="absolute flex justify-center items-center  bg-[#f5f7dc]/70 w-[22rem] h-[6.5rem] lg:w-[40rem] lg:h-[12rem] tracking-[6px] ">
{
  /* <h2 className="font-prata text-[#575225]  uppercase font-extrabold text-xl lg:text-[2.2rem] flex flex-col justify-center items-center w-[20rem] h-[8rem] m-2 lg:w-[34rem] lg:h-[15rem] border-[2px] border-white/80 md:gap-5 lg:gap-6  "> */
}
{
  /* <div className="absolute flex justify-center items-center bg-[#f5f7dc]/60   w-[22rem] h-[6.5rem] lg:w-[36rem] lg:h-[11rem] tracking-[6px] ">
            <div className="bg-[#f5f7dc]/70 blur-lg w-full h-full absolute" /> + text a modif en 2.4 */
}

{
  /*dernier choix <div className="absolute flex justify-center items-center bg-[#fdfdfd]/80  w-[22rem] h-[6.5rem] lg:w-[36rem] lg:h-[11rem] tracking-[6px] ">
<div className="bg-[#fdfdfd]/50 blur-lg  w-full h-full absolute" /> */
}

// 1er choix : text-[#575225] bg-[#f5f7dc]/70 pour h2 ">

