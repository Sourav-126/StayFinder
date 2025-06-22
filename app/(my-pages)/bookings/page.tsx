import { getUser } from "@/app/actions/getUser";
import { notFound } from "next/navigation";
import { getReservation } from "../../actions/reservation";
import { BookedCard } from "@/app/_components/bookedCard";

import Link from "next/link";
import { Reservation, Listing } from "@/app/types";

export type SafeReservation = Omit<Reservation, "Listing" | "userId"> & {
  userId: string;
  Listing: Listing & {
    imageSrc: string;
    userId: string;
  };
};

export default async function Bookings() {
  const user = await getUser();
  const data = await getReservation();

  if (!user) notFound();

  if (!data || "ok" in data || data.length === 0) {
    return (
      <section className="h-screen grid place-items-center">
        <div className="text-center">
          <h1 className="font-semibold text-3xl">No Reservation Found!</h1>
          <Link href="/" className="underline">
            Book yours today!
          </Link>
        </div>
      </section>
    );
  }

  const safeReservations: SafeReservation[] = data
    .filter((reservation) => reservation.Listing && reservation.listingId)
    .map((reservation) => ({
      ...reservation,
      userId: reservation.userId ?? reservation.Listing!.userId ?? "",
      listingId: reservation.listingId ?? "",
      Listing: {
        ...reservation.Listing!,
        imageSrc: reservation.Listing?.imageSrc ?? "/fallback.jpg",
        userId: reservation.Listing?.userId ?? "",
        createdAt: reservation.Listing!.createdAt.toString(),
        updatedAt: reservation.Listing!.updatedAt.toString(),
      },
    }));

  return (
    <div className="p-4 md:p-8">
      <div className="grid grid-cols-3 md:grid-cols-6 gap-2">
        {safeReservations.map((reserve, index) => (
          <BookedCard key={index} reservation={reserve} index={index} />
        ))}
      </div>
    </div>
  );
}
