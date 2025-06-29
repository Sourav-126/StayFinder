import { getFavoriteListings } from "@/app/actions/favorites";
import { getUser } from "@/app/actions/getUser";
import ListingsCard from "@/app/_components/listings-card";
import { notFound } from "next/navigation";
import React from "react";
import Link from "next/link";

import type { SafeUser } from "@/app/types";

async function Favorites() {
  const rawUser = await getUser();

  if (!rawUser || "ok" in rawUser) notFound();

  const user: SafeUser = {
    id: rawUser.id,
    name: rawUser.name ?? undefined,
    email: rawUser.email ?? undefined,
    image: rawUser.image ?? undefined,
    favoriteIds: rawUser.favoritesIds ?? [],
  };

  const favoritesResponse = await getFavoriteListings();
  const favorites = favoritesResponse?.data?.filter((f) => f !== null) || [];

  if (favorites.length === 0) {
    return (
      <section className="h-screen grid place-items-center">
        <div className="text-center">
          <h1 className="font-semibold text-3xl">
            No Favorite Properties Found!
          </h1>
          <p className="text-gray-600 mt-2 mb-4">
            Start exploring and add properties to your favorites
          </p>
          <Link
            href="/"
            className="underline text-blue-600 hover:text-blue-800"
          >
            Browse Properties
          </Link>
        </div>
      </section>
    );
  }

  return (
    <div className="p-4 md:p-8">
      <div className="mb-6">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
          Your Favorite Properties
        </h1>
        <p className="text-gray-600 mt-2">
          {favorites.length}{" "}
          {favorites.length === 1 ? "property" : "properties"} in your favorites
        </p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 xl:grid-cols-4 gap-6">
        {favorites.map((listing) => (
          <ListingsCard
            key={listing.id}
            secondaryBtnLabel="Remove from Favorites"
            listing={{
              ...listing,
              imageSrc: listing.imageSrc ?? "/fallback.jpg",
            }}
            user={user}
          />
        ))}
      </div>
    </div>
  );
}

export default Favorites;
