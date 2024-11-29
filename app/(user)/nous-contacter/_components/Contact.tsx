"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Loader, Send } from "lucide-react";
import { FormEvent, useState } from "react";
import { toast, Toaster } from "sonner";

export default function ContactForm() {
  const [lastname, setLatsName] = useState("");
  const [firstname, setFirstname] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmitFormContact = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      setIsLoading(true);
      console.log("Submitting form...");
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/email/`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ lastname, firstname, email, phone, message }),
        },
      );
      console.log("Received response :", response);

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();
      console.log("data client : ", data);

      if (data && data.message) {
        const promise = () =>
          new Promise((resolve) =>
            setTimeout(() => {
              resolve({ name: "Sonner" });
            }, 400),
          );

        toast.promise(promise, {
          success: (data) => {
            return `Votre message à bien été envoyé !`;
          },
          error: "Error",
        });

        setLatsName("");
        setFirstname("");
        setEmail("");
        setPhone("");
        setMessage("");
      } else {
        toast.error("Une erreur s'est produite ! Veuillez réessayer !");
      }
    } catch (error) {
      console.error("Error :", error);
    } finally {
      setIsLoading(false);
    }
  };

  const capitalizeFirstLetter = (value: string): string => {
    return value.charAt(0).toUpperCase() + value.slice(1).toLowerCase();
  };

  const formatPhoneNumber = (phone: string): string => {
    return phone.replace(/(\d{2})(?=\d)/g, "$1 ");
  };

  return (
    <div className=" shadow-div rounsm  mx-4 md:mx-0  md:mt-0 ">
      <Card className=" max-w-lg text-text_color border-none ">
        <form onSubmit={handleSubmitFormContact}>
          <CardHeader>
            <CardDescription className=" text-[0.9rem] font-medium ">
              Remplissez le formulaire ci-dessous et nous vous répondrons dans
              les plus brefs délais.
            </CardDescription>
          </CardHeader>
          <CardContent className="flex  flex-col gap-3">
            <div className="grid grid-cols-2 gap-4 ">
              <div className="space-y-2 ">
                <Label
                  htmlFor="first-name"
                  className="text-text_color text-[0.9rem]"
                >
                  Nom
                </Label>
                <Input
                  id="first-name"
                  placeholder="Votre nom"
                  required
                  value={lastname}
                  onChange={(e) =>
                    setLatsName(capitalizeFirstLetter(e.target.value))
                  }
                  className="custom-placeholder"
                />
              </div>
              <div className="space-y-2">
                <Label
                  htmlFor="last-name"
                  className="text-text_color text-[0.9rem]"
                >
                  Prénom
                </Label>
                <Input
                  id="last-name"
                  placeholder="Votre prénom"
                  required
                  value={firstname}
                  onChange={(e) =>
                    setFirstname(capitalizeFirstLetter(e.target.value))
                  }
                  className="custom-placeholder"
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4 ">
              <div className="space-y-2">
                <Label
                  htmlFor="email"
                  className="text-text_color text-[0.9rem]"
                >
                  E-mail
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Votre e-mail"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="custom-placeholder"
                />
              </div>
              <div className="space-y-2">
                <Label
                  htmlFor="phone"
                  className="text-text_color text-[0.9rem]"
                >
                  Téléphone
                </Label>
                <Input
                  id="phone"
                  type="tel"
                  placeholder="Votre numéro de téléphone"
                  pattern="([0-9]{2}[\s]?)?[0-9]{2}[\s]?[0-9]{2}[\s]?[0-9]{2}[\s]?[0-9]{2}"
                  value={phone}
                  onChange={(e) => setPhone(formatPhoneNumber(e.target.value))}
                  className="custom-placeholder"
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label
                htmlFor="message"
                className="text-text_color text-[0.9rem]"
              >
                Message
              </Label>
              <Textarea
                id="message"
                placeholder="Votre message"
                className="custom-placeholder min-h-[120px] "
                required
                value={message}
                onChange={(e) =>
                  setMessage(capitalizeFirstLetter(e.target.value))
                }
              />
            </div>
          </CardContent>
          <CardFooter>
            <Button
              type="submit"
              disabled={isLoading}
              className="ml-auto hover:text-white hover:bg-gold bg-gold/30 gap-2 "
            >
              {isLoading ? (
                <Loader className="animate-spin" size="16" />
              ) : (
                <Send size={16} />
              )}
              Envoyer
            </Button>
          </CardFooter>{" "}
        </form>
      </Card>
      <Toaster />
    </div>
  );
}

