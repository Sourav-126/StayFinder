"use server";

import { prisma } from "../utils/prisma";
import { formatISO } from "date-fns";

export async function getListings(searchParams) {
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

    let query;

    query = {
      ...query,
      ...(locationvalue && { locationvalue }),
      ...(guestCount && { guestCount: { gte: +guestCount } }),
      ...(roomCount && { roomCount: { gte: +roomCount } }),
      ...(childCount && { childCount: { gte: +childCount } }),
      ...(cat && { category: cat }),
    };

    if (startDate && endDate) {
      const formattedStartDate = formatISO(new Date(startDate));
      const formattedEndDate = formatISO(new Date(endDate));
      query = {
        ...query,
        NOT: {
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
        },
      };
    }

    const listings = await prisma.listing.findMany({
      where: query,
      orderBy: {
        createdAt: "desc",
      },
    });

    const modifiedListings = listings.map((listing) => ({
      ...listing,
      createdAt: listing.createdAt.toISOString(),
    }));

    return modifiedListings;
  } catch (error: any) {
    return { ok: false, message: error.message };
  }
}
