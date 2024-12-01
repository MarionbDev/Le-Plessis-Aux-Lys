import { Metadata } from "next";
import LaPetiteOurse from "./_components/PetiteOurseComponent";

export const metadata: Metadata = {
  robots: {
    index: true,
    follow: true,
  },
  title: "Le Logis de la petite Ourse - Gîte en Vendée",
  description:
    "Séjournez dans le charmant gîte 'Le Logis de la Petite Ourse', un hébergement confortable au cœur de la Vendée. Profitez de notre cadre idyllique avec piscine chauffée et de nombreuses activités à proximité.",
  keywords: [
    "gîte petite ourse",
    "location gîte Vendée",
    "gîte avec piscine chauffée",
    "séjour Vendée",
    "gîte La Chapelle aux Lys",
    "gîte famille Vendée",
    "vacances Vendée",
    "gîte avec activités en Vendée",
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
    title: "Le Logis de la Petite Ourse - Gîte en Vendée",
    description:
      "Séjournez dans le charmant gîte 'Le Logis de la Petite Ourse', un hébergement confortable au cœur de la Vendée. Profitez de notre cadre idyllique avec piscine chauffée et de nombreuses activités à proximité. Réservez dès maintenant votre séjour.",
    url: "https://le-plessis-aux-lys.fr/petite-ourse/Gite-1.webp",
    type: "website",
    locale: "fr_FR",
    siteName: "Gîte Le Logis de la Petite Ourse",
    images: [
      {
        url: "https://le-plessis-aux-lys.fr/petite-ourse/Gite-1.webp",
        width: 1200,
        height: 630,
        alt: "Gîte Le Logis de la Petite Ourse",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Le Logis de la Petite Ourse - Gîte en Vendée",
    description:
      "Séjournez dans le charmant gîte 'Le Logis de la Petite Ourse', un hébergement confortable au cœur de la Vendée. Profitez de notre cadre idyllique avec piscine chauffée et de nombreuses activités à proximité. Réservez dès maintenant votre séjour.",
    images: "https://le-plessis-aux-lys.fr/petite-ourse/Gite-1.webp",
    site: "@le-plessis-aux-lys",
  },
};

export default function LaPetiteOursePage() {
  return (
    <div>
      <LaPetiteOurse />
    </div>
  );
}

