import { Button } from "@/components/ui/button";
import { Variants, motion } from "framer-motion";
import { useEffect, useState } from "react";

interface MapProps {
  onResetConsent: () => void;
}
const imageVariants: Variants = {
  hide: {
    opacity: 0,
    y: 100,
  },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      delay: 0.2,
    },
  },
};

export default function Map({ onResetConsent }: MapProps) {
  const [isConsentGiven, setIsConsentGiven] = useState<boolean>(false);

  useEffect(() => {
    const consent = localStorage.getItem("cookiesAccepted");
    setIsConsentGiven(consent === "true");
  }, []);

  if (!isConsentGiven) {
    return <p>Veuillez accepter les cookies pour afficher la carte.</p>;
  }

  return (
    <div className="flex justify-center">
      <motion.section
        initial="hide"
        whileInView="show"
        exit="hide"
        variants={imageVariants}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className=""
        >
          <div className="my-8 md:my-12 lg:my-4 ">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15498.99660188144!2d-0.67319274140706!3d46.62950023714675!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4806e38cb2745943%3A0xacf713e592e80e95!2sLe%20Plessis%20aux%20Lys!5e0!3m2!1sfr!2sfr!4v1732388930331!5m2!1sfr!2sfr"
              title="Carte Google Maps : Le Plessis aux Lys"
              width="600"
              height="450"
              style={{
                border: "0",
              }}
              className="w-[20rem] h-[20rem] sm:w-[30rem] sm:h-[22rem] md:w-[35rem] lg:w-[50rem]"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              // sandbox="allow-scripts allow-same-origin allow-popups"
            ></iframe>

            <Button
              onClick={onResetConsent}
              className=" px-3 border-none rounded cursor-pointer underline -mt-2   w-full justify-end text-[0.8rem]"
            >
              <p> Mettre à jour les préférences cookies</p>
            </Button>
          </div>
        </motion.div>
      </motion.section>
    </div>
  );
}

