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
import Image from "next/image";
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
            }, 800),
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

  return (
    <div className=" font-text md:flex justify-around items-center  w-full my-10 md:my-28   ">
      <Image
        src="/parc/parc1.jpg"
        width={600}
        height={900}
        alt="image"
        className=" shadow-basic"
      />
      <div className=" shadow-div rounded-md border-2 border-yellow/50 mx-4 md:mx-0 mt-10 md:mt-0 ">
        <Card className=" max-w-xl text-text_color ">
          <form onSubmit={handleSubmitFormContact} className="space-y-4 ">
            <CardHeader>
              <CardDescription className=" text-md font-medium ">
                Remplissez le formulaire ci-dessous et nous vous répondrons dans
                les plus brefs délais.
              </CardDescription>
            </CardHeader>
            <CardContent className="flex  flex-col gap-3">
              <div className="grid grid-cols-2 gap-4 ">
                <div className="space-y-2 ">
                  <Label htmlFor="first-name" className="text-text_color">
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
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="last-name" className="text-text_color">
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
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4 ">
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-text_color">
                    E-mail
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="Votre e-mail"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone" className="text-text_color">
                    Téléphone
                  </Label>
                  <Input
                    id="phone"
                    type="tel"
                    placeholder="Votre numéro de téléphone"
                    pattern="[0-9]{2}[0-9]{2}[0-9]{2}[0-9]{2}[0-9]{2}"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                  className="custom-placeholder"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="message" className="text-text_color">
                  Message
                </Label>
                <Textarea
                  id="message"
                  placeholder="Votre message"
                  className="min-h-[120px] "
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
        <Toaster richColors />
      </div>
    </div>
  );
}

