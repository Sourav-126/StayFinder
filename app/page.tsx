import CategoryHandler from "./_components/category-handler";
import ListingsCard from "./_components/listings-card";
import { getListings } from "./actions/getListings";
import { Metadata } from "next";
import { getUser } from "./actions/getUser";
import { SafeUser } from "./types";
import { redirect } from "next/navigation";
export const metadata: Metadata = {
  title: "StayFinder",
};

interface Props {
  searchParams: Promise<{
    locationValue?: string;
    guestCount?: string;
    roomCount?: string;
    childCount?: string;
    startDate?: string;
    endDate?: string;
    categories?: string;
    cat?: string;
  }>;
}

interface ParsedParams {
  locationValue?: string;
  guestCount?: number;
  roomCount?: number;
  childCount?: number;
  startDate?: string;
  endDate?: string;
  cat?: string;
}

export default async function Home({ searchParams }: Props) {
  const resolvedSearchParams = await searchParams;

  const rawUser = await getUser();

  if (!rawUser || "ok" in rawUser || !rawUser.id) {
    redirect("/sign-up");
  }

  const user: SafeUser = {
    id: rawUser.id,
    name: rawUser.name ?? undefined,
    email: rawUser.email ?? undefined,
    image: rawUser.image ?? undefined,
    favoriteIds: rawUser.favoritesIds ?? [],
  };

  const parsedParams: ParsedParams = {
    locationValue: resolvedSearchParams.locationValue || "",
    guestCount: resolvedSearchParams.guestCount
      ? parseInt(resolvedSearchParams.guestCount)
      : 0,
    roomCount: resolvedSearchParams.roomCount
      ? parseInt(resolvedSearchParams.roomCount)
      : 0,
    childCount: resolvedSearchParams.childCount
      ? parseInt(resolvedSearchParams.childCount)
      : 0,
    startDate: resolvedSearchParams.startDate || undefined,
    endDate: resolvedSearchParams.endDate || undefined,
    cat: resolvedSearchParams.categories || resolvedSearchParams.cat,
  };

  const listings = await getListings(parsedParams);

  if (!Array.isArray(listings)) {
    return (
      <section className="w-full grid items-center">
        <h1 className="text-3xl font-semibold text-red-600">
          Error Loading Listings
        </h1>
        <pre>{listings.message || "Something went wrong"}</pre>
      </section>
    );
  }

  if (listings.length === 0) {
    return (
      <section>
        <CategoryHandler />
        <div className="w-full grid h-screen place-items-center">
          <div className="text-center">
            <h1 className="text-3xl font-semibold">No Listings Found!</h1>
            <p className="">Try Changing Your Filters</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="">
      <CategoryHandler />
      <div className="grid grid-cols-2 md:grid-cols-6 gap-6 p-4 md:p-8">
        {listings.map((listing) => (
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
    </section>
  );
}
