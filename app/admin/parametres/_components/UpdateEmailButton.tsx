"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import useSession from "@/hooks/useSession";
import { updateEmail } from "@/services/auth.services";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, Save } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast, Toaster } from "sonner";
import { z } from "zod";

const UpdateEmailFormSchema = z.object({
  email: z
    .string({ message: "Vous devez renseigner un email" })
    .email({ message: "Email non valide" }),
  password: z
    .string()
    .min(8, { message: "Vous devez renseigner un mot de passe" })
    .regex(/(?=.*\d)/)
    .regex(/(?=.*[a-z])/)
    .regex(/(?=.*[A-Z])/),
});

type FormSchemaType = z.infer<typeof UpdateEmailFormSchema>;

export function UpdateEmailButton() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const { user, loading, refreshSession } = useSession();

  // const isAdmin = user?.aud === "authenticated";

  const form = useForm<z.infer<typeof UpdateEmailFormSchema>>({
    resolver: zodResolver(UpdateEmailFormSchema),
    defaultValues: {
      email: user?.email ?? "",
      password: "",
    },
  });

  const handleSubmit = async (values: FormSchemaType) => {
    if (!user?.email) {
      console.error("L'email de l'utilisateur est manquant");
      return;
    }
    try {
      setIsLoading(true);
      await updateEmail(values.email, {
        email: user.email,
        password: values.password,
      });
      form.reset();
      setIsDialogOpen(false);
      toast.success(
        "Un email de confirmation a été envoyé à votre nouvelle adresse. Veuillez suivre les instructions dans cet email pour confirmer le changement.",
        { duration: 6000 },
      );
    } catch (error) {
      console.error(error);
      toast.error(
        "Erreur lors du changement d'adresse email. Vous avez dépassé la limite autorisée des changements de paramètres. Veuillez attendre un moment avant de réessayer. ",
        { duration: 7000 },
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleOpenChange = (isOpen: boolean) => {
    refreshSession();
    setIsDialogOpen(isOpen);
  };

  const handleOpen = () => setIsDialogOpen(true);

  return (
    <Dialog open={isDialogOpen} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild className="flex justify-between w-full">
        <Button
          onClick={handleOpen}
          className="flex flex-col items-start md:flex-row md:justify-between text-[0.9rem]"
        >
          <p>Email</p>
          <p> {`${user?.email}`}</p>
        </Button>
      </DialogTrigger>
      <DialogContent className=" w-4/5 sm:max-w-[425px] bg-white dark:shadow-inner  shadow-md border-none  backdrop-blur-3xl drop-shadow-lg ">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)}>
            <DialogHeader>
              <DialogTitle className=" text-text_color font-semibold">
                Mise à jour de l'email
              </DialogTitle>
            </DialogHeader>
            <div className=" py-4  ">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem className="text-text_color mt-6  ">
                    <FormLabel className="text-text_color    ">
                      Nouvel Email
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="example@example.com"
                        type="email"
                        {...field}
                        className="text-[0.85rem]"
                      />
                    </FormControl>
                    <FormMessage className="text-[0.85rem]  pl-2 text-red-500 italic" />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem className="text-text_color mt-4  ">
                    <FormLabel className="text-text_color ">
                      Mot de passe
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="********"
                        type={showPassword ? "text" : "password"}
                        {...field}
                        className="text-[0.85rem]"
                      />
                    </FormControl>
                    <FormMessage className="text-[0.85rem]  pl-2 text-red-500 italic " />
                  </FormItem>
                )}
              />
              <div
                className=" cursor-pointer underline"
                onClick={() => setShowPassword(!showPassword)}
              >
                <p className=" text-text_color text-[0.80rem] italic mb-2 mt-1 pl-1 underline">
                  Afficher le mot de passe
                </p>
              </div>
            </div>
            <DialogFooter className="">
              <div className="flex justify-center w-full mt-6">
                <Button
                  type="submit"
                  disabled={isLoading}
                  className="gap-2   bg-yellow/50 hover:bg-yellow hover:text-white text-text_color text-[0.9rem] w-[12rem] "
                >
                  {isLoading ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <Save size="16" />
                  )}
                  Enregistrer
                </Button>
              </div>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
      <Toaster />
    </Dialog>
  );
}

