"use client";

import { getEmailAdmin } from "@/app/api/admin/route";
import { Loader } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function LegalNoticePage() {
  const [emailAdmin, setEmailAdmin] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<Boolean>(true);

  useEffect(() => {
    const fetEmailAdmin = async () => {
      try {
        const fetchEmail = await getEmailAdmin();

        if (fetchEmail && fetchEmail.email) {
          setEmailAdmin(fetchEmail.email);
        }
      } catch (error) {
        console.error("Error fetching activities:", error);
        setError(
          "Une erreur s'est produite lors de la récupération de l'email de l'admin.",
        );
      } finally {
        setLoading(false);
      }
    };

    fetEmailAdmin();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen ">
        <Loader size={50} className="animate-spin" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen">
        Une erreur s'est produite : {error}
      </div>
    );
  }

  return (
    <>
      <div className="font-text text-text_color text-[0.9rem]">
        <div className=" mx-10 py-20 lg:py-32 flex flex-col  gap-8 mb-8  ">
          <h1 className="text-2xl font-bold text-text_color text-center mb-8">
            Mentions légales
          </h1>
          <div className=" lg:mx-44">
            <div className="mb-8">
              <h2 className="text-[1.2rem] font-semibold mb-4  text-text_color ">
                1 - Édition du site
              </h2>
              <p className="mb-2">
                <span className="mr-1">
                  En vertu de l&apos;article 6 de la loi n°2004-575 du 21 juin
                  2004 pour la confiance dans l&apos;économie numérique, il est
                  précisé aux utilisateurs du site internet
                </span>
                <Link
                  className="text-blue-500 hover:underline"
                  href="https://le-plessis-aux-lys.fr "
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  https://le-plessis-aux-lys.fr
                </Link>
                <span>
                  {" "}
                  l&apos;identité des différents intervenants dans le cadre de
                  sa réalisation et de son suivi:
                </span>
              </p>
              <div className="mb-2">
                <p className="font-semibold text-text_color ">
                  Propriétaire du site:
                </p>{" "}
                Céline et Thierry Gros
                <p>
                  <a className="text-blue-500 hover:underline"></a>
                </p>{" "}
                Contact : {emailAdmin}
              </div>
              <div className="mb-2">
                <p className="font-semibold text-text_color ">
                  Conception et développement :
                </p>
                <p>Marion Baston</p>
                <p>Contact : marionbaston84@gmail.com</p>
              </div>

              <p className="mb-2">
                <span className="font-semibold text-text_color">
                  Hébergeur:
                </span>{" "}
                Vercel Inc. 440 N Barranca Ave #4133 Covina, CA 91723
              </p>
              <p>
                Le site utilise des services tiers, tels que Google Maps, pour
                afficher des cartes interactives. Ces services peuvent collecter
                et utiliser des données via des cookies, conformément à leur
                propre politique de confidentialité. Pour plus d'informations
                sur la collecte et l'utilisation des données, consultez la{" "}
                <Link
                  href={"https://policies.google.com/privacy?hl=fr-CA"}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 hover:underline"
                >
                  Politique de confidentialité de Google
                </Link>
                .
              </p>
            </div>
            <div className="mb-8">
              <h2 className="text-[1.2rem] font-semibold mb-4  text-text_color ">
                2 - Propriété intellectuelle et contrefaçons.
              </h2>

              <div className=" rounded-md flex flex-col gap-3 ">
                <p>
                  Le site{" "}
                  <Link
                    className="text-blue-500 hover:underline"
                    target="_blank"
                    rel="noopener noreferrer"
                    href="https://le-plessis-aux-lys.fr "
                  >
                    https://le-plessis-aux-lys.fr
                  </Link>{" "}
                  est protégé par les lois en vigueur, notamment le Code de la
                  propriété intellectuelle. Tous les contenus disponibles sur le
                  site, y compris les textes, images, graphismes, logos,
                  marques, vidéos et logiciels, sont la propriété exclusive de
                  Céline et Thierry Gros, sauf indication contraire et sous
                  réserve de droits appartenant à des tiers dûment identifiés.{" "}
                </p>
                <p>
                  Toute reproduction, représentation, modification, publication,
                  adaptation de tout ou partie des éléments du site, quel que
                  soit le moyen ou le procédé utilisé, est interdite sauf
                  autorisation écrite préalable de Céline et Thierry Gros.
                </p>
                <p>
                  L'accès au site ou le téléchargement de tout contenu ne
                  confèrent aucun droit de propriété ou d’utilisation sur les
                  éléments protégés. Céline et Thierry Gros se réservent tous
                  leurs droits sur le contenu du site et engageront toutes les
                  actions nécessaires en cas d'utilisation non autorisée ou de
                  contrefaçon, conformément aux dispositions légales en vigueur.
                </p>
              </div>
            </div>
            <div className="mb-8">
              <h2 className="text-[1.2rem] font-semibold mb-4  text-text_color ">
                3 - Utilisation d'images libres de droits.
              </h2>
              <p>
                Certaines images utilisées sur le site proviennent de la
                plateforme Pixabay, qui fournit des contenus libres de droits
                d'auteur selon leurs conditions d'utilisation. Ces images sont
                utilisées conformément aux dispositions légales en vigeur.
              </p>
            </div>
            <div className="mb-8">
              <h2 className="text-[1.2rem] font-semibold mb-4  text-text_color ">
                4 - Limitations de responsabilité.
              </h2>
              <p>
                Dans les limites autorisées par la loi, notamment en cas de
                négligence, Céline et Thierry Gros ne pourront être tenue
                responsable de pertes ou de dommages de quelque nature que ce
                soit, qu'il s'agisse, notamment mais non exclusivement, de
                dommages directs, indirects ou consécutifs, liés à l'accès au
                site ou à tout autre site ayant un lien avec le site, à son
                utilisation, à son exploration ou à son téléchargement. Ce site
                vous offre la possibilité d'envoyer des e-mails. Ces e-mails
                transitent par Internet, un réseau public sur lequel ils n'ont
                aucun contrôle, et sont de ce fait susceptibles d'être
                interceptés, altérés ou perdus. Céline et Thierry Gros déclinent
                toute responsabilité à cet égard.
              </p>
            </div>
            <div className="mb-8">
              <h2 className="text-[1.2rem] font-semibold mb-4  text-text_color ">
                5 - CNIL et gestion des données personnelles.
              </h2>
              <p>
                Bien que le site ne prélève pas de données personnelles
                directement, il utilise des services tiers comme **Google
                Maps**, qui peuvent installer des cookies afin d'afficher des
                cartes interactives et d'améliorer l'expérience utilisateur. Ces
                cookies peuvent collecter des données telles que votre adresse
                IP et des informations de géolocalisation. Pour gérer vos
                préférences en matière de cookies, veuillez consulter notre
                politique de cookies.
              </p>
            </div>
            <div className="mb-8">
              <h2 className="text-[1.2rem] font-semibold mb-4  text-text_color ">
                6 - Liens hypertextes et cookies.
              </h2>
              <p>
                <span className="mr-1">Le site</span>
                <Link
                  href="https://le-plessis-aux-lys.fr "
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 hover:underline"
                >
                  https://le-plessis-aux-lys.fr
                </Link>
                <span>
                  &nbsp;contient des liens hypertextes vers d&apos;autres sites
                  et dégage toute responsabilité à propos de ces liens externes
                  ou des liens créés par d&apos;autres sites vers&nbsp;
                </span>
                <Link
                  href="https://le-plessis-aux-lys.fr  "
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 hover:underline"
                >
                  https://le-plessis-aux-lys.fr
                </Link>
                .
              </p>
              <p className="mt-4">
                Le site{" "}
                <Link
                  href="https://le-plessis-aux-lys.fr  "
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 hover:underline"
                >
                  https://le-plessis-aux-lys.fr
                </Link>{" "}
                utilise des cookies tiers, en particulier des cookies de
                **Google Maps**, pour permettre l'affichage de cartes
                interactives et la géolocalisation. En naviguant sur ce site,
                vous consentez à l'utilisation de ces cookies. Pour plus
                d'informations, consultez notre{" "}
                <Link
                  href="https://le-plessis-aux-lys.fr/politique-confidentialite "
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 hover:underline"
                >
                  Politique de confidentialité
                </Link>
                .
              </p>
            </div>
            <div className="mb-8">
              <h2 className="text-[1.2rem] font-semibold mb-4  text-text_color ">
                7 - Utilisation des Cookies.
              </h2>
              <p>
                Le site https://le-plessis-aux-lys.fr utilise des cookies pour
                offrir une meilleure expérience utilisateur, notamment en
                permettant l'affichage de cartes interactives via Google Maps.
                Ces cookies peuvent collecter des informations de navigation,
                comme votre adresse IP et votre géolocalisation, à des fins de
                personnalisation de l'affichage des cartes. Vous pouvez gérer ou
                refuser l'utilisation de ces cookies en ajustant les paramètres
                de votre navigateur. Pour plus d'informations, consultez notre{" "}
                <Link
                  href="https://le-plessis-aux-lys.fr/politique-confidentialite "
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 hover:underline"
                >
                  Politique de confidentialité
                </Link>{" "}
                et la politique de cookies de{" "}
                <Link
                  href={"https://policies.google.com/privacy?hl=fr-CA"}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 hover:underline"
                >
                  Google
                </Link>
                .
              </p>
            </div>
            <div>
              <h2 className="text-[1.2rem] font-semibold mb-4  text-text_color ">
                8 - Droit applicable et attribution de juridiction.
              </h2>
              <p>
                <span className="mr-1">
                  Tout litige en relation avec l&apos;utilisation du site
                </span>
                <Link
                  href="https://le-plessis-aux-lys.fr "
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  https://le-plessis-aux-lys.fr
                </Link>
                <span>
                  &nbsp;est soumis au droit français. En dehors des cas où la
                  loi ne le permet pas, il est fait attribution exclusive de
                  juridiction aux tribunaux compétents de Paris.
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

