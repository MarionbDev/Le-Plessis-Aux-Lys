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
import Image from "next/image";
import { FormEvent, useState } from "react";
import { toast, Toaster } from "sonner";

export default function ContactForm() {
  const [lastname, setLatsName] = useState("");
  const [firstname, setFirstname] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmitFormContact = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      console.log("Submitting form...");
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/email/`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ lastname, firstname, email, message }),
        },
      );
      console.log("Received response :", response);

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();
      console.log("data client : ", data);

      if (data && data.message) {
        // toast.success("Email envoyé avec succès !");
        const promise = () =>
          new Promise((resolve) =>
            setTimeout(() => {
              resolve({ name: "Sonner" });
            }, 2000),
          );

        toast.promise(promise, {
          loading: "Envoi du message en-cours...",
          success: (data) => {
            return `Votre message à bien été envoyé !`;
          },
          error: "Error",
        });

        setLatsName("");
        setFirstname("");
        setEmail("");
        setMessage("");
      } else {
        toast.error("Une erreur s'est produite ! Veuillez réessayer !");
      }
    } catch (error) {
      console.error("Error :", error);
    }
  };

  return (
    <div className=" font-text flex justify-around items-center w-full mt-28  ">
      <Image
        src="/parc/parc1.jpg"
        width={600}
        height={900}
        alt="image"
        className=" shadow-basic"
      />
      <div className=" shadow-div rounded-md border-2 border-yellow/50 ">
        <Card className=" max-w-xl text-text_color ">
          <form onSubmit={handleSubmitFormContact} className="space-y-4 ">
            <CardHeader>
              {/* <CardTitle>Contactez nous</CardTitle> */}
              <CardDescription className=" text-md font-medium ">
                Remplissez le formulaire ci-dessous et nous vous répondrons dans
                les plus brefs délais.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4 ">
                <div className="space-y-2 ">
                  <Label htmlFor="first-name" className="text-text_color">
                    Nom
                  </Label>
                  <Input
                    id="first-name"
                    placeholder="John"
                    required
                    value={lastname}
                    onChange={(e) => setLatsName(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="last-name" className="text-text_color">
                    Prénom
                  </Label>
                  <Input
                    id="last-name"
                    placeholder="Doe"
                    required
                    value={firstname}
                    onChange={(e) => setFirstname(e.target.value)}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="email" className="text-text_color">
                  Email
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="john@example.com"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="message" className="text-text_color">
                  Message
                </Label>
                <Textarea
                  id="message"
                  placeholder="..."
                  className="min-h-[120px] "
                  required
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                />
              </div>
            </CardContent>
            <CardFooter>
              <Button
                type="submit"
                className="ml-auto hover:text-white hover:bg-gold bg-gold/30 "
              >
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

