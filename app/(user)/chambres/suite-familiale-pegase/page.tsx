import { Metadata } from "next";
import Pegase from "./_components/Pegase";

export const metadata: Metadata = {
  robots: {
    index: true,
    follow: true,
  },
  title: "Suite familiale Pégase - Chambre d'hôte en Vendée",
  description:
    "Séjournez dans le charmante chambre d'hôte 'Suite familiale Pégase ', un hébergement confortable au cœur de la Vendée. Profitez de notre cadre idyllique avec piscine chauffée et de nombreuses activités à proximité.",
  keywords: [
    "chambre d'hôte suite familiale Pégase ",
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
    title: "Suite familiale Pégase - Chambre d'hôte en Vendée",
    description:
      "Séjournez dans le charmante chambre d'hôte 'Suite familiale Pégase ', un hébergement confortable au cœur de la Vendée. Profitez de notre cadre idyllique avec piscine chauffée et de nombreuses activités à proximité. Réservez dès maintenant votre séjour.",
    url: "https://le-plessis-aux-lys.fr/chambres/suite-familiale-pegase",
    type: "website",
    locale: "fr_FR",
    siteName: "Suite familiale Pégase",
    images: [
      {
        url: "https://le-plessis-aux-lys.fr/chambres/pegase/pegase2.webp",
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
    images: "https://le-plessis-aux-lys.fr/chambres/pegase/pegase2.webp",
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

