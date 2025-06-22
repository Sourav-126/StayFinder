import { getUser } from "@/app/actions/getUser";
import { notFound } from "next/navigation";
import { getReservation } from "../../actions/reservation";
import { BookedCard } from "@/app/_components/bookedCard";

export default async function Bookings() {
  const user = await getUser();
  const data = await getReservation();
  console.log(data);

  if (!user) notFound();

  // Check if data is an error response

  if (!data || "ok" in data || data.length == 0) {
    return (
      <section className="h-screen grid place-items-center">
        <div className="text-center">
          <h1 className="font-semibold text-3xl">No Reservation Found!</h1>
          <a href="/" className="underline">
            Book yours today!
          </a>
        </div>
      </section>
    );
  }

  return (
    <div className="p-4 md:p-8">
      <div className="grid grid-cols-3 md:grid-cols-6 gap-2">
        {data.map((reserve, index) => (
          <BookedCard key={index} reservation={reserve} index={index} />
        ))}
      </div>
    </div>
  );
}
