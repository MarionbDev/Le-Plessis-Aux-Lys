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
import { motion } from "framer-motion";
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
};

export default function Article({
  id,
  title,
  description,
  content,
  url_link,
  image_path,
  handleDelete,
}: Props) {
  const visitContext = useContext(VisitContext);
  const { framerMotionVariants } = visitContext;

  return (
    <motion.section
      initial="hide"
      whileInView="show"
      exit="hide"
      variants={framerMotionVariants}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className=" bg-white shadow-div rounded-md ">
          <Card className="flex flex-col justify-betweenfont-text text-sm pb-2  w-[23rem] h-[35rem] text-text_color   ">
            <div className="flex justify-end gap-4 pt-2 pr-4 ">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button className=" p-0">
                      <FilePen />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Modifier</p>
                  </TooltipContent>
                </Tooltip>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button onClick={() => handleDelete(id)} className="p-0">
                      <Trash2 />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Supprimer</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
            <CardHeader className=" pb-0 mx-2 pt-0">
              <div className="flex  flex-col">
                {image_path && (
                  <Image
                    src={image_path}
                    width={200}
                    height={200}
                    alt={`Photo ${title}`}
                    className=" max-w-[13rem] max-h-[8rem] object-contain mx-auto "
                  />
                )}

                <CardTitle className="mb-3 mt-5 ">{title}</CardTitle>
              </div>
            </CardHeader>
            <div className=" mx-9 ">
              <div className="   mb-4 py-3 h-[17.5rem] px-3  overflow-auto  mostly-customized-scrollbar">
                <CardDescription className=" mb-3 ">
                  {description}
                </CardDescription>
                <CardContent
                  dangerouslySetInnerHTML={{ __html: content }}
                  className="m-0 p-0"
                />
              </div>
            </div>
            {url_link ? (
              <Link href={`/${url_link}`} className="text-center pb-4 ">
                <p className="  font-semibold hover:text-gold ">{url_link}</p>
              </Link>
            ) : (
              <p></p>
            )}
          </Card>
        </div>
      </motion.div>
    </motion.section>
  );
}

