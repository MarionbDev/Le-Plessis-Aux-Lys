import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Variants, motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

type PropType = {
  id: string;
  title: string;
  description: string;
  content: string;
  url_link: string;
  image_path: string;
};

const imageVariants: Variants = {
  hide: {
    opacity: 0,
    y: 100,
  },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      delay: 0.2,
    },
  },
};

const getCompleteUrl = (url: string) => {
  if (url.startsWith("www.")) {
    return `https://${url}`;
  }

  return url;
};

export default function VisitArticle({
  title,
  description,
  content,
  url_link,
  image_path,
}: PropType) {
  return (
    <motion.section
      initial="hide"
      whileInView="show"
      exit="hide"
      variants={imageVariants}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className=" md:min-w-[600px] lg:min-w-[900px]  xl:min-w-[1050px]  max-w-[1050px]">
          <Card className=" font-text  text-[0.9rem] text-text_color flex flex-col md:flex-row border-none shadow-none ">
            {image_path && (
              <CardHeader className=" pb-0  flex flex-col items-center  xl:min-w-[16rem]    ">
                <div className="flex justify-center   ">
                  <Image
                    src={image_path}
                    width={280}
                    height={180}
                    alt={`Photo de l'article ${title}`}
                    className=" max-w-[13rem] h-auto object-contain rounded-sm shadow-md shadow-slate-400 "
                  />
                </div>
              </CardHeader>
            )}
            <div className=" flex flex-col">
              <CardTitle className="  text-[1.1rem] mx-6 mt-6 md:mt-2 pb-3 ">
                {title}
              </CardTitle>
              <CardDescription className="mb-2 mx-6 text-[0.9rem] ">
                <p>{description}</p>
              </CardDescription>
              <CardContent className="prose pb-3 text-[0.9rem]  marker:text-text_color ">
                <p dangerouslySetInnerHTML={{ __html: content }} />
              </CardContent>
              <Link
                href={getCompleteUrl(url_link)}
                target="blank"
                rel="noopener noreferrer"
                className=" text-start mx-6 focus:outline-none focus:ring-2 focus:ring-gold font-medium hover:text-gold py-2 md:py-0 text-[0.9rem]"
                aria-label={`Visiter le site  ${url_link}`}
              >
                {url_link}
              </Link>
            </div>
          </Card>
          <div className="flex justify-center mt-14 md:pt-4  ">
            <span className=" w-[20rem] md:w-2/4 border-t-2  border-separator"></span>
          </div>
        </div>
      </motion.div>
    </motion.section>
  );
}

