import { Metadata } from "next";
import ToVisited from "./_components/Activity";

export const metadata: Metadata = {
  robots: {
    index: true,
    follow: true,
  },
  title: "Activités en Vendée - Que faire autour du Plessis aux Lys",
  description:
    "Découvrez les meilleures activités en Vendée autour du Plessis aux Lys : randonnées, visites culturelles, plages, parcs d'attractions, et gastronomie locale.",
  keywords: [
    "activités Vendée",
    "tourisme Vendée",
    "que faire en Vendée",
    "Marais Poitevin",
    "plage Vendée",
    "vacances famille Vendée",
    "visites culturelles Vendée",
    "randonnées Vendée",
    "parcs d'attractions Vendée",
    "gastronomie Vendée",
    "plages Vendée",
    "activités familiales Vendée",
    "loisirs nature Vendée",
    "découvertes locales Vendée",
  ],
  creator: "Marion Baston",
  authors: [
    {
      name: "Thierry et Céline Gros",
      url: "https://le-plessis-aux-lys.fr",
    },
  ],
  openGraph: {
    title: "Activités en Vendée - Que faire autour du Plessis aux Lys",
    description:
      "Profitez d'activités variées autour du Plessis aux Lys en Vendée : randonnées, patrimoine, plages et parcs de loisirs pour toute la famille.",
    url: "https://le-plessis-aux-lys.fr/activites",
    type: "website",
    locale: "fr_FR",
    siteName: "Le Plessis aux Lys - Activités en Vendée",
    images: [
      {
        url: "https://le-plessis-aux-lys.fr/activites/family.webp",
        width: 1200,
        height: 630,
        alt: "Plage en famille",
      },
      {
        url: "https://le-plessis-aux-lys.fr/home/marais.webp",
        width: 1200,
        height: 630,
        alt: "Marais Poitevin",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Activités en Vendée - Que faire autour du Plessis aux Lys",
    description:
      "Profitez d'activités variées autour du Plessis aux Lys en Vendée : randonnées, patrimoine, plages et parcs de loisirs pour toute la famille.",
    images: "https://le-plessis-aux-lys.fr/activites/family.webp",
    site: "@le-plessis-aux-lys",
  },
};

export default function ActivityPage() {
  return (
    <div>
      <ToVisited />
    </div>
  );
}

