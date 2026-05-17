"use client";
import { motion } from "framer-motion";
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
import Image from "next/image";
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
    <div className="flex justify-between items-center px-3 xs:px-6 sm:px-16 md:px-20 py-3 bg-muted border-b">
      <motion.div
        initial={{ opacity: 0, x: -15 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ type: "spring", stiffness: 200, damping: 18 }}
        className="logo flex gap-1 items-center"
      >
        <Icons.logo className="w-6" />
        <Link href="/" className="hidden xs:inline text-red-400 font-semibold text-lg">
          {" "}
          StayFinder
        </Link>
      </motion.div>
      {!isAuthPage && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: "spring", stiffness: 200, damping: 18 }}
          className="search_feature flex gap-1 xs:gap-3 items-center bg-white px-1.5 xs:px-[6px] py-1 xs:py-[7px] border-2 rounded-full text-[10px] xs:text-xs sm:text-sm hover:shadow-[0_0_15px_rgba(239,68,68,0.12)] hover:border-red-200 transition-all duration-300"
        >
          <div
            className="hover:bg-gray-100 transition-colors duration-200 px-1.5 xs:px-3 py-0.5 xs:py-1 rounded-full cursor-pointer font-medium"
            onClick={() => {
              openSearchModalStep(0);
            }}
          >
            Location
          </div>
          <div className="bg-gray-200 h-[12px] xs:h-[20px] w-[0.7px]"></div>
          <div
            className="hover:bg-gray-100 transition-colors duration-200 px-1.5 xs:px-3 py-0.5 xs:py-1 rounded-full cursor-pointer font-medium"
            onClick={() => {
              openSearchModalStep(1);
            }}
          >
            Date
          </div>
          <div className="bg-gray-200 h-[12px] xs:h-[20px] w-[0.7px]"></div>

          <div
            className="hover:bg-gray-100 transition-colors duration-200 px-1.5 xs:px-3 py-0.5 xs:py-1 rounded-full cursor-pointer font-medium"
            onClick={() => {
              openSearchModalStep(2);
            }}
          >
            Details
          </div>
          <motion.div
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => openSearchModalStep(0)}
            className="bg-red-400 rounded-full p-1.5 text-white cursor-pointer hover:bg-red-500 transition-colors flex items-center justify-center"
          >
            <Search className="w-3.5 h-3.5 xs:w-4 xs:h-4" />
          </motion.div>
        </motion.div>
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
            <Image
              src={currentUser.image}
              alt="User Profile"
              width={32}
              height={32}
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
