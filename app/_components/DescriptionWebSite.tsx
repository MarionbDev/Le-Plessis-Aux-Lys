"use client";

import beach from "@/public/home/beach.webp";
import marais from "@/public/home/marais.webp";
import moulins from "@/public/home/moulins.webp";
import parc6 from "@/public/parc/parc-6.webp";

import { Variants, motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import chambreAndromede from "../../public/chambres/andromede/ch-3-1.webp";
import chambreCassiopee from "../../public/chambres/cassiopee/ch-2.webp";
import chambreOrion from "../../public/chambres/orion/ch-1.webp";
import chambrePegase from "../../public/chambres/pegase/pegase2.webp";

// import grandeOurse from "../../public/image.png";
import petiteOurse from "../../public/petite-ourse/Gite-1.webp";

import { getAllArticles } from "../api/article/route";
import { ArticleProps, Slide } from "../types";
import ActivityUserCarousel from "./ActivityUserCarousel";

const sectionVariants: Variants = {
  hide: {
    opacity: 0,
  },
  show: {
    opacity: 1,
    transition: {
      duration: 1,
      delay: 0.6,
    },
  },
};

const textVariants: Variants = {
  hide: {
    opacity: 1,
    x: -600,
  },
  show: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 1,
      ease: "easeOut",
    },
  },
};

const imageVariants: Variants = {
  hide: {
    opacity: 0,
    y: 100,
  },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      delay: 0.2,
    },
  },
};

const imageVariantsLateral: Variants = {
  hide: {
    opacity: 0,
    x: 100,
  },
  show: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.7,
      delay: 0.2,
    },
  },
};

export default function DescriptionWebSite() {
  const [articles, setArticles] = useState<ArticleProps[]>([]);
  const [slides, setSlides] = useState<Slide[]>([]);

  const router = useRouter();

  useEffect(() => {
    async function fetchAllArticles() {
      try {
        const fetchedArticles = await getAllArticles();
        setArticles(fetchedArticles as ArticleProps[]);

        const slides = (fetchedArticles as ArticleProps[]).map((article) => ({
          image_path: article.image_path,
          title: article.title,
        }));
        setSlides(slides);
      } catch (error) {
        console.error("Error fetching articles:", error);
      }
    }
    fetchAllArticles();
  }, []);

  return (
    <div className="font-text text-text_color xl:mt-40 pt-10 xl:pt-6 ">
      <motion.section
        initial="hide"
        whileInView="show"
        exit="hide"
        variants={sectionVariants}
      >
        <motion.div variants={textVariants} initial="hide" animate="show">
          <div className="mx-10 md:mx-4 lg:mx-56 text-center leading-loose  text-base xl:text-lg">
            <h3 className="flex flex-col items-center text-center xl:font-prata mb-6 lg:mb-20 ">
              Céline et Thierry sont heureux de vous accueillir au Plessis aux
              Lys.
              <span className="flex justify-center w-2/6 mt-10 border-t-2  border-separator"></span>
            </h3>
          </div>
        </motion.div>
      </motion.section>
      <motion.section
        initial="hide"
        whileInView="show"
        exit="hide"
        variants={imageVariants}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <div className="w-full flex justify-center bg-[#f5f7dc]/50 mt-20 rounded-t-[4rem] ">
            <div className="mx-[2rem] md:mx-10 lg:mx-10 xl:mx-32  p-4  my-6 md:my-14 xl:max-w-[100rem]  leading-loose   ">
              <div className="flex flex-col lg:flex-row md:items-center  gap-8      ">
                <motion.section
                  initial="hide"
                  whileInView="show"
                  exit="hide"
                  variants={imageVariants}
                >
                  <motion.div
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.6 }}
                  >
                    <p className="text-[0.9rem] max-w-[50rem] ">
                      Demeure de caractère datant du XIXème siècle, située dans
                      le village de La chapelle aux Lys, cité au Guide Vert de
                      2023 comme étant le plus petit village possédant son
                      planétarium que vous pourrez découvrir à 2 minutes à
                      pieds. <br /> 4 chambres de charme, dont une suite
                      familiale pouvant accueillir jusqu'à 5 personnes, chacune
                      équipée de sa salle d'eau et ses toilettes, ainsi que 2
                      gites - l'un pour 2 à 4 personnes et l'autre pour 8 à 10
                      personnes - vous accueilleront au sein d'un parc où
                      trônent des arbres séculaires. Ceux-ci vous inviteront à
                      la quiétude , à la méditation et au repos, après vous être
                      délassés dans la piscine chauffée mise à disposition de
                      mai à septembre.
                    </p>
                  </motion.div>
                </motion.section>
                <motion.section
                  initial="hide"
                  whileInView="show"
                  exit="hide"
                  variants={imageVariantsLateral}
                >
                  <motion.div
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.6 }}
                  >
                    <div className="flex flex-col items-center md:flex-row  gap-6     ">
                      <Image
                        src={parc6}
                        width={300}
                        height={100}
                        alt="Photo du parc du gîte"
                        className=" object-contain w-[20rem]  rounded-sm     "
                      />
                      {/* <Image
                        src={moulins}
                        width={300}
                        height={100}
                        alt="Photo du parc du gîte"
                        className=" object-contain w-[20rem]   rounded-sm     "
                      />
                      <Image
                        src={marais}
                        width={300}
                        height={200}
                        alt="Photo du parc du gîte"
                        className=" object-contain w-[14rem]  rounded-sm    "
                      /> */}
                    </div>
                  </motion.div>
                </motion.section>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.section>

      <motion.section
        initial="hide"
        whileInView="show"
        exit="hide"
        variants={sectionVariants}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
        >
          <div className="flex justify-center flex-col items-center text-md lg:text-md mx-4 mt-20 xl:mt-44  leading-loose">
            <div className="w-4/5 flex flex-col lg:flex-row items-center justify-center mt-16 lg:mt-0 gap-4 lg:gap-12 lg:my-20">
              <span className="flex justify-center w-[16rem]  border-t-2  border-separator"></span>
              <p className=" font-semibold text-center lg:text-lg uppercase lg:w-[27rem]  ">
                DECOUVREZ SANS PLUS ATTENDRE
              </p>
              <span className="flex justify-center w-[16rem] border-t-2  border-separator"></span>
            </div>
            <p className="my-8 md:my-12 lg:my-4 mx-6 sm:mx-10 md:mx-20 lg:mx-44">
              Trois chambres de charme, une suite familiale pour 5 personnes,
              possédant chacune leur salle d'eau et leurs toilettes, ainsi que
              deux gîtes — l'un pour 2 à 4 personnes et l'autre pour 8 à 10
              personnes — vous accueilleront au sein d'un parc où trônent des
              arbres séculaires qui vous inviteront à la quiétude, la méditation
              et au repos après vous être délassés dans la piscine chauffée mise
              à disposition de mai à septembre.
            </p>
          </div>
        </motion.div>
      </motion.section>

      <motion.section
        initial="hide"
        whileInView="show"
        exit="hide"
        variants={imageVariants}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="flex  justify-center"
        >
          <ul className=" flex gap-8 xl:gap-16 flex-wrap justify-center mt-8 xl:mt-14 w-2/3 md:w-full cursor-pointer">
            <li className="relative overflow-hidden group ">
              <Link
                href={"/gites/le-logis-de-la-petite-ourse"}
                onClick={() =>
                  router.push("/gites/le-logis-de-la-petite-ourse")
                }
              >
                <Image
                  src={petiteOurse}
                  width={400}
                  height={200}
                  alt="photo du gîte"
                  className=" rounded-sm shadow-basic  transition-transform transform group-hover:scale-125 duration-1000 h-auto  "
                />
                <div className="absolute bottom-0 left-0 right-0 bg-black  bg-opacity-20 backdrop-blur-xl flex items-center  transform translate-y-0 group-hover:translate-y-full group-hover:bg-opacity-50 transition-all duration-500">
                  <p className="pl-4 text-lg font-semibold text-white py-2">
                    Le logis de la Petite Ourse
                  </p>
                </div>
              </Link>
            </li>
            <li className=" h-[220px]  relative overflow-hidden group w-96 flex justify-center items-center bg-[#f5f7dc] ">
              <Link
                href={"/gites/le-logis-de-la-grande-ourse"}
                onClick={() =>
                  router.push("/gites/le-logis-de-la-grande-ourse")
                }
              >
                {/* <Image
                  src={grandeOurse}
                  width={400}
                  height={200}
                  alt="photo du gîte"
                  className=" rounded-sm shadow-basic  transition-transform transform group-hover:scale-125 duration-1000 h-auto "
                /> */}

                <div className="absolute bottom-0 left-0 right-0 bg-black  bg-opacity-20 backdrop-blur-xl flex items-center  transform translate-y-0 group-hover:translate-y-full group-hover:bg-opacity-50 transition-all duration-500">
                  <p className="pl-4 text-lg font-semibold text-white py-2">
                    Le Logis de la Grande Ourse
                  </p>
                </div>
              </Link>
            </li>
          </ul>
        </motion.div>
      </motion.section>
      <motion.section
        initial="hide"
        whileInView="show"
        exit="hide"
        variants={imageVariants}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="flex  justify-center"
        >
          <ul className=" flex gap-8 xl:gap-16 flex-wrap justify-center mt-8 xl:mt-16 w-2/3  md:w-full  cursor-pointer">
            <li className="relative overflow-hidden group">
              <Link
                href={"/chambres/orion"}
                onClick={() => router.push("/chambres/orion")}
              >
                <Image
                  src={chambreOrion}
                  width={400}
                  height={200}
                  alt="photo de la chambre Orion"
                  className=" rounded-sm shadow-basic  transition-transform transform group-hover:scale-125  duration-1000 h-auto "
                />
                <div className="absolute bottom-0 left-0 right-0 bg-black  bg-opacity-20 backdrop-blur-xl flex items-center  transform translate-y-0 group-hover:translate-y-full group-hover:bg-opacity-50 transition-all duration-500">
                  <p className="pl-4 text-lg font-semibold text-white py-2">
                    Chambre Orion
                  </p>
                </div>
              </Link>
            </li>

            <li className="relative overflow-hidden group">
              <Link
                href={"/chambres/cassiopee"}
                onClick={() => router.push("/chambres/cassiopee")}
              >
                <Image
                  src={chambreCassiopee}
                  width={400}
                  height={200}
                  alt="photo de la chambre Cassiopee"
                  className="rounded-sm shadow-basic transition-transform transform group-hover:scale-125 duration-500 h-auto"
                />

                {/* <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-0 flex items-center justify-center transform translate-y-full group-hover:translate-y-0 group-hover:bg-opacity-50 transition-all duration-500"> */}

                <div className="absolute bottom-0 left-0 right-0 bg-black  bg-opacity-20 backdrop-blur-xl flex items-center  transform translate-y-0 group-hover:translate-y-full group-hover:bg-opacity-50 transition-all duration-500">
                  {/* <p className="text-lg text-center font-semibold text-white opacity-0 group-hover:opacity-100 transition-opacity duration-500 border border-white/50 px-5 py-2 bg-black/50 rounded-md"> */}
                  <p className="pl-4 text-lg font-semibold text-white py-2">
                    Chambre Cassiopée
                  </p>
                </div>
              </Link>
            </li>
          </ul>
        </motion.div>
      </motion.section>

      <motion.section
        initial="hide"
        whileInView="show"
        exit="hide"
        variants={imageVariants}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="flex  justify-center"
        >
          <ul className=" flex gap-8 xl:gap-16 flex-wrap justify-center mt-8 xl:mt-16 w-2/3  md:w-full  cursor-pointer">
            <li className="relative overflow-hidden group">
              <Link
                href={"/chambres/andromede"}
                onClick={() => router.push("/chambres/andromede")}
              >
                <Image
                  src={chambreAndromede}
                  width={400}
                  height={200}
                  alt="photo de la chambre 3"
                  className=" rounded-sm shadow-basic  transition-transform transform group-hover:scale-125  duration-1000 h-auto"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-black  bg-opacity-20 backdrop-blur-xl flex items-center  transform translate-y-0 group-hover:translate-y-full group-hover:bg-opacity-50 transition-all duration-500">
                  <p className="pl-4 text-lg font-semibold text-white py-2">
                    Chambre Andromède
                  </p>
                </div>
              </Link>
            </li>
            <li className="relative overflow-hidden group">
              <Link
                href={"/chambres/suite-familiale-pegase"}
                onClick={() => router.push("/chambres/suite-familiale-pegase")}
              >
                <Image
                  src={chambrePegase}
                  width={400}
                  height={200}
                  alt="photo de la suite familiale Pégase"
                  className=" rounded-sm shadow-basic  transition-transform transform group-hover:scale-125  duration-500 h-auto"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-black  bg-opacity-20 backdrop-blur-xl flex items-center  transform translate-y-0 group-hover:translate-y-full group-hover:bg-opacity-50 transition-all duration-500">
                  <p className="pl-4 text-lg font-semibold text-white py-2">
                    Suite familiale Pégase
                  </p>
                </div>
              </Link>
            </li>
          </ul>
        </motion.div>
      </motion.section>

      <motion.section
        initial="hide"
        whileInView="show"
        exit="hide"
        variants={sectionVariants}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.5 }}
        >
          <div className="flex justify-center flex-col items-center  text-md lg:text-md  md:mt-20  lg:mt-48  leading-loose">
            <div className="w-4/5 flex flex-col lg:flex-row items-center justify-center mb-10 md:mb-0 mt-24 lg:mt-0 gap-4  lg:gap-10 lg:my-8">
              <span className="flex justify-center w-[16rem]  border-t-2  border-separator"></span>
              <p className=" font-semibold text-center lg:text-lg uppercase ">
                Vous Allez Adorer
              </p>
              <span className="flex  justify-center w-[16rem] border-t-2  border-separator"></span>
            </div>
            <div className="w-full flex justify-center bg-[#f5f7dc]/50 mt-20 rounded-t-[4rem] ">
              <div className="mx-[2rem] md:mx-10 lg:mx-10 xl:mx-32  p-4  my-6 md:my-14 xl:max-w-[100rem]  leading-loose   ">
                <div className="flex flex-col items-center gap-8      ">
                  <motion.section
                    initial="hide"
                    whileInView="show"
                    exit="hide"
                    variants={imageVariants}
                  >
                    <motion.div
                      initial={{ opacity: 0, scale: 0.5 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.6 }}
                    >
                      <p className="text-[0.9rem] mb-10  ">
                        Idéalement situé pour découvrir notre belle région de
                        Vendée, Le Plessis aux Lys n'est qu'à 10mn d'un des plus
                        beaux villages de France : Vouvant et de la forêt de
                        Mervent; à 20mn du marais Poitevin et des Abbayes de
                        Maillezais et de Nieul-sur-l'Autise ; à 45 mn du Puy du
                        Fou, 45 mn du Mont aux Alouettes et de ses Moulins; à 1
                        heure des premières plages et de bien d'autres
                        curiosités telles que La Rochelle, les îles de Ré et
                        d'Oléron.
                      </p>
                    </motion.div>
                  </motion.section>
                  <motion.section
                    initial="hide"
                    whileInView="show"
                    exit="hide"
                    variants={imageVariants}
                  >
                    <motion.div
                      initial={{ opacity: 0, scale: 0.5 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.6 }}
                    >
                      <div className="flex flex-col items-center xl:flex-row  gap-6     ">
                        <Image
                          src={beach}
                          width={300}
                          height={100}
                          alt="Photo du parc du gîte"
                          className=" object-contain w-[20rem]  rounded-sm     "
                        />
                        <Image
                          src={moulins}
                          width={300}
                          height={100}
                          alt="Photo du parc du gîte"
                          className=" object-contain w-[18rem]   rounded-sm     "
                        />
                        <Image
                          src={marais}
                          width={300}
                          height={200}
                          alt="Photo du parc du gîte"
                          className=" object-contain w-[14rem]  rounded-sm    "
                        />
                      </div>
                    </motion.div>
                  </motion.section>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.section>

      <motion.section
        initial="hide"
        whileInView="show"
        exit="hide"
        variants={imageVariants}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex justify-center flex-col items-center text-md lg:text-md mx-4 xl:mx-12 lg:mx-32 mt-20 md:mt-20 lg:mt-72  xl:mt-28 leading-loose ">
            <div className="w-4/5 flex flex-col lg:flex-row items-center justify-center gap-4 lg:gap-12 mt-24 lg:mt-20 lg:mb-10">
              <span className="flex justify-center w-[16rem]  border-t-2  border-separator"></span>
              <p className=" font-semibold text-center lg:text-lg uppercase ">
                à voir et à faire
              </p>
              <span className="flex justify-center w-[16rem] border-t-2  border-separator"></span>
            </div>
            <p className="px-6 xl:w-[70rem] mt-12 text-center ">
              "Entre balades bucoliques, découvertes historiques et paysages
              grandioses, La Chapelle aux Lys est le point de départ idéal pour
              explorer la région. Plongez dans les merveilles locales, à la
              rencontre d'une Vendée authentique et préservée !"
            </p>
          </div>
        </motion.div>
      </motion.section>

      <motion.section
        initial="hide"
        whileInView="show"
        exit="hide"
        variants={imageVariants}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex justify-center flex-col items-center    xl:mt-10 ">
            <div className=" xl:w-[80rem]">
              <ActivityUserCarousel slides={slides} />
            </div>
          </div>
        </motion.div>
      </motion.section>

      <motion.section
        initial="hide"
        whileInView="show"
        exit="hide"
        variants={imageVariants}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex justify-center flex-col items-center text-md lg:text-md mx-4  mt-20 xl:mt-44  leading-loose">
            <div className="w-4/5 flex flex-col lg:flex-row items-center justify-center mt-16 lg:mt-0 gap-4 lg:gap-12 lg:my-20">
              <span className="flex justify-center w-[16rem]  border-t-2  border-separator"></span>
              <p className=" font-semibold text-center lg:text-lg uppercase lg:w-[27rem]  ">
                Réservez votre gîte ou chambre d'hôtes au Plessis aux Lys
              </p>
              <span className="flex justify-center w-[16rem] border-t-2  border-separator"></span>
            </div>
            <div className="my-8 md:my-12 lg:my-4 mx-6 sm:mx-10 md:mx-20 lg:mx-44">
              <p className=" ">
                Nous vous invitons à réserver votre séjour dans l'un de nos
                gîtes ou chambres d'hôtes au cœur de la Vendée. Contactez-nous
                dès maintenant via notre{" "}
                <Link href={"/nous-contacter"} className=" text-[#bbbb57]">
                  formulaire de contact
                </Link>{" "}
                et réserver votre séjour unique dans notre cadre exceptionnel.
                Nous serons ravis de vous accueillir pour une expérience
                insolite et inoubliable dans l'une de nos maisons d'hôtes.
              </p>
            </div>
          </div>
        </motion.div>
      </motion.section>
    </div>
  );
}

