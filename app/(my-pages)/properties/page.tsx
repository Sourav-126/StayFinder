export const dynamic = "force-dynamic";
export const revalidate = 0;

import React from "react";
import { redirect } from "next/navigation";
import { prisma } from "../../utils/prisma";
import { getUser } from "@/app/actions/getUser";
import { PropertyBox } from "../../_components/PropertyBox";
import Link from "next/link";

export default async function PropertiesPage() {
  const user = await getUser();

  if (!user || "ok" in user) {
    redirect("/sign-in");
  }

  const propertiesList = await prisma.listing.findMany({
    where: {
      userId: user.id,
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
          <Link href="/become-a-host" className="underline">
            Make your Place a StayPlace With StayFinder
          </Link>
        </div>
      </section>
    );
  }

  return (
    <div className="max-w-[2520px] mx-auto xl:px-20 md:px-10 sm:px-2 px-4 pt-28">
        <div className="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-x-6 gap-y-10 max-w-[1920px] mx-auto">
          {safePropertiesList.map((listing) => (
            <PropertyBox
              key={listing.id}
              each={listing}
              isApproved={listing.isApproved}
            />
          ))}
        </div>

        {safePropertiesList.length === 0 && (
          <div className="text-center mt-10">
            <h3 className="text-lg font-semibold">No properties found</h3>
            <p className="text-gray-500">
              Start by listing your first property
            </p>
          </div>
        )}
      </div>
  );
}
