"use client";

import useCountries from "@/hooks/useCountries";
import { IndianRupee } from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import Favorite from "./favoriteButton";
import { useRouter } from "next/navigation";
import { MouseEvent } from "react";

type Listing = {
  id: string;
  imageSrc?: string;
  title?: string;
  price?: number;
  locationvalue?: string;
};

type ReservationData = {
  price: number;
};

type ListingCardProps = {
  listing: Listing;
  reservationsData?: ReservationData;
  user?: {
    id: string;
    name?: string;
    email?: string;
    favoriteIds?: string[];
  };
  showSecondaryBtn?: boolean;
  secondaryBtnLabel?: string;
  onAction?: (e: MouseEvent<HTMLButtonElement>) => void;
};

export default function ListingsCard({
  listing,
  reservationsData,
  user,
  showSecondaryBtn = false,
  secondaryBtnLabel,
  onAction,
}: ListingCardProps) {
  const { getByValue } = useCountries();
  const router = useRouter();

  const countryDetails = listing?.locationvalue
    ? getByValue(listing.locationvalue)
    : null;

  return (
    <div className="p-3 rounded shadow border border-gray-200 relative">
      <div className="w-full aspect-square rounded-lg overflow-hidden">
        <Image
          className="object-cover w-full h-full"
          src={listing.imageSrc || "/placeholder.jpg"}
          width={400}
          height={400}
          alt="property listing"
        />
      </div>

      <Favorite
        className="absolute top-6 right-6"
        listingId={listing.id}
        user={user ?? null}
      />

      <p className="font-semibold text-lg md:text-2xl capitalize pt-2">
        {listing.title || "Untitled Property"}
      </p>

      {reservationsData ? (
        <p>Paid {reservationsData.price} rupees per Night</p>
      ) : (
        <p className="text-lg flex gap-1 items-center">
          <IndianRupee size={16} /> {listing.price ?? "N/A"} per Night
        </p>
      )}

      <div className="text-gray-400">
        {countryDetails?.label}, {countryDetails?.region}
      </div>

      <div className="flex flex-col gap-2 mt-2">
        <Button
          onClick={() => router.push(`/listings/${listing.id}`)}
          className="w-full"
        >
          View Property
        </Button>

        {showSecondaryBtn && onAction && (
          <Button onClick={onAction}>{secondaryBtnLabel}</Button>
        )}
      </div>
    </div>
  );
}
