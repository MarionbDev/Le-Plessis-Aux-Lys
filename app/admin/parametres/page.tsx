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
      <div className="container mx-auto px-44 py-8 flex flex-col space-y-8">
        <Card className=" ">
          <CardHeader>
            <CardTitle>Informations personnelles</CardTitle>
            <CardDescription>Gérer vos informations personnels</CardDescription>
          </CardHeader>
          <CardContent>
            <UpdateEmailButton />
            <UpdatePasswordButton />
          </CardContent>
        </Card>
      </div>
    </>
  );
}

