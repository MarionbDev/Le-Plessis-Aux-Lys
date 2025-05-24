import { Metadata } from "next";
import LaGrandeOurse from "./_components/GrandeOurse";

export const metadata: Metadata = {
  robots: {
    index: true,
    follow: true,
  },
  title: "Le Logis de la Grande Ourse - Gîte en Vendée",
  description:
    "Découvrez le gîte Le Logis de la Grande Ourse en Vendée : un hébergement de charme avec piscine chauffée, cadre verdoyant et activités à proximité. Idéal pour un séjour détente ou une escapade romantique.",
  keywords: [
    "gîte grande ourse",
    "location gîte Vendée",
    "gîte avec piscine chauffée",
    "gîte en Vendée avec piscine chauffée et grand jardin",
    "séjour en famille en Vendée",
    "hébergement touristique en Vendée",
    "location vacances Vendée",
    "gîte en Vendée proche plage et nature",
    "maison de vacances en Vendée",
    "séjour à la campagne Vendée",
    "gîte de charme avec piscine en Vendée",
    "location saisonnière Vendée",
    "gîte avec jardin privatif en Vendée",
    "séjour détente en Vendée",
    "tourisme et nature en Vendée",
  ],

  alternates: {
    canonical:
      "https://www.le-plessis-aux-lys.fr/gites-vendee/le-logis-de-la-grande-ourse",
  },
  creator: "Marion Baston",
  authors: [
    {
      name: "Thierry et Céline Gros",
      url: "https://www.le-plessis-aux-lys.fr",
    },
  ],
  openGraph: {
    title: "Le Logis de la Grande Ourse - Gîte en Vendée",
    description:
      "Séjournez dans le charmant gîte 'Le Logis de la Grande Ourse', un hébergement confortable au cœur de la Vendée. Profitez de notre cadre idyllique avec piscine chauffée et de nombreuses activités à proximité. Réservez dès maintenant votre séjour.",
    url: "https://www.le-plessis-aux-lys.fr/gites-vendee/le-logis-de-la-grande-ourse",
    type: "website",
    locale: "fr_FR",
    siteName: "Gîte Le Logis de la Grande Ourse",
    images: [
      {
        url: "https://www.le-plessis-aux-lys.fr/grande-ourse/Gite-2.webp",
        width: 1200,
        height: 630,
        alt: "Gîte Le Logis de la Grande Ourse",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Le Logis de la Grande Ourse - Gîte en Vendée",
    description:
      "Séjournez dans le charmant gîte 'Le Logis de la Grande Ourse', un hébergement confortable au cœur de la Vendée. Profitez de notre cadre idyllique avec piscine chauffée et de nombreuses activités à proximité. Réservez dès maintenant votre séjour.",
    images: "https://www.le-plessis-aux-lys.fr/grande-ourse/Gite-2.webp",
    site: "@le-plessis-aux-lys",
  },
};

export default function LaGrandeOursePage() {
  return (
    <div>
      <LaGrandeOurse />
    </div>
  );
}

