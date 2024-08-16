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
      <div className="container mx-auto px-96  py-20 flex flex-col space-y-8   ">
        <div className="shadow-div rounded-md">
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
      </div>
    </>
  );
}

