import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: "https://www.le-plessis-aux-lys.fr",
  },
  creator: "Marion Baston",
  authors: [
    {
      name: "Thierry et Céline Gros",
      url: "https://www.le-plessis-aux-lys.fr",
    },
  ],
  icons: {
    icon: "../parc/icon-parc1.png",
  },
  title:
    "Le Plessis aux Lys – Séjournez dans nos Gîtes et Chambres d'Hôtes en Vendée",
  description:
    "Découvrez Le Plessis aux Lys, une demeure de caractère en Vendée avec gîtes et chambres d'hôtes. Profitez d'un séjour au calme avec piscine chauffée et nature préservée.",
  keywords: [
    "gîtes Vendée",
    "chambres d'hôtes Vendée",
    "séjour nature Vendée",
    "gîte avec piscine chauffée",
    "hébergement Vendée",
    "vacances en Vendée",
    "séjour détente Vendée",
  ],
  openGraph: {
    title: "Le Plessis aux Lys – Gîtes et Chambres d'Hôtes en Vendée",
    description:
      "Profitez d’un séjour authentique dans nos gîtes et chambres d’hôtes en Vendée, proches du Puy du Fou et du Marais Poitevin.",
    url: "https://www.le-plessis-aux-lys.fr",
    type: "website",
    locale: "fr_FR",
    siteName: "Le Plessis aux Lys",
    images: [
      {
        url: "https://www.le-plessis-aux-lys.fr/parc/parc3.jpg",
        width: 800,
        height: 600,
        alt: "Gîtes et chambres d'hôtes Le Plessis aux Lys",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Le Plessis aux Lys – Séjour en Vendée",
    description:
      "Gîtes et chambres d'hôtes au cœur de la Vendée. Découvrez un cadre paisible avec piscine chauffée et nature environnante.",
    images: ["https://www.le-plessis-aux-lys.fr/parc/parc3.jpg"],
    site: "@le-plessis-aux-lys",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "LodgingBusiness",
    name: "Le Plessis aux Lys",
    description:
      "Découvrez nos gîtes et chambres d'hôtes au cœur de la Vendée, dans le village de La Chapelle aux Lys. Réservez dès maintenant votre séjour.",
    image: "https://www.le-plessis-aux-lys.fr/parc/parc-6.webp",
    address: {
      "@type": "PostalAddress",
      streetAddress: "29, Rue de la Petite Chapelle",
      addressLocality: "La Chapelle aux Lys, Terval",
      postalCode: "85120",
      addressCountry: "FR",
    },
    telephone: "+33 6 89 66 67 11",
    email: "leplessisauxlys@orange.fr",
    priceRange: "75€ à 690€",
    url: "https://www.le-plessis-aux-lys.fr",
    amenityFeature: {
      "@type": "LocationFeatureSpecification",
      name: "Piscine chauffée",
      value: true,
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 46.62950023714675,
      longitude: -0.67319274140706,
    },
  };

  return (
    <html lang="fr" className="bg-[#fdfdfd] min-h-screen ">
      <body className={inter.className}>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <div className="fixed  w-screen top-0 z-50 bg-none bg-transparent"></div>

        <main>{children}</main>
      </body>
    </html>
  );
}
