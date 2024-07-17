import {
  deleteArticle,
  getAllArticles,
  getArticleById,
  updateArticle,
} from "@/app/api/article/route";
import { ArticleProps } from "@/app/types";
import { Button } from "@/components/ui/button";
import VisitContext from "@/hooks/VisitContext";
import { CirclePlus } from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";
import Article from "./Article";

type ListArticlesProps = {
  articles: ArticleProps[];
  setArticles: React.Dispatch<React.SetStateAction<ArticleProps[]>>;
};

export default function ListArticles({
  articles,
  setArticles,
}: ListArticlesProps) {
  // useEffect(() => {
  //   async function fetchAllArticles() {
  //     try {
  //       const fetchedArticles = await getAllArticles();
  //       setArticles(fetchedArticles as ArticleProps[]);
  //     } catch (error) {
  //       console.error("Error fetching articles:", error);
  //     }
  //   }
  //   fetchAllArticles();
  // }, []);

  const handleDeleteArticle = async (id: string) => {
    try {
      await deleteArticle(id);
      const updatedArticles = await getAllArticles();
      setArticles(updatedArticles as ArticleProps[]);
      toast.success("L'activité a été supprimée avec succès !");
    } catch (error) {
      console.error("Error deleting calendar event:", error);
      toast.error("Erreur lors de la suppression de l'article !");
    }
  };

  const handleUpdateArticle = async (id: string): Promise<void> => {
    try {
      const articleData = await getArticleById(id);
      if (!articleData) {
        throw new Error("Article not found");
      }
      await updateArticle(id, articleData);

      const updatedArticles = await getAllArticles();
      setArticles(updatedArticles as ArticleProps[]);
    } catch (error) {
      console.error("Error updating article:", error);
      throw new Error("Failed to update article");
    }
  };

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
    <div className="flex flex-col ">
      <div className="grid grid-cols-4 my-10 ">
        <div className=" grid col-start-4 place-items-end">
          <Link href="?modal=true">
            <Button
              type="button"
              className=" gap-3 lg:gap-4 border border-gray-300  hover:bg-yellow/50  hover:text-white text-text_color text-md lg:text-md  "
            >
              <CirclePlus color="#bbbb57" />
              Ajouter une activité
            </Button>
          </Link>
        </div>
      </div>
      <ul className="grid grid-cols-3 gap-4 place-items-center  gap-x-28  gap-y-12">
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
                handleDelete={handleDeleteArticle}
                handleUpdate={handleUpdateArticle}
              />
            </li>
          ))}
        </VisitContext.Provider>
      </ul>
    </div>
  );
}

