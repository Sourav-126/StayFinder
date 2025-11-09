"use server";

import { ListingType } from "../types";
import { prisma } from "../utils/prisma";

export default async function getListingById(
  listingId: string
): Promise<ListingType | null> {
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
}
