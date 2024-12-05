"use client";
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
    <div className=" py-20 mt-6 lg:mt-0">
      <div className="flex flex-col items-center justify-center ">
        <div className=" flex flex-col lg:flex-row items-center justify-center my-4  lg:mt-0 gap-4  lg:gap-8 lg:my-8">
          <span className="flex justify-center w-[16rem]  border-t-2  border-separator"></span>
          <h1 className="text-text_color font-semibold text-center lg:text-lg uppercase ">
            Mise à jour des paramètres
          </h1>
          <span className="flex  justify-center w-[16rem] border-t-2  border-separator"></span>
        </div>
        <div className="w-4/5 lg:w-2/5 mt-10  ">
          <Card className=" text-text_color border-2   ">
            <CardHeader>
              <CardTitle className="text-[1.2rem]">
                Informations personnelles
              </CardTitle>
              <CardDescription className="text-[0.9rem]">
                Gérer vos informations personnels
              </CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col gap-4">
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
    </div>
  );
}

