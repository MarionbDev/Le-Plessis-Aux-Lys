import { getAllArticles } from "@/app/api/article/route";
import { ArticleProps } from "@/app/types";
import VisitContext from "@/hooks/VisitContext";
import Link from "next/link";
import { useEffect, useState } from "react";
import Article from "./Article";

export default function ListArticles() {
  const [articles, setArticles] = useState<ArticleProps[]>([]);

  useEffect(() => {
    async function fetchAllArticles() {
      try {
        const fetchedArticles = await getAllArticles();
        console.log("Articles fetched:", fetchedArticles);
        setArticles(fetchedArticles as ArticleProps[]);
      } catch (error) {
        console.error("Error fetching articles:", error);
      }
    }
    fetchAllArticles();
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
    <div className="">
      <Link href="?modal=true">
        <button type="button" className="bg-blue-500 text-white p-2">
          Open Modal
        </button>
      </Link>
      <ul className="grid grid-cols-3 gap-4 place-items-center gap-x-28 gap-y-12">
        <VisitContext.Provider value={visitContextValue}>
          {articles.map((article) => (
            <li key={article.id}>
              <Article
                id={article.id}
                title={article.title}
                description={article.description}
                content={article.content}
                url_link={article.url_link}
                image_path={article.image_path}
              />
            </li>
          ))}
        </VisitContext.Provider>
      </ul>
    </div>
  );
}

