"use client";

import dynamic from "next/dynamic";
import { useEffect } from "react";
import DescriptionWebSite from "./_components/DescriptionWebSite";
import Footer from "./_components/Footer";
import ImageWebSite from "./_components/ImageWebSite";

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
    <div>
      <main className=" ">
        <ImageWebSite />
        <DescriptionWebSite />
        <DynamicMap />
      </main>
      <Footer />
    </div>
  );
}
