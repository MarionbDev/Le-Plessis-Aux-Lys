import { Metadata } from "next";
import Pegase from "./_components/Pegase";

export const metadata: Metadata = {
  robots: {
    index: true,
    follow: true,
  },
  title: "Suite familiale Pégase - Chambre d'hôte en Vendée",
  description:
    "Découvrez la chambre d'hôte Suite familliale Pégase en Vendée : un hébergement de charme avec piscine chauffée, cadre verdoyant et activités à proximité. Idéal pour un séjour détente ou une escapade romantique.",
  keywords: [
    "chambre d'hôte en Vendée avec piscine",
    "séjour romantique en Vendée",
    "hébergement de charme en Vendée",
    "gîte et chambre d'hôte Vendée",
    "chambre d'hôte avec petit-déjeuner Vendée",
    "chambre d'hôte près du Puy du Fou",
    "week-end en amoureux Vendée",
    "location de vacances Vendée",
    "où dormir en Vendée",
    "meilleure chambre d'hôte en Vendée",
  ],
  alternates: {
    canonical:
      "https://www.le-plessis-aux-lys.fr/chambres-dhotes-vendee/suite-familiale-pegase",
  },

  creator: "Marion Baston",
  authors: [
    {
      name: "Thierry et Céline Gros",
      url: "https://www.le-plessis-aux-lys.fr",
    },
  ],
  openGraph: {
    title: "Suite familiale Pégase - Chambre d'hôte en Vendée",
    description:
      "Séjournez dans le charmante chambre d'hôte 'Suite familiale Pégase ', un hébergement confortable au cœur de la Vendée. Profitez de notre cadre idyllique avec piscine chauffée et de nombreuses activités à proximité. Réservez dès maintenant votre séjour.",
    url: "https://www.le-plessis-aux-lys.fr/chambres-dhotes-vendee/suite-familiale-pegase",
    type: "website",
    locale: "fr_FR",
    siteName: "Suite familiale Pégase",
    images: [
      {
        url: "https://www.le-plessis-aux-lys.fr/chambres/pegase/pegase2.webp",
        width: 1200,
        height: 630,
        alt: "Suite familiale Pégase",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Suite familiale Pégase - Chambre en Vendée",
    description:
      "Séjournez dans le charmante chambre 'Suite familiale Pégase', un hébergement confortable au cœur de la Vendée. Profitez de notre cadre idyllique avec piscine chauffée et de nombreuses activités à proximité. Réservez dès maintenant votre séjour.",
    images: ["https://www.le-plessis-aux-lys.fr/chambres/pegase/pegase2.webp"],
    site: "@le-plessis-aux-lys",
  },
};

export default function PegasePage() {
  return (
    <div>
      <Pegase />
    </div>
  );
}

