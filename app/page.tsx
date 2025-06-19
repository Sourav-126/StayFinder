"use server";
import { ListingCard } from "./_components/listings-card";
import { getListings } from "./actions/getListings";

export default async function Home({ searchParams }) {
  const parsedParams = {
    locationValue: searchParams.locationValue || "",
    guestCount: searchParams.guestCount ? parseInt(searchParams.guestCount) : 0,
    roomCount: searchParams.roomCount ? parseInt(searchParams.roomCount) : 0,
    childCount: searchParams.childCount ? parseInt(searchParams.childCount) : 0,
    startDate: searchParams.startDate ? new Date(searchParams.startDate) : null,
    endDate: searchParams.endDate ? new Date(searchParams.endDate) : null,
  };

  console.log("Raw searchParams:", searchParams);
  console.log("Parsed params:", parsedParams);

  const listings = await getListings(parsedParams);

  return (
    <section>
      <h2>Search Parameters:</h2>
      <pre>{JSON.stringify(parsedParams, null, 2)}</pre>
      <h2>Listings:</h2>
      <pre>{JSON.stringify(listings, null, 2)}</pre>
      {listings?.map((listing) => {
        return <ListingCard listing={listing} />;
      })}
    </section>
  );
}
