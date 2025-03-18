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
    canonical: "https://le-plessis-aux-lys.fr",
  },
  creator: "Marion Baston",
  authors: [
    {
      name: "Thierry et Céline Gros",
      url: "https://le-plessis-aux-lys.fr",
    },
  ],
  icons: {
    icon: "../parc/icon-parc1.png",
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
    image: "https://le-plessis-aux-lys.fr/parc/parc-6.webp",
    address: {
      "@type": "85120",
      streetAddress: "29, Rue de la Petite Chapelle",
      addressLocality: "La Chapelle aux Lys",
      postalCode: "85120",
      addressCountry: "FR",
    },
    priceRange: "75€ à 690€",
    url: "https://le-plessis-aux-lys.fr",
  };

  return (
    <html lang="fr" className="bg-[#fdfdfd] min-h-screen ">
      <head></head>
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
