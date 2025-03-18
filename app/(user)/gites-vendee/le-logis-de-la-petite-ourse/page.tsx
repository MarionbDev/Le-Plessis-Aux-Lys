import { Metadata } from "next";
import LaPetiteOurse from "./_components/PetiteOurseComponent";

export const metadata: Metadata = {
  robots: {
    index: true,
    follow: true,
  },
  title: "Le Logis de la petite Ourse - Gîte en Vendée",
  description:
    "Découvrez le gîte Le Logis de la Petite Ourse en Vendée : un hébergement de charme avec piscine chauffée, cadre verdoyant et activités à proximité. Idéal pour un séjour détente ou une escapade romantique.",
  keywords: [
    "gîte petite ourse",
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
      "https://le-plessis-aux-lys.fr/gites-vendee/le-logis-de-la-petite-ourse",
  },
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
    url: "https://le-plessis-aux-lys.fr/gites-vendee/le-logis-de-la-petite-ourse",
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

export default async function LaPetiteOursePage() {
  return (
    <div>
      <LaPetiteOurse />
    </div>
  );
}

