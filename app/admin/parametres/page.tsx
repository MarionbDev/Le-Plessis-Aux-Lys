import EmailTemplate from "@/app/_components/contact/EmailTemplate";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { UpdateEmailButton } from "./_components/UpdateEmailButton";
import { UpdatePasswordButton } from "./_components/UpdatePasswordButton";

export default function Settings() {
  return (
    <>
      <div className="flex justify-center mt-32 ">
        <div className="lg:w-2/5  shadow-div rounded-md">
          <Card className=" text-text_color border-2 border-yellow/50  ">
            <CardHeader>
              <CardTitle>Informations personnelles</CardTitle>
              <CardDescription>
                Gérer vos informations personnels
              </CardDescription>
            </CardHeader>
            <CardContent>
              <UpdateEmailButton />
              <UpdatePasswordButton />
            </CardContent>
          </Card>
        </div>
        <EmailTemplate
          firstname="marion"
          lastname="baston"
          email="marion@gmail.com"
          message="fsdfsdfgs dfhsdjkfh hfgjkdfs sdfhfgsd fhgsdfdshf dfhds fsdhfk sdh jdfghjsdk  hjdk fghdffg h fhgkdfg hgkghfdkj hj"
          phone="0520448565"
        />
      </div>
    </>
  );
}

