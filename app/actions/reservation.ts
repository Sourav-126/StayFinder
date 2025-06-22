"use server";

import { SessionUser } from "../types";
import { getAuthSession } from "../utils/auth";
import { prisma } from "../utils/prisma";

export const getReservation = async () => {
  const session = await getAuthSession();

  if (!session || !session.user) {
    return null;
  }

  try {
    const reservation = await prisma.reservation.findMany({
      where: {
        userId: (session.user as SessionUser).id,
      },
      include: {
        Listing: true,
      },
    });
    return reservation;
  } catch {
    return { ok: false, message: "Some error Occurred", status: 500 };
  }
};

export async function setReservation({
  listingId,
  startDate,
  endDate,
  price,
}: {
  listingId: string;
  startDate: Date;
  endDate: Date;
  price: number;
}) {
  const session = await getAuthSession();
  if (!session || !session.user) {
    return { ok: false, message: "Not permitted", status: 403 };
  }

  if (!listingId || !startDate || !endDate || !price) {
    return { ok: false, message: "Missing Fields", status: 400 };
  }

  try {
    await prisma.listing.update({
      where: {
        id: listingId,
      },
      data: {
        reservation: {
          create: {
            startDate,
            endDate,
            userId: (session?.user as SessionUser).id,
            totalPrice: price,
          },
        },
      },
    });
    return { ok: true, message: "reserved", status: 201 };
  } catch {
    return { ok: false, message: "Not updated" };
  }
}
