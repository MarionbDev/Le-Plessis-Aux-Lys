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
import { loginUser } from "@/services/auth.services";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader, LogIn, Milestone } from "lucide-react";
import { useRouter } from "next/navigation";
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

type FormSchemaType = z.infer<typeof formSchema>;

export default function UserLoginForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const handleLoginFormSubmit = async (values: FormSchemaType) => {
    try {
      setIsLoading(true);
      await loginUser(values);
      router.push("/admin");
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleClickHome = () => {
    if (router) {
      router.push("/");
    }
  };

  return (
    <div className=" flex flex-col justify-center  gap-24 -mt-16  h-screen">
      <Button
        type="button"
        onClick={handleClickHome}
        className=" border w-[12rem] rounded-full ml-6 gap-2  bg-slate-100 hover:bg-slate-200 text-text_color text-md lg:text-md"
      >
        <Milestone size={20} className="transform scale-x-[-1] " /> Retour à
        l'accueil
      </Button>
      <div className="w-full">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleLoginFormSubmit)}
            className="space-y-8 flex justify-center items-center   "
          >
            <div className=" shadow-div rounded-md border-2 border-yellow/50  w-[80%] md:w-[70%] lg:w-[50%] xl:w-[30%] ">
              <Card className=" ">
                <CardHeader>
                  <CardTitle className=" md:text-[1.4rem] text-text_color font-semibold">
                    Espace réservé
                  </CardTitle>
                  <CardDescription className="italic text-[0.9rem] md:text-md lg:text-[1rem] text-text_color ">
                    Se connecter à l'espace d'administration
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className=" text-md lg:text-lg  text-text_color ">
                          Email
                        </FormLabel>
                        <FormControl>
                          <Input
                            placeholder="example@example.com"
                            type="email"
                            className=" text-md md:text-md "
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
                        <FormLabel className="  text-md lg:text-lg text-text_color ">
                          Mot de passe
                        </FormLabel>
                        <FormControl>
                          <Input
                            placeholder="*********"
                            type={showPassword ? "text" : "password"}
                            autoComplete="current-password"
                            className=" text-md md:text-md "
                            {...field}
                          />
                        </FormControl>
                        <FormMessage className=" text-[0.8rem] md:text-md pl-2" />
                      </FormItem>
                    )}
                  />
                  <div
                    onClick={() => setShowPassword(!showPassword)}
                    className=" cursor-pointer hover:underline"
                  >
                    <p className=" text-[13px] pl-2 mt-1 md:text-[1rem]  italic text-text_color ">
                      Afficher le mot de passe
                    </p>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-center">
                  <Button
                    role="button"
                    aria-label="se connecter"
                    disabled={isLoading}
                    className="gap-3 lg:gap-4  bg-yellow/50 hover:bg-yellow hover:text-white text-text_color text-md lg:text-md "
                  >
                    {isLoading ? (
                      <Loader className="animate-spin" size="16" />
                    ) : (
                      <LogIn className="w-6 h-6 " />
                    )}
                    Se connecter
                  </Button>
                </CardFooter>
              </Card>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
}

