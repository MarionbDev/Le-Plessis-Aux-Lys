import { ListRentalsDetailsProps } from "@/app/types";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { FilePen } from "lucide-react";
import Link from "next/link";

export default function Details({
  id,
  title_rental,
  capacity_rental,
  description_rental,

  handleUpdate,
}: ListRentalsDetailsProps) {
  return (
    <div className=" rounded-md border-2 w-[24rem] md:w-[600px] xl:min-w-[1048px] max-w-[1050px] ">
      <Card className="font-text text-text_color flex border-none shadow-none   ">
        <div className="flex flex-col  md:flex-row xl:min-w-[60rem]  ">
          <div className="flex flex-col">
            <CardHeader>
              <CardTitle>Nom : {title_rental}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="">
                <p className=" mb-2  text-[0.9rem] ">
                  Capacité : {capacity_rental}
                </p>
                <div className=" md:min-h-[8rem] min-w-[17rem] md:w-[30rem] xl:w-[57rem] ">
                  <p className="mb-2 text-[0.9rem]">Description :</p>
                  <div
                    dangerouslySetInnerHTML={{ __html: description_rental }}
                    className=" pb-3 text-[0.9rem]  marker:text-text_color "
                  />
                </div>
              </div>
            </CardContent>
          </div>
        </div>
        <div className="flex justify-end mt-4 w-12  ">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Link href={`?modal-edit=true&rentalId=${id}`}>
                  <Button onClick={() => handleUpdate?.(id)} className=" p-0">
                    <FilePen size={22} />
                  </Button>
                </Link>
              </TooltipTrigger>
              <TooltipContent className="bg-white">
                <p>Modifier</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </Card>
    </div>
  );
}

