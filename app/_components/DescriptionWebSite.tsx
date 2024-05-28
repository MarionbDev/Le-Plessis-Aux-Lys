"use client";

import { Variants, motion } from "framer-motion";
import Image from "next/image";
import parc1 from "../../public/parc/parc1.jpg";
import parc from "../../public/parc/parc3.jpg";

const sectionVariants: Variants = {
  hide: {
    opacity: 0,
  },
  show: {
    opacity: 1,
    transition: {
      duration: 1.5,
      delay: 0.5,
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
      duration: 0.5,
    },
  },
};

export default function DescriptionWebSite() {
  return (
    <div className="font-text mt-24 lg:mt-38">
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
          <div className="text-text_color text-md lg:text-md mx-12 lg:mx-96  text-justify  leading-relaxed ">
            <div className="flex justify-center mb-20 border-t-2 border-yellow-200"></div>
            <p>
              Céline et Thierry sont heureux de vous accueillir au Plessis aux
              Lys.
              <br />
              Demeure de caractère datant du XIXème siècle, situé dans le
              village de La chapelle aux Lys, cité au guide vert de 2023 comme
              étant le plus petit village possédant son Planétarium que vous
              pourrez découvrir à 2 minute à pieds.
              <br />
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
          transition={{ duration: 1.5 }}
        >
          <div className="flex justify-center gap-10 mt-20">
            <Image
              src={parc}
              width={400}
              height={500}
              alt="Photo du parc du gîte"
            />
            <Image
              src={parc1}
              width={500}
              height={500}
              alt="Photo du parc du gîte"
            />{" "}
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
          transition={{ duration: 0.5 }}
        >
          <div className="text-md lg:text-md mx-12 lg:mx-96 mt-12 text-justify  leading-relaxed">
            <div className="flex justify-center my-20 border-t-2 border-yellow-200 "></div>

            <p className="my-4">
              3 chambres de charme possédant chacune leur salle d'eau et leurs
              toilettes et un gite de 2 à 4 personnes, vous accueilleront au
              sein d'un parc ou trônent des arbres séculaires qui vous
              inviteront à la quiétude , la méditation et au repos après vous
              être délassés dans la piscine chauffée mise à disposition de mai à
              septembre.
            </p>
            <p>
              Idéalement situé pour découvrir notre belle région de Vendée , Le
              Plessis aux Lys n'est qu'à 10mn d'un des plus beaux villages de
              France: Vouvant et de la forêt de Mervent; à 20mn du marais
              Poitevin et des Abbayes de Maillezais et de Nieul sur l'Autise ; à
              45 mn du Puy du Fou,45 mn du Mont aux Alouettes et de ses Moulins;
              à 1 heure des premières plages et de bien d'autres curiosités
              comme La Rochelle ,les iles de Ré et D'Oléron.
            </p>
          </div>
        </motion.div>
      </motion.section>
    </div>
  );
}

