import { getUser } from "@/app/actions/getUser";
import { LoginForm } from "@/app/utils/Login-Form";
import { redirect } from "next/navigation";
import React from "react";

export default async function Signup() {
  const user = await getUser();

  if (user && !("ok" in user)) {
    redirect("/");
  }

  return (
    <div>
      <LoginForm origin="Signup" />
    </div>
  );
}
