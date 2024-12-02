import { Metadata } from "next";
import Garden from "./_components/Garden";

export const metadata: Metadata = {
  robots: {
    index: true,
    follow: true,
  },
  title:
    "Galerie Photo Parc & Jardin - Le Plessis aux Lys Gîtes et Chambres d'hôtes en Vendée",
  description:
    "Explorez la galerie photo du parc et jardin du Plessis aux Lys. Découvrez un espace verdoyant, des fleurs, des allées et des paysages enchanteurs en Vendée.",
  keywords: [
    "galerie photo parc Vendée",
    "jardin Plessis aux Lys",
    "parc et jardin Vendée",
    "espace vert Vendée",
    "paysage nature Vendée",
    "parc floral Vendée",
    "jardin détente Vendée",
    "photos parc et jardin",
    "balade parc Vendée",
    "nature et détente Vendée",
  ],
  creator: "Marion Baston",
  authors: [
    {
      name: "Thierry et Céline Gros",
      url: "https://le-plessis-aux-lys.fr",
    },
  ],
  openGraph: {
    title:
      "Galerie Photo Parc & Jardin - Le Plessis aux Lys Gîtes et Chambres d'hôtes en Vendée",
    description:
      "Découvrez les merveilles du parc et jardin du Plessis aux Lys en Vendée. Un espace naturel pour se détendre et se ressourcer.",
    url: "https://le-plessis-aux-lys.fr/jardin",
    type: "website",
    locale: "fr_FR",
    siteName: "Parc et Jardin Le Plessis aux Lys",
    images: [
      {
        url: "https://le-plessis-aux-lys.fr/parc/Parc-2.webp",
        width: 1200,
        height: 630,
        alt: "Vue du jardin fleuri au Plessis aux Lys",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title:
      "Galerie Photo Parc & Jardin - Le Plessis aux Lys Gîtes et Chambres d'hôtes en Vendée",
    description:
      "Découvrez les merveilles du parc et jardin du Plessis aux Lys en Vendée. Un espace naturel pour se détendre et se ressourcer.",
    images: "https://le-plessis-aux-lys.fr/parc/Parc-2.webp",
    site: "@le-plessis-aux-lys",
  },
};

export default function GardenPage() {
  return (
    <div>
      <Garden />
    </div>
  );
}

