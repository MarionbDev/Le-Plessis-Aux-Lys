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

export default function ContactForm() {
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
          <CardHeader>
            {/* <CardTitle>Contactez nous</CardTitle> */}
            <CardDescription className=" text-md font-medium ">
              Remplissez le formulaire ci-dessous et nous vous répondrons dans
              les plus brefs délais.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form className="space-y-4 ">
              <div className="grid grid-cols-2 gap-4 ">
                <div className="space-y-2 ">
                  <Label htmlFor="first-name" className="text-text_color">
                    Nom
                  </Label>
                  <Input id="first-name" placeholder="John" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="last-name" className="text-text_color">
                    Prénom
                  </Label>
                  <Input id="last-name" placeholder="Doe" required />
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
                />
              </div>
            </form>
          </CardContent>
          <CardFooter>
            <Button
              type="submit"
              className="ml-auto hover:text-white hover:bg-gold bg-gold/30 "
            >
              Envoyer
            </Button>
          </CardFooter>
        </Card>{" "}
      </div>
    </div>
  );
}

