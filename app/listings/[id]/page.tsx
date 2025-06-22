import getListingById from "@/app/actions/getListingById";
import useCountries from "@/hooks/useCountries";
import { Baby, House, IndianRupee, UserRound } from "lucide-react";
import Image from "next/image";
import { categories } from "../../../static/config";
import { ReservationComponent } from "@/app/_components/reservation-component";
import getReservationById from "@/app/actions/getReservations";
import Link from "next/link";

interface PageProps {
  params: {
    id: string;
  };
}

export default async function SingleListingPage({ params }: PageProps) {
  const data = await getListingById(params.id);
  const reservations = await getReservationById(params.id);
  const { getByValue } = useCountries();
  if (!reservations) {
    console.log("null reservation");
    return null;
  }

  if (data) {
    const country = getByValue(data.locationvalue);
    const foundedCategory = categories.filter(
      (each) => each.label == data?.category
    )[0];
    return (
      <div className="main-wrapper w-full md:w-[70%] mx-auto">
        <div className="p-4 md:p-8">
          <h1 className="font-bold text-xl sm:text-2xl md:text-5xl lg:text-7xl">
            {data?.title}
          </h1>
          <div className=" text-xl text-gray-500">
            {country?.label},&nbsp;
            {country?.region}
          </div>

          <Image
            className="w-[100%] rounded-lg mt-5 max-h-[550px] object-cover mb-5 "
            src={data.imageSrc ?? "/placeholder.svg"}
            height={100}
            width={200}
            alt={data?.title}
          />
          <div className="grid grid-cols-5 gap-10">
            <div className="left col-span-5 lg:col-span-3 space-y-4">
              <div className="flex items-center gap-2">
                <h5>
                  {" "}
                  Hosted by{" "}
                  <span className="font-medium">{data.User?.name} </span>
                  <p>
                    Listed on{" "}
                    {new Date(data.createdAt).toLocaleDateString("en-In", {
                      day: "numeric",
                      month: "short",
                      year: "numeric",
                    })}
                  </p>
                </h5>
                <Image
                  src={data.User?.image ?? "Anonymous"}
                  alt={data.User?.name ?? "Anonymous"}
                  width={40}
                  height={40}
                  className="rounded-full  "
                />
              </div>
              <hr />
              <div className="flex gap-4">
                <span className="p-4 px-5 bg-red-100/40 font-semibold rounded-lg flex flex-col items-center">
                  {" "}
                  <UserRound /> Guests :{data.guestCount}
                </span>
                <span className="p-4 px-5 bg-red-100/40 font-semibold rounded-lg flex flex-col items-center">
                  <House /> Rooms :{data.roomCount}
                </span>
                <span className="p-4 px-5 font-semibold bg-red-100/40 rounded-lg flex flex-col items-center">
                  <Baby />
                  Children :{data.childCount}
                </span>
              </div>
              <hr />
              <div className="flex gap-4 items-center">
                <foundedCategory.icon size={50} className="text-zinc-500" />
                <span className="text-sm  ">
                  <p className="text-xl font-semibold text-gray-800">
                    {foundedCategory.label}
                  </p>
                  <p>
                    {" "}
                    {foundedCategory.label} is the speciality of this Property
                  </p>{" "}
                </span>
              </div>
              <hr />
              <div>
                <span className="font-extrabold text-2xl">
                  air
                  <span className="text-red-400">cover</span>
                </span>
                <p>
                  Every booking includes free protection from Hosting
                  Cancellation, listing inaccuracies and other issues like
                  trouble
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
              )}{" "}
            </div>
            <div className="right col-span-5 lg:col-span-2">
              <div className="bg-gray-100 p-5 rounded-lg">
                <span className="flex gap-1 items-center">
                  <IndianRupee />{" "}
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
}
