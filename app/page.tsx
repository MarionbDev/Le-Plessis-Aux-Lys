"use client";

import { useEffect } from "react";
import DescriptionWebSite from "./_components/DescriptionWebSite";
import Footer from "./_components/Footer";
import Header from "./_components/Header";
import ImageWebSite from "./_components/ImageWebSite";

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
      </main>
      <Footer />
    </div>
  );
}
