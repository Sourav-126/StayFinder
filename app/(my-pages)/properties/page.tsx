import React from "react";
import { notFound } from "next/navigation";
import { prisma } from "../../utils/prisma";
import { getAuthSession } from "../../utils/auth";
import { PropertyBox } from "../../_components/PropertyBox";
import Link from "next/link";
import type { SessionUser } from "@/app/types";

export default async function PropertiesPage() {
  const session = await getAuthSession();

  if (!session) notFound();

  const propertiesList = await prisma.listing.findMany({
    where: {
      userId: (session.user as SessionUser).id,
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
    <div className="max-w-[2520px] mx-auto xl:px-20 md:px-10 sm:px-2 px-4">
      <div className="pt-28">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8">
          {safePropertiesList.map((listing: any) => (
            <PropertyBox
              key={listing.id}
              {...listing}
              showApprovalStatus={true}
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
    </div>
  );
}
