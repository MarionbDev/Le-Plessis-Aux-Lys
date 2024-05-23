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

export default function ImageWebSite() {
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
            className="w-full lg:w-3/5 "
          />
          <div className=" absolute flex justify-center items-center bg-slate-50/80 w-[16rem] h-20 md:w-[26rem]  md:h-[10rem] xl:w-[36rem] xl:h-[14rem] 2xl:w-[42rem] 2xl:h-[20rem]">
            <h2 className=" text-xl md:text-[2rem] lg:text-[2rem] xl:text-[3rem] 2xl:text-[3.5rem]  flex flex-col justify-center items-center w-[15rem] h-16 m-2 md:w-[24rem]  md:h-[8rem] xl:w-[34rem] xl:h-[12rem] 2xl:w-[38rem] 2xl:h-[16rem] border-[2px] lg:border-[2px] xl:border-[4px]  border-gold md:gap-5 xl:gap-14">
              <p>Gîte</p>
              <p>Chambres d'Hôtes</p>
            </h2>
          </div>
        </motion.div>
      </motion.section>
    </div>
  );
}

