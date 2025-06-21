import { getAuthSession } from "../utils/auth";
import { prisma } from "../utils/prisma";

export const getUser = async () => {
  const session = await getAuthSession();

  if (!session || !session.user) {
    return null;
  }
  if (!session.user.email) {
    return null;
  }
  try {
    const currentUser = await prisma.user.findUnique({
      where: {
        email: session.user.email,
      },
    });
    if (!currentUser) {
      return null;
    }

    return currentUser;
  } catch (error) {
    return { ok: false, message: "User not Found", status: "401" };
  }
};
