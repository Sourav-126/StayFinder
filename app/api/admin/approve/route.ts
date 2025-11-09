// ...new file...
import { NextResponse } from "next/server";
import { prisma } from "@/app/utils/prisma";
import { verifyAdminToken } from "@/app/utils/email-service";

export async function GET(req: Request) {
  try {
    const url = new URL(req.url);
    const token = url.searchParams.get("token");
    const action = url.searchParams.get("action");

    if (!token || !action) {
      return NextResponse.json(
        { ok: false, message: "Invalid request" },
        { status: 400 }
      );
    }

    const decoded = verifyAdminToken(token);
    if (!decoded || !decoded.listingId) {
      return NextResponse.json(
        { ok: false, message: "Token invalid or expired" },
        { status: 400 }
      );
    }

    const listingId = decoded.listingId;

    if (action === "approve") {
      await prisma.listing.update({
        where: { id: listingId },
        data: { isApproved: true, adminApproved: new Date() },
      });
      return NextResponse.json({ ok: true, message: "Listing approved" });
    } else if (action === "reject") {
      await prisma.listing.delete({ where: { id: listingId } });
      return NextResponse.json({
        ok: true,
        message: "Listing rejected and removed",
      });
    }

    return NextResponse.json(
      { ok: false, message: "Unknown action" },
      { status: 400 }
    );
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { ok: false, message: "Server error" },
      { status: 500 }
    );
  }
}
