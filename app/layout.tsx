// app/layout.tsx
import type { Metadata } from "next";
import { Inter } from "next/font/google";

import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  robots: {
    index: true,
    follow: true,
  },
  title: "Le Plessis aux Lys - Gîtes et Chambres d'Hôtes en Vendée",
  description:
    "Bienvenue au Plessis aux Lys en Vendée ! Séjournez dans une demeure de caractère du XIXe siècle, nichée dans le village pittoresque de La Chapelle aux Lys, où vous attendent deux gîtes et plusieurs chambres d’hôtes. Profitez d'un hébergement unique avec des chambres confortables et une suite familiale, un parc paisible avec piscine chauffée en saison et de multiples activités à proximité : explorez la forêt de Mervent, les villages historiques de Vouvant, le marais poitevin, ou découvrez le célèbre parc du Puy du Fou. Consultez nos tarifs et disponibilités en ligne pour un séjour au cœur de la Vendée.",
  keywords: [
    "location gîtes Vendée",
    "gîtes avec piscine chauffée",
    "chambres d'hôtes Vendée",
    "séjour Vendée",
    "gîte La Chapelle aux Lys",
    "gîtes famille Vendée",
    "vacances Vendée",
    "gîte avec activités en Vendée",
    "gîtes et chambres d'hôtes La Chapelle aux Lys",
    "gîtes et chambres d'hôtes Puy du Fou",
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
    title: "Le Plessis aux Lys - Gîtes et Chambres d'Hôtes en Vendée",
    description:
      "Découvrez nos gîtes et chambres d'hôtes au cœur de la Vendée, dans le village de La Chapelle aux Lys. Réservez dès maintenant votre séjour.",
    url: "https://le-plessis-aux-lys.fr",
    type: "website",
    locale: "fr_FR",
    siteName: "Le Plessis aux Lys",
    images: [
      {
        url: "https://le-plessis-aux-lys.fr/parc/parc-6.webp",
        width: 800,
        height: 600,
        alt: "Gîtes et chambres d'hôtes Le Plessis aux Lys",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Le Plessis aux Lys - Gîtes et Chambres d'Hôtes en Vendée",
    description:
      "Découvrez nos gîtes et chambres d'hôtes en Vendée, proches du Puy du Fou et autres attractions.",
    images: "https://le-plessis-aux-lys.fr/parc/parc-6.webp",
    site: "@le-plessis-aux-lys",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="bg-[#fdfdfd] min-h-screen ">
      <head></head>
      <body className={inter.className}>
        <div className="fixed  w-screen top-0 z-50 bg-none bg-transparent"></div>

        <main>{children}</main>
      </body>
    </html>
  );
}
