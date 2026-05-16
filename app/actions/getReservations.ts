"use server";
import { prisma } from "../utils/prisma";

export default async function getReservationById(listingId: string) {
  try {
    const reservations = await prisma.reservation.findMany({
      where: {
        listingId: listingId,
      },
      include: {
        Listing: true,
      },
    });
    return reservations;
  } catch (error: unknown) {
    console.error("Failed to fetch reservations, returning empty array:", error);
    return [];
  }
}
