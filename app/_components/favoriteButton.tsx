"use client";

import useFavorite from "../../hooks/useFavorites";
import { cn } from "@/lib/utils";
import React from "react";

function Favorite({ listingId, user, className, ...props }) {
  const { isFavorite, toggleFavorite } = useFavorite({
    listingId: listingId,
    user: user,
  });


  const color = isFavorite ? "red" : "black";

  return (
    <div
      onClick={toggleFavorite}
      className={cn("classname of my own", className)}
    >
      <svg
        width={40}
        height={40}
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
        {...props}
        style={{
          color: color,
        }}
      >
        <path
          d="M7 3c-1.535 0-3.078.5-4.25 1.7-2.343 2.4-2.279 6.1 0 8.5L12 23l9.25-9.8c2.279-2.4 2.343-6.1 0-8.5-2.343-2.3-6.157-2.3-8.5 0l-.75.8-.75-.8C10.078 3.5 8.536 3 7 3"
          fill="currentColor"
        />
      </svg>
    </div>
  );
}

export default Favorite;
