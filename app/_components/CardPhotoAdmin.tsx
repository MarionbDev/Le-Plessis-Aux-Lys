import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Trash2 } from "lucide-react";
import Image from "next/image";

import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { onUploadComplete } from "../types";
import UploadFileAdmin from "./UploadFileAdmin";

type PropType = {
  title: string;
  slides?: {
    fileName: string;
    path: string;
    orientation: "horizontal" | "vertical";
  }[];
  onUploadComplete?: (uploadedFileData: onUploadComplete) => void;
  bucket: string;
  onDelete: (fileName: string, bucket: string) => void;
};

export default function CardPhotosAdmin({
  title,
  slides = [],
  onUploadComplete = () => {},
  bucket,
  onDelete,
}: PropType) {
  const handleDeleteClick = (fileName: string) => {
    onDelete(fileName, bucket);
  };

  return (
    <>
      <div className="flex justify-around d ">
        <Card className=" w-[25rem] h-[29rem] flex flex-col items-center border-2  ">
          <CardHeader className="flex flex-col justify-between items-center">
            <CardTitle className="text-[1.1rem] text-text_color">
              {title}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="customized-scrollbar flex gap-4 h-[16rem] overflow-x-auto overflow-y-hidden  ">
              {slides.map((slide, index) => (
                <div
                  key={index}
                  className="h-[14rem] flex-shrink-0  flex items-center  justify-center relative "
                >
                  <div className=" flex justify-center items-center ">
                    <Image
                      src={slide.path}
                      width={280}
                      height={180}
                      alt={`Photo ${index + 1}`}
                      priority
                      className=" w-auto h-56 object-scale-down"
                    />
                  </div>

                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button
                          onClick={() => handleDeleteClick(slide.fileName)}
                          className="absolute  bg-yellow/60 mr-4  p-1 rounded-full px-2 border-l-2 border-2"
                        >
                          <Trash2 size={22} className="" />
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent className="bg-white">
                        <p>Supprimer</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
              ))}{" "}
            </div>
          </CardContent>
          <CardFooter className="mt-2">
            <UploadFileAdmin
              onUploadComplete={onUploadComplete}
              bucket={bucket}
            />
          </CardFooter>
        </Card>
      </div>
    </>
  );
}

