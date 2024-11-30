import { Button } from "@/components/ui/button";
import cookies from "@/public/cookies.svg";
import { Plus } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

interface CookieBannerProps {
  onAccept?: () => void;
  onReject?: () => void;
}

export default function CookieBanner({
  onAccept,
  onReject,
}: CookieBannerProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem("cookiesAccepted");

    if (consent === null || consent === "false") {
      setIsVisible(true);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem("cookiesAccepted", "true");
    setIsVisible(false);
    if (onAccept) onAccept(); // notifie le parent si une fonction est fournie
  };

  const handleReject = () => {
    localStorage.setItem("cookiesAccepted", "false");
    setIsVisible(false);
    if (onReject) onReject(); // notifie le parent si une fonction est fournie
  };

  if (!isVisible) return null;

  return (
    <div className="flex justify-center">
      <div
        style={{
          position: "fixed",
          bottom: "10px",
          background: "#fff",
          zIndex: 1000,
        }}
        className="mx-4 md:mx-auto text-text_color md:right-2 md:w-[18rem] shadow-div rounded p-3"
      >
        <div className="flex justify-between items-start">
          <div className="flex flex-row gap-3 items-center">
            <Image src={cookies} width={30} height={30} alt="" />
            <h3 className="text-[1rem]">Gérer les cookies</h3>
          </div>
          <button onClick={handleReject} className="p-0 m-0">
            <Plus size={22} className=" rotate-45" />
          </button>
        </div>
        <div className="mt-2">
          <p className="text-[0.7rem]">
            Ce site utilise des cookies tiers (Google Maps) pour fonctionner
            correctement.
          </p>
          <Link
            href="https://le-plessis-aux-lys.fr/politique-confidentialite "
            className="text-[0.7rem]  underline"
          >
            Politique de confidentialité
          </Link>
        </div>
        <div className="flex justify-end gap-2 mt-2">
          <Button
            onClick={handleAccept}
            style={{
              backgroundImage:
                "linear-gradient(90deg, #EFAB67 29%, #FC7A6A 73%)",
            }}
            className="border-none rounded-full cursor-pointer text-white text-[0.7rem]"
          >
            Accepter
          </Button>
          <Button
            onClick={handleReject}
            className="border-2 rounded-full cursor-pointer text-[0.7rem]"
          >
            Refuser
          </Button>
        </div>
      </div>
    </div>
  );
}

