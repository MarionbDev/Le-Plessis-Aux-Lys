"use client";

import { Button } from "@/components/ui/button";
import dynamic from "next/dynamic";
import { useEffect } from "react";
import UserLayout from "./(user)/layout";
import DescriptionWebSite from "./_components/DescriptionWebSite";
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
    <UserLayout>
      <div className="min-h-screen">
        <div className="fixed  top-0 z-50 bg-none bg-transparent">
          {/* <NavbarUser />
          <NavBarMobile /> */}
        </div>
        <main className=" ">
          <ImageHomeWebSite />
          <DescriptionWebSite />

          <DynamicMap />
        </main>
      </div>
    </UserLayout>
  );
}
