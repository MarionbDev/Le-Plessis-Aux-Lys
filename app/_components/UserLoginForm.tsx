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
import {
  CircleCheck,
  CircleX,
  KeyRound,
  Loader,
  LogIn,
  Mail,
} from "lucide-react";
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
  password: z
    .string()
    .min(8)
    .regex(/(?=.*\d)/)
    .regex(/(?=.*[a-z])/)
    .regex(/(?=.*[A-Z])/),
});

type FormSchemaType = z.infer<typeof formSchema>;

export default function UserLoginForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
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

      const promise = () =>
        new Promise((resolve) =>
          setTimeout(() => {
            resolve({ name: "Sonner" });
          }, 2000),
        );

      toast.promise(promise, {
        loading: "Connexion en-cours...",
        success: (data) => {
          return `Connexion réussie !`;
        },
        error: "Error",
      });
      setTimeout(() => {
        router.push("/admin");
        setIsLoading(false);
      }, 4000);
    } catch (error) {
      toast.error(
        "Une erreur s'est produite lors de la connexion, veuillez réésayger !",
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className=" flex flex-col justify-center  gap-24 -mt-16  h-screen">
      <div className=" w-full">
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
                      <FormItem className="flex items-center gap-2">
                        <FormLabel className=" text-md lg:text-lg  text-text_color ">
                          <Mail size={24} color="#bbbb57" />
                        </FormLabel>
                        <FormControl>
                          <Input
                            placeholder="example@example.com"
                            type="email"
                            className=" text-md md:text-md "
                            {...field}
                          />
                        </FormControl>

                        <FormMessage className="text-[0.85rem] md:text-md pl-2 text-red-500 italic" />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem className=" mt-4">
                        <div className="flex items-center gap-2">
                          <FormLabel className="  text-md lg:text-lg text-text_color ">
                            <KeyRound size={25} color="#bbbb57" />
                          </FormLabel>
                          <FormControl>
                            <Input
                              placeholder="*********"
                              type={showPassword ? "text" : "password"}
                              autoComplete="current-password"
                              className=" text-md md:text-md "
                              onChange={(e) => {
                                field.onChange(e);
                                handlePasswordChange(e.target.value);
                              }}
                              value={field.value}
                            />
                          </FormControl>
                        </div>
                        <div className="ml-10">
                          <div
                            onClick={() => setShowPassword(!showPassword)}
                            className=" cursor-pointer hover:underline"
                          >
                            <p className=" text-[13px] pl-2 mt-1 md:text-[0.8rem] underline  italic text-text_color ">
                              Afficher le mot de passe
                            </p>
                          </div>
                          <div className="flex items-center mt-1">
                            {passwordValidations.minLength ? (
                              <CircleCheck
                                size={16}
                                className="text-green-500 mr-2"
                              />
                            ) : (
                              <CircleX
                                size={16}
                                className="text-red-500 mr-2"
                              />
                            )}
                            <p className="text-xs md:text-sm text-text_color">
                              Minimum 8 caractères
                            </p>
                          </div>
                          <div className="flex items-center mt-1">
                            {passwordValidations.hasNumber ? (
                              <CircleCheck
                                size={16}
                                className="text-green-500 mr-2"
                              />
                            ) : (
                              <CircleX
                                size={16}
                                className="text-red-500 mr-2"
                              />
                            )}
                            <p className="text-xs md:text-sm text-text_color">
                              Minimum un chiffre
                            </p>
                          </div>
                          <div className="flex items-center mt-1">
                            {passwordValidations.hasLowerCase ? (
                              <CircleCheck
                                size={16}
                                className="text-green-500 mr-2"
                              />
                            ) : (
                              <CircleX
                                size={16}
                                className="text-red-500 mr-2"
                              />
                            )}
                            <p className="text-xs md:text-sm text-text_color">
                              Minimum une minuscule
                            </p>
                          </div>
                          <div className="flex items-center mt-1">
                            {passwordValidations.hasUpperCase ? (
                              <CircleCheck
                                size={16}
                                className="text-green-500 mr-2"
                              />
                            ) : (
                              <CircleX
                                size={16}
                                className="text-red-500 mr-2"
                              />
                            )}
                            <p className="text-xs md:text-sm text-text_color">
                              Minimum une majuscule
                            </p>
                          </div>
                        </div>

                        <FormMessage className=" text-[0.85rem] md:text-md pl-2 text-red-500 italic" />
                      </FormItem>
                    )}
                  />
                </CardContent>
                <CardFooter className="flex justify-center">
                  <Toaster richColors />
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

