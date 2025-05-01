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
        <div>
          <Card className=" font-text  text-[1rem] sm:text-[0.9rem] text-text_color flex flex-col lg:flex-row bg-[#f8f5f0] border-none shadow-md  py-6 ">
            {image_path && (
              <CardHeader className=" pb-0  flex flex-col items-center xl:min-w-[16rem]    ">
                <div className="flex justify-center   ">
                  <Image
                    src={image_path}
                    width={980}
                    height={180}
                    alt={`Photo de l'article ${title}`}
                    className=" w-[15rem] h-auto object-contain rounded-sm shadow-md shadow-slate-400 "
                  />
                </div>
              </CardHeader>
            )}
            <div className=" flex flex-col lg:w-[50rem]">
              <CardTitle className="text-balance text-center lg:text-left text-[1.2rem] mx-6 mt-6 lg:mt-2 pb-3 ">
                {title}
              </CardTitle>
              <CardDescription className="mb-2 mx-6 text-[1rem] sm:text-[0.9rem]  ">
                {description}
              </CardDescription>
              <CardContent className=" text-pretty lg:pr-12 pb-3 text-[1rem] sm:text-[0.9rem]  marker:text-text_color ">
                <p dangerouslySetInnerHTML={{ __html: content }} />
                <div className="flex items-center flex-wrap mt-8">
                  <p>Pour en savoir plus : &nbsp;</p>
                  <Link
                    href={getCompleteUrl(url_link)}
                    target="blank"
                    rel="noopener noreferrer"
                    className=" text-start  focus:outline-none focus:ring-2 focus:ring-gold font-medium hover:text-gold py-2 md:py-0 text-[1rem] sm:text-[0.9rem]"
                    aria-label={`Visiter le site  ${url_link}`}
                  >
                    {url_link}
                  </Link>{" "}
                </div>{" "}
              </CardContent>
            </div>
          </Card>
        </div>
      </motion.div>
    </motion.section>
  );
}

