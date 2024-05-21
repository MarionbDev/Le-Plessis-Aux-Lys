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
          <div className=" absolute flex justify-center items-center bg-slate-50/90 w-[15rem] h-20 lg:w-[40rem]  lg:h-[18rem] ">
            <div className="title-home text-2xl lg:text-[4rem] italic flex justify-center items-center w-[15rem] h-16 m-2 lg:w-[38rem]  lg:h-[16rem] border-[1px]  lg:border-[3px] border-[#e0c133]">
              Le Plessis Aux Lys
            </div>
          </div>
        </motion.div>
      </motion.section>
    </div>
  );
}

