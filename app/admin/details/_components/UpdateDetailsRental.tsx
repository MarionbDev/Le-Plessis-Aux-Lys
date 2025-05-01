"use client";

import { useEffect, useState } from "react";
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

import { getRentalById, updateRentalDetails } from "@/app/api/rentals/route";
import { ListRentalsDetailsProps } from "@/app/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, Save } from "lucide-react";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import { toast, Toaster } from "sonner";
import { z } from "zod";

const ReactQuill = dynamic(() => import("react-quill-new"), { ssr: false });

const formSchema = z.object({
  title_rental: z.string(),
  capacity_rental: z.string(),
  description_rental: z.string(),
});

type FormSchemaType = z.infer<typeof formSchema>;

export default function UpdateDetailsRental({
  rentalId,
}: {
  rentalId: string;
}) {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title_rental: "",
      capacity_rental: "",
      description_rental: "",
    },
  });

  useEffect(() => {
    const fetchRentalsDetails = async () => {
      try {
        const detailsRentalData = await getRentalById(rentalId);

        if (detailsRentalData) {
          form.reset({
            title_rental: detailsRentalData.title_rental,
            capacity_rental: detailsRentalData.capacity_rental,
            description_rental: detailsRentalData.description_rental,
          });
        }
      } catch (error) {
        console.error("Erreur lors de la récupération de la location :", error);
        setTimeout(
          () => toast.error("Erreur lors de la récupération de la location."),
          0,
        );
      }
    };

    fetchRentalsDetails();
  }, [rentalId, form]);

  const handleUpdateDetailsRentalFormSubmit = async (
    values: FormSchemaType,
  ) => {
    try {
      setIsLoading(true);

      const detailsRentalData: ListRentalsDetailsProps = {
        id: rentalId,
        type: "",
        title_rental: values.title_rental,
        capacity_rental: values.capacity_rental,
        description_rental: values.description_rental,
      };

      await updateRentalDetails(rentalId, detailsRentalData);

      form.reset();
      toast.success("Mise à jour de la description réussie !");
      setTimeout(() => {
        router.push("/admin/details");
      }, 2000);
    } catch (error) {
      console.error("Erreur :", error);
      setTimeout(
        () => toast.error("Erreur lors de la récupération de la location."),
        0,
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-[50vw] min-w-[200px] h-[36rem]">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleUpdateDetailsRentalFormSubmit)}>
          <Card className="h-[36rem] text-text_color">
            <CardHeader>
              <CardTitle>Mise à jour de la description</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col justify-around p-4 h-[32rem]">
              <div className="flex justify-between gap-10">
                <div className="w-full space-y-2">
                  <FormField
                    control={form.control}
                    name="title_rental"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Titre</FormLabel>
                        <FormControl>
                          <Input type="text" required {...field} />
                        </FormControl>
                        <FormMessage className="text-[0.85rem] md:text-md pl-2 text-red-500 italic" />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="capacity_rental"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Capacité</FormLabel>
                        <FormControl>
                          <Input
                            type="text"
                            {...field}
                            placeholder="Nombre de personnes"
                          />
                        </FormControl>
                        <FormMessage className="text-[0.85rem] md:text-md pl-2 text-red-500 italic" />
                      </FormItem>
                    )}
                  />
                </div>
              </div>
              <div>
                <FormField
                  control={form.control}
                  name="description_rental"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Description</FormLabel>
                      <FormControl>
                        <Controller
                          name="description_rental"
                          control={form.control}
                          defaultValue=""
                          render={({ field }) => (
                            <ReactQuill
                              value={field.value}
                              onChange={field.onChange}
                              placeholder="Votre texte..."
                              className="w-full h-[10rem]"
                            />
                          )}
                        />
                      </FormControl>
                      <FormMessage className="text-[0.85rem] md:text-md pl-2 text-red-500 italic" />
                    </FormItem>
                  )}
                />
              </div>
              <div className="flex justify-center">
                <Button
                  role="button"
                  aria-label="ajouter l'article"
                  disabled={isLoading}
                  className="mt-9 w-40 gap-2 bg-yellow/50 hover:bg-yellow hover:text-white text-text_color text-md lg:text-md"
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

