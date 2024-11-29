import anes from "@/public/home/anes.webp";
import nature from "@/public/home/nature.webp";
import vendee from "@/public/home/vendee.webp";

import Image from "next/image";
import ContactForm from "./_components/Contact";

export default function ContactPage() {
  return (
    <>
      <div className=" min-h-screen font-text flex flex-col lg:flex-row gap-10 lg:gap-4 lg:mx-4 justify-around items-center my-10    ">
        <div className="flex flex-col  lg:w-[33rem] xl:w-[40rem] md:gap-8 lg:gap-20 xl:gap-10 md:mt-10">
          <div className="flex flex-col lg:flex-row items-center justify-center mt-16   gap-4 my-8 md:mt-0 lg:-mt-10 ">
            <span className="flex justify-center w-[12rem]  border-t-2  border-separator"></span>
            <p className=" font-semibold text-text_color text-center md:text-xl uppercase md:w-[28rem]  ">
              COntactez-nous
            </p>
            <span className="flex justify-center w-[12rem] border-t-2  border-separator"></span>
          </div>
          {/* <h1 className=" text-text_color text-[1.4rem] lg:text-center  ">
            Contactez nous
          </h1> */}
          <div className="flex justify-center items-center sm:hidden">
            {/* <Image
              src={nature}
              width={250}
              height={141}
              alt="image"
              className=" shadow-basic "
            /> */}
          </div>
          <div className=" flex justify-center flex-wrap  gap-3  ">
            <Image
              src={vendee}
              width={180}
              height={101}
              alt="image"
              className=" shadow-basic rounded-sm w-[8rem] sm:w-[10rem] md:w-[15rem]   lg:w-[16rem] xl:w-[18rem] "
            />
            <Image
              src={nature}
              width={300}
              height={169}
              alt="image"
              className=" shadow-basic rounded-sm  w-[8rem] sm:w-[10rem] md:w-[15rem]    lg:w-[16rem] xl:w-[18rem] "
            />
            <Image
              src={anes}
              width={200}
              height={101}
              alt="image"
              className=" shadow-basic rounded-sm  w-[8rem] sm:w-[10rem]  md:w-[15rem]    lg:w-[16rem] xl:w-[18rem]  "
            />
          </div>
        </div>
        <ContactForm />
      </div>
    </>
  );
}

