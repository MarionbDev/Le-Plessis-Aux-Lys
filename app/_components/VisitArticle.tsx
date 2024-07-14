import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useContext } from "react";
import VisitContext from "../../hooks/VisitContext";

type PropType = {
  id: string;
  title: string;
  description: string;
  content: string;
  url_link: string;
  image_path: string;
};

export default function VisitArticle({
  title,
  description,
  content,
  url_link,
  image_path,
}: PropType) {
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
        <div className="bg-yellow/10 shadow-div rounded-md  ">
          <Card className=" font-text text-sm m  w-[23rem] h-[35rem] text-text_color   ">
            <CardHeader className=" pb-0 mx-2 ">
              <div className="flex justify-between">
                <CardTitle className=" font-bold mt-4">{title}</CardTitle>
                <Image
                  src={image_path}
                  width={180}
                  height={180}
                  alt={`Photo de l'article ${title}`}
                  className=" max-w-[13rem] max-h-[8rem] object-contain "
                />
              </div>
            </CardHeader>
            <div className="  mx-6 mb-4 py-3 h-[22rem]  overflow-auto  mostly-customized-scrollbar">
              <CardDescription className=" mb-4 mx-6">
                <p>{description}</p>
              </CardDescription>
              <CardContent className="   ">
                <div className="  ">
                  <p dangerouslySetInnerHTML={{ __html: content }} />
                </div>
              </CardContent>
            </div>
            <Link href={`/${url_link}`} className=" text-center ">
              <p className="  font-semibold hover:text-gold">{url_link}</p>
            </Link>{" "}
          </Card>
        </div>
      </motion.div>
    </motion.section>
  );
}

