"use client";

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
import { resetPassword } from "@/services/auth.services";
import { zodResolver } from "@hookform/resolvers/zod";
import { Mail } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast, Toaster } from "sonner";
import { z } from "zod";

const formSchema = z.object({
  email: z
    .string()
    .min(1, { message: "Un email est requis" })
    .email({ message: "Adresse email invalide" }),
});

type FormSchemaType = z.infer<typeof formSchema>;

export default function ForgetPassword() {
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
    },
  });

  const handleResetPasswordSubmit = async (values: FormSchemaType) => {
    try {
      setIsLoading(true);
      await resetPassword(values.email);
      form.reset();

      toast.success("Demande de réinitialisation du mot de passe envoyée.", {
        duration: 4000,
      });
      // router.push("/login");
    } catch (error) {
      toast.error(
        "Erreur lors de la réinitialisation. Vous avez dépassé la limite autorisée de réinitialisation de mot de passe. Veuillez attendre un moment avant de réessayer. ",
        { duration: 7000 },
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-4/5 md:w-[40rem] ">
      <div className=" shadow-div rounded-md">
        <Toaster richColors />
        <Card className="rounded-md border-2 border-yellow/50  ">
          <CardHeader>
            <CardTitle className=" md:text-[1.4rem] text-text_color font-semibold">
              Mot de passe oublié
            </CardTitle>
          </CardHeader>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(handleResetPasswordSubmit)}
              className=""
            >
              {" "}
              <CardContent className="">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem className="flex flex-col  gap-2">
                      <div className="flex items-center gap-2">
                        <FormLabel className=" text-md lg:text-lg  text-text_color ">
                          <Mail size={24} color="#bbbb57" />
                        </FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Votre e-mail"
                            type="email"
                            className=" text-md md:text-md md:w-[25rem] "
                            {...field}
                          />
                        </FormControl>
                      </div>
                      <FormMessage className="text-[0.85rem] md:text-md pl-2 text-red-500 italic" />
                    </FormItem>
                  )}
                />
              </CardContent>
              <CardFooter>
                <Button
                  type="submit"
                  role="button"
                  aria-label="envoi de l'email"
                  className="gap-3 lg:gap-4  bg-yellow/50 hover:bg-yellow hover:text-white text-wrap h-20  text-text_color text-md lg:text-sm "
                >
                  Envoyer un mail permettant de changer le mot de passe
                </Button>
              </CardFooter>
            </form>
          </Form>
        </Card>
      </div>
    </div>
  );
}

