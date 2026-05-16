"use client";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Icons } from "./icons";
import { CircleUserRound, LogOut, Search } from "lucide-react";
import { useState } from "react";
import { SearchModal } from "./searchModal";
import Link from "next/link";
import { signOut } from "next-auth/react";
import { usePathname } from "next/navigation";
import type { SafeUser } from "../types";

type Step = 0 | 1 | 2;

interface NavbarProps {
  currentUser: SafeUser | null;
}

export default function Navbar({ currentUser }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [modalStateStep, setModalStateStep] = useState<Step>(0);
  const pathname = usePathname();

  const isAuthPage = pathname === "/sign-in" || pathname === "/sign-up";

  const openSearchModalStep = (step: Step) => {
    if (!isOpen) {
      setIsOpen(true);
      setModalStateStep(step);
    }
  };
  return (
    <div className="flex justify-between items-center px-5 md:px-16 sm:px-20 py-3 bg-muted border-b">
      <div className="logo flex gap-1">
        <Icons.logo className="w-6" />
        <Link href="/" className="text-red-400 font-semibold text-lg">
          {" "}
          StayFinder
        </Link>
      </div>
      {!isAuthPage && (
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
          <div className="bg-gray-800 h-[20px] w-[0.7px]"></div>

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
      )}
      <div>
        <UserComponent currentUser={currentUser} />
      </div>
      {!isAuthPage && (
        <SearchModal
          key={modalStateStep}
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          stepAt={modalStateStep}
        />
      )}
    </div>
  );
}

const UserComponent = ({ currentUser }: { currentUser: SafeUser | null }) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="flex items-center space-x-2 p-2 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer">
          {currentUser?.image ? (
            <img
              src={currentUser.image}
              alt="User Profile"
              className="h-8 w-8 rounded-full object-cover"
              referrerPolicy="no-referrer"
            />
          ) : (
            <CircleUserRound className="h-8 w-8 text-gray-600" />
          )}
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        {currentUser ? (
          <>
            <DropdownMenuItem className="cursor-pointer">
              <Link href="/bookings" className="w-full">My Bookings</Link>
            </DropdownMenuItem>
            <DropdownMenuItem className="cursor-pointer">
              <Link href="/favorites" className="w-full">My Favorites</Link>
            </DropdownMenuItem>
            <DropdownMenuItem className="cursor-pointer">
              <Link href="/properties" className="w-full">My Properties</Link>
            </DropdownMenuItem>
            <hr />
            <DropdownMenuItem className="cursor-pointer">
              <Link href="/become-a-host" className="w-full"> StayPlace Your Home!</Link>
            </DropdownMenuItem>
            <DropdownMenuItem
              className="cursor-pointer"
              onClick={() => {
                localStorage.clear();
                sessionStorage.clear();
                signOut({ callbackUrl: "/sign-in" });
              }}
            >
              <div className="flex gap-2 w-full">
                <LogOut />
                Logout
              </div>
            </DropdownMenuItem>
          </>
        ) : (
          <>
            <DropdownMenuItem className="cursor-pointer">
              <Link href="/sign-in" className="w-full font-semibold">Login</Link>
            </DropdownMenuItem>
            <DropdownMenuItem className="cursor-pointer">
              <Link href="/sign-up" className="w-full">Sign Up</Link>
            </DropdownMenuItem>
          </>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
