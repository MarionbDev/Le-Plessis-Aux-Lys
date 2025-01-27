"use client";

import { Button } from "@/components/ui/button";
import { Variants, motion } from "framer-motion";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
// import UserLayout from "./(user)/layout.tsx";
import UserLayout from "./(user)/layout";
import DescriptionWebSite from "./_components/DescriptionWebSite";
import ImageHomeWebSite from "./_components/ImageHomeWebSite";
import CookieBanner from "./_components/map/CookieBanner";

const DynamicMap = dynamic(() => import("./_components/map/Map"), {
  ssr: false,
});

const sectionVariants: Variants = {
  hide: {
    opacity: 0,
  },
  show: {
    opacity: 1,
    transition: {
      duration: 1,
      delay: 0.6,
    },
  },
};

export default function Home() {
  const [isConsentGiven, setIsConsentGiven] = useState<boolean>(false);
  const [isBannerVisible, setIsBannerVisible] = useState<boolean>(false);

  useEffect(() => {
    const consent = localStorage.getItem("cookiesAccepted");
    // état initial du consentement
    if (consent === "true") {
      setIsConsentGiven(true);
      setIsBannerVisible(false);
    } else if (consent === "false") {
      setIsConsentGiven(false);
      setIsBannerVisible(true);
    } else {
      setIsConsentGiven(false);
      setIsBannerVisible(true);
    }
  }, []);

  // acepte les cookies
  const handleAcceptCookies = () => {
    setIsConsentGiven(true);
    localStorage.setItem("cookiesAccepted", "true");
    setIsBannerVisible(false);
  };

  // refuse les cookies
  const handleRejectCookies = () => {
    setIsConsentGiven(false);
    localStorage.setItem("cookiesAccepted", "false");
    setIsBannerVisible(false);
  };

  // reset les cookies
  const handleResetCookiesConsent = () => {
    localStorage.removeItem("cookiesAccepted");
    setIsConsentGiven(false);
    setIsBannerVisible(true);
  };

  const handleShowBannerAgain = () => {
    localStorage.removeItem("cookieAccepted");
    setIsConsentGiven(false);
    setIsBannerVisible(true);
  };

  return (
    <UserLayout>
      <div className="min-h-screen">
        <div className="fixed top-0 z-50 bg-none bg-transparent"></div>
        <main className="">
          <ImageHomeWebSite />
          <DescriptionWebSite />
          <div className="flex justify-center font-text text-text_color">
            <div className="mb-40">
              <motion.section
                initial="hide"
                whileInView="show"
                exit="hide"
                variants={sectionVariants}
              >
                <motion.div
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5 }}
                >
                  <div className="flex justify-center flex-col items-center text-md lg:text-md mx-6 mt-8 md:mt-44 leading-loose">
                    <div className="flex flex-col lg:flex-row items-center justify-center mt-16 lg:mt-0 gap-4 my-8 lg:my-20">
                      <span className="flex justify-center w-[16rem] border-t-2 border-separator"></span>
                      <p className="font-semibold text-center lg:text-lg uppercase lg:w-[20rem]">
                        nous situer
                      </p>
                      <span className="flex justify-center w-[16rem] border-t-2 border-separator"></span>
                    </div>
                  </div>
                </motion.div>
              </motion.section>
              {isBannerVisible && (
                <div>
                  <motion.div
                    initial={{ x: "100vw" }}
                    animate={{ x: 0 }}
                    transition={{ type: "spring", stiffness: 60, damping: 15 }}
                    style={{
                      position: "fixed",
                      bottom: "0",
                      right: "0",
                      width: "100%",
                      zIndex: 1000,
                    }}
                  >
                    <CookieBanner
                      onAccept={handleAcceptCookies}
                      onReject={handleRejectCookies}
                    />
                  </motion.div>
                </div>
              )}
              {isConsentGiven ? (
                <div className="flex flex-col justify-center">
                  <DynamicMap onResetConsent={handleResetCookiesConsent} />
                </div>
              ) : (
                <div className="flex flex-col items-center">
                  <p className="text-center px-6">
                    Les fonctionnalités de la carte sont désactivées jusqu'à ce
                    que vous acceptiez les cookies.
                  </p>{" "}
                  {!isBannerVisible && (
                    <Button
                      onClick={handleShowBannerAgain}
                      className="mt-2 underline"
                    >
                      Accepter les cookies
                    </Button>
                  )}
                </div>
              )}
            </div>
          </div>
        </main>
      </div>
    </UserLayout>
  );
}
