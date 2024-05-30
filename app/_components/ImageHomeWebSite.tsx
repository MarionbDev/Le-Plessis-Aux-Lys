"use client";

import { Variants, motion } from "framer-motion";
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
    <div className="mt-20 lg:mt-40">
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
            src={"/parc2.jpg"}
            height={300}
            width={600}
            alt="parc"
            className="w-full lg:w-3/5 h-96  object-cover"
          />

          <div className="absolute flex justify-center items-center  bg-yellow-50/90  w-[16rem] h-20 lg:w-[32rem] lg:h-[9rem] tracking-[6px] ">
            <h2 className="font-prata text-title_color uppercase font-light text-xl lg:text-[2.2rem] flex flex-col justify-center items-center w-[15rem] h-16 m-2 lg:w-[30rem] lg:h-[12rem] border-[3px] border-gold md:gap-5 lg:gap-8  ">
              <p>Gîte et</p>
              <p>Chambres d'Hôtes</p>
            </h2>
          </div>
        </motion.div>
      </motion.section>
    </div>
  );
}

