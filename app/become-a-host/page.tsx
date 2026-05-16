export const dynamic = "force-dynamic";
export const revalidate = 0;

import { getUser } from "../actions/getUser";
import { redirect } from "next/navigation";
import { BecomeAHostComponent } from "../_components/BecomeaHostComponent";

async function BecomeAHost() {
  const user = await getUser();

  if (!user || "ok" in user) {
    redirect("/sign-in");
  }
  return (
    <div>
      <BecomeAHostComponent />
    </div>
  );
}

export default BecomeAHost;
