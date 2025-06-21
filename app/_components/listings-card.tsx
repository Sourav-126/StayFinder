"use client";

import useCountries from "@/hooks/useCountries";
import { IndianRupee } from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export default function ListingsCard({
  reservationsData,
  listing,
  showSecondaryBtn = false,
  secondaryBtnLabel,
  onAction,
}) {
  const { getByValue } = useCountries();
  const router = useRouter();
  const countryDetails = getByValue(listing.locationValue);
  return (
    <div className="p-3 rounded shadow border border-gray-200 relative">
      <div className="w-full aspect-square rounded-lg">
        <Image
          className="object-cover w-full h-full rounded-lg"
          src={listing.imageSrc}
          width={400}
          height={400}
          alt="property listing"
        />
      </div>
      {/* <Favorite className="absolute top-6 right-6" listingId={listing.id} user={user} /> */}
      <p className="font-semibold text-lg md:text-2xl capitalize pt-2">
        {listing.title}
      </p>
      {reservationsData ? (
        <p>Paid {reservationsData.totalPrice} rupees</p>
      ) : (
        <p className="text-lg flex gap-1 items-center">
          <IndianRupee size={16} /> {listing.price} per Night
        </p>
      )}
      <div className="text-gray-400">
        {countryDetails?.label},&nbsp;
        {countryDetails?.region}
      </div>
      <div className="">
        <Button
          onClick={() => router.push(`/listings/${listing.id}`)}
          className="w-full"
        >
          View Property
        </Button>
        {showSecondaryBtn && (
          <Button onClick={onAction}>{secondaryBtnLabel}</Button>
        )}
      </div>
    </div>
  );
}
