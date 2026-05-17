import CategoryHandler from "./_components/category-handler";
import ListingsCard from "./_components/listings-card";
import { getListings } from "./actions/getListings";
import { Metadata } from "next";
import { getUser } from "./actions/getUser";
import { SafeUser } from "./types";
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

  const user: SafeUser | null = rawUser && !("ok" in rawUser) && rawUser.id ? {
    id: rawUser.id,
    name: rawUser.name ?? undefined,
    email: rawUser.email ?? undefined,
    image: rawUser.image ?? undefined,
    favoriteIds: rawUser.favoritesIds ?? [],
  } : null;

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
      <section className="w-full h-[60vh] flex flex-col items-center justify-center text-center p-4">
        <div className="max-w-md space-y-4">
          <h1 className="text-3xl font-bold text-red-500">
            Unable to Load Listings
          </h1>
          <p className="text-muted-foreground">
            We are experiencing a temporary database connection issue. Please verify your connection or try again in a few moments.
          </p>
        </div>
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
      <div className="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-x-6 gap-y-10 p-4 md:p-8 max-w-[1920px] mx-auto">
        {listings.map((listing) => (
          <ListingsCard
            key={listing.id}
            secondaryBtnLabel="Remove from Favorites"
            listing={{
              ...listing,
              imageSrc: listing.imageSrc ?? "/fallback.jpg",
            }}
            user={user ?? undefined}
          />
        ))}
      </div>
    </section>
  );
}
