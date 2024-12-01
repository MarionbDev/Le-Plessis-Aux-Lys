"use client";

import VisitArticle from "@/app/_components/VisitArticle";
import { getAllArticles } from "@/app/api/article/route";
import VisitContext from "@/hooks/VisitContext";
import { Loader } from "lucide-react";
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
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAllActivities = async () => {
      try {
        const fetchedActivities = await getAllArticles();
        setActivities(fetchedActivities as PropType[]);
      } catch (error) {
        console.error("Error fetching activities :", error);
      } finally {
        setLoading(false);
      }
    };
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

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen ">
        <Loader size={50} className="animate-spin" />
      </div>
    );
  }

  if (error) {
    return <div>Une erreur s'est produite : {error}</div>;
  }

  return (
    <div className="py-10 pt-36 md:pt-44 px-6 xl:px-20 flex flex-col items-center mb-32  min-h-screen  ">
      <h3 className="font-prata text-2xl px-6 max-w-[50rem] text-center mb-16 text-text_color ">
        "Explorez la Vendée : entre océan et campagne, laissez-vous charmer par
        ses sites emblématiques et sa douceur de vivre."{" "}
      </h3>
      <span className="flex justify-center w-2/4 md:w-1/4 border-t-2 py-6 md:py-10 border-separator"></span>

      <ul className="flex flex-col gap-20 xl:gap-32">
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

