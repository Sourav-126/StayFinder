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
  category?: string;
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
        hidden: { opacity: 0, y: 20 },
        visible: {
          opacity: 1,
          y: 0,
          transition: { type: "spring", stiffness: 100, damping: 15 }
        },
        tap: { scale: 0.98 }
      }}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-40px" }}
      whileTap="tap"
      className="relative flex flex-col gap-2 cursor-pointer group bg-transparent select-none"
      onClick={() => router.push(`/listings/${listing.id}`)}
    >
      <div className="w-full aspect-square rounded-2xl overflow-hidden relative shadow-sm">
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

        {listing.category && (
          <div className="absolute top-3 left-3 bg-black/45 backdrop-blur-md px-2.5 py-1 rounded-full text-[10px] font-bold tracking-wider text-white uppercase select-none border border-white/15 z-10 shadow-sm">
            {listing.category}
          </div>
        )}

        <Favorite
          className="absolute top-3 right-3 z-10"
          listingId={listing.id}
          user={user ?? null}
        />
      </div>

      <div className="flex flex-col text-left px-1">
        <p className="font-bold text-[15px] text-gray-800 group-hover:text-red-500 transition-colors duration-200 truncate mt-1">
          {listing.title || "Untitled Property"}
        </p>
        <p className="text-sm text-gray-500 truncate">
          {countryDetails?.label}, {countryDetails?.region}
        </p>
        <p className="text-sm font-semibold text-gray-900 mt-1 flex items-center gap-0.5">
          <span className="font-bold flex items-center">
            <IndianRupee size={13} className="mr-0.5 stroke-[2.5]" />
            {reservationsData ? reservationsData.price : (listing.price ?? "N/A")}
          </span>
          <span className="font-normal text-gray-500 ml-1">
            {reservationsData ? "total" : "night"}
          </span>
        </p>
      </div>

      {showSecondaryBtn && onAction && (
        <div className="px-1 mt-1">
          <Button 
            variant="outline" 
            onClick={(e) => {
              e.stopPropagation(); // Avoid card click navigation
              onAction(e);
            }}
            className="w-full cursor-pointer border-red-200 hover:bg-red-50 hover:text-red-600 transition-colors text-xs py-1 h-8 rounded-xl"
          >
            {secondaryBtnLabel}
          </Button>
        </div>
      )}
    </motion.div>
  );
}
