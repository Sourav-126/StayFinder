"use server";

import { getAuthSession } from "../utils/auth";
import { prisma } from "../utils/prisma";

export async function setReservation({ listingId, startDate, endDate, price }) {
  const session = await getAuthSession();
  if (!session || !session.user) {
    return { ok: false, message: "Not permitted", status: 403 };
  }

  if (!listingId || !startDate || !endDate || !price) {
    return { ok: false, message: "Missing Fields", status: 400 };
  }

  try {
    const listReservation = await prisma.listing.update({
      where: {
        id: listingId,
      },
      data: {
        reservation: {
          create: {
            startDate,
            endDate,
            userId: (session?.user as any).id,
            totalPrice: price,
          },
        },
      },
    });
    return { ok: true, message: "reserved", status: 201 };
  } catch (error: any) {
    console.log(error.message);
  }
}
