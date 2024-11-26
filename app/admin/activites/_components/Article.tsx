import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import VisitContext from "@/hooks/VisitContext";
import { FilePen, Trash2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useContext } from "react";

type Props = {
  id: string;
  title: string;
  description: string;
  content: string;
  url_link: string;
  image_path: string;
  handleDelete: (id: string) => Promise<void>;
  handleUpdate: (id: string) => void;
};

export default function Article({
  id,
  title,
  description,
  content,
  url_link,
  image_path,
  handleDelete,
  handleUpdate,
}: Props) {
  const visitContext = useContext(VisitContext);
  const { framerMotionVariants } = visitContext;

  return (
    <div className="xl:min-w-[1048px] max-w-[1050px]   ">
      <Card className="font-text  text-[0.9rem] text-text_color flex flex-col-reverse  border-none shadow-none   ">
        <div className="flex flex-col  md:flex-row  ">
          <CardHeader className="  pb-0  flex flex-col items-center xl:min-w-[16rem] ">
            <div className="flex justify-center">
              {image_path && (
                <Image
                  src={image_path}
                  layout="responsive"
                  width={280}
                  height={180}
                  alt={`Photo ${title}`}
                  className="min-w-[13rem] max-w-[13rem] h-auto object-contain  "
                />
              )}
            </div>
          </CardHeader>
          <div className="flex flex-col">
            <CardTitle className=" text-[1.1rem] mx-6 mt-6 md:mt-2 pb-3 ">
              {title}
            </CardTitle>
            <CardDescription className=" mb-2 mx-6 text-[0.9rem] ">
              {description}
            </CardDescription>
            <CardContent
              dangerouslySetInnerHTML={{ __html: content }}
              className=" pb-3 text-[0.9rem]"
            />
            {url_link ? (
              <Link
                href={`/${url_link}`}
                className="text-start mx-6 focus:outline-none focus:ring-2 focus:ring-gold font-medium hover:text-gold py-1 md:py-0 text-[0.9rem] "
              >
                <p className="  font-semibold hover:text-gold ">{url_link}</p>
              </Link>
            ) : (
              <p></p>
            )}{" "}
          </div>
        </div>
        <div className="flex justify-end gap-4 pt-2 pr-8 md:pr-4 ">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Link href={`?modal-edit=true&articleId=${id}`}>
                  <Button onClick={() => handleUpdate(id)} className=" p-0">
                    <FilePen size={24} />
                  </Button>
                </Link>
              </TooltipTrigger>
              <TooltipContent>
                <p>Modifier</p>
              </TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button onClick={() => handleDelete(id)} className="p-0">
                  <Trash2 size={24} className="" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Supprimer</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </Card>

      <div className="flex justify-center mt-14 md:pt-4  ">
        <span className="w-2/4 border-t-2  border-separator"></span>
      </div>
    </div>
  );
}

