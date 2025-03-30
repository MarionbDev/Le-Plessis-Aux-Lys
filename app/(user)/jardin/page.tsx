import { Metadata } from "next";
import Garden from "./_components/Garden";

export const metadata: Metadata = {
  robots: {
    index: true,
    follow: true,
  },
  title: "Galerie Photo Jardin - Le Plessis aux Lys en Vendée",
  description:
    "Découvrez le jardin du Plessis aux Lys en Vendée : un espace verdoyant idéal pour la détente, la balade et l'évasion au cœur de la nature.",
  keywords: [
    "galerie photo jardin Vendée",
    "parc fleuri Le Plessis aux Lys",
    "balade nature en Vendée",
    "jardin botanique en Vendée",
    "parc et nature Vendée",
    "jardin fleuri Vendée",
    "détente en pleine nature Vendée",
    "lieu paisible en Vendée",
    "paysages verdoyants Vendée",
    "où se promener en Vendée",
  ],
  alternates: {
    canonical: "https://le-plessis-aux-lys.fr/jardin",
  },
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
        alt: "Jardin fleuri et parc verdoyant du Plessis aux Lys en Vendée",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title:
      "Galerie Photo Parc & Jardin - Le Plessis aux Lys Gîtes et Chambres d'hôtes en Vendée",
    description:
      "Découvrez les merveilles du parc et jardin du Plessis aux Lys en Vendée. Un espace naturel pour se détendre et se ressourcer.",
    images: ["https://le-plessis-aux-lys.fr/parc/Parc-2.webp"],
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

