import getListingById from "@/app/actions/getListingById";
import getReservationById from "@/app/actions/getReservations";
import { ReservationComponent } from "@/app/_components/reservation-component";
import { categories } from "../../../static/config";
import { Baby, House, IndianRupee, UserRound } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import useCountries from "../../../hooks/useCountries";
import { use } from "react";

type PageProps = {
  params: Promise<{ id: string }>;
};

export default function SingleListingPageWrapper({ params }: PageProps) {
  const { getByValue } = useCountries();
  const resolvedParams = use(params); // Use React's `use()` hook to resolve the Promise

  return (
    <SingleListingPage id={resolvedParams.id} getCountryByValue={getByValue} />
  );
}

async function SingleListingPage({
  id,
  getCountryByValue,
}: {
  id: string;
  getCountryByValue: (
    value: string
  ) => { label: string; region: string } | undefined;
}) {
  const data = await getListingById(id);
  const reservations = await getReservationById(id);

  if (!data) return notFound();
  if (!Array.isArray(reservations)) return null;

  const country = getCountryByValue(data.locationvalue);
  const foundedCategory = categories.find((cat) => cat.label === data.category);

  return (
    <div className="main-wrapper w-full md:w-[70%] mx-auto">
      <div className="p-4 md:p-8">
        <h1 className="font-bold text-xl sm:text-2xl md:text-5xl lg:text-7xl">
          {data.title}
        </h1>
        <div className="text-xl text-gray-500">
          {country?.label}, {country?.region}
        </div>

        <Image
          className="w-full rounded-lg mt-5 max-h-[550px] object-cover mb-5"
          src={data.imageSrc ?? "/placeholder.svg"}
          height={100}
          width={200}
          alt={data.title}
        />

        <div className="grid grid-cols-5 gap-10">
          <div className="left col-span-5 lg:col-span-3 space-y-4">
            <div className="flex items-center gap-2">
              <h5>
                Hosted by <span className="font-medium">{data.User?.name}</span>
                <p>
                  Listed on{" "}
                  {new Date(data.createdAt).toLocaleDateString("en-IN", {
                    day: "numeric",
                    month: "short",
                    year: "numeric",
                  })}
                </p>
              </h5>
              {data.User?.image && (
                <Image
                  src={data.User.image}
                  alt={data.User.name ?? "Host"}
                  width={40}
                  height={40}
                  className="rounded-full"
                />
              )}
            </div>

            <hr />

            <div className="flex gap-4">
              <span className="p-4 px-5 bg-red-100/40 font-semibold rounded-lg flex flex-col items-center">
                <UserRound /> Guests: {data.guestCount}
              </span>
              <span className="p-4 px-5 bg-red-100/40 font-semibold rounded-lg flex flex-col items-center">
                <House /> Rooms: {data.roomCount}
              </span>
              <span className="p-4 px-5 font-semibold bg-red-100/40 rounded-lg flex flex-col items-center">
                <Baby /> Children: {data.childCount}
              </span>
            </div>

            <hr />

            {foundedCategory && (
              <div className="flex gap-4 items-center">
                <foundedCategory.icon size={50} className="text-zinc-500" />
                <div className="text-sm">
                  <p className="text-xl font-semibold text-gray-800">
                    {foundedCategory.label}
                  </p>
                  <p>
                    {foundedCategory.label} is the speciality of this Property.
                  </p>
                </div>
              </div>
            )}

            <hr />

            <div>
              <span className="font-extrabold text-2xl">
                air<span className="text-red-400">cover</span>
              </span>
              <p>
                Every booking includes free protection from Hosting
                Cancellation, listing inaccuracies, and other issues.
              </p>
              <Link href="/" className="font-bold underline">
                Learn more
              </Link>
            </div>

            <hr />

            {data.description && (
              <div
                className="description"
                dangerouslySetInnerHTML={{
                  __html: data.description.replaceAll(/\n/g, "<br/>"),
                }}
              ></div>
            )}
          </div>

          <div className="right col-span-5 lg:col-span-2">
            <div className="bg-gray-100 p-5 rounded-lg">
              <span className="flex gap-1 items-center">
                <IndianRupee />
                <span className="text-xl font-bold">{data.price}</span> /night
              </span>
              <ReservationComponent
                pricePerDay={data.price}
                listingId={data.id}
                reservation={reservations}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
