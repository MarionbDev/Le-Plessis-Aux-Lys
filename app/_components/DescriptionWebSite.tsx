"use client";

import { Variants, motion } from "framer-motion";
import Image from "next/image";
import chambre_1 from "../../public/chambres/ch-1.jpg";
import chambre_2 from "../../public/chambres/ch-2.jpg";
import chambre_3 from "../../public/chambres/ch-3.jpg";
import gite from "../../public/gite/gite.jpg";
import parc1 from "../../public/parc/parc1.jpg";
import parc3 from "../../public/parc/parc3.jpg";

const sectionVariants: Variants = {
  hide: {
    opacity: 0,
  },
  show: {
    opacity: 1,
    transition: {
      duration: 1,
      delay: 0.8,
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
  return (
    <div className="font-text text-text_color pt-10 xl:pt-6  ">
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
          <div className="mx-56 text-center leading-loose  text-2xl">
            <p className=" font-prata mb-6 ">
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
          transition={{ duration: 0.8 }}
        >
          <div className="mx-56 flex flex-col items-center gap-12 text-center leading-loose  text-lg mt-10">
            <p>
              Demeure de caractère datant du XIXème siècle, situé dans le
              village de La chapelle aux Lys, cité au guide vert de 2023 comme
              étant le plus petit village possédant son Planétarium que vous
              pourrez découvrir à 2 minute à pieds.
            </p>
            <Image
              src={parc3}
              width={400}
              height={200}
              alt="photo intérieur du gîte"
              className=" rounded-sm shadow-basic border-2 p-1 "
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
          <div className="flex justify-center flex-col items-center text-md lg:text-md mx-12 lg:mx-56 mt-28 text-justify  leading-loose">
            <span className="flex justify-center w-2/4 border-t-2 py-10 border-separator"></span>
            <p className="my-4 mx-2">
              3 chambres de charme possédant chacune leur salle d'eau et leurs
              toilettes et un gite de 2 à 4 personnes, vous accueilleront au
              sein d'un parc ou trônent des arbres séculaires qui vous
              inviteront à la quiétude , la méditation et au repos après vous
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
          <ul className=" flex gap-6 flex-wrap justify-center mt-14 w-2/3">
            <li>
              <Image
                src={gite}
                width={400}
                height={200}
                alt="photo intérieur du gîte"
                className=" rounded-sm shadow-basic"
              />
            </li>
            <li>
              <Image
                src={chambre_1}
                width={400}
                height={200}
                alt="photo de la chambre 1"
                className=" rounded-sm shadow-basic"
              />
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
          <ul className=" flex gap-6 flex-wrap justify-center mt-6 w-2/3">
            <li>
              <Image
                src={chambre_2}
                width={400}
                height={200}
                alt="photo de la chambre 2"
                className=" rounded-sm shadow-basic"
              />
            </li>
            <li>
              <Image
                src={chambre_3}
                width={400}
                height={200}
                alt="photo de la chambre 3"
                className=" rounded-sm shadow-basic"
              />
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
          <div className="flex justify-center flex-col items-center text-md lg:text-md mx-12 lg:mx-36  mt-28 text-justify  leading-loose">
            <span className="flex justify-center w-2/4 border-t-2 py-10 border-separator"></span>
            <div className="flex justify-between items-center gap-36">
              <p>
                Idéalement situé pour découvrir notre belle région de Vendée ,
                Le Plessis aux Lys n'est qu'à 10mn d'un des plus beaux villages
                de France: Vouvant et de la forêt de Mervent; à 20mn du marais
                Poitevin et des Abbayes de Maillezais et de Nieul sur l'Autise ;
                à 45 mn du Puy du Fou,45 mn du Mont aux Alouettes et de ses
                Moulins; à 1 heure des premières plages et de bien d'autres
                curiosités comme La Rochelle ,les iles de Ré et D'Oléron.
              </p>
              <Image
                src={parc1}
                width={500}
                height={500}
                alt="Photo du parc du gîte"
                className=" rounded-sm shadow-basic border-2 p-1 bg-white"
              />
            </div>
          </div>
        </motion.div>
      </motion.section>
    </div>
  );
}

