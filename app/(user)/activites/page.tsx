"use client";

import VisitArticle from "@/app/_components/VisitArticle";
import { getAllArticles } from "@/app/api/article/route";
import VisitContext from "@/hooks/VisitContext";
import { useEffect, useState } from "react";

type PropType = {
  id: string;
  title: string;
  description: string;
  content: string;
  url_link: string;
  image_path: string;
};

export default function ToVisited() {
  const [activities, setActivities] = useState<PropType[]>([]);

  useEffect(() => {
    async function fetchAllActivities() {
      try {
        const fetchedActivities = await getAllArticles();
        console.log("Activities fetched :", fetchedActivities);
        setActivities(fetchedActivities as PropType[]);
      } catch (error) {
        console.error("Error fetching activities :", error);
      }
    }
    fetchAllActivities();
  }, []);

  const visitContextValue = {
    framerMotionVariants: {
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
    },
  };

  return (
    <div className="pt-12 md:pt-20 xl:pt-40 px-6 xl:px-20 flex flex-col items-center my-10   ">
      <h3 className="font-prata text-2xl xl:w-[50rem] text-center mb-16 text-text_color ">
        "Explorez la Vendée : entre océan et campagne, laissez-vous charmer par
        ses sites emblématiques et sa douceur de vivre."{" "}
      </h3>
      <span className="flex justify-center w-2/4 border-t-2 py-6 md:py-10 border-separator"></span>

      <ul className="grid grid-cols-1 xl:grid-cols-3 gap-4 place-items-center gap-x-28 gap-y-12 mt-2">
        <VisitContext.Provider value={visitContextValue}>
          {activities.map((activity) => (
            <li key={activity.id}>
              <VisitArticle
                id={activity.id}
                title={activity.title}
                description={activity.description}
                content={activity.content}
                url_link={activity.url_link}
                image_path={activity.image_path}
              />
            </li>
          ))}
        </VisitContext.Provider>
      </ul>
    </div>
  );
}

