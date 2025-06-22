"use client";

import { deleteFavorite, setFavorite } from "../app/actions/favorites";
import { useRouter } from "next/navigation";
import { useCallback, useMemo } from "react";

export default function useFavorite({ listingId, user }) {
  const router = useRouter();

  const isFavorite = useMemo(() => {
    const list = user?.favoriteIds || [];

    return list.includes(listingId);
  }, [listingId, user]);

  const toggleFavorite = useCallback(async () => {
    if (!user) {
      return router.push("/sign-in");
    }
    try {
      if (isFavorite) {
        const res = await deleteFavorite(listingId);
        if (res.ok) {
          router.refresh();
        }
      } else {
        const res = await setFavorite(listingId);
        if (res.ok) {
          router.refresh();
        }
      }
    } catch (error: any) {
      console.error(error.message);
    }
  }, [listingId, user]);

  return {
    isFavorite,
    toggleFavorite,
  };
}
