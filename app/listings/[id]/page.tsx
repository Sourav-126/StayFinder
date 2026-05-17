import getListingById from "@/app/actions/getListingById";
import getReservationById from "@/app/actions/getReservations";
import { ReservationComponent } from "@/app/_components/reservation-component";
import { PendingApprovalBanner } from "@/app/_components/PendingApprovalBanner";
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
  const resolvedParams = use(params);

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
  {
    return (
      <div className="main-wrapper w-full md:w-[70%] mx-auto px-4 md:px-0">
        <div className="py-4 md:py-8">
          <h1 className="font-bold text-2xl xs:text-3xl sm:text-4xl md:text-5xl lg:text-7xl">
            {data.title}
          </h1>
          <div className="text-lg xs:text-xl text-gray-500 mt-1">
            {country?.label}, {country?.region}
          </div>

          <Image
            className="w-full rounded-lg mt-5 max-h-[550px] object-cover mb-5"
            src={data.imageSrc ?? "/placeholder.svg"}
            height={100}
            width={200}
            alt={data.title}
          />

          <div className="grid grid-cols-5 gap-6 lg:gap-10">
            <div className="left col-span-5 lg:col-span-3 space-y-5">
              <div className="flex items-center gap-4 bg-gray-50/80 border border-gray-100 p-4 rounded-2xl shadow-sm hover:shadow-md transition-shadow duration-300">
                {data.User?.image && (
                  <Image
                    src={data.User.image}
                    alt={data.User.name ?? "Host"}
                    width={50}
                    height={50}
                    className="rounded-full shadow-sm border border-gray-200"
                  />
                )}
                <div>
                  <h4 className="text-base font-bold text-gray-800">
                    Hosted by {data.User?.name}
                  </h4>
                  <p className="text-xs text-gray-500 font-medium">
                    Host since{" "}
                    {new Date(data.createdAt).toLocaleDateString("en-IN", {
                      month: "long",
                      year: "numeric",
                    })}
                  </p>
                </div>
              </div>

              <hr className="border-gray-100" />

              <div className="grid grid-cols-3 gap-3">
                <div className="p-3 xs:p-4 bg-red-50/40 border border-red-100/50 font-semibold rounded-2xl flex flex-col items-center text-center text-xs xs:text-sm md:text-base shadow-sm text-red-500 hover:bg-red-50/60 transition-colors duration-300">
                  <UserRound className="w-5 h-5 mb-1.5 stroke-[2]" />
                  <span className="text-gray-400 font-medium text-[10px] xs:text-xs mb-0.5">Guests</span>
                  {data.guestCount}
                </div>
                <div className="p-3 xs:p-4 bg-red-50/40 border border-red-100/50 font-semibold rounded-2xl flex flex-col items-center text-center text-xs xs:text-sm md:text-base shadow-sm text-red-500 hover:bg-red-50/60 transition-colors duration-300">
                  <House className="w-5 h-5 mb-1.5 stroke-[2]" />
                  <span className="text-gray-400 font-medium text-[10px] xs:text-xs mb-0.5">Rooms</span>
                  {data.roomCount}
                </div>
                <div className="p-3 xs:p-4 bg-red-50/40 border border-red-100/50 font-semibold rounded-2xl flex flex-col items-center text-center text-xs xs:text-sm md:text-base shadow-sm text-red-500 hover:bg-red-50/60 transition-colors duration-300">
                  <Baby className="w-5 h-5 mb-1.5 stroke-[2]" />
                  <span className="text-gray-400 font-medium text-[10px] xs:text-xs mb-0.5">Children</span>
                  {data.childCount}
                </div>
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
                      {foundedCategory.label} is the speciality of this
                      Property.
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
        {!data.isApproved && <PendingApprovalBanner />}
      </div>
    );
  }
}
