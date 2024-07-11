import { ArticleProps } from "@/app/types";
import supabase from "@/lib/database";

export const getAllArticles = async () => {
  try {
    const { data: allArticles, error } = await supabase
      .from("article")
      .select("*");

    if (error) throw error;
    console.log("article :", allArticles);
    return allArticles;
  } catch (error) {
    console.error("Error fetching all articles", error);
  }
};

export const addArticle = async (
  articleData: ArticleProps,
  imagePath: string,
) => {
  try {
    const { data, error } = await supabase
      .from("article")
      .insert([
        {
          title: articleData.title,
          description: articleData.description,
          content: articleData.content,
          url_link: articleData.url_link,
          image_path: imagePath,
        },
      ])
      .single();

    if (error) {
      throw error;
    }

    console.log("Article added:", data);
    return data as ArticleProps;
  } catch (error) {
    console.error("Error adding article:", error);
    throw error;
  }
};

