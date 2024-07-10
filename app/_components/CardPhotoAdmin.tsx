import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Trash2 } from "lucide-react";
import Image from "next/image";

import { Button } from "@/components/ui/button";
import UploadFileAdmin from "./UploadFileAdmin";

type PropType = {
  title: string;
  slides?: { url: string; orientation: "horizontal" | "vertical" }[];
  onUploadComplete: (uploadedFileData: {
    url: string;
    orientation: "horizontal" | "vertical";
    id: string;
    path: string;
    fullPath: string;
  }) => void; // Définir la fonction de rappel onUploadComplete comme une prop requise
};

export default function CardPhotosAdmin({
  title,
  slides = [],
  onUploadComplete,
}: PropType) {
  return (
    <>
      <div className="flex justify-around">
        <Card className=" w-[30rem] h-[28rem]">
          <CardHeader>
            <div className="flex justify-between items-center">
              <CardTitle>{title}</CardTitle>
              <CardDescription>
                {/* <Button>
                  <ImagePlus size={26} className=" hover:scale-125" />
                </Button> */}
                <UploadFileAdmin onUploadComplete={onUploadComplete} />
              </CardDescription>
            </div>
          </CardHeader>

          <CardContent>
            <div className="flex gap-4 h-[22rem]   overflow-x-auto overflow-y-hidden ">
              {slides.map((slide, index) => (
                <div
                  key={index}
                  className={`min-w-[${slide.orientation === "horizontal" ? "600px" : "200px"}] min-h-[22rem] flex-shrink-0 flex items-center `}
                >
                  <div>
                    <Image
                      src={slide.url}
                      width={slide.orientation === "horizontal" ? 320 : 160}
                      height={slide.orientation === "horizontal" ? 500 : 100}
                      alt={`Photo ${index + 1}`}
                      objectFit="cover"
                      objectPosition="center"
                      priority
                      className=" p-0"
                    />
                    <Button className="  relative -top-9 bg-white  p-1 rounded-tr-md border-l-2 border-b-2">
                      <Trash2 size={20} className=" hover:scale-110" />
                    </Button>
                  </div>
                </div>
              ))}{" "}
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  );
}

