import Link from "next/link";

export const metadata = {
  robots: {
    index: false,
    follow: true,
  },
};

export default function privacyPolicyPage() {
  return (
    <div className="font-text text-text_color text-[0.9rem]">
      <div className=" mx-10 py-20 lg:py-32 flex flex-col gap-8 mb-8">
        <h1 className="text-2xl font-bold text-text_color text-center mb-8">
          Politique de confidentialité
        </h1>
        <div className="lg:mx-44">
          <div className=" mb-8">
            <h2 className="text-[1.2rem] font-semibold mb-4  text-text_color ">
              1. Politique de Confidentialité relative aux Cookies (Google Maps)
            </h2>

            <p className=" font-semibold mb-4">Cookies de Google Maps</p>
            <p>
              Ce site utilise des cookies tiers fournis par Google Maps pour
              afficher des cartes interactives et d'autres fonctionnalités liées
              aux cartes. Google Maps collecte et traite des informations
              relatives à votre utilisation de ces services, y compris votre
              adresse IP, les informations de géolocalisation, et d'autres
              données liées à l'interaction avec les cartes.
            </p>
            <p className="mt-6 mb-4">
              Les types de cookies utilisés par Google Maps incluent :
            </p>
            <ul className="flex flex-col gap-4 mx-8 sm:mx-20 mb-8 list-disc">
              <li>
                Cookies de performance : pour rendre le service plus rapide et
                plus réactif, Google utilise des cookies qui collectent des
                informations anonymes sur l'utilisation des cartes (par exemple,
                quelles cartes sont chargées, leur fréquence d’utilisation).
              </li>
              <li>
                Cookies de personnalisation : Ces cookies permettent de
                personnaliser l'affichage des cartes selon vos préférences (par
                exemple, le zoom ou l'affichage de certaines couches).
              </li>
              <li>
                Cookies de ciblage et de publicité : Google peut utiliser des
                cookies pour collecter des informations sur vos habitudes de
                navigation afin de vous proposer des contenus ou des publicités
                adaptées à vos intérêts.
              </li>
            </ul>
            <div className="flex flex-col gap-2">
              <p className=" font-semibold mb-4">Cookies de consentement</p>
              <p>
                En acceptant la politique de cookies, vous consentez à
                l'utilisation de ces cookies par Google Maps pour les
                fonctionnalités de cartographie et de géolocalisation.
              </p>
              <p>
                Si vous ne souhaitez pas que Google utilise des cookies pour
                personnaliser votre expérience de carte, vous pouvez refuser
                leur utilisation en modifiant vos paramètres de cookies sur
                notre site. De plus, vous pouvez toujours gérer vos préférences
                en matière de cookies directement via les paramètres de votre
                navigateur.
              </p>
              <p className=" font-semibold mb-4 mt-4">
                Gestion des préférences en matière de cookies
              </p>
              <p>
                Pour plus d'informations sur la façon dont Google collecte et
                utilise vos données, ainsi que pour gérer vos préférences en
                matière de cookies, vous pouvez consulter la politique de
                confidentialité de Google Maps :{" "}
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
              <p>
                Si vous ne souhaitez pas que Google utilise des cookies pour
                personnaliser votre expérience de carte, vous pouvez refuser
                leur utilisation en modifiant vos paramètres de cookies sur
                notre site.
              </p>
            </div>
          </div>
          <div className=" mb-8">
            <h2 className="text-[1.2rem] font-semibold mb-4  text-text_color ">
              2. Collecte et utilisation des Données
            </h2>
            <p>
              Nous ne collectons aucune donnée personnelle identifiable par
              nous-mêmes. Toutefois, Google peut collecter des données
              personnelles via ses cookies, comme l'adresse IP, la
              géolocalisation et d'autres informations techniques relatives à
              l'interaction avec les cartes. Ces informations sont gérées
              directement par Google, et nous n'y avons pas accès.
            </p>
            <div className="mt-8 ">
              <p className="mb-2 font-semibold">Analyse des visites </p>
              <p>
                Nous utilisons Vercel Analytics pour analyser les visites sur
                notre site. Ce service ne dépose aucun cookie et collecte
                uniquement des données anonymes telles que le nombre de
                visiteurs, les pages consultées, le pays approximatif et le type
                d’appareil. Ces informations sont utilisées exclusivement à des
                fins statistiques afin d'améliorer l’expérience utilisateur.
              </p>
            </div>
          </div>
          <div className=" mb-8">
            <h2 className="text-[1.2rem] font-semibold mb-4  text-text_color ">
              3. Partage des Données
            </h2>
            <p>
              Nous ne partageons pas vos informations personnelles avec des
              tiers à moins que cela ne soit nécessaire pour fournir nos
              services ou pour nous conformer à des obligations légales. Les
              informations que nous collectons peuvent être partagées avec des
              prestataires de services tiers qui nous aident à exploiter notre
              site, notamment pour l'affichage de cartes interactives via Google
              Maps.
            </p>
          </div>
          <div className=" mb-8">
            <h2 className="text-[1.2rem] font-semibold mb-4  text-text_color ">
              4. Sécurité des Données
            </h2>
            <p>
              Bien que nous ne collectons pas directement de données
              personnelles, nous nous engageons à utiliser des services de
              Google qui mettent en œuvre des mesures de sécurité robustes pour
              protéger vos informations contre tout accès non autorisé,
              divulgation ou perte.
            </p>
          </div>
          <div className=" mb-8">
            <h2 className="text-[1.2rem] font-semibold mb-4  text-text_color ">
              5. Collecte de données via le formulaire de contact
            </h2>
            <p>
              Nous collectons des informations personnelles (nom, prénom, email,
              téléphone, message) lorsque vous utilisez notre formulaire de
              contact. Ces données sont uniquement utilisées pour répondre à vos
              demandes et sont envoyées par email au propriétaire du site.
            </p>
            <ul className=" flex flex-col gap-4 mx-8 sm:mx-20 mb-8 list-disc mt-4">
              <li>
                Utilisation des données : Les informations que vous fournissez
                via le formulaire de contact seront utilisées exclusivement pour
                traiter votre demande.
              </li>
              <li>
                Gestion des informations : Ces données ne sont pas stockées dans
                notre base de données, elles sont envoyées directement au
                propriétaire du site sous forme de message électronique.
              </li>
              <li>
                Sécurité des données : Bien que nous n'archivions pas ces
                informations, nous nous engageons à garantir que la
                communication par email respecte des mesures de sécurité pour
                protéger vos données.
              </li>
            </ul>
            <p>
              Si vous avez des questions concernant la gestion de vos
              informations personnelles via notre formulaire de contact,
              n'hésitez pas à nous contacter.
            </p>
          </div>

          <div className=" mb-8">
            <h2 className="text-[1.2rem] font-semibold mb-4  text-text_color ">
              6. Modifications de la Politique de Confidentialité
            </h2>
            <p>
              Nous nous réservons le droit de modifier cette politique de
              confidentialité à tout moment. Toute modification sera publiée sur
              cette page, avec la date de la mise à jour. Nous vous encourageons
              à consulter régulièrement cette politique pour rester informé des
              changements.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

