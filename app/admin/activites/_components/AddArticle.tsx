"use client";

import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import "react-quill/dist/quill.snow.css";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

// import { Loader2, LogIn } from "lucide-react";

// import ReactQuill from "react-quill";
import { postArticle } from "@/app/api/article/route";
import { zodResolver } from "@hookform/resolvers/zod";
import dynamic from "next/dynamic";
import { toast, Toaster } from "sonner";
import { z } from "zod";

const ReactQuill = dynamic(() => import("react-quill"), {
  ssr: false,
});

const formSchema = z.object({
  title: z.string(),
  description: z.string(),
  content: z.string(),
  url_link: z.string(),
  image_path: z.string(),
});

type FormSchemaType = z.infer<typeof formSchema>;

export default function AddArticle() {
  const [isLoading, setIsLoading] = useState(false);
  const [uploadedFilePath, setUploadedFilePath] = useState<string>("");

  // const router = useRouter();

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

  // const handleLoginFormSubmit = async (values: FormSchemaType) => {
  //   try {
  //     setIsLoading(true);

  //     // Créer l'objet articleData avec tous les champs
  //     const articleData = {
  //       title: values.title,
  //       description: values.description,
  //       content: values.content,
  //       url_link: values.url_link,
  //       image_path: uploadedFilePath,
  //     };

  //     if (loading || !accessToken) {
  //       toast.error("Utilisateur non authentifié");
  //       return;
  //     }

  //     const response = await fetch("/api/article", {
  //       method: "POST",
  //       headers: {
  //         Authorization: `Bearer ${accessToken}`,
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify(articleData), // Envoyez articleData ici
  //     });

  //     const result = await response.json();
  //     if (response.ok) {
  //       toast.success("Ajout de l'article réussi !");
  //       form.reset();
  //       setUploadedFilePath("");
  //     } else {
  //       toast.error(`Erreur: ${result.message}`);
  //     }
  //   } catch (error) {
  //     console.error("Error:", error);
  //     toast.error("Erreur lors de l'ajout de l'article.");
  //   } finally {
  //     setIsLoading(false);
  //   }
  // };

  const handleLoginFormSubmit = async (values: FormSchemaType) => {
    try {
      setIsLoading(true);

      const articleData = {
        title: values.title,
        description: values.description,
        content: values.content,
        url_link: values.url_link,
        image_path: uploadedFilePath,
      };

      // Appelez directement postArticle
      await postArticle(articleData);

      toast.success("Ajout de l'article réussi !");
      form.reset();
      setUploadedFilePath("");
    } catch (error) {
      console.error("Erreur :", error);
      toast.error("Erreur lors de l'ajout de l'article.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleLoginFormSubmit)}>
          <Card>
            <CardHeader>
              <CardTitle>Formulaire pour ajouter un article</CardTitle>
              {/* <CardDescription></CardDescription> */}
            </CardHeader>
            <CardContent className="flex flex-col gap-4">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Titre de l&apos;article</FormLabel>
                    <FormControl>
                      <Input type="text" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>description</FormLabel>
                    <FormControl>
                      <Input type="text" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="content"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Texte</FormLabel>
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
                            className="w-[30rem] h-[10rem]"
                          />
                        )}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="url_link"
                render={({ field }) => (
                  <FormItem className="mt-10 w-40">
                    <FormLabel>URL</FormLabel>
                    <FormControl>
                      <Input type="text" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="image_path"
                render={({ field }) => (
                  <FormItem className="mt-10 w-56">
                    <FormLabel>Sélectionner images</FormLabel>
                    <FormControl>
                      <Input
                        type="file"
                        id="upload"
                        accept="image/*"
                        onChange={async (e) => {
                          if (e.target.files) {
                            const formData = new FormData();
                            Object.values(e.target.files).forEach((file) => {
                              formData.append("file", file);
                            });

                            const response = await fetch(
                              "/api/uploadArticlePhoto",
                              {
                                method: "POST",
                                body: formData,
                              },
                            );

                            const result = await response.json();
                            if (result.success) {
                              alert("Upload ok : " + result.name);
                              setUploadedFilePath(result.image_path);
                            } else {
                              alert("Upload failed");
                            }
                          }
                        }}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>
            <CardFooter className="justify-center">
              <Button
                role="button"
                aria-label="ajouter l'article"
                disabled={isLoading}
                className="gap-3 bg-slate-400 "
              >
                {/* {isLoading ? (
                <Loader2 className="animate-spin" size="16" />
              ) : (
                <LogIn size="16" />
              )} */}
                Ajouter l&apos;article
              </Button>
            </CardFooter>
          </Card>
        </form>
      </Form>
      <Toaster />
    </>
  );
}

