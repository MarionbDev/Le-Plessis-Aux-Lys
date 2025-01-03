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
import { Loader2, Mail, Save } from "lucide-react";
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

      toast.success("Un lien de réinitialisation vous a été envoyé.", {
        duration: 4000,
      });
    } catch (error: any) {
      const errorMessage =
        error.message === "Email non enregistré."
          ? "L'adresse email saisie n'est pas reconnue. Veuillez vérifier l'adresse saisie."
          : "Erreur lors de la réinitialisation. Vous avez dépassé la limite autorisée de réinitialisation de mot de passe. Veuillez attendre un moment avant de réessayer.";

      toast.error(errorMessage, { duration: 7000 });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-4/5 md:w-[30rem] ">
      <Card className="rounded-md border-2   ">
        <CardHeader>
          <CardTitle className=" md:text-[1.2rem] text-text_color font-semibold">
            Mot de passe oublié
          </CardTitle>
        </CardHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleResetPasswordSubmit)}>
            <CardContent>
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem className="flex flex-col ">
                    <div className="flex items-center gap-2">
                      <FormLabel className=" text-md lg:text-lg  text-text_color ">
                        <Mail size={20} color="#bbbb57" />
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Votre e-mail"
                          type="email"
                          className=" text-[0.85rem] md:w-[25rem] "
                          {...field}
                        />
                      </FormControl>
                    </div>
                    <FormMessage className="text-[0.85rem]  pl-8 text-red-500 italic" />
                  </FormItem>
                )}
              />
            </CardContent>
            <CardFooter>
              <Button
                type="submit"
                role="button"
                disabled={isLoading}
                aria-label="envoi de l'email"
                className="gap-3 lg:gap-4 h-auto  bg-yellow/50 hover:bg-yellow hover:text-white text-wrap  text-text_color text-[0.9rem] "
              >
                {isLoading ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <Save size="16" />
                )}
                Envoyer
              </Button>
            </CardFooter>
          </form>
        </Form>
      </Card>

      <Toaster />
    </div>
  );
}

