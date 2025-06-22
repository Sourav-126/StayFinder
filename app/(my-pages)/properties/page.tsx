import React from "react";
import { notFound } from "next/navigation";
import { prisma } from "../../utils/prisma";
import { getAuthSession } from "../../utils/auth";
import { PropertyBox } from "../../_components/PropertyBox";

export default async function PropertiesPage() {
  const session = await getAuthSession();

  if (!session) notFound();

  const propertiesList = await prisma.listing.findMany({
    where: {
      userId: (session.user as any).id,
    },
  });

  const safePropertiesList = propertiesList.map((property) => ({
    ...property,
    createdAt: property.createdAt.toISOString(),
    updatedAt: property.updatedAt.toISOString(),
  }));

  if (!safePropertiesList || safePropertiesList.length === 0) {
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
    <div className="p-4 md:p-8 gap-y-2">
      <h1 className="font-bold text-xl md:text-3xl">Your Properties 🏡</h1>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4 mt-4">
        {safePropertiesList.map((each) => (
          <PropertyBox key={each.id} each={each} />
        ))}
      </div>
    </div>
  );
}
