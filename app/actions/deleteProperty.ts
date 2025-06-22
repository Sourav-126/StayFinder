"use server";

import { SessionUser } from "../types";
import { getAuthSession } from "../utils/auth";
import { prisma } from "../utils/prisma";

export const deleteProperty = async (id: string) => {
  const session = await getAuthSession();

  if (!session) return { ok: false, message: "Not Authorized", status: 403 };

  const res = await prisma.listing.deleteMany({
    where: {
      id: id,
      userId: (session.user as SessionUser).id,
    },
  });

  if (!res) {
    return { ok: false, message: "cannot find Property", status: 403 };
  }

  return { ok: true, message: "Property Deleted", status: 200 };
};
