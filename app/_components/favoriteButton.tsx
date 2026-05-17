"use client";

import useFavorite from "../../hooks/useFavorites";
import { cn } from "@/lib/utils";
import React from "react";

interface FavoriteProps extends React.SVGProps<SVGSVGElement> {
  listingId: string;
  user: {
    id: string;
    favoriteIds?: string[];
  } | null;
  className?: string;
}

import { motion } from "framer-motion";

function Favorite({ listingId, user, className, ...props }: FavoriteProps) {
  const { isFavorite, toggleFavorite } = useFavorite({
    listingId,
    user,
  });

  return (
    <motion.div
      onClick={(e) => {
        e.stopPropagation(); // Prevent card navigation
        toggleFavorite();
      }}
      whileHover={{ scale: 1.15 }}
      whileTap={{ scale: 0.85 }}
      animate={{ scale: isFavorite ? [1, 1.35, 0.9, 1] : 1 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className={cn("cursor-pointer drop-shadow-md filter hover:brightness-110 active:brightness-95 transition-all duration-200", className)}
    >
      <svg
        width={34}
        height={34}
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
        {...props}
        className="transition-colors duration-300"
        style={{
          color: isFavorite ? "#f43f5e" : "rgba(0, 0, 0, 0.45)",
          fill: isFavorite ? "#f43f5e" : "rgba(0, 0, 0, 0.3)",
          stroke: "#ffffff",
          strokeWidth: "1.6",
        }}
      >
        <path
          d="M7 3c-1.535 0-3.078.5-4.25 1.7-2.343 2.4-2.279 6.1 0 8.5L12 23l9.25-9.8c2.279-2.4 2.343-6.1 0-8.5-2.343-2.3-6.157-2.3-8.5 0l-.75.8-.75-.8C10.078 3.5 8.536 3 7 3"
        />
      </svg>
    </motion.div>
  );
}

export default Favorite;
