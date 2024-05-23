"use client";

import { Variants, motion } from "framer-motion";

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

export default function DescriptionWebSite() {
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
        >
          <h2 className="text-md lg:text-xl mx-12 lg:mx-96 mt-12 text-justify">
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
          </h2>
        </motion.div>
      </motion.section>
    </div>
  );
}

