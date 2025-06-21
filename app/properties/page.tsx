import React from "react";
import { notFound } from "next/navigation";
import { prisma } from "../utils/prisma";
import { getAuthSession } from "../utils/auth";
import { PropertyBox } from "../_components/PropertyBox";

export async function PropertiesPage() {
  const session = await getAuthSession();

  if (!session) notFound();
  const propertiesList = await prisma.listing.findMany({
    where: {
      userId: (session.user as any).id,
    },
  });

  if (!propertiesList || propertiesList.length == 0) {
    return (
      <section className="h-screen grid place-items-center">
        <div className="text-center">
          <h1 className="font-semibold text-3xl">No Properties Found!</h1>
          <a href="/become-a-host" className="underline">
            Make your Place a StayPlace With StayFinder
          </a>
        </div>
      </section>
    );
  }
  return (
    <div>
      <h1>Your Properties</h1>
      <div className="grid grid-cols-3 md:grid-cols-6 gap-4">
        {propertiesList.map((each) => (
          <div>
            <PropertyBox each={each} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default PropertiesPage;
