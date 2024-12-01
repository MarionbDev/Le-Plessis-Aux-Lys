import { Metadata } from "next";
import Andromede from "./_components/Andromede";

export const metadata: Metadata = {
  robots: {
    index: true,
    follow: true,
  },
  title: "Andromède - Chambre d'hôte en Vendée",
  description:
    "Séjournez dans le charmante chambre d'hôte 'Andromède', un hébergement confortable au cœur de la Vendée. Profitez de notre cadre idyllique avec piscine chauffée et de nombreuses activités à proximité.",
  keywords: [
    "chambre d'hôte andromède",
    "location chambre d'hôte Vendée",
    "chambre d'hôte avec piscine chauffée",
    "séjour Vendée",
    "chambre d'hôte La Chapelle aux Lys",
    "chambre d'hôte famille Vendée",
    "vacances Vendée",
    "chambre d'hôte avec activités en Vendée",
    "location vacances Vendée",
    "séjour à la campagne Vendée",
    "chambre d'hôte en Vendée avec parc",
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
    title: "Andromède - Chambre d'hôte en Vendée",
    description:
      "Séjournez dans le charmante chambre d'hôte 'Andromède', un hébergement confortable au cœur de la Vendée. Profitez de notre cadre idyllique avec piscine chauffée et de nombreuses activités à proximité. Réservez dès maintenant votre séjour.",
    url: "https://le-plessis-aux-lys.fr/chambres/andromede/ch-3-1.webp",
    type: "website",
    locale: "fr_FR",
    siteName: "Chambre Andromède",
    images: [
      {
        url: "https://le-plessis-aux-lys.fr/chambres/andromede/ch-3-1.webp",
        width: 1200,
        height: 630,
        alt: "Chambre Andromède",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Andromède - Chambre en Vendée",
    description:
      "Séjournez dans le charmante chambre 'Andromède', un hébergement confortable au cœur de la Vendée. Profitez de notre cadre idyllique avec piscine chauffée et de nombreuses activités à proximité. Réservez dès maintenant votre séjour.",
    images: "https://le-plessis-aux-lys.fr/chambres/andromede/ch-3-1.webp",
    site: "@le-plessis-aux-lys",
  },
};

export default function AndromedePage() {
  return (
    <div>
      <Andromede />
    </div>
  );
}

