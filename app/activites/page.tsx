"use client";

import VisitContext from "@/hooks/VisitContext";
import { ReactNode } from "react";
import VisitArticle from "../_components/VisitArticle";

export default function ToVisited({ children }: { children: ReactNode }) {
  const visitContextValue = {
    framerMotionVariants: {
      // Propriétés de configuration de Framer Motion
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
    },
    // Autres valeurs du contexte
  };

  return (
    <div className="pt-40 px-20 flex flex-col items-center my-10   ">
      <h3 className="font-prata text-2xl w-[50rem] text-center mb-16 text-text_color ">
        "Explorez la Vendée : entre océan et campagne, laissez-vous charmer par
        ses sites emblématiques et sa douceur de vivre."{" "}
      </h3>
      <span className="flex justify-center w-2/4 border-t-2 py-10 border-separator"></span>
      <div className="flex flex-col gap-12">
        <VisitContext.Provider value={visitContextValue}>
          {children}
          <VisitArticle visitTitle="Lorem ipsum" />
          <VisitArticle visitTitle="Lorem ipsum" />
          <VisitArticle visitTitle="Lorem ipsum" />
          <VisitArticle visitTitle="Lorem ipsum" />
        </VisitContext.Provider>
      </div>
    </div>
  );
}

