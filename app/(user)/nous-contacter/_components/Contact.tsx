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
import { Loader, MessageCircle, Phone, Send } from "lucide-react";
import Link from "next/link";
import { FormEvent, useState } from "react";
import { toast, Toaster } from "sonner";

export default function ContactForm() {
  const [lastname, setLastName] = useState("");
  const [firstname, setFirstname] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [company, setCompany] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [acceptedPrivacyPolicy, setAccepedPrivacyPolicy] = useState(false);

  const handleSubmitFormContact = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      setIsLoading(true);

      if (!acceptedPrivacyPolicy) {
        toast.warning("Veuillez accepter la politique de confidentialité .");
        setIsLoading(false);
        return;
      } else {
        // console.log("Submitting form...");
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/email/`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              lastname,
              firstname,
              email,
              phone,
              message,
              company,
            }),
          },
        );
        // console.log("Received response :", response);
        // console.log("API URL:", process.env.NEXT_PUBLIC_API_URL);

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        // console.log("data client : ", data);

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

          setLastName("");
          setFirstname("");
          setEmail("");
          setPhone("");
          setMessage("");
          setAccepedPrivacyPolicy(false);
        } else {
          toast.error("Une erreur s'est produite ! Veuillez réessayer !");
        }
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
    <div className=" rounded-md  mx-4 md:mx-0  border-2 border-separator/20 mt-0 md:mt-24">
      <Card className=" max-w-lg text-text_color border-none shadow-none   ">
        <form onSubmit={handleSubmitFormContact}>
          <CardHeader>
            <div className="w-full flex justify-center">
              <div className="bg-[#f4f1ec] border border-[#e0dedb] rounded-xl p-4  flex items-start flex-col gap-3 shadow-sm text-text_color ">
                <Link
                  href="tel:0689666711"
                  className="flex hover:text-[#bbbb57] gap-4"
                >
                  <Phone size={20} color="#bbbb57" />
                  06 89 66 67 11
                </Link>
                <div className="flex gap-3">
                  <MessageCircle color="#bbbb57" className="mt-1 w-14" />
                  <p className="text-[0.95rem] leading-snug">
                    Vous pouvez nous laisser un message vocal avec vos
                    coordonnées, nous vous rappellerons avec plaisir.
                  </p>
                </div>
              </div>
            </div>
            <p className="mx-auto py-2 ">Ou</p>
            <CardDescription className=" text-[0.9rem] font-medium ">
              Remplissez le formulaire ci-dessous et nous vous répondrons dans
              les plus brefs délais.{" "}
              <span className=" text-[0.7rem]">(Mentions obligatoires *)</span>
            </CardDescription>
          </CardHeader>
          <CardContent className="flex  flex-col gap-2">
            <div className="grid grid-cols-2 gap-4 ">
              <div className=" ">
                <Label
                  htmlFor="first-name"
                  className="text-text_color text-[0.9rem]"
                >
                  Nom*
                </Label>
                <Input
                  id="first-name"
                  placeholder="Votre nom"
                  required
                  value={lastname}
                  onChange={(e) =>
                    setLastName(capitalizeFirstLetter(e.target.value))
                  }
                  className="custom-placeholder"
                />
              </div>
              <div className="">
                <Label
                  htmlFor="last-name"
                  className="text-text_color text-[0.9rem]"
                >
                  Prénom*
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
              <div className="">
                <Label
                  htmlFor="email"
                  className="text-text_color text-[0.9rem]"
                >
                  E-mail*
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
              <div className="">
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
            <div className="">
              <Label
                htmlFor="message"
                className="text-text_color text-[0.9rem]"
              >
                Message*
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
            <div>
              <Label className=" flex ">
                <Input
                  type="checkbox"
                  id="acceptedPrivacyPolicy"
                  checked={acceptedPrivacyPolicy}
                  onChange={(e) => setAccepedPrivacyPolicy(e.target.checked)}
                  className=" w-16 "
                />
                <span className=" text-[0.7rem] ml-2">
                  * En soumettant ce formulaire, j'accepte que mes données
                  personnelles soient utilisées pour me recontacter. Aucun autre
                  traitement ne sera effectué avec mes informations. Pour
                  connaître et exercer vos droits, veuillez consultez la
                  <Link
                    href={"/politique-confidentialite"}
                    target="_blank"
                    rel="noopener noreferrer"
                    className=" hover:text-blue-700 italic"
                  >
                    &nbsp;Politique de confidentialité
                  </Link>
                </span>
              </Label>
            </div>
          </CardContent>
          <div
            style={{
              position: "absolute",
              left: "-9999px",
              top: "auto",
              width: "1px",
              height: "1px",
              overflow: "hidden",
            }}
          >
            <label htmlFor="company">Company</label>
            <input
              type="text"
              id="company"
              name="company"
              autoComplete="off"
              aria-hidden="true"
              tabIndex={-1}
              value={company}
              onChange={(e) => setCompany(e.target.value)}
            />
          </div>
          <CardFooter>
            <Button
              type="submit"
              disabled={isLoading}
              className="ml-auto text-white hover:bg-[#caca73] duration-100 bg-yellow gap-2 shadow-md"
            >
              {isLoading ? (
                <Loader className="animate-spin" size="16" />
              ) : (
                <Send size={16} />
              )}
              Envoyer
            </Button>
          </CardFooter>
        </form>
      </Card>

      <Toaster />
    </div>
  );
}

