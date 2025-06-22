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
  } catch {
    return { ok: false, message: "reservation not found" };
  }
}
