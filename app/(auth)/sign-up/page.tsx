import { getAuthSession } from "@/app/utils/auth";
import { LoginForm } from "@/app/utils/Login-Form";
import { redirect } from "next/navigation";
import React from "react";

export default async function Signup() {
  return (
    <div>
      <LoginForm origin="Signup" />
    </div>
  );
}
