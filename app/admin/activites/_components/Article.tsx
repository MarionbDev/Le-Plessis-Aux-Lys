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
import { FilePen, Trash2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

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

const getCompleteUrl = (url: string) => {
  if (url.startsWith("www.")) {
    return `https://${url}`;
  }

  return url;
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
  return (
    <div className=" md:min-w-[600px] lg:min-w-[900px]  xl:min-w-[1050px]  max-w-[1050px]  ">
      <Card className="font-text  text-[0.9rem] text-text_color flex flex-col-reverse  border-none shadow-none   ">
        <div className="flex flex-col  md:flex-row  ">
          {image_path && (
            <CardHeader className="  pb-0  flex flex-col items-center xl:min-w-[16rem] ">
              <div className="flex justify-center">
                <Image
                  src={image_path}
                  layout="responsive"
                  width={280}
                  height={180}
                  alt={`Photo ${title}`}
                  className="min-w-[13rem] max-w-[13rem] h-auto object-contain  "
                />
              </div>
            </CardHeader>
          )}
          <div className="flex flex-col">
            <CardTitle className=" text-[1.1rem] mx-6 mt-6 md:mt-2 pb-3 ">
              {title}
            </CardTitle>
            <CardDescription className=" mb-2 mx-6 text-[0.9rem] ">
              {description}
            </CardDescription>
            <CardContent
              dangerouslySetInnerHTML={{ __html: content }}
              className="prose pb-3 text-[0.9rem] marker:text-text_color"
            />
            {url_link ? (
              <Link
                href={getCompleteUrl(url_link)}
                target="blank"
                rel="noopener noreferrer"
                className="text-start mx-6 focus:outline-none focus:ring-2 focus:ring-gold font-medium hover:text-gold py-1 md:py-0 text-[0.9rem] "
              >
                <p className="  font-semibold hover:text-gold ">{url_link}</p>
              </Link>
            ) : (
              <p></p>
            )}{" "}
          </div>
        </div>
        <div className="flex justify-center md:justify-end gap-4 pt-2  md:pr-4 ">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Link href={`?modal-edit=true&articleId=${id}`}>
                  <Button onClick={() => handleUpdate(id)} className=" p-0">
                    <FilePen size={20} />
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
                  <Trash2 size={20} className="" />
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
        <span className=" w-[20rem] md:w-2/4 border-t-2  border-separator"></span>
      </div>
    </div>
  );
}

