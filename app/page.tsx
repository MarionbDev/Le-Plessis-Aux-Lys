"use client";

import { useEffect } from "react";
import DescriptionWebSite from "./_components/DescriptionWebSite";
import ImageWebSite from "./_components/ImageWebSite";

export default function Home() {
  useEffect(() => {
    if (typeof window !== "undefined") {
      window.scroll(0, 0);
    }
  }, []);

  return (
    <main className=" ">
      <ImageWebSite />
      <DescriptionWebSite />
    </main>
  );
}
