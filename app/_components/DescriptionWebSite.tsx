"use client";

import { Variants, motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import chambreAndromede from "../../public/chambres/andromede/ch-3-1.jpg";
import chambreCassiopee from "../../public/chambres/cassiopee/ch-2.jpg";
import chambreOrion from "../../public/chambres/orion/ch-1.jpg";
import chambrePegase from "../../public/chambres/pegase/ch-2.jpg";

// import grandeOurse from "../../public/image.png";
import parc1 from "../../public/parc/parc1.jpg";
import parc6 from "../../public/parc/parc6.jpg";
import petiteOurse from "../../public/petite-ourse/gite.jpg";

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
    <div className="font-text text-text_color pt-10 xl:pt-6 ">
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
        >
          <div className="mx-10 md:mx-4 lg:mx-56 text-center leading-loose  text-base xl:text-2xl">
            <p className=" xl:font-prata mb-6 ">
              Céline et Thierry sont heureux de vous accueillir au Plessis aux
              Lys.
            </p>
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
        >
          <div className="mx-6 p-4 lg:mx-56 leading-loose md:mt-32 lg:mt-44  bg-[#f5f7dc]/50 ">
            {/*style de base: bg-[#f5f7dc]
               style 1er choix : bg-[#f5f7dc]/50  */}
            <div className="flex flex-col md:flex-row items-center  border-l-4 border-t-4 border-white">
              <p className=" px-4 py-2 mb-6 xl:mb-0 lg:px-16 text-[1rem] lg:text-md">
                Demeure de caractère datant du XIXème siècle, située dans le
                village de La Chapelle aux Lys, cité au Guide Vert de 2023 comme
                étant le plus petit village possédant son Planétarium que vous
                pourrez découvrir à 2 minutes à pied.
              </p>
              <Image
                src={parc6}
                width={320}
                height={200}
                alt="photo intérieur du gîte"
                className="w-[17rem] lg:w-[25rem] rounded-sm shadow-basic md:m-2 md:mt-4   "
              />
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
          <div className="flex justify-center flex-col items-center text-md lg:text-md mx-4 xl:mx-12 lg:mx-56 md:mt-20 xl:mt-44  leading-loose">
            <div className="w-4/5 flex flex-col lg:flex-row items-center justify-center mt-16 lg:mt-0 gap-4 lg:gap-12 lg:my-20">
              <span className="flex justify-center w-[16rem]  border-t-2  border-separator"></span>
              <p className=" font-semibold text-center lg:text-lg uppercase lg:w-[27rem]  ">
                DECOUVREZ SANS PLUS ATTENDRE
              </p>
              <span className="flex justify-center w-[16rem] border-t-2  border-separator"></span>
            </div>{" "}
            <p className="my-8 mx-6 md:my-12 lg:my-4 md:mx-12">
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
          <ul className=" flex gap-8 xl:gap-16 flex-wrap justify-center mt-8 xl:mt-14 w-2/3 cursor-pointer">
            <li className="relative overflow-hidden group">
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
                  className=" rounded-sm shadow-basic  transition-transform transform group-hover:scale-125 duration-1000 h-auto "
                />
                <div className="absolute inset-0 bg-black bg-opacity-0 flex items-center justify-center transition duration-1000 group-hover:bg-opacity-50 group-hover:opacity-100">
                  <p className="text-lg font-semibold text-white xl:opacity-0 group-hover:opacity-100 transition duration-700 border border-white/50 px-5 py-2 bg-black/50 rounded-md">
                    Le Logis de la petite Ourse
                  </p>
                </div>
              </Link>
            </li>
            <li className="relative overflow-hidden group w-96 flex justify-center items-center bg-[#f5f7dc] ">
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
                <div className="">photo </div>
                <div className="absolute inset-0 bg-black bg-opacity-0 flex items-center justify-center transition duration-1000 group-hover:bg-opacity-50 group-hover:opacity-100">
                  <p className="text-lg font-semibold text-white xl:opacity-0 group-hover:opacity-100 transition duration-700 border border-white/50 px-5 py-2 bg-black/50 rounded-md">
                    Le Logis de la grande Ourse
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
          <ul className=" flex gap-8 xl:gap-16 flex-wrap justify-center mt-8 xl:mt-16 w-2/3 cursor-pointer">
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
                <div className="absolute inset-0 bg-black bg-opacity-0 flex items-center justify-center transition duration-1000 group-hover:bg-opacity-50 group-hover:opacity-100">
                  <p className="text-lg font-semibold text-white xl:opacity-0 group-hover:opacity-100 transition duration-700 border border-white/50 px-5 py-2 bg-black/50 rounded-md">
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
                  className=" rounded-sm shadow-basic  transition-transform transform group-hover:scale-125  duration-500 h-auto"
                />
                <div className="absolute inset-0 bg-black bg-opacity-0 flex items-center justify-center transition duration-500 group-hover:bg-opacity-50 group-hover:opacity-100">
                  <p className="text-lg font-semibold text-white xl:opacity-0 group-hover:opacity-100 transition duration-700 border border-white/50 px-5 py-2 bg-black/50 rounded-md">
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
          <ul className=" flex gap-8 xl:gap-16 flex-wrap justify-center mt-8 xl:mt-16 w-2/3 cursor-pointer">
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
                <div className="absolute inset-0 bg-black bg-opacity-0 flex items-center justify-center transition duration-500 group-hover:bg-opacity-50 group-hover:opacity-100">
                  <p className="text-lg font-semibold text-white xl:opacity-0 group-hover:opacity-100 transition duration-700 border border-white/50 px-5 py-2 bg-black/50 rounded-md">
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
                <div className="absolute inset-0 bg-black bg-opacity-0 flex items-center justify-center transition duration-500 group-hover:bg-opacity-50 group-hover:opacity-100">
                  <p className="text-lg font-semibold text-white xl:opacity-0 group-hover:opacity-100 transition duration-700 border border-white/50 px-5 py-2 bg-black/50 rounded-md">
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
          <div className="flex justify-center flex-col items-center text-md lg:text-md mx-4 xl:mx-12 lg:mx-32 md:mt-20  lg:mt-48  leading-loose">
            <div className="w-4/5 flex flex-col lg:flex-row items-center justify-center mb-10 md:mb-0 mt-24 lg:mt-0 gap-4  lg:gap-10 lg:my-8">
              <span className="flex justify-center w-[16rem]  border-t-2  border-separator"></span>
              <p className=" font-semibold lg:text-lg uppercase ">
                Vous Allez Adorer
              </p>
              <span className="flex  justify-center w-[16rem] border-t-2  border-separator"></span>
            </div>
            <div className="mx-6 p-4 lg:mx-[10rem] leading-loose md:mt-20 bg-[#f5f7dc]/50">
              <div className=" border-r-4 border-b-4 border-white p-4 lg:p-8 lg:h-[18rem]">
                <Image
                  src={parc1}
                  width={200}
                  height={200}
                  alt="Photo du parc du gîte"
                  className="float-left w-[20rem] lg:w-[25rem] mr-4 lg:mr-10 mb-4 sm:mb-0 lg:mb-4 rounded-sm shadow-basic"
                />
                <p className="text-[1rem] lg:text-md ">
                  Idéalement situé pour découvrir notre belle région de Vendée,
                  Le Plessis aux Lys n'est qu'à 10mn d'un des plus beaux
                  villages de France : Vouvant et de la forêt de Mervent; à 20mn
                  du marais Poitevin et des Abbayes de Maillezais et de
                  Nieul-sur-l'Autise ; à 45 mn du Puy du Fou, 45 mn du Mont aux
                  Alouettes et de ses Moulins; à 1 heure des premières plages et
                  de bien d'autres curiosités telles que La Rochelle, les îles
                  de Ré et d'Oléron.
                </p>
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
          <div className="flex justify-center flex-col items-center text-md lg:text-md mx-4 xl:mx-12 lg:mx-32  xl:mt-28 leading-loose ">
            <div className="w-4/5 flex flex-col lg:flex-row items-center justify-center gap-4 lg:gap-12 mt-24 lg:mt-20 lg:mb-10">
              <span className="flex justify-center w-[16rem]  border-t-2  border-separator"></span>
              <p className=" font-semibold lg:text-lg uppercase ">
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
            <div className=" lg:w-[80rem]">
              <ActivityUserCarousel slides={slides} />
            </div>
          </div>
        </motion.div>
      </motion.section>
    </div>
  );
}

