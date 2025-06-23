"use server";
import { prisma } from "../utils/prisma";
import { getUser } from "./getUser";

export async function getFavoriteListings() {
  const user = await getUser();

  if (!user || "ok" in user) {
    return { ok: false, message: "Not authenticated", status: "403" };
  }
  try {
    const favoriteListings = await prisma.listing.findMany({
      where: {
        id: {
          in: [...(user.favoritesIds || [])],
        },
      },
    });
    return { ok: true, data: favoriteListings, status: "200" };
  } catch {
    return { ok: false, message: "Could not find favorites", status: "500" };
  }
}

export async function setFavorite(id: string) {
  const user = await getUser();
  if (!user || "ok" in user) {
    return { ok: false, message: "Not authenticated", status: "403" };
  }
  if (!id || typeof id !== "string") {
    return { ok: false, message: "Invalid ID", status: "400" };
  }
  const favoritesIds = [...(user.favoritesIds || [])];
  if (favoritesIds.includes(id)) {
    return { ok: true, message: "Already in favorites" };
  }
  favoritesIds.push(id);
  try {
    await prisma.user.update({
      where: { id: user.id },
      data: {
        favoritesIds,
      },
    });
    return { ok: true, message: "Added to favorites" };
  } catch {
    return { ok: false, message: "Could not add to favorites", status: "500" };
  }
}

export async function deleteFavorite(id: string) {
  const user = await getUser();

  if (!user || "ok" in user) {
    return { ok: false, message: "Not authenticated", status: "403" };
  }
  if (!id || typeof id !== "string") {
    return { ok: false, message: "Invalid ID", status: "400" };
  }
  let favoritesIds = [...(user.favoritesIds || [])];
  favoritesIds = favoritesIds.filter((each) => each !== id);
  try {
    await prisma.user.update({
      where: { id: user.id },
      data: {
        favoritesIds,
      },
    });
    return { ok: true, message: "Removed from favorites" };
  } catch {
    return {
      ok: false,
      message: "Could not remove from favorites",
      status: "500",
    };
  }
}
