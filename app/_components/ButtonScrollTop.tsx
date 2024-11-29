"use client";

import { Button } from "@/components/ui/button";
import { CircleChevronUp } from "lucide-react";

export default function ButtonScrollTop() {
  const ScrollTop = () => {
    if (typeof window !== "undefined") {
      window.scroll(0, 0);
    }
  };
  return (
    <Button
      onClick={ScrollTop}
      id="buttonScroll"
      aria-label="Scroll vers le haut"
      className=" fixed bottom-4 right-4 z-50 "
    >
      <CircleChevronUp
        size={38}
        color="#bbbb57"
        strokeWidth={1.5}
        className="  rounded-full hover:scale-95"
      />
    </Button>
  );
}

