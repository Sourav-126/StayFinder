import { getUser } from "@/app/actions/getUser";
import { LoginForm } from "@/app/utils/Login-Form";
import { redirect } from "next/navigation";

export default async function Signin() {
  const user = await getUser();

  if (user && !("ok" in user)) {
    redirect("/");
  }

  return (
    <div>
      <LoginForm origin="signin" />
    </div>
  );
}
