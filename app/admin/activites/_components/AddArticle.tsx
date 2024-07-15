"use client";

import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import "react-quill/dist/quill.snow.css";

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

// import { Loader2, LogIn } from "lucide-react";

// import ReactQuill from "react-quill";
import { postArticle } from "@/app/api/article/route";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import { toast, Toaster } from "sonner";
import { z } from "zod";

const ReactQuill = dynamic(() => import("react-quill"), {
  ssr: false,
});

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

export default function AddArticle() {
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

      form.reset();
      setUploadedFilePath("");
      toast.success("Ajout de l'activité en-cours !");
      setTimeout(() => {
        router.push("/admin/activites");
      }, 2000);
    } catch (error) {
      console.error("Erreur :", error);
      toast.error("Erreur lors de l'ajout de l'article.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const formData = new FormData();
      Array.from(e.target.files).forEach((file) => {
        formData.append("file", file);
      });

      const response = await fetch("/api/uploadArticlePhoto", {
        method: "POST",
        body: formData,
      });

      const result = await response.json();
      if (result.success) {
        setUploadedFilePath(result.image_path);
      } else {
        alert("Upload failed");
      }
    }
  };

  return (
    <div className=" w-[50vw] min-w-[200px]  h-[36rem]   ">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleLoginFormSubmit)}>
          <Card className=" h-[36rem] text-text_color   ">
            <CardHeader>
              <CardTitle>Ajouter une activité</CardTitle>
              {/* <CardDescription></CardDescription> */}
            </CardHeader>
            <CardContent className="flex flex-col justify-around p-4 h-[32rem] ">
              <div className="flex justify-between gap-10">
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
                        <FormMessage className="text-[0.85rem] md:text-md pl-2 text-red-500 italic" />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Sous-titre</FormLabel>
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
                          <FormLabel>Lien du site</FormLabel>
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
                          <FormLabel>Sélectionner une photo</FormLabel>
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
                      <FormMessage className="text-[0.85rem] md:text-md pl-2 text-red-500 italic" />
                    </FormItem>
                  )}
                />{" "}
              </div>
              <div className="flex justify-center">
                <Button
                  role="button"
                  aria-label="ajouter l'article"
                  disabled={isLoading}
                  className=" mt-9 w-40  bg-yellow/50 hover:bg-yellow hover:text-white text-text_color text-md lg:text-md  "
                >
                  {isLoading ? (
                    <Loader2 className="animate-spin" size="16" />
                  ) : null}
                  Ajouter l&apos;article
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

