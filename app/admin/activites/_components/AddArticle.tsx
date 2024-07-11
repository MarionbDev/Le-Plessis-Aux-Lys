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
import { addArticle } from "@/app/api/article/route";
import { ArticleProps, onUploadComplete } from "@/app/types";
import { zodResolver } from "@hookform/resolvers/zod";
import dynamic from "next/dynamic";
import { Toaster, toast } from "sonner";
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

export type AddArticleProps = {
  onUploadComplete: (uploadedFileData: onUploadComplete) => void;
};

export default function AddArticle({ onUploadComplete }: AddArticleProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [uploadedFilePath, setUploadedFilePath] = useState<string>("");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

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

  const handleLoginFormSubmit = async (values: FormSchemaType) => {
    try {
      setIsLoading(true);

      // Exemple de gestion d'image après téléchargement avec UploadFileAdmin
      const uploadedFileData = await handleImageUpload(); // Fonction à implémenter pour gérer le téléchargement de l'image

      const articleData: ArticleProps = {
        title: values.title,
        description: values.description,
        content: values.content,
        url_link: values.url_link,
        image_path: values.image_path, // Chemin de l'image téléchargée
      };

      await addArticle(articleData); // Envoi de l'article avec le chemin de l'image

      console.log("articledata:", articleData);
      toast.success("Ajout de l'article réussi !");
    } catch (error: any) {
      console.error(error);
      toast.error(error.message);
      if (error.error_description) {
        toast.error(error.description);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const file = event.target.files?.[0];
    if (file) {
      try {
        setIsLoading(true);
        const uploadedFilePath = await uploadFile(file); // Téléchargez le fichier vers votre système de stockage
        form.setValue("image_path", uploadedFilePath); // Mettez à jour le champ image_path dans le formulaire
      } catch (error) {
        console.error("Erreur lors du téléchargement du fichier :", error);
        toast.error("Erreur lors du téléchargement du fichier.");
      } finally {
        setIsLoading(false);
      }
    }
  };

  const uploadFile = async (file: File): Promise<string> => {
    // Ici, vous devrez implémenter la logique de téléchargement vers votre système de stockage (par exemple, Supabase Storage)
    // C'est un exemple mock pour simuler le téléchargement
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const uploadedFilePath = `/chemin/vers/l/image/${file.name}`; // Simule le chemin relatif du fichier téléchargé
        resolve(uploadedFilePath);
      }, 2000); // Simule un délai de 2 secondes pour le téléchargement
    });
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
                        // onChange={handleFileChange}
                        {...field}
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

