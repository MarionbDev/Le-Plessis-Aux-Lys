// app/layout.tsx
import type { Metadata } from "next";
import { Inter } from "next/font/google";

import Script from "next/script";
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
        url: "https://le-plessis-aux-lys.fr/parc/parc6.jpg", // URL d'une image optimisée pour les réseaux sociaux
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
    images: "https://le-plessis-aux-lys.fr/parc/parc6.jpg",
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
      <head>
        <Script
          src="https://tarteaucitron.io/load.js?domain=le-plessis-aux-lys.fr&uuid=d247d9b897e6f481fff316fa219c61cac598820b"
          async
        />
        <Script id="tarteaucitron-init" strategy="afterInteractive">
          {`
            tarteaucitron.init({
              privacyUrl: "", // Optionnel : Lien vers votre politique de confidentialité
              bodyPosition: "bottom", // Position du bandeau
              hashtag: "#tarteaucitron", // L'ID de la section pour les cookies
              cookieName: "tarteaucitron", // Nom du cookie
              orientation: "middle", // Position du bandeau
              groupServices: false, // Pas de groupe de services
              showDetailsOnClick: true, // Afficher les détails sur clic
              serviceDefaultState: "wait", // Etat par défaut (attente de consentement)
              showAlertSmall: false, // Désactive la bannière réduite
              cookieslist: false, // Désactive la liste des cookies
              closePopup: false, // Le bouton de fermeture de la popup est désactivé
              showIcon: true, // Afficher l'icône de gestion des cookies
              iconPosition: "BottomRight", // Position de l'icône
              DenyAllCta: true, // Permet d'ajouter un bouton "Refuser tout"
              AcceptAllCta: true, // Permet d'ajouter un bouton "Accepter tout"
              highPrivacy: true, // Demander l'autorisation de cookies avant d'afficher le contenu
              alwaysNeedConsent: false, // Nécessite toujours un consentement explicite
              handleBrowserDNTRequest: false, // Ne pas respecter le "Do Not Track" du navigateur
              removeCredit: false, // Ne pas supprimer le crédit Tarteaucitron
              moreInfoLink: true, // Afficher le lien d'informations sur les cookies
              useExternalCss: false, // Ne pas charger de CSS externe
              useExternalJs: false, // Ne pas charger de JS externe
              mandatory: true, // Exiger un consentement pour le service Google Maps
              googleConsentMode: true, // Activer le mode de consentement Google
              partnersList: false // Ne pas afficher la liste des partenaires
             
            });

            // Ajouter le service Google Maps à Tarteaucitron.js
            (tarteaucitron.job = tarteaucitron.job || []).push('maps_noapi');
          `}
        </Script>
      </head>
      <body className={inter.className}>
        <div className="fixed  w-screen top-0 z-50 bg-none bg-transparent"></div>
        <main> {children}</main>
      </body>
    </html>
  );
}
