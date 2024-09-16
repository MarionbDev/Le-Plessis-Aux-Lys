"use client";

import { ResetPassword } from "@/app/_components/ResetPassword";
import { useEffect } from "react";

export default function ResetPasswordPage() {
  useEffect(() => {
    console.log("useEffect dans ResetPasswordPage a été déclenché");
  }, []);
  return (
    <div className="">
      <ResetPassword />
    </div>
  );
}

