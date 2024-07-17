import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Trash2 } from "lucide-react";
import Image from "next/image";

import { Button } from "@/components/ui/button";
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
      <div className="flex justify-around">
        <Card className=" w-[30rem] h-[28rem]">
          <CardHeader>
            <div className="flex flex-col  justify-between items-center">
              <CardTitle>{title}</CardTitle>

              <UploadFileAdmin
                onUploadComplete={onUploadComplete}
                bucket={bucket}
              />
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex gap-4 h-[19rem]   overflow-x-auto overflow-y-hidden ">
              {slides.map((slide, index) => (
                <div
                  key={index}
                  className="h-[18rem] flex-shrink-0 flex items-center  justify-center relative"
                >
                  <div className=" flex justify-center items-center">
                    <Image
                      src={slide.path}
                      width={200}
                      height={200}
                      alt={`Photo ${index + 1}`}
                      style={{ objectFit: "cover", objectPosition: "center" }}
                      priority
                      className=" p-0"
                    />
                  </div>
                  <Button
                    onClick={() => handleDeleteClick(slide.fileName)}
                    className=" absolute  bg-white  p-1 rounded-tr-md border-l-2 border-b-2"
                  >
                    <Trash2 size={20} className=" hover:scale-110" />
                  </Button>
                </div>
              ))}{" "}
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  );
}

