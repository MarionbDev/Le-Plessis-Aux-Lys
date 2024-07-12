import { ArticleProps } from "@/app/types";
import supabase from "@/lib/database";

type ArticleData = {
  title: string;
  description: string;
  content: string;
  url_link: string;
  image_path: string;
};

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

export const addArticle = async (articleData: ArticleProps) => {
  try {
    const { data, error } = await supabase
      .from("article")
      .insert([articleData])
      .single();

    if (error) {
      console.error("Erreur lors de l'insertion dans Supabase :", error);
      throw error; // Propagez l'erreur
    }

    return data as ArticleProps;
  } catch (error) {
    console.error("Error adding article:", error);
    throw error;
  }
};

// Gestion de la requête POST
export const postArticle = async (articleData: ArticleData) => {
  const { data, error } = await supabase.from("article").insert([articleData]);

  if (error) {
    throw new Error(error.message);
  }

  return data;
};

