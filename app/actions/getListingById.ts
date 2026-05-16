"use server";

import { ListingType } from "../types";
import { prisma } from "../utils/prisma";

export default async function getListingById(
  listingId: string
): Promise<ListingType | null> {
  try {
    const listing = await prisma.listing.findFirst({
      where: {
        id: listingId,
      },
      include: {
        User: {
          select: {
            name: true,
            image: true,
          },
        },
      },
    });

    return listing as ListingType | null;
  } catch (error: unknown) {
    console.error("Failed to fetch listing by ID:", error);
    return null;
  }
}
