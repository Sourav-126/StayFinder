"use client";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Icons } from "./icons";
import { Circle, CircleUserRound, Search } from "lucide-react";
import { useState } from "react";
import { SearchModal } from "./searchModal";
import Link from "next/link";
export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [modalStateStep, setModalStateStep] = useState(-1);
  const openSearchModalStep = (step) => {
    if (!isOpen) {
      setIsOpen(true);
      setModalStateStep(step);
    }
  };
  return (
    <div className="flex justify-between items-center px-5 md:px-16 sm:px-20 py-3 bg-muted border-b">
      <div className="logo flex gap-1">
        <Icons.logo className="w-6" />
        <a href="/" className="text-red-400 font-semibold text-lg">
          {" "}
          StayFinder
        </a>
      </div>
      <div className="search_feature flex gap-3 items-center bg-white px-[6px] py-[7px] border-2 rounded-full">
        <div
          className="hover:bg-gray-200 transition-colors duration-200 delay-100 px-3 py-1 rounded-full cursor-pointer"
          onClick={() => {
            openSearchModalStep(0);
          }}
        >
          Location
        </div>
        <div className="bg-gray-400 h-[20px] w-[0.7px] "></div>
        <div
          className="hover:bg-gray-200 transition-colors duration-200 delay-100 px-3 py-1 rounded-full cursor-pointer"
          onClick={() => {
            openSearchModalStep(1);
          }}
        >
          Date
        </div>
        <div className="bg-gray-400 h-[20px] w-[0.7px] "></div>

        <div
          className="hover:bg-gray-200 transition-colors duration-200 delay-100 px-3 py-1 rounded-full cursor-pointer"
          onClick={() => {
            openSearchModalStep(2);
          }}
        >
          Details
        </div>
        <div
          onClick={() => openSearchModalStep(0)}
          className="bg-red-400 rounded-full p-1 text-white cursor-pointer hover:scale-105 transition-all duration-200 delay-100"
        >
          <Search />
        </div>
      </div>
      <div>
        <UserComponent />
      </div>
      <SearchModal
        key={modalStateStep}
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        stepAt={modalStateStep}
      />
    </div>
  );
}

const UserComponent = () => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <CircleUserRound />
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem className="cursor-pointer">
          <Link href="/bookings">My Bookings</Link>
        </DropdownMenuItem>
        <DropdownMenuItem className="cursor-pointer">
          <Link href="/favorites">My Favorites</Link>
        </DropdownMenuItem>
        <DropdownMenuItem className="cursor-pointer">
          <Link href="/properties">My Properties</Link>
        </DropdownMenuItem>
        <DropdownMenuItem className="cursor-pointer">
          <Link href="/sign-in">Login</Link>
        </DropdownMenuItem>
        <DropdownMenuItem className="cursor-pointer">
          <Link href="/sign-up"> Register </Link>
        </DropdownMenuItem>
        <hr />
        <DropdownMenuItem className="cursor-pointer">
          <Link href="/become-a-host"> StayPlace Your Home!</Link>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
