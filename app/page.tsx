"use client";

import dynamic from "next/dynamic";
import { useEffect } from "react";
import DescriptionWebSite from "./_components/DescriptionWebSite";
import ImageHomeWebSite from "./_components/ImageHomeWebSite";
import UserLayout from "./user/layout";

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
      <div className="  ">
        {/* <div className="fixed w-screen top-0 z-50 bg-none bg-transparent">
        <NavbarUser />
      </div> */}
        <main className=" ">
          <ImageHomeWebSite />
          <DescriptionWebSite />
          <DynamicMap />
        </main>
      </div>
    </UserLayout>
  );
}
