"use client";

import { Button } from "@/components/ui/button";
import ButtonItem from "@/components/ui/buttonList/ButtonItem";
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
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import useSession from "@/hooks/useSession";
// import { updateUserPassword } from "@/services/auth.services";
import { Loader2, Save } from "lucide-react";
import { useState } from "react";
// import * as yup from "yup";

// const UpdatePasswordFormSchema = yup.object().shape({
//   password: yup
//     .string("Vous devez renseigner un mot de passe")
//     .matches(
//       /(?=^.{8,}$)((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/,
//       "Le mot de passe doit comporter au moins 8 caractères, une majuscule, une minuscule et un chiffre."
//     )
//     .required("Un mot de passe est requis"),
//   newPassword: yup
//     .string("Vous devez renseigner un mot de passe")
//     .matches(
//       /(?=^.{8,}$)((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/,
//       "Le mot de passe doit comporter au moins 8 caractères, une majuscule, une minuscule et un chiffre."
//     )
//     .required("Un mot de passe est requis"),
//   confirmNewPassword: yup
//     .string("Vous devez renseigner un mot de passe")
//     .matches(
//       /(?=^.{8,}$)((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/,
//       "Le mot de passe doit comporter au moins 8 caractères, une majuscule, une minuscule et un chiffre."
//     )
//     .oneOf(
//       [yup.ref("newPassword"), null],
//       "Les mots de passe doivent correspondre"
//     )
//     .required("Confirmer le mot de passe est requis"),
// });

export function UpdatePasswordButton() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const { user, loading, refreshSession } = useSession();

  //   const form = useForm({ resolver: yupResolver(UpdatePasswordFormSchema) });

  console.log("data user:", user);

  //   const handleSubmit = async (updatePasswordFormValues) => {
  //     try {
  //       setIsLoading(true);
  //       await updateUserPassword(updatePasswordFormValues.newPassword, {
  //         email: user?.email,
  //         password: updatePasswordFormValues.password,
  //       });
  //       setIsDialogOpen(false);
  //     } catch (error) {
  //       console.error(error);
  //     } finally {
  //       setIsLoading(false);
  //     }
  //   };

  const handleOpenChange = (isOpen: boolean) => {
    refreshSession();
    setIsDialogOpen(isOpen);
  };

  const handleOpen = () => setIsDialogOpen(true);

  return (
    <Dialog open={isDialogOpen} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild className="flex justify-start">
        <ButtonItem
          onClick={handleOpen}
          isLoading={loading}
          //   value={user?.email}
          className="shadow-none border-purple/60 border-t-0 dark:hover:bg-purple/60"
        >
          Mot de passe
        </ButtonItem>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] bg-white dark:shadow-inner dark:shadow-purple/60 shadow-purple/40 shadow-md border-none bg-purple/20 backdrop-blur-3xl drop-shadow-lg">
        {/* <Form {...form}> */}
        <form
        //    onSubmit={form.handleSubmit(handleSubmit)}
        >
          <DialogHeader>
            <DialogTitle>Mise à jour du mot de passe</DialogTitle>
            <DialogDescription>
              Mise à jour de votre mot de passe
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <FormField
              // control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Mot de passe initial</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="********"
                      type={showPassword ? "text" : "password"}
                      {...field}
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
              // control={form.control}
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
              // control={form.control}
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
              disabled={isLoading}
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
        {/* </Form> */}
      </DialogContent>
    </Dialog>
  );
}

