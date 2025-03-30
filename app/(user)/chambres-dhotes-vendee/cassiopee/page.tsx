import { Metadata } from "next";
import Cassiopee from "./_components/Cassiopee";

export const metadata: Metadata = {
  robots: {
    index: true,
    follow: true,
  },
  title: "Cassiopée - Chambre d'hôte en Vendée",
  description:
    "Découvrez la chambre d'hôte Cassiopée en Vendée : un hébergement de charme avec piscine chauffée, cadre verdoyant et activités à proximité. Idéal pour un séjour détente ou une escapade romantique..",
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
    canonical: "https://le-plessis-aux-lys.fr/chambres-dhotes-vendee/cassiopee",
  },

  creator: "Marion Baston",
  authors: [
    {
      name: "Thierry et Céline Gros",
      url: "https://le-plessis-aux-lys.fr",
    },
  ],
  openGraph: {
    title: "Cassiopée - Chambre d'hôte en Vendée",
    description:
      "Séjournez dans le charmante chambre d'hôte 'Cassiopée', un hébergement confortable au cœur de la Vendée. Profitez de notre cadre idyllique avec piscine chauffée et de nombreuses activités à proximité. Réservez dès maintenant votre séjour.",
    url: "https://le-plessis-aux-lys.fr/chambres-dhotes-vendee/cassiopee",
    type: "website",
    locale: "fr_FR",
    siteName: "Chambre Cassiopée",
    images: [
      {
        url: "https://le-plessis-aux-lys.fr/chambres/cassiopee/ch-2.webp",
        width: 1200,
        height: 630,
        alt: "Chambre Cassiopée",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Cassiopée - Chambre en Vendée",
    description:
      "Séjournez dans le charmante chambre 'Cassiopée', un hébergement confortable au cœur de la Vendée. Profitez de notre cadre idyllique avec piscine chauffée et de nombreuses activités à proximité. Réservez dès maintenant votre séjour.",
    images: ["https://le-plessis-aux-lys.fr/chambres/cassiopee/ch-2.webp"],
    site: "@le-plessis-aux-lys",
  },
};

export default function CassiopeePage() {
  return (
    <div>
      <Cassiopee />
    </div>
  );
}

