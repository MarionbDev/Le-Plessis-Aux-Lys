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
import { z } from "zod";

const UpdateEmailFormSchema = z.object({
  email: z.string().email(),
  password: z
    .string({ message: "Vous devez renseigner un mot de passe" })
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

  const form = useForm<z.infer<typeof UpdateEmailFormSchema>>({
    resolver: zodResolver(UpdateEmailFormSchema),
    defaultValues: {
      email: user?.email,
      password: "",
    },
  });

  console.log("data user:", user);

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

  const handleOpen = () => setIsDialogOpen(true);

  return (
    <Dialog open={isDialogOpen} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild className="flex justify-between w-full">
        <Button onClick={handleOpen} className=" ">
          <div>Email</div> <div>{`${user?.email}`}</div>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] bg-white dark:shadow-inner  shadow-md border-none  backdrop-blur-3xl drop-shadow-lg ">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)}>
            <DialogHeader>
              <DialogTitle>Mise à jour de l'email</DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-4">
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
                  <FormItem>
                    <FormLabel>Mot de passe</FormLabel>
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
                <p className=" text-sm italic">Afficher le mot de passe</p>
              </div>
            </div>
            <DialogFooter>
              <Button
                type="submit"
                disabled={isLoading}
                className="gap-2   hover:bg-[#baa8bbc0]  rounded-xl"
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

