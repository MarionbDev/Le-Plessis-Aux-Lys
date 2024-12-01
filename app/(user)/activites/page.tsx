"use client";

import VisitArticle from "@/app/_components/VisitArticle";
import { getAllArticles } from "@/app/api/article/route";
import VisitContext from "@/hooks/VisitContext";
import { Metadata } from "next";
import { useEffect, useState } from "react";

export const metadata: Metadata = {
  robots: {
    index: true,
    follow: true,
  },
  title: "Le Plessis aux Lys - Gîtes et Chambres d'Hôtes en Vendée",
  description:
    "Bienvenue au Plessis aux Lys en Vendée ! Séjournez dans une demeure de caractère du XIXe siècle, nichée dans le village pittoresque de La Chapelle aux Lys, où vous attendent deux gîtes et plusieurs chambres d’hôtes. Profitez d'un hébergement unique avec des chambres confortables et une suite familiale, un parc paisible avec piscine chauffée en saison et de multiples activités à proximité : explorez la forêt de Mervent, les villages historiques de Vouvant, le marais poitevin, ou découvrez le célèbre parc du Puy du Fou. Consultez nos tarifs et disponibilités en ligne pour un séjour au cœur de la Vendée.",
  keywords: [
    "location gîtes Vendée",
    "gîtes avec piscine chauffée",
    "chambres d'hôtes Vendée",
    "séjour Vendée",
    "gîte La Chapelle aux Lys",
    "gîtes famille Vendée",
    "vacances Vendée",
    "gîte avec activités en Vendée",
    "gîtes et chambres d'hôtes La Chapelle aux Lys",
    "gîtes et chambres d'hôtes Puy du Fou",
    "location vacances Vendée",
    "séjour à la campagne Vendée",
    "gîte en Vendée avec parc",
    "séjour détente Vendée",
    "tourisme Vendée",
    "séjour nature Vendée",
  ],
  creator: "Marion Baston",
  authors: [
    {
      name: "Thierry et Céline Gros",
      url: "https://le-plessis-aux-lys.fr",
    },
  ],
  openGraph: {
    title: "Le Plessis aux Lys - Gîtes et Chambres d'Hôtes en Vendée",
    description:
      "Découvrez nos gîtes et chambres d'hôtes au cœur de la Vendée, dans le village de La Chapelle aux Lys. Réservez dès maintenant votre séjour.",
    url: "https://le-plessis-aux-lys.fr",
    type: "website",
    locale: "fr_FR",
    siteName: "Le Plessis aux Lys",
    images: [
      {
        url: "https://le-plessis-aux-lys.fr/parc/parc-6.webp",
        width: 800,
        height: 600,
        alt: "Gîtes et chambres d'hôtes Le Plessis aux Lys",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Le Plessis aux Lys - Gîtes et Chambres d'Hôtes en Vendée",
    description:
      "Découvrez nos gîtes et chambres d'hôtes en Vendée, proches du Puy du Fou et autres attractions.",
    images: "https://le-plessis-aux-lys.fr/parc/parc-6.webp",
    site: "@le-plessis-aux-lys",
  },
};

type PropType = {
  id: string;
  title: string;
  description: string;
  content: string;
  url_link: string;
  image_path: string;
};

export default function ToVisited() {
  const [activities, setActivities] = useState<PropType[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchAllActivities() {
      try {
        const fetchedActivities = await getAllArticles();
        setActivities(fetchedActivities as PropType[]);
      } catch (error) {
        console.error("Error fetching activities :", error);
      }
    }
    fetchAllActivities();
  }, []);

  const visitContextValue = {
    framerMotionVariants: {
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
  };

  if (loading) {
    return <div>Chargement...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="py-10 pt-36 md:pt-44 px-6 xl:px-20 flex flex-col items-center mb-32  min-h-screen  ">
      <h3 className="font-prata text-2xl px-6 max-w-[50rem] text-center mb-16 text-text_color ">
        "Explorez la Vendée : entre océan et campagne, laissez-vous charmer par
        ses sites emblématiques et sa douceur de vivre."{" "}
      </h3>
      <span className="flex justify-center w-2/4 md:w-1/4 border-t-2 py-6 md:py-10 border-separator"></span>

      <ul className="flex flex-col gap-20 xl:gap-32">
        <VisitContext.Provider value={visitContextValue}>
          {activities.map((activity) => (
            <li key={activity.id}>
              <VisitArticle
                id={activity.id}
                title={activity.title}
                description={activity.description}
                content={activity.content}
                url_link={activity.url_link}
                image_path={activity.image_path}
              />
            </li>
          ))}
        </VisitContext.Provider>
      </ul>
    </div>
  );
}

