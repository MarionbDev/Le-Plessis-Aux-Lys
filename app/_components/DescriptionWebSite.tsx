"use client";

import { Variants, motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import chambre_1 from "../../public/chambres/ch-1.jpg";
import chambre_2 from "../../public/chambres/ch-2.jpg";
import chambre_3 from "../../public/chambres/ch-3.jpg";
import gite from "../../public/gite/gite.jpg";
import parc1 from "../../public/parc/parc1.jpg";
import parc3 from "../../public/parc/parc3.jpg";
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
          <div className="mx-4 lg:mx-56 text-center leading-loose  text-base xl:text-2xl">
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
          <div className="mx-6 p-4 lg:mx-56 flex flex-col lg:flex-row items-center leading-loose lg:mt-20 bg-[#f8f8f9]">
            <p className="  mb-6 xl:mb-0 lg:px-20 text-[1rem] lg:text-md">
              Demeure de caractère datant du XIXème siècle, située dans le
              village de La Chapelle aux Lys, cité au Guide Vert de 2023 comme
              étant le plus petit village possédant son Planétarium que vous
              pourrez découvrir à 2 minutes à pied.
            </p>
            <Image
              src={parc3}
              width={400}
              height={200}
              alt="photo intérieur du gîte"
              className=" rounded-sm shadow-basic border-2 p-1  "
            />
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
          <div className="flex justify-center flex-col items-center text-md lg:text-md mx-4 xl:mx-12 lg:mx-56 xl:mt-28  leading-loose">
            <div className="w-4/5 flex flex-col lg:flex-row items-center justify-center mt-16 lg:mt-0 gap-4 lg:gap-12 lg:my-20">
              <span className="flex justify-center w-[16rem]  border-t-2  border-separator"></span>
              <p className=" font-semibold text-center lg:text-lg uppercase lg:w-[27rem]  ">
                DECOUVREZ SANS PLUS ATTENDRE
              </p>
              <span className="flex justify-center w-[16rem] border-t-2  border-separator"></span>
            </div>{" "}
            <p className="my-4 mx-4">
              3 chambres de charme possédant chacune leur salle d'eau et leurs
              toilettes et un gîte de 2 à 4 personnes, vous accueilleront au
              sein d'un parc où trônent des arbres séculaires qui vous
              inviteront à la quiétude, la méditation et au repos après vous
              être délassés dans la piscine chauffée mise à disposition de mai à
              septembre.
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
                href={"/user/gite"}
                onClick={() => router.push("/user/gite")}
              >
                <Image
                  src={gite}
                  width={400}
                  height={200}
                  alt="photo du gîte"
                  className=" rounded-sm shadow-basic  transition-transform transform group-hover:scale-125 duration-1000 h-auto "
                />
                <div className="absolute inset-0 bg-black bg-opacity-0 flex items-center justify-center transition duration-1000 group-hover:bg-opacity-50 group-hover:opacity-100">
                  <p className="text-lg font-semibold text-white xl:opacity-0 group-hover:opacity-100 transition duration-700 border border-white/50 px-5 py-2 bg-black/50 rounded-md">
                    Gîte
                  </p>
                </div>
              </Link>
            </li>
            <li className="relative overflow-hidden group">
              <Link
                href={"/user/cahmbre1"}
                onClick={() => router.push("/user/chambre1")}
              >
                <Image
                  src={chambre_1}
                  width={400}
                  height={200}
                  alt="photo de la chambre 1"
                  className=" rounded-sm shadow-basic  transition-transform transform group-hover:scale-125  duration-1000 h-auto "
                />
                <div className="absolute inset-0 bg-black bg-opacity-0 flex items-center justify-center transition duration-1000 group-hover:bg-opacity-50 group-hover:opacity-100">
                  <p className="text-lg font-semibold text-white xl:opacity-0 group-hover:opacity-100 transition duration-700 border border-white/50 px-5 py-2 bg-black/50 rounded-md">
                    Chambre 1
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
                href={"/user/chambre2"}
                onClick={() => router.push("/user/chambre2")}
              >
                <Image
                  src={chambre_2}
                  width={400}
                  height={200}
                  alt="photo de la chambre 2"
                  className=" rounded-sm shadow-basic  transition-transform transform group-hover:scale-125  duration-500 h-auto"
                />
                <div className="absolute inset-0 bg-black bg-opacity-0 flex items-center justify-center transition duration-500 group-hover:bg-opacity-50 group-hover:opacity-100">
                  <p className="text-lg font-semibold text-white xl:opacity-0 group-hover:opacity-100 transition duration-700 border border-white/50 px-5 py-2 bg-black/50 rounded-md">
                    Chambre 2
                  </p>
                </div>
              </Link>
            </li>
            <li className="relative overflow-hidden group">
              <Link
                href={"/user/chambre3"}
                onClick={() => router.push("/user/chambre3")}
              >
                <Image
                  src={chambre_3}
                  width={400}
                  height={200}
                  alt="photo de la chambre 3"
                  className=" rounded-sm shadow-basic  transition-transform transform group-hover:scale-125  duration-1000 h-auto"
                />
                <div className="absolute inset-0 bg-black bg-opacity-0 flex items-center justify-center transition duration-500 group-hover:bg-opacity-50 group-hover:opacity-100">
                  <p className="text-lg font-semibold text-white xl:opacity-0 group-hover:opacity-100 transition duration-700 border border-white/50 px-5 py-2 bg-black/50 rounded-md">
                    Chambre 3
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
          <div className="flex justify-center flex-col items-center text-md lg:text-md mx-4 xl:mx-12 lg:mx-32  lg:mt-28  leading-loose">
            <div className="w-4/5 flex flex-col lg:flex-row items-center justify-center mt-24 lg:mt-0 gap-4  lg:gap-10 lg:my-20">
              <span className="flex justify-center w-[16rem]  border-t-2  border-separator"></span>
              <p className=" font-semibold lg:text-lg uppercase ">
                Vous Allez Adorer
              </p>
              <span className="flex  justify-center w-[16rem] border-t-2  border-separator"></span>
            </div>
            <div className="flex flex-col lg:flex-row  justify-between items-center bg-[#f8f8f9] mx-4">
              <p className=" my-4 p-4 lg:px-20">
                Idéalement situé pour découvrir notre belle région de Vendée ,
                Le Plessis aux Lys n'est qu'à 10mn d'un des plus beaux villages
                de France : Vouvant et de la forêt de Mervent; à 20mn du marais
                Poitevin et des Abbayes de Maillezais et de Nieul-sur-l'Autise ;
                à 45 mn du Puy du Fou, 45 mn du Mont aux Alouettes et de ses
                Moulins; à 1 heure des premières plages et de bien d'autres
                curiosités telles que La Rochelle, les îles de Ré et D'Oléron.
              </p>
              <Image
                src={parc1}
                width={500}
                height={500}
                alt="Photo du parc du gîte"
                className=" rounded-sm shadow-basic border-2 p-1 bg-white h-auto"
              />
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
            <div className=" lg:w-[80rem]">
              <ActivityUserCarousel slides={slides} />
            </div>
          </div>
        </motion.div>
      </motion.section>
    </div>
  );
}

