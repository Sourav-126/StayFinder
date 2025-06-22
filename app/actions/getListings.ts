"use server";

import { prisma } from "../utils/prisma";
import { formatISO } from "date-fns";
import { Listing } from "@prisma/client";

interface SearchParams {
  locationValue?: string;
  guestCount?: number | string;
  roomCount?: number | string;
  childCount?: number | string;
  startDate?: string;
  endDate?: string;
  cat?: string;
}

export async function getListings(
  searchParams: SearchParams
): Promise<Listing[] | { ok: false; message: string }> {
  try {
    const {
      locationValue: locationvalue,
      guestCount,
      roomCount,
      childCount,
      startDate,
      endDate,
      cat,
    } = searchParams;

    let query: any = {};

    if (locationvalue) query.locationvalue = locationvalue;
    if (guestCount) query.guestCount = { gte: +guestCount };
    if (roomCount) query.roomCount = { gte: +roomCount };
    if (childCount) query.childCount = { gte: +childCount };
    if (cat) query.category = cat;

    if (startDate && endDate) {
      const formattedStartDate = formatISO(new Date(startDate));
      const formattedEndDate = formatISO(new Date(endDate));

      query.NOT = {
        reservation: {
          some: {
            OR: [
              {
                endDate: { gte: formattedStartDate },
                startDate: { lte: formattedEndDate },
              },
              {
                endDate: { gte: formattedEndDate },
                startDate: { lte: formattedStartDate },
              },
            ],
          },
        },
      };
    }

    const listings = await prisma.listing.findMany({
      where: query,
      orderBy: {
        createdAt: "desc",
      },
    });

    const modifiedListings: Listing[] = listings.map((listing) => ({
      ...listing,
      createdAt: listing.createdAt.toISOString() as any,
    }));

    return modifiedListings;
  } catch (error: any) {
    return { ok: false, message: error.message };
  }
}
