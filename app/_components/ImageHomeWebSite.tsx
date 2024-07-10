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
    <div className="mt-20 lg:mt-28">
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
          className="flex justify-center items-center"
        >
          <Image
            src={"/parc/parc2.jpg"}
            width={1000}
            height={800}
            alt="parc"
            className="w-full lg:w-full lg:h-[29rem] 2xl:h-[30rem] 3xl:h-[40rem] object-cover object-center rounded-sm shadow-basic "
          />
          <div className="absolute flex justify-center items-center  bg-[#64641fd8]   w-[16rem] h-20 lg:w-[40rem] lg:h-[11rem] tracking-[6px] ">
            <h2 className="font-prata text-[#e9e7e7]  uppercase font-extrabold text-xl lg:text-[2.2rem] flex flex-col justify-center items-center w-[15rem] h-16 m-2 lg:w-[34rem] lg:h-[14rem] border-[3px] border-gold md:gap-5 lg:gap-6  ">
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

