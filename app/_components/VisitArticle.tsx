import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Variants, motion } from "framer-motion";
import Image from "next/image";
import { useContext } from "react";
import VisitContext from "../../hooks/VisitContext";
type PropType = {
  visitTitle: string;
};

const sectionVariants: Variants = {
  hide: {
    opacity: 0,
  },
  show: {
    opacity: 1,
    transition: {
      duration: 1,
      delay: 0.6,
    },
  },
};

export default function VisitArticle({ visitTitle }: PropType) {
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
        <div className="shadow-div rounded-md">
          <Card className=" font-text text-sm max-w-6xl mx-auto  text-text_color bg-yellow/10  ">
            <CardHeader className=" pb-0">
              <CardTitle className=" font-bold">{visitTitle}</CardTitle>
              <CardDescription>
                <p>
                  Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                  Distinctio expedita omnis obcaecati.
                </p>
              </CardDescription>
            </CardHeader>
            <CardContent className=" flex items-center gap-6 pb-0 ">
              <div>
                <Image
                  src="/image-interface.svg"
                  width={800}
                  height={100}
                  alt="image"
                  className=" max-w-[13rem] object-scale-down"
                />
              </div>
              <p className="">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Architecto in magnam quis at iure laudantium nulla id corporis
                aut facere beatae tenetur quas cupiditate perspiciatis delectus
                non, nemo aliquam esse. Corrupti repellat placeat rerum
                consequatur! Odit dolores odio ad architecto sit, vero magni
                quibusdam voluptates at eum deserunt dolorem adipisci esse modi
                nesciunt nemo? Similique incidunt provident ab eius rem.
              </p>
            </CardContent>
          </Card>
        </div>
      </motion.div>
    </motion.section>
  );
}

