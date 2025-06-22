import { getFavoriteListings } from "@/app/actions/favorites";
import { getUser } from "@/app/actions/getUser";
import ListingsCard from "@/app/_components/listings-card";
import { notFound } from "next/navigation";
import React from "react";

async function Favorites() {
  const user = await getUser();

  if (!user) notFound();

  const favoritesResponse = await getFavoriteListings();

  if (!favoritesResponse.ok) {
    if (favoritesResponse.status === "403") {
      notFound();
    }
    return (
      <section className="h-screen grid place-items-center">
        <div className="text-center">
          <h1 className="font-semibold text-3xl text-red-600">
            Error Loading Favorites
          </h1>
          <p className="text-gray-600 mt-2">{favoritesResponse.message}</p>
          <a href="/" className="underline mt-4 inline-block">
            Go Back Home
          </a>
        </div>
      </section>
    );
  }

  const favorites = favoritesResponse.data || [];

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
          <a href="/" className="underline text-blue-600 hover:text-blue-800">
            Browse Properties
          </a>
          <br />
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

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {favorites.map((listing) => (
          <ListingsCard
            key={listing.id}
            secondaryBtnLabel="Favorites"
            listing={listing}
            user={user}
          />
        ))}
      </div>
    </div>
  );
}

export default Favorites;
