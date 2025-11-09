import React from "react";
import { getAuthSession } from "../utils/auth";
import Link from "next/link";
import { BecomeAHostComponent } from "../_components/BecomeaHostComponent";

async function BecomeAHost() {
  const session = await getAuthSession();

  if (!session) {
    return (
      <section className="w-full h-screen grid place-items-center">
        <div className="space-y-2">
          <h1 className="text-xl md:text-2xl font-bold text-center">
            Not Authorized!
          </h1>
          <span>
            To add your Properties ,
            <Link href="/sign-in" className="underline">
              Signin!{" "}
            </Link>
          </span>
        </div>
      </section>
    );
  }
  return (
    <div>
      <BecomeAHostComponent />
    </div>
  );
}

export default BecomeAHost;
