import CategoryHandler from "./_components/category-handler";
import ListingsCard from "./_components/listings-card";
import { getListings } from "./actions/getListings";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "StayFinder",
};

export default async function Home({ searchParams }) {
  const parsedParams = {
    locationValue: searchParams.locationValue || "",
    guestCount: searchParams.guestCount ? parseInt(searchParams.guestCount) : 0,
    roomCount: searchParams.roomCount ? parseInt(searchParams.roomCount) : 0,
    childCount: searchParams.childCount ? parseInt(searchParams.childCount) : 0,
    startDate: searchParams.startDate || undefined,
    endDate: searchParams.endDate || undefined,
    cat: searchParams.categories || searchParams.cat,
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

  console.log(listings);

  return (
    <section className="">
      <CategoryHandler />
      <div className="grid grid-cols-2 md:grid-cols-6 gap-6 p-4 md:p-8">
        {listings.map((listing) => {
          return (
            <ListingsCard
              key={listing.id}
              listing={listing}
              secondaryBtnLabel=""
            />
          );
        })}
      </div>
    </section>
  );
}
