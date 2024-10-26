"use client";

import { Button } from "@/components/ui/button";
import { Milestone } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function LegalNoticePage() {
  const router = useRouter();
  const handleClickHome = () => {
    if (router) {
      router.push("/");
    }
  };

  return (
    <>
      <div className="font-text">
        <div className=" mx-10 py-8 flex flex-col gap-8 mb-8 mt-20 ">
          <Button
            type="button"
            onClick={handleClickHome}
            className=" border w-[14rem] mt-10 rounded-full gap-2  bg-slate-100 hover:bg-slate-200 text-text_color text-md lg:text-md"
          >
            <Milestone
              size={20}
              color="#bbbb57"
              className="transform scale-x-[-1] "
            />
            Retour à l'accueil
          </Button>
          <h1 className="text-4xl font-bold text-text_color text-center mb-8">
            Mentions légales
          </h1>
          <div>
            <h2 className="text-2xl font-semibold mb-4  text-text_color ">
              1 - Édition du site
            </h2>
            <p>
              <span className="mr-1">
                En vertu de l&apos;article 6 de la loi n°2004-575 du 21 juin
                2004 pour la confiance dans l&apos;économie numérique, il est
                précisé aux utilisateurs du site internet
              </span>
              <Link
                className="text-blue-500 hover:underline"
                href="https://le-plessis-aux-lys.fr "
              >
                https://le-plessis-aux-lys.fr
              </Link>
              <span>
                {" "}
                l&apos;identité des différents intervenants dans le cadre de sa
                réalisation et de son suivi:
              </span>
            </p>
            <p>
              <span className="font-semibold text-text_color ">
                Propriétaire du site:
              </span>{" "}
              Céline et Thierry Gros - Contact :
            </p>

            <p>
              <span className="font-semibold text-text_color">Hébergeur:</span>{" "}
              Vercel Inc. 440 N Barranca Ave #4133 Covina, CA 91723
            </p>
          </div>
          <div>
            <h2 className="text-2xl font-semibold mb-4  text-text_color ">
              2 - Propriété intellectuelle et contrefaçons.
            </h2>

            <div className="p-4 rounded-md flex flex-col gap-3 ">
              <p>
                Le site https://www.le-plessis-aux-lys.fr/ est protégé par les
                lois en vigueur sur la propriété intellectuelle et le droit
                d'auteur. Toutes les informations disponibles sur le Site sont
                protégées par un copyright et sont propriété de Céline et
                Thierry Gros sous réserve de droits appartenant à des tiers. Les
                présentes informations ne devront pas être interprétées comme
                constituant une licence ou un droit d'utilisation portant sur
                toute image, marque déposée, marque de service ou logo de
                l'entreprise. Le téléchargement ou la copie de tout logiciel ou
                matériel à partir du Site ne vous confère aucun droit sur les
                éléments téléchargés ou copiés. Céline et Thierry Gros réservent
                tous leurs droits sur le copyright et la propriété de toute
                information disponible sur le Site et les fera valoir dans toute
                l'extension de la loi applicable.
              </p>
            </div>
          </div>
          <div>
            <h2 className="text-2xl font-semibold mb-4  text-text_color ">
              3 - Limitations de responsabilité.
            </h2>
            <p>
              Dans les limites autorisées par la loi, notamment en cas de
              négligence, Céline et Thierry Gros ne pourront être tenue
              responsable de pertes ou de dommages de quelque nature que ce
              soit, qu'il s'agisse, notamment mais non exclusivement, de
              dommages directs, indirects ou consécutifs, liés à l'accès au Site
              ou à tout autre site ayant un lien avec le Site, à son
              utilisation, à son exploration ou à son téléchargement. Ce Site
              vous offre la possibilité d'envoyer des e-mails. Ces e-mails
              transitent par Internet, un réseau public sur lequel ils n'ont
              aucun contrôle, et sont de ce fait susceptibles d'être
              interceptés, altérés ou perdus. Céline et Thierry Gros déclinent
              toute responsabilité à cet égard.
            </p>
          </div>
          <div>
            <h2 className="text-2xl font-semibold mb-4  text-text_color ">
              4 - CNIL et gestion des données personnelles.
            </h2>
            <p>
              <span className="mr-1">À ce jour,le site&nbsp;</span>
              <Link href="https://le-plessis-aux-lys.fr ">
                https://le-plessis-aux-lys.fr
              </Link>
              <span>&nbsp;ne prélève aucune donnée de ses utilisateurs.</span>
            </p>
          </div>
          <div>
            <h2 className="text-2xl font-semibold mb-4  text-text_color ">
              5 - Liens hypertextes et cookies.
            </h2>
            <p>
              <span className="mr-1">Le site</span>
              <Link href="https://le-plessis-aux-lys.fr ">
                https://le-plessis-aux-lys.fr
              </Link>
              <span>
                &nbsp;contient des liens hypertextes vers d&apos;autres sites et
                dégage toute responsabilité à propos de ces liens externes ou
                des liens créés par d&apos;autres sites vers&nbsp;
              </span>
              <Link href="https://le-plessis-aux-lys.fr ">
                https://le-plessis-aux-lys.fr
              </Link>
              .
            </p>
            <p>
              <span className="mr-1">La navigation sur le site</span>
              <Link href="https://le-plessis-aux-lys.fr ">
                https://le-plessis-aux-lys.fr
              </Link>
              <span>
                &nbsp;est ne provoque l&apos;installation d&apos;aucun cookie
                sur l&apos;ordinateur de l&apos;utilisateur.
              </span>
            </p>
          </div>
          <div>
            <h2 className="text-2xl font-semibold mb-4  text-text_color ">
              6 - Droit applicable et attribution de juridiction.
            </h2>
            <p>
              <span className="mr-1">
                Tout litige en relation avec l&apos;utilisation du site
              </span>
              <Link href="https://le-plessis-aux-lys.fr ">
                https://le-plessis-aux-lys.fr
              </Link>
              <span>
                &nbsp;est soumis au droit français. En dehors des cas où la loi
                ne le permet pas, il est fait attribution exclusive de
                juridiction aux tribunaux compétents de Paris.
              </span>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

