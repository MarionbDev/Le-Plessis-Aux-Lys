"use client";

import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import "react-quill/dist/quill.snow.css";

import { getArticleById, updateArticle } from "@/app/api/article/route";
import { ArticleProps } from "@/app/types";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import supabase from "@/lib/database";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, Save } from "lucide-react";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import { toast, Toaster } from "sonner";
import { z } from "zod";

const ReactQuill = dynamic(() => import("react-quill-new"), { ssr: false });

const formSchema = z.object({
  title: z.string().min(1, { message: "Veuillez renseigner un titre !" }),
  description: z.string(),
  content: z
    .string()
    .min(1, { message: "Veuillez renseigner une description !" }),
  url_link: z.string(),
  image_path: z.string(),
});

type FormSchemaType = z.infer<typeof formSchema>;

export default function UpdateArticle({ articleId }: { articleId: string }) {
  const [isLoading, setIsLoading] = useState(false);
  const [uploadedFilePath, setUploadedFilePath] = useState<string>("");

  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: "",
      content: "",
      url_link: "",
      image_path: "",
    },
  });

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        const articleData = await getArticleById(articleId);
        if (articleData) {
          form.reset({
            title: articleData.title,
            description: articleData.description,
            content: articleData.content,
            url_link: articleData.url_link,
            image_path: articleData.image_path,
          });
          setUploadedFilePath(articleData.image_path);
        }
      } catch (error) {
        console.error("Erreur lors de la récupération de l'article :", error);
        toast.error("Erreur lors de la récupération de l'article.");
      }
    };

    fetchArticle();
  }, [articleId, form]);

  const handleUpdateArticleFormSubmit = async (values: FormSchemaType) => {
    try {
      setIsLoading(true);

      const articleData: Omit<ArticleProps, "id"> = {
        title: values.title,
        description: values.description,
        content: values.content,
        url_link: values.url_link,
        image_path: uploadedFilePath,
      };

      await updateArticle(articleId, articleData);

      form.reset();
      setUploadedFilePath("");
      toast.success("Mise à jour de l'activité réussie !");
      setTimeout(() => {
        router.push("/admin/activites");
      }, 2000);
    } catch (error) {
      console.error("Erreur :", error);
      toast.error("Erreur lors de la mise à jour de l'activité.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const file = e.target.files[0];
      const fileName = `${Date.now()}-${file.name}`;

      // Télécharge le fichier sur Supabase Storage
      const { data, error } = await supabase.storage
        .from("uploadImageArticle")
        .upload(fileName, file);

      if (error) {
        console.error("Erreur lors du téléchargement de l'image :", error);
        toast.error("Erreur lors de l'upload de l'image.");
        return;
      }

      // Obtenenir l'URL publique du fichier
      const { data: urlData } = supabase.storage
        .from("uploadImageArticle")
        .getPublicUrl(fileName);

      if (!urlData) {
        console.error("Erreur lors de l'obtention de l'URL publique :");
        toast.error("Erreur lors de l'obtention de l'URL de l'image.");
        return;
      }

      setUploadedFilePath(urlData.publicUrl);

      const dataImage = data;

      const promise = () =>
        new Promise((resolve) =>
          setTimeout(() => {
            resolve({ name: "Sonner" });
          }, 2000),
        );
      toast.promise(promise(), {
        loading: "Téléchargement de l'image en-cours...",
        success: (data) => {
          return `Téléchargement de l'image réussi ! ${dataImage.path} `;
        },
        error: "Error",
      });
    }
  };

  return (
    <div className="w-[75vw] lg:w-[50vw] min-w-[200px]  h-[54rem]  xl:h-[36rem]   ">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleUpdateArticleFormSubmit)}>
          <Card className=" h-[36rem] text-text_color">
            <CardHeader>
              <CardTitle>Modifier l'activité</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col justify-around p-4 h-[48rem] xl:h-[32rem]">
              <div className="flex flex-col xl:flex-row justify-between gap-10">
                <div className=" w-full space-y-2">
                  <FormField
                    control={form.control}
                    name="title"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Titre </FormLabel>
                        <FormControl>
                          <Input type="text" {...field} />
                        </FormControl>
                        <FormMessage className="text-[0.85rem]  pl-2 text-red-500 italic" />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-[0.9rem]">
                          Sous-titre
                        </FormLabel>
                        <FormControl>
                          <Input type="text" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />{" "}
                </div>

                <div className="flex flex-col justify-between ">
                  <div className=" flex  flex-col justify-start space-y-2 w-[20rem] ">
                    <FormField
                      control={form.control}
                      name="url_link"
                      render={({ field }) => (
                        <FormItem className="">
                          <FormLabel className="text-[0.9rem]">
                            Lien du site
                          </FormLabel>
                          <FormControl>
                            <Input type="link" {...field} className="" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="image_path"
                      render={({ field }) => (
                        <FormItem className=" w-[20rem]">
                          <FormLabel className="text-[0.9rem]">
                            Sélectionner une photo
                          </FormLabel>
                          <FormControl>
                            <Input
                              type="file"
                              id="upload"
                              accept="image/*"
                              onChange={handleImageUpload}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>
              </div>
              <div>
                <FormField
                  control={form.control}
                  name="content"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Description</FormLabel>
                      <FormControl>
                        <Controller
                          name="content"
                          control={form.control}
                          defaultValue=""
                          render={({ field }) => (
                            <ReactQuill
                              value={field.value}
                              onChange={field.onChange}
                              placeholder="Écrivez quelque chose..."
                              className="w-full h-[10rem]"
                            />
                          )}
                        />
                      </FormControl>
                      <FormMessage className="text-[0.85rem]  pl-2 text-red-500 italic" />
                    </FormItem>
                  )}
                />{" "}
              </div>
              <div className="flex justify-center mt-12 sm:mt-6">
                <Button
                  role="button"
                  aria-label="ajouter l'article"
                  disabled={isLoading}
                  className=" mt-9 w-40 gap-2 bg-yellow/50 hover:bg-yellow hover:text-white text-text_color text-[0.9rem]  "
                >
                  {isLoading ? (
                    <Loader2 className="animate-spin" size="16" />
                  ) : (
                    <Save size="16" />
                  )}
                  Enregistrer
                </Button>
              </div>
            </CardContent>
          </Card>
        </form>
      </Form>
      <Toaster />
    </div>
  );
}

