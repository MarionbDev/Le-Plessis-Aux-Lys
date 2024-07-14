import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import VisitContext from "@/hooks/VisitContext";
import { motion } from "framer-motion";
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
};

export default function Article({
  title,
  description,
  content,
  url_link,
  image_path,
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
        <div className="bg-yellow/10 shadow-div rounded-md ">
          <Card className="flex flex-col justify-betweenfont-text text-sm m  w-[23rem] h-[35rem] text-text_color   ">
            <CardHeader className=" pb-0 mx-2 ">
              <div className="flex justify-between">
                <CardTitle>{title}</CardTitle>
                <div>
                  {image_path && (
                    <Image
                      src={image_path}
                      width={200}
                      height={200}
                      alt={`Photo ${title}`}
                      className=" max-w-[13rem] max-h-[8rem] object-contain "
                    />
                  )}
                </div>
              </div>
            </CardHeader>
            <div className="  mx-6 mb-4 py-3 h-[22rem]  overflow-auto  mostly-customized-scrollbar">
              <CardDescription className=" mb-4 mx-6">
                {description}
              </CardDescription>
              <CardContent dangerouslySetInnerHTML={{ __html: content }} />{" "}
            </div>
            {url_link ? (
              <Link href={`/${url_link}`} className="text-center">
                <p className="  font-semibold hover:text-gold">{url_link}</p>
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

