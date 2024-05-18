"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
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
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader, LogIn } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const formSchema = z.object({
  email: z
    .string()
    .min(1, { message: "Un email est requis" })
    .email({ message: "Adresse email invalide" }),
  password: z
    .string()
    .regex(
      /(?=^.{8,}$)((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/,
      {
        message:
          "  Le mot de passe doit comporter au moins 8 caractères, une majuscule, une minuscule et un chiffre.",
      },
    ),
});

export default function UserLoginForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-8 flex justify-center items-center h-screen"
      >
        <Card className=" md:w-[50%] xl:w-[30%] ">
          <CardHeader>
            <CardTitle>Connexion</CardTitle>
            <CardDescription>
              Se connecter à l'espace d'administration
            </CardDescription>
          </CardHeader>
          <CardContent>
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="example@example.com"
                      type="email"
                      {...field}
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem className=" mt-4">
                  <FormLabel>Mot de passe</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="*********"
                      type={showPassword ? "text" : "password"}
                      autoComplete="current-password"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div
              onClick={() => setShowPassword(!showPassword)}
              className=" cursor-pointer hover:underline"
            >
              <p className=" text-[13px] mt-1 md:text-sm italic text-bk_txt">
                Afficher le mot de passe
              </p>
            </div>
          </CardContent>
          <CardFooter className="flex justify-center">
            <Button
              role="button"
              aria-label="se connecter"
              disabled={isLoading}
              className="gap-3  bg-black text-white hover:bg-slate-700"
            >
              {isLoading ? (
                <Loader className="animate-spin" size="16" />
              ) : (
                <LogIn size="16" />
              )}
              Se connecter
            </Button>
          </CardFooter>
        </Card>
      </form>
    </Form>
  );
}

