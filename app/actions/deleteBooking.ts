"use server";
import { getUser } from "./getUser";
import { prisma } from "../utils/prisma";
import type { SessionUser } from "../types";
export const deleteBooking = async (id: string) => {
  const user = await getUser();

  if (!user) {
    return null;
  }
  if (!id || typeof id !== "string") {
    return { ok: false, message: "Cannot delete the reservation", status: 402 };
  }

  const delBook = await prisma.reservation.deleteMany({
    where: {
      id: id,
      OR: [
        {
          userId: (user as SessionUser).id,
        },
        {
          Listing: {
            userId: (user as SessionUser).id,
          },
        },
      ],
    },
  });

  if (delBook) {
    return { ok: true, meesage: "deleted the reservation", status: 402 };
  }
  return { ok: false, message: "Cannot delete the reservation", status: 402 };
};
