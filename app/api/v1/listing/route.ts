import { getAuthSession } from "@/app/utils/auth";
import { NextResponse } from "next/server";
import { prisma } from "@/app/utils/prisma";
import { SessionUser } from "@/app/types";

export async function POST(request: Request) {
  const body = await request.json();
  const session = await getAuthSession();

  if (!session || !session.user) {
    return NextResponse.json({ message: "Not Authorized" }, { status: 403 });
  }

  const {
    category,
    title,
    description,
    roomCount,
    childCount,
    guestCount,
    location,
    price,
    imageSrc,
  } = body;

  try {
    const newListing = await prisma.listing.create({
      data: {
        title,
        description,
        childCount,
        roomCount,
        imageSrc,
        category,
        guestCount,
        price: parseInt(price),
        locationvalue: location.value,
        userId: (session.user as SessionUser).id,
      },
    });

    return NextResponse.json(
      { message: "Listing Created", listing: newListing },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating listing:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
