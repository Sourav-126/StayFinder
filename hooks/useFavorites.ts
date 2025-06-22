"use client";

import { deleteFavorite, setFavorite } from "@/app/actions/favorites";
import { useRouter } from "next/navigation";
import { useCallback, useMemo } from "react";

interface User {
  id: string;
  email?: string;
  name?: string;
  favoriteIds?: string[];
}

interface UseFavoriteProps {
  listingId: string;
  user: User | null;
}

export default function useFavorite({ listingId, user }: UseFavoriteProps) {
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
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error(error.message);
      } else {
        console.error("An unknown error occurred in toggleFavorite.");
      }
    }
  }, [isFavorite, listingId, router, user]);

  return {
    isFavorite,
    toggleFavorite,
  };
}
