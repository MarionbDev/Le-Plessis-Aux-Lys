import ButtonList from "@/components/ui/buttonList";
import ButtonItem from "@/components/ui/buttonList/ButtonItem";
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
        <h1 className="text-xl font-bold">Compte</h1>
        <Card className="dark:shadow-inner dark:shadow-purple/60 shadow-purple/40 shadow-md border-none bg-purple/20 backdrop-blur-3xl drop-shadow-lg">
          <CardHeader>
            <CardTitle>Informations personnelles</CardTitle>
            <CardDescription>Gérer vos informations personnels</CardDescription>
          </CardHeader>
          <CardContent>
            <ButtonList>
              <ButtonItem className=" border-purple/60 dark:hover:bg-purple/60">
                Nom
              </ButtonItem>

              <UpdateEmailButton />
              <UpdatePasswordButton />
            </ButtonList>
          </CardContent>
        </Card>
      </div>
    </>
  );
}

