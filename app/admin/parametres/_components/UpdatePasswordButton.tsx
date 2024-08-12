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

import { Loader2, Save } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const UpdatePasswordFormSchema = z
  .object({
    // email: z.string().email("L'email doit être valide"),
    password: z
      .string({ message: "Vous devez renseigner un mot de passe" })
      .regex(/(?=.*\d)/)
      .regex(/(?=.*[a-z])/)
      .regex(/(?=.*[A-Z])/),
    newPassword: z
      .string({ message: "Vous devez renseigner un mot de passe" })
      .regex(/(?=.*\d)/)
      .regex(/(?=.*[a-z])/)
      .regex(/(?=.*[A-Z])/),
    confirmNewPassword: z
      .string({ message: "Vous devez renseigner un mot de passe" })
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

  // console.log("data user:", user);

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
      // email: user?.email || "",
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
      setIsDialogOpen(false);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleOpenChange = (isOpen: boolean) => {
    refreshSession();
    setIsDialogOpen(isOpen);
  };

  const handleOpen = () => {
    console.log("Opening Dialog");
    setIsDialogOpen(true);
  };

  return (
    <Dialog open={isDialogOpen} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild className="flex justify-between w-full">
        <Button onClick={handleOpen} className="">
          <div>Mote de passe</div> <div>**********</div>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] bg-white backdrop-blur-3xl drop-shadow-lg">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmitNewPassword)}>
            <DialogHeader>
              <DialogTitle>Mise à jour du mot de passe</DialogTitle>
              <DialogDescription>
                Mise à jour de votre mot de passe
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Mot de passe initial</FormLabel>
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
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div
                className=" cursor-pointer hover:underline"
                onClick={() => setShowPassword(!showPassword)}
              >
                <p className=" text-sm italic">Afficher mot de passe</p>
              </div>
              <FormField
                control={form.control}
                name="newPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nouveau mot de passe</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="********"
                        type={showNewPassword ? "text" : "password"}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div
                className=" cursor-pointer hover:underline"
                onClick={() => setShowNewPassword(!showNewPassword)}
              >
                <p className=" text-sm italic">Afficher le mot de passe</p>
              </div>
              <FormField
                control={form.control}
                name="confirmNewPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Confirmer le nouveau le mot de passe</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="********"
                        type={showConfirmPassword ? "text" : "password"}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div
                className=" cursor-pointer hover:underline"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                <p className=" text-sm italic">Afficher le mot de passe</p>
              </div>
            </div>
            <DialogFooter>
              <Button
                type="submit"
                className="gap-2 dark:hover:bg-pale_pink/20  hover:bg-[#baa8bbc0] dark:shadow-purple/80 dark:shadow-inner dark:bg-purple/20 rounded-xl"
              >
                {isLoading ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <Save size="16" />
                )}
                Sauvegarder
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}

