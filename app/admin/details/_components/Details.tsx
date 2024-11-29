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
      <Card className="font-text text-[0.9rem] text-text_color flex border-none shadow-none   ">
        <div className="flex flex-col  md:flex-row xl:min-w-[60rem]  ">
          <div className="flex flex-col">
            <CardHeader>
              <CardTitle className=" text-[1.1rem]  ">
                Nom : {title_rental}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="">
                <p className=" mb-2  text-[0.9rem] ">
                  Capacité : {capacity_rental}
                </p>
                <div className=" md:min-h-[8rem] min-w-[17rem] md:w-[30rem] xl:w-[57rem] ">
                  <p className="mb-2">Description :</p>
                  <div
                    dangerouslySetInnerHTML={{ __html: description_rental }}
                    className=" pb-3 text-[0.9rem] "
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
                    <FilePen size={24} />
                  </Button>
                </Link>
              </TooltipTrigger>
              <TooltipContent>
                <p>Modifier</p>
              </TooltipContent>
            </Tooltip>
            {/* <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  //  onClick={() => handleDelete(id)}
                  className="p-0"
                >
                  <Trash2 size={24} className="" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Supprimer</p>
              </TooltipContent>
            </Tooltip> */}
          </TooltipProvider>
        </div>
      </Card>

      {/* <div className="flex justify-center mt-14 md:pt-4  ">
        <span className="w-2/4 border-t-2  border-separator"></span>
      </div> */}
    </div>
  );
}

