"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
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
import { updatePassword } from "@/services/auth.services";
import { zodResolver } from "@hookform/resolvers/zod";

import { CircleCheck, CircleX, Loader2, Save } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast, Toaster } from "sonner";
import { z } from "zod";

const UpdatePasswordFormSchema = z
  .object({
    // email: z.string().email("L'email doit être valide"),
    password: z
      .string()
      .min(8, { message: "Veuillez renseigner un mot de passe correct" })
      .regex(/(?=.*\d)/)
      .regex(/(?=.*[a-z])/)
      .regex(/(?=.*[A-Z])/),
    newPassword: z
      .string()
      .min(8, { message: "Veuillez renseigner un mot de passe correct" })
      .regex(/(?=.*\d)/)
      .regex(/(?=.*[a-z])/)
      .regex(/(?=.*[A-Z])/),
    confirmNewPassword: z
      .string()
      .min(8, { message: "Veuillez renseigner un mot de passe correct" })
      .regex(/(?=.*\d)/)
      .regex(/(?=.*[a-z])/)
      .regex(/(?=.*[A-Z])/),
  })
  .refine((data) => data.newPassword === data.confirmNewPassword, {
    message: "Les mots de passe doivent correspondre",
    path: ["confirmNewPassword"],
  });

type FormSchemaType = z.infer<typeof UpdatePasswordFormSchema>;

export function UpdatePasswordButton() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const { user, loading, refreshSession } = useSession();
  const [passwordValidations, setPasswordValidations] = useState({
    minLength: false,
    hasNumber: false,
    hasLowerCase: false,
    hasUpperCase: false,
  });

  const handlePasswordChange = (password: string) => {
    const validations = {
      minLength: password.length >= 8,
      hasNumber: /(?=.*\d)/.test(password),
      hasLowerCase: /(?=.*[a-z])/.test(password),
      hasUpperCase: /(?=.*[A-Z])/.test(password),
    };

    setPasswordValidations(validations);
  };

  const form = useForm<z.infer<typeof UpdatePasswordFormSchema>>({
    resolver: zodResolver(UpdatePasswordFormSchema),
    defaultValues: {
      password: "",
      newPassword: "",
      confirmNewPassword: "",
    },
  });

  const handleSubmitNewPassword = async (values: FormSchemaType) => {
    if (!user?.email) {
      console.error("L'email de l'utilisateur est manquant.");
      return;
    }
    try {
      setIsLoading(true);
      await updatePassword(values.newPassword, {
        email: user.email,
        password: values.password,
      });
      form.reset();
      setIsDialogOpen(false);
      toast.success("Mise à jour du mot de passe réussie.", { duration: 4000 });
    } catch (error) {
      console.error(error);
      toast.error(
        "Erreur lors du changement de mot de passe. Veuillez rééssayer ",
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

  const handleOpen = () => {
    setIsDialogOpen(true);
  };

  return (
    <Dialog open={isDialogOpen} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild className="flex justify-between w-full">
        <Button
          onClick={handleOpen}
          className="flex flex-col items-start md:flex-row md:justify-between text-[0.9rem]"
        >
          <p>Mote de passe</p>
          <p>**********</p>
        </Button>
      </DialogTrigger>
      <DialogContent
        aria-labelledby="dialog-description"
        className=" w-4/5 sm:min-w-[360px]  bg-white backdrop-blur-3xl drop-shadow-lg text-text_color "
      >
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmitNewPassword)}
            className="flex flex-col justify-between"
          >
            <DialogHeader>
              <DialogTitle className="  text-left">
                Mise à jour du mot de passe
              </DialogTitle>
              <DialogDescription>
                <span id="dialog-description" className="sr-only">
                  Veuillez entrer votre nouveau mot de passe pour mettre à jour
                  vos informations
                </span>
              </DialogDescription>
            </DialogHeader>
            <div className="py-4">
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-text_color ">
                      Mot de passe initial
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="********"
                        type={showPassword ? "text" : "password"}
                        onChange={(e) => {
                          field.onChange(e);
                          handlePasswordChange(e.target.value);
                        }}
                        value={field.value}
                      />
                    </FormControl>
                    <FormMessage className="text-[0.85rem]  pl-2 text-red-500 italic" />
                  </FormItem>
                )}
              />
              <div
                className=" cursor-pointer hover:underline"
                onClick={() => setShowPassword(!showPassword)}
              >
                <p className="  text-[0.80rem]  italic mb-2  pl-1 underline">
                  Afficher mot de passe
                </p>
              </div>
              <FormField
                control={form.control}
                name="newPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-text_color">
                      Nouveau mot de passe
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="********"
                        type={showNewPassword ? "text" : "password"}
                        onChange={(e) => {
                          field.onChange(e);
                          handlePasswordChange(e.target.value);
                        }}
                        value={field.value}
                      />
                    </FormControl>
                    <FormMessage className="text-[0.85rem] pl-2 text-red-500 italic" />
                  </FormItem>
                )}
              />
              <div
                className=" cursor-pointer hover:underline"
                onClick={() => setShowNewPassword(!showNewPassword)}
              >
                <p className=" text-[0.80rem]  italic mb-2  pl-1 underline">
                  Afficher le mot de passe
                </p>
              </div>
              <FormField
                control={form.control}
                name="confirmNewPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-text_color">
                      Confirmer le nouveau le mot de passe
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="********"
                        type={showConfirmPassword ? "text" : "password"}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className="text-[0.85rem] pl-2 text-red-500 italic" />
                  </FormItem>
                )}
              />
              <div
                className=" cursor-pointer hover:underline"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                <p className=" text-[0.80rem]  italic mb-2  pl-1 underline">
                  Afficher le mot de passe
                </p>
              </div>

              <div className="flex items-center mt-4">
                {passwordValidations.minLength ? (
                  <CircleCheck size={16} className="text-green-500 mr-2" />
                ) : (
                  <CircleX size={16} className="text-red-500 mr-2" />
                )}
                <p className="text-xs md:text-sm text-text_color">
                  Minimum 8 caractères
                </p>
              </div>
              <div className="flex items-center mt-1">
                {passwordValidations.hasNumber ? (
                  <CircleCheck size={16} className="text-green-500 mr-2" />
                ) : (
                  <CircleX size={16} className="text-red-500 mr-2" />
                )}
                <p className="text-xs md:text-sm text-text_color">
                  Minimum un chiffre
                </p>
              </div>
              <div className="flex items-center mt-1">
                {passwordValidations.hasLowerCase ? (
                  <CircleCheck size={16} className="text-green-500 mr-2" />
                ) : (
                  <CircleX size={16} className="text-red-500 mr-2" />
                )}
                <p className="text-xs md:text-sm text-text_color">
                  Minimum une minuscule
                </p>
              </div>
              <div className="flex items-center mt-1">
                {passwordValidations.hasUpperCase ? (
                  <CircleCheck size={16} className="text-green-500 mr-2" />
                ) : (
                  <CircleX size={16} className="text-red-500 mr-2" />
                )}
                <p className="text-xs md:text-sm text-text_color">
                  Minimum une majuscule
                </p>
              </div>
            </div>

            <DialogFooter>
              <div className="flex w-full justify-center">
                <Button
                  type="submit"
                  className="gap-2  bg-yellow/50 hover:bg-yellow hover:text-white text-text_color text-md lg:text-md w-[12rem] text-[0.9rem] "
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

