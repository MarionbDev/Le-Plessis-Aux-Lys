import { Metadata } from "next";
import ToVisited from "./_components/Activity";

export const metadata: Metadata = {
  robots: {
    index: true,
    follow: true,
  },
  title: "Activités en Vendée - Que faire autour du Plessis aux Lys",
  description:
    "Explorez la Vendée autour du Plessis aux Lys : plages de sable fin, randonnées en pleine nature, patrimoine historique et activités familiales inoubliables. Idéal pour des vacances en Vendée !",
  keywords: [
    "activités en Vendée",
    "que faire en Vendée ce week-end",
    "meilleures randonnées en Vendée",
    "plages familiales en Vendée",
    "visites incontournables Vendée",
    "Puy du Fou et autres parcs en Vendée",
    "tourisme nature Vendée",
    "balades et randonnées Vendée",
    "idées de sorties Vendée",
    "expériences gastronomiques Vendée",
    "activités gratuites en Vendée",
  ],
  alternates: {
    canonical: "https://le-plessis-aux-lys.fr/activites",
  },
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
    images: ["https://le-plessis-aux-lys.fr/activites/family.webp"],
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

