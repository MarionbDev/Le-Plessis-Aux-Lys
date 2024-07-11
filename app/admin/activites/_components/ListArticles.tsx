import { getAllArticles } from "@/app/api/article/route";
import { getImagesFromBucket } from "@/app/api/uploadFile/route";
import { ArticleProps, onUploadComplete } from "@/app/types";
import { useEffect, useState } from "react";
import AddArticle from "./AddArticle";
import Article from "./Article";

export default function ListArticles() {
  const [articles, setArticles] = useState<ArticleProps[]>([]);
  const [articlesImages, setArticlesImages] = useState<{
    [key: string]: string[];
  }>({});

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

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const articleUrls = await getImagesFromBucket("articles_images");
        console.log("Article images :", articleUrls);

        const imagesByArticleId = articleUrls.reduce(
          (acc, url) => {
            const articleId = extractArticleId(url);
            if (articleId) {
              acc[articleId] = acc[articleId]
                ? [...acc[articleId], url]
                : [url];
            }
            return acc;
          },
          {} as { [key: string]: string[] },
        );

        console.log("Article images grouped by ID :", imagesByArticleId);

        setArticlesImages(imagesByArticleId);
      } catch (error) {
        console.error("Error fetching images:", error);
      }
    };

    fetchImages();
  }, [articles]);

  const extractArticleId = (url: string): string | null => {
    const parts = url.split("/");
    if (parts.length >= 2) {
      return parts[0];
    }
    return null;
  };

  const handleUploadComplete = (uploadedFileData: onUploadComplete) => {
    const articleId: string = uploadedFileData.id;

    setArticlesImages((prevImages) => ({
      ...prevImages,
      [articleId]: [
        ...(prevImages[articleId] || []),
        uploadedFileData.fullPath,
      ],
    }));
  };

  return (
    <>
      <h2>A visiter dans la région</h2>
      <AddArticle
        onUploadComplete={handleUploadComplete}
        bucket="articles_images"
      />
      <ul>
        {articles.map((article) => (
          <li key={article.id}>
            <Article
              id={article.id}
              title={article.title}
              description={article.description}
              content={article.content}
              url_link={article.url_link}
              path={
                articlesImages[article.id]?.find((img) =>
                  img.includes(article.id),
                ) || null
              }
              onUploadComplete={handleUploadComplete}
              bucket="articles_images"
            />
          </li>
        ))}
      </ul>
    </>
  );
}

