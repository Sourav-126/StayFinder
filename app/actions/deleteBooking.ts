"use server";
import { getUser } from "./getUser";
import { prisma } from "../utils/prisma";

export const deleteBooking = async (id) => {
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
          userId: (user as any).id,
        },
        {
          Listing: {
            userId: (user as any).id,
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
