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
import useSession from "@/hooks/useSession";
import { updatePasswordWithToken } from "@/services/auth.services";
import { zodResolver } from "@hookform/resolvers/zod";

import { CircleCheck, CircleX, Loader2, Save } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast, Toaster } from "sonner";
import { z } from "zod";

const UpdatePasswordFormSchema = z
  .object({
    // email: z.string().email("L'email doit être valide"),

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

export function ResetPassword() {
  const [isLoading, setIsLoading] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const { user, loading, refreshSession } = useSession();
  const [passwordValidations, setPasswordValidations] = useState({
    minLength: false,
    hasNumber: false,
    hasLowerCase: false,
    hasUpperCase: false,
  });
  const [token, setToken] = useState<string | null>(null);

  const router = useRouter();

  useEffect(() => {
    const query = new URLSearchParams(window.location.search);
    const tokenFromURL = query.get("access_token");
    setToken(tokenFromURL);
  }, []);

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
      newPassword: "",
      confirmNewPassword: "",
    },
  });

  const handleSubmitNewPassword = async (values: FormSchemaType) => {
    if (!token) {
      console.error("Le token d'accès est manquant.");
      toast.error("Vous n'êtes pas autorisé à réinitialiser le mot de passe.");

      return;
    }

    try {
      setIsLoading(true);

      await updatePasswordWithToken(token, values.newPassword);
      form.reset();

      toast.success("Initialisation du mot de passe réussie.", {
        duration: 4000,
      });
      router.push("/login");
    } catch (error) {
      console.error(error);
      toast.error(
        "Erreur lors de la réinitialisation du mot de passe. Veuillez rééssayer ",
        { duration: 7000 },
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="font-text flex justify-center items-center h-screen pt-20  ">
      <Toaster richColors />
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleSubmitNewPassword)}
          className=" shadow-div rounded-md"
        >
          <Card className=" rounded-md border-2 border-yellow/50 bg-white backdrop-blur-3xl drop-shadow-lg flex flex-col justify-center px-10 ">
            <CardContent className=" ">
              <CardHeader className="px-0">
                <CardTitle className=" md:text-[1.4rem] text-text_color font-semibold ">
                  Réinitialisation du mot de passe
                </CardTitle>
              </CardHeader>
              <div className="flex gap-12  py-4">
                <div>
                  <FormField
                    control={form.control}
                    name="newPassword"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-md  text-text_color ">
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
                            className="w-64 text-md md:text-md"
                          />
                        </FormControl>
                        <FormMessage className="text-[0.85rem] md:text-md pl-2 text-red-500 italic" />
                      </FormItem>
                    )}
                  />
                  <div
                    className=" cursor-pointer hover:underline"
                    onClick={() => setShowNewPassword(!showNewPassword)}
                  >
                    <p className=" text-[13px] pl-2 md:pl-0 mt-1 md:text-[0.8rem] underline  italic text-text_color ">
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
                <div>
                  <FormField
                    control={form.control}
                    name="confirmNewPassword"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-md  text-text_color ">
                          Confirmer le nouveau le mot de passe
                        </FormLabel>
                        <FormControl>
                          <Input
                            placeholder="********"
                            type={showConfirmPassword ? "text" : "password"}
                            {...field}
                            className="w-64 text-md md:text-md"
                          />
                        </FormControl>
                        <FormMessage className="text-[0.85rem] md:text-md pl-2 text-red-500 italic" />
                      </FormItem>
                    )}
                  />
                  <div
                    className=" cursor-pointer hover:underline"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  >
                    <p className=" text-[13px] pl-2 md:pl-0 mt-1 md:text-[0.8rem] underline  italic text-text_color ">
                      Afficher le mot de passe
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-center items-end">
              <Button
                type="submit"
                role="button"
                aria-label="réinitialisation du mot de passe"
                disabled={isLoading}
                className="gap-3 lg:gap-4  bg-yellow/50 hover:bg-yellow hover:text-white text-text_color text-md lg:text-md w-[12rem] "
              >
                {isLoading ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <Save size="16" />
                )}
                Enregistrer
              </Button>
            </CardFooter>
          </Card>
        </form>
      </Form>
    </div>
  );
}

