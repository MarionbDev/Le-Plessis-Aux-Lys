"use client";

import dynamic from "next/dynamic";
import { useEffect } from "react";
import DescriptionWebSite from "./_components/DescriptionWebSite";
import Footer from "./_components/Footer";
import Header from "./_components/Header";
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
      <header className="fixed w-screen top-0 z-50">
        <Header />
      </header>
      <main className=" ">
        <ImageWebSite />
        <DescriptionWebSite />

        <DynamicMap />
      </main>
      <Footer />
    </div>
  );
}
