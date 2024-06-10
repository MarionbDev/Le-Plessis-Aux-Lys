"use client";

import dynamic from "next/dynamic";
import { useEffect } from "react";
import DescriptionWebSite from "./_components/DescriptionWebSite";
import Footer from "./_components/Footer";
import ImageHomeWebSite from "./_components/ImageHomeWebSite";

const DynamicMap = dynamic(() => import("./_components/Map"), {
  ssr: false,
});

export default function Home() {
  useEffect(() => {
    if (typeof window !== "undefined") {
      window.scroll(0, 0);
    }
  }, []);

  return (
    <div className="  ">
      <main className=" ">
        <ImageHomeWebSite />
        <DescriptionWebSite />
        <DynamicMap />
      </main>
      <Footer />
    </div>
  );
}
