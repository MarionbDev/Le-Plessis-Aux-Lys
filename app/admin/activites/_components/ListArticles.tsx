import { getAllArticles } from "@/app/api/article/route";
import { ArticleProps } from "@/app/types";
import { useEffect, useState } from "react";
import AddArticle from "./AddArticle";
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

  return (
    <>
      <h2>A visiter dans la région</h2>
      <AddArticle />
      <ul>
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
      </ul>
    </>
  );
}

