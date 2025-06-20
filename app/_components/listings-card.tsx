import useCountries from "@/hooks/useCountries";
import { IndianRupee } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
export const ListingCard = ({ listings }) => {
  const { getByValue } = useCountries();
  const countryDetails = getByValue(listings.locationvalue);
  return (
    <Link
      href={`/listings/${listings.id}`}
      className="p-3 rounded shadow border border-gray-200"
    >
      <div className=" w-full h-[240px] rounded-lg ">
        <Image
          className="object-cover aspect-square w-full rounded-lg "
          src={listings.imageSrc}
          height={400}
          width={400}
          alt="Property Listing"
        />
      </div>
      <p className="font-bold text-lg md:text-2xl capitalize pt-2">
        {" "}
        {listings.title}
      </p>
      <p className="text-lg flex gap-1 items-center">
        <IndianRupee size={16} />
        {listings.price} per Night
      </p>
      <div className="text-gray-500">
        {countryDetails?.label},&nbsp;
        {countryDetails?.region}
      </div>
    </Link>
  );
};
