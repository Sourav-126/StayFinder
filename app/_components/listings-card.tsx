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

import { motion } from "framer-motion";

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
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 25 },
        visible: {
          opacity: 1,
          y: 0,
          transition: { type: "spring", stiffness: 100, damping: 15 }
        },
        hover: {
          y: -6,
          boxShadow: "0 12px 24px -4px rgba(0, 0, 0, 0.12), 0 8px 16px -4px rgba(0, 0, 0, 0.08)",
          transition: { type: "spring", stiffness: 300, damping: 20 }
        },
        tap: { scale: 0.98 }
      }}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-40px" }}
      whileHover="hover"
      whileTap="tap"
      className="p-3 rounded shadow border border-gray-200 relative bg-white transition-all duration-300"
    >
      <div className="w-full aspect-square rounded-lg overflow-hidden">
        <motion.div
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="w-full h-full"
        >
          <Image
            className="object-cover w-full h-full"
            src={listing.imageSrc || "/placeholder.jpg"}
            width={400}
            height={400}
            alt="property listing"
          />
        </motion.div>
      </div>

      <Favorite
        className="absolute top-6 right-6 z-10"
        listingId={listing.id}
        user={user ?? null}
      />

      <p className="font-semibold text-lg md:text-2xl capitalize pt-2 truncate">
        {listing.title || "Untitled Property"}
      </p>

      {reservationsData ? (
        <p className="text-sm text-gray-600">Paid {reservationsData.price} rupees per Night</p>
      ) : (
        <p className="text-lg flex gap-1 items-center font-medium">
          <IndianRupee size={16} /> {listing.price ?? "N/A"}{" "}
          <span className="text-sm font-normal text-gray-500">per Night</span>
        </p>
      )}

      <div className="text-gray-400 text-sm truncate">
        {countryDetails?.label}, {countryDetails?.region}
      </div>

      <div className="flex flex-col gap-2 mt-3">
        <Button
          onClick={() => router.push(`/listings/${listing.id}`)}
          className="w-full cursor-pointer hover:bg-zinc-800 transition-colors"
        >
          View Property
        </Button>

        {showSecondaryBtn && onAction && (
          <Button 
            variant="outline" 
            onClick={onAction}
            className="w-full cursor-pointer border-red-200 hover:bg-red-50 hover:text-red-600 transition-colors"
          >
            {secondaryBtnLabel}
          </Button>
        )}
      </div>
    </motion.div>
  );
}
