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
        <div className="lg:w-2/5 ">
          <Card className=" text-text_color border-2  ">
            <CardHeader>
              <CardTitle>Informations personnelles</CardTitle>
              <CardDescription>
                Gérer vos informations personnels
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className=" hover:bg-yellow/30 rounded-md duration-100">
                <UpdateEmailButton />
              </div>
              <div className=" hover:bg-yellow/30 rounded-md duration-100">
                <UpdatePasswordButton />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
}

