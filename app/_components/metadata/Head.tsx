import { Metadata } from "next";

export const metadata: Metadata = {
  title:
    "Le Plessis aux Lys – Séjournez dans nos Gîtes et Chambres d'Hôtes en Vendée",
  description:
    "Découvrez Le Plessis aux Lys, une demeure de caractère en Vendée avec gîtes et chambres d'hôtes. Profitez d'un séjour au calme avec piscine chauffée et nature préservée.",
  keywords: [
    "gîtes Vendée",
    "chambres d'hôtes Vendée",
    "séjour nature Vendée",
    "gîte avec piscine chauffée",
    "hébergement Vendée",
    "vacances en Vendée",
    "séjour détente Vendée",
  ],
  openGraph: {
    title: "Le Plessis aux Lys – Gîtes et Chambres d'Hôtes en Vendée",
    description:
      "Profitez d’un séjour authentique dans nos gîtes et chambres d’hôtes en Vendée, proches du Puy du Fou et du Marais Poitevin.",
    url: "https://www.le-plessis-aux-lys.fr",
    type: "website",
    locale: "fr_FR",
    siteName: "Le Plessis aux Lys",
    images: [
      {
        url: "https://www.le-plessis-aux-lys.fr/parc/parc3.jpg",
        width: 800,
        height: 600,
        alt: "Gîtes et chambres d'hôtes Le Plessis aux Lys",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Le Plessis aux Lys – Séjour en Vendée",
    description:
      "Gîtes et chambres d'hôtes au cœur de la Vendée. Découvrez un cadre paisible avec piscine chauffée et nature environnante.",
    images: ["https://www.le-plessis-aux-lys.fr/parc/parc3.jpg"],
    site: "@le-plessis-aux-lys",
  },
};

export default function Head() {
  return <>{metadata.title}</>;
}

