"use client";
import { motion } from "framer-motion";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Icons } from "./icons";
import { CircleUserRound, LogOut, Search, MapPin, Compass, Palmtree, Home, Building2, Trees, Menu, Calendar, Heart, Globe } from "lucide-react";
import { useState, useEffect } from "react";
import { SearchModal } from "./searchModal";
import Link from "next/link";
import Image from "next/image";
import { signOut } from "next-auth/react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import type { SafeUser, CountrySelectValue } from "../types";
import { CountrySelect } from "./country-select";
import { CalenderInput } from "./calender";
import { Counter } from "./counter-input";
import { Range } from "react-date-range";

type Step = 0 | 1 | 2;

interface NavbarProps {
  currentUser: SafeUser | null;
}

export default function Navbar({ currentUser }: NavbarProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const isHomePage = pathname === "/";

  // Mobile Modal State
  const [isOpen, setIsOpen] = useState(false);
  const [modalStateStep, setModalStateStep] = useState<Step>(0);

  // Desktop Scroll State
  const [isScrolled, setIsScrolled] = useState(false);

  // Desktop Floating Dropdown States
  const [activeStep, setActiveStep] = useState<Step | null>(null);
  const [location, setLocation] = useState<CountrySelectValue | null>(null);
  const [guestCount, setGuestCount] = useState<number>(2);
  const [roomCount, setRoomCount] = useState<number>(1);
  const [childCount, setChildCount] = useState<number>(0);
  const [dateRange, setDateRange] = useState<Range>({
    startDate: new Date(),
    endDate: new Date(),
    key: "selection",
  });

  const isAuthPage = pathname === "/sign-in" || pathname === "/sign-up";

  // Prevent scroll shift layout breaks on mobile, keep navbar locked to compact single-row
  useEffect(() => {
    const handleScroll = () => {
      if (window.innerWidth < 640 || !isHomePage) {
        setIsScrolled(true);
        return;
      }
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll);
    window.addEventListener("resize", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, [isHomePage]);

  // Handle click outside to close desktop dropdowns
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (!target.closest(".search_feature") && !target.closest(".modal-content")) {
        setActiveStep(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const openSearchModalStep = (step: Step) => {
    if (!isOpen) {
      setIsOpen(true);
      setModalStateStep(step);
    }
  };

  const handleSegmentClick = (step: Step) => {
    setActiveStep(activeStep === step ? null : step);
  };

  const handleSearch = () => {
    const trackOfQueryParams: Record<string, string> = {
      ...(location?.value && { locationValue: location.value }),
      ...(guestCount && { guestCount: String(guestCount) }),
      ...(roomCount && { roomCount: String(roomCount) }),
      ...(childCount && { childCount: String(childCount) }),
      ...(dateRange.startDate &&
        dateRange.endDate && {
        startDate: dateRange.startDate.toISOString(),
        endDate: dateRange.endDate.toISOString(),
      }),
    };

    if (Object.keys(trackOfQueryParams).length === 0) return;

    const params = new URLSearchParams(searchParams.toString());
    const tempCat = params.get("cat");

    const queryString = new URLSearchParams(trackOfQueryParams).toString();
    const url = `/?${queryString}${tempCat ? `&cat=${tempCat}` : ""}`;

    setActiveStep(null);
    router.push(url);
  };

  return (
    <motion.header
      className={`sticky top-0 z-40 bg-white border-b border-gray-200/80 transition-all duration-300 ${
        isScrolled ? "shadow-sm py-2 xs:py-3" : "py-4 md:py-5 pb-6 md:pb-8"
      }`}
    >
      <div className="max-w-[2520px] mx-auto px-3 xs:px-6 sm:px-16 md:px-20">
        {/* Layout when scrolled down (compact single-row navbar) */}
        {isScrolled ? (
          <div className="flex justify-between items-center w-full gap-2">
            {/* Logo */}
            <motion.div
              initial={{ opacity: 0, x: -15 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ type: "spring", stiffness: 200, damping: 18 }}
              className="logo flex gap-1 items-center shrink-0"
            >
              <Icons.logo className="w-5 xs:w-6" />
              <Link href="/" className="hidden xs:inline text-red-400 font-semibold text-base sm:text-lg">
                StayFinder
              </Link>
            </motion.div>

            {/* Compact Search Bar */}
            {!isAuthPage && (
              <motion.div
                layoutId="search-bar"
                onClick={() => openSearchModalStep(0)}
                className="search_feature select-none border border-gray-200/80 bg-white shadow-sm hover:shadow-[0_8px_30px_rgb(0,0,0,0.06)] hover:border-red-200/80 transition-all duration-300 rounded-full flex items-center justify-between gap-1 xs:gap-2 px-2.5 xs:px-3 py-1 xs:py-1.5 min-w-0"
              >
                <div className="flex items-center gap-1.5 xs:gap-3 px-1 xs:px-2 text-[10px] xs:text-xs">
                  <span className="font-bold text-gray-800 tracking-wide whitespace-nowrap">Anywhere</span>
                  <div className="bg-gray-200 h-3 w-[1px] shrink-0"></div>
                  <span className="font-bold text-gray-800 tracking-wide whitespace-nowrap">Anytime</span>
                  <div className="bg-gray-200 h-3 w-[1px] shrink-0"></div>
                  <span className="text-gray-400 font-medium whitespace-nowrap">Add guests</span>
                </div>
                <motion.div 
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-red-400 text-white rounded-full p-1 xs:p-1.5 flex items-center justify-center shadow-sm shadow-red-400/20 shrink-0"
                >
                  <Search className="w-2.5 h-2.5 xs:w-3.5 xs:h-3.5 stroke-[2.5]" />
                </motion.div>
              </motion.div>
            )}

            {/* Profile Dropdown */}
            <div className="shrink-0">
              <UserComponent currentUser={currentUser} />
            </div>
          </div>
        ) : (
          /* Layout when at the top (expanded two-row navbar on desktop, clean responsive on mobile) */
          <div className="flex flex-col gap-6 md:gap-8 w-full pt-1">
            <div className="flex justify-between items-center w-full">
              {/* Logo */}
              <motion.div
                initial={{ opacity: 0, x: -15 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ type: "spring", stiffness: 200, damping: 18 }}
                className="logo flex gap-1 items-center"
              >
                <Icons.logo className="w-6" />
                <Link href="/" className="hidden xs:inline text-red-400 font-semibold text-lg">
                  StayFinder
                </Link>
              </motion.div>

              {/* Profile Dropdown */}
              <div>
                <UserComponent currentUser={currentUser} />
              </div>
            </div>

            {/* Large Expanded Search Bar */}
            {!isAuthPage && (
              <div className="flex justify-center w-full relative">
                <motion.div
                  layoutId="search-bar"
                  className="search_feature relative select-none border border-gray-200/80 bg-white shadow-md hover:shadow-[0_12px_40px_rgb(0,0,0,0.08)] hover:border-red-200/80 transition-all duration-300 rounded-full cursor-pointer w-full max-w-[850px]"
                >
                  {/* Mobile Taller Search Bar (< sm) */}
                  <div 
                    onClick={() => openSearchModalStep(0)}
                    className="flex sm:hidden items-center justify-between gap-2 px-4 py-2 w-full hover:bg-gray-50/50 rounded-full transition-colors duration-200"
                  >
                    <div className="flex flex-col text-left min-w-0">
                      <span className="font-bold text-xs xs:text-sm text-gray-800 tracking-wide truncate">Anywhere</span>
                      <span className="text-[10px] xs:text-xs text-gray-400 font-medium truncate">Any week • Add guests</span>
                    </div>
                    <motion.div 
                      whileTap={{ scale: 0.9 }}
                      className="bg-red-400 text-white rounded-full p-2 xs:p-2.5 flex items-center justify-center shadow-sm shadow-red-400/20 shrink-0"
                    >
                      <Search className="w-3.5 h-3.5 xs:w-4 xs:h-4 stroke-[2.5]" />
                    </motion.div>
                  </div>

                  {/* Desktop Expanded Search Bar (>= sm) */}
                  <div className="hidden sm:flex items-center px-[6px] py-[6px] w-full">
                    <motion.div
                      whileHover={{ backgroundColor: "rgba(0,0,0,0.03)" }}
                      onClick={() => handleSegmentClick(0)}
                      className={`flex-1 px-6 py-2 rounded-full cursor-pointer flex flex-col items-start transition-all duration-200 ${
                        activeStep === 0 ? "bg-white hover:bg-white shadow-[0_4px_20px_rgba(0,0,0,0.08)] border border-gray-100" : ""
                      }`}
                    >
                      <span className="text-[10px] md:text-[11px] font-bold text-gray-800 uppercase tracking-wider">Where</span>
                      <span className="text-xs md:text-sm text-gray-800 font-medium whitespace-nowrap truncate max-w-[150px]">
                        {location ? location.label : "Search destinations"}
                      </span>
                    </motion.div>
                    
                    <div className="bg-gray-200 h-8 w-[1px] self-center"></div>
                    
                    <motion.div
                      whileHover={{ backgroundColor: "rgba(0,0,0,0.03)" }}
                      onClick={() => handleSegmentClick(1)}
                      className={`flex-1 px-6 py-2 rounded-full cursor-pointer flex flex-col items-start transition-all duration-200 ${
                        activeStep === 1 ? "bg-white hover:bg-white shadow-[0_4px_20px_rgba(0,0,0,0.08)] border border-gray-100" : ""
                      }`}
                    >
                      <span className="text-[10px] md:text-[11px] font-bold text-gray-800 uppercase tracking-wider">When</span>
                      <span className="text-xs md:text-sm text-gray-800 font-medium whitespace-nowrap truncate max-w-[150px]">
                        {dateRange.startDate && dateRange.endDate && dateRange.startDate.toDateString() !== new Date().toDateString()
                          ? `${dateRange.startDate.toLocaleDateString("en-US", { month: "short", day: "numeric" })} - ${dateRange.endDate.toLocaleDateString("en-US", { month: "short", day: "numeric" })}`
                          : "Add dates"
                        }
                      </span>
                    </motion.div>
                    
                    <div className="bg-gray-200 h-8 w-[1px] self-center"></div>
                    
                    <motion.div
                      whileHover={{ backgroundColor: "rgba(0,0,0,0.03)" }}
                      onClick={() => handleSegmentClick(2)}
                      className={`flex-1 px-6 py-2 rounded-full cursor-pointer flex flex-col items-start transition-all duration-200 ${
                        activeStep === 2 ? "bg-white hover:bg-white shadow-[0_4px_20px_rgba(0,0,0,0.08)] border border-gray-100" : ""
                      }`}
                    >
                      <span className="text-[10px] md:text-[11px] font-bold text-gray-800 uppercase tracking-wider">Who</span>
                      <span className="text-xs md:text-sm text-gray-800 font-medium whitespace-nowrap truncate max-w-[150px]">
                        {guestCount > 0 ? `${guestCount} guest${guestCount > 1 ? "s" : ""}` : "Add guests"}
                      </span>
                    </motion.div>

                    <motion.div
                      whileHover={{ scale: 1.03, backgroundColor: "#e11d48" }}
                      whileTap={{ scale: 0.97 }}
                      onClick={(e) => {
                        e.stopPropagation();
                        handleSearch();
                      }}
                      className="bg-rose-500 hover:bg-rose-600 text-white rounded-full px-5 py-2.5 ml-2 flex items-center gap-2 shadow-lg shadow-rose-500/20 transition-all duration-200 shrink-0 font-semibold text-sm"
                    >
                      <Search className="w-4 h-4 stroke-[2.5]" />
                      <span>Search</span>
                    </motion.div>
                  </div>

                  {/* Airbnb Floating Dropdowns */}
                  {activeStep !== null && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      transition={{ duration: 0.2 }}
                      className={`absolute top-full mt-3 bg-white border border-gray-150 rounded-3xl shadow-[0_16px_40px_rgba(0,0,0,0.08)] z-50 p-6 ${
                        activeStep === 0 ? "left-0 w-[420px]" : 
                        activeStep === 1 ? "left-1/2 -translate-x-1/2 w-auto" : 
                        "right-0 w-[400px]"
                      }`}
                    >
                      {activeStep === 0 && (
                        <div className="space-y-4">
                          <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wider pl-1">Suggested destinations</h3>
                          <div className="max-h-[260px] overflow-y-auto space-y-1 pr-1 scrollbar-thin">
                            {[
                              { name: "France", desc: "Europe's cultural heart", value: "FR", latlng: [46, 2], region: "Europe", icon: Compass },
                              { name: "Japan", desc: "Land of the rising sun", value: "JP", latlng: [36, 138], region: "Asia", icon: Palmtree },
                              { name: "United States", desc: "Vibrant cities & landmarks", value: "US", latlng: [37, -95], region: "Americas", icon: MapPin },
                              { name: "Italy", desc: "Rich history and culinary art", value: "IT", latlng: [43, 12], region: "Europe", icon: Home },
                              { name: "United Kingdom", desc: "Royal heritage and landscapes", value: "GB", latlng: [55, -3], region: "Europe", icon: Building2 },
                              { name: "Canada", desc: "Stunning nature & vast lakes", value: "CA", latlng: [56, -106], region: "Americas", icon: Trees }
                            ].map((dest, i) => {
                              const DestIcon = dest.icon;
                              return (
                                <div 
                                  key={i}
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    setLocation({
                                      value: dest.value,
                                      label: dest.name,
                                      latlng: dest.latlng,
                                      region: dest.region
                                    });
                                    // Auto transition to "When" date picker for premium UX
                                    setActiveStep(1);
                                  }}
                                  className="flex items-center gap-3.5 p-2.5 rounded-2xl hover:bg-gray-50 cursor-pointer transition-colors duration-150"
                                >
                                  <div className="bg-gray-100 p-2.5 rounded-xl text-gray-500">
                                    <DestIcon className="w-5 h-5" />
                                  </div>
                                  <div className="text-left">
                                    <div className="text-sm font-bold text-gray-800">{dest.name}</div>
                                    <div className="text-xs text-gray-400 font-medium">{dest.desc}</div>
                                  </div>
                                </div>
                              );
                            })}
                          </div>
                          <div className="border-t pt-3">
                            <CountrySelect
                              value={location}
                              onChange={(val) => {
                                setLocation(val);
                                setActiveStep(1);
                              }}
                            />
                          </div>
                        </div>
                      )}

                      {activeStep === 1 && (
                        <div className="flex flex-col items-center">
                          <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-3">Select Dates</h3>
                          <div className="w-full max-w-[600px] overflow-x-auto rounded-2xl border border-gray-100 shadow-sm p-1">
                            <CalenderInput
                              value={dateRange}
                              onChange={(ranges) => setDateRange(ranges.selection)}
                            />
                          </div>
                        </div>
                      )}

                      {activeStep === 2 && (
                        <div className="space-y-4">
                          <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Guests & Rooms</h3>
                          <div className="space-y-4 divide-y divide-gray-150">
                            <div className="flex justify-between items-center py-2 gap-4">
                              <div className="text-left">
                                <h4 className="text-sm font-bold text-gray-800">Adults</h4>
                                <p className="text-xs text-gray-400 font-medium">Ages 13 or above</p>
                              </div>
                              <Counter value={guestCount} onChange={setGuestCount} />
                            </div>
                            
                            <div className="flex justify-between items-center pt-4 gap-4">
                              <div className="text-left">
                                <h4 className="text-sm font-bold text-gray-800">Rooms</h4>
                                <p className="text-xs text-gray-400 font-medium">Rooms needed</p>
                              </div>
                              <Counter value={roomCount} onChange={setRoomCount} />
                            </div>

                            <div className="flex justify-between items-center pt-4 gap-4">
                              <div className="text-left">
                                <h4 className="text-sm font-bold text-gray-800">Children</h4>
                                <p className="text-xs text-gray-400 font-medium">Ages 2-12</p>
                              </div>
                              <Counter value={childCount} onChange={setChildCount} />
                            </div>
                          </div>
                        </div>
                      )}
                    </motion.div>
                  )}
                </motion.div>
              </div>
            )}
          </div>
        )}
      </div>

      {!isAuthPage && (
        <SearchModal
          key={modalStateStep}
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          stepAt={modalStateStep}
        />
      )}
    </motion.header>
  );
}

const UserComponent = ({ currentUser }: { currentUser: SafeUser | null }) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="flex items-center gap-3 pl-3 pr-1.5 py-1.5 border border-gray-200/80 rounded-full hover:shadow-[0_2px_12px_rgba(0,0,0,0.08)] transition-all bg-white cursor-pointer select-none">
          <Menu className="h-4 w-4 text-gray-600 stroke-[2.5]" />
          {currentUser?.image ? (
            <Image
              src={currentUser.image}
              alt="User Profile"
              width={28}
              height={28}
              className="h-7 w-7 rounded-full object-cover shadow-sm"
              referrerPolicy="no-referrer"
            />
          ) : (
            <div className="bg-gray-100 rounded-full p-0.5 text-gray-500">
              <CircleUserRound className="h-6 w-6" />
            </div>
          )}
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent 
        align="end" 
        className="w-[240px] rounded-2xl bg-white border border-gray-100 shadow-[0_12px_36px_rgba(0,0,0,0.12)] p-2 mt-2 z-[100]"
      >
        {currentUser ? (
          <div className="space-y-1">
            <DropdownMenuItem className="cursor-pointer rounded-xl py-2 px-3 focus:bg-gray-50 hover:bg-gray-50 flex items-center gap-3 text-gray-700 transition-colors">
              <Calendar className="h-4 w-4 text-gray-500" />
              <Link href="/bookings" className="w-full text-sm font-medium">My Bookings</Link>
            </DropdownMenuItem>
            
            <DropdownMenuItem className="cursor-pointer rounded-xl py-2 px-3 focus:bg-gray-50 hover:bg-gray-50 flex items-center gap-3 text-gray-700 transition-colors">
              <Heart className="h-4 w-4 text-gray-500" />
              <Link href="/favorites" className="w-full text-sm font-medium">My Favorites</Link>
            </DropdownMenuItem>
            
            <DropdownMenuItem className="cursor-pointer rounded-xl py-2 px-3 focus:bg-gray-50 hover:bg-gray-50 flex items-center gap-3 text-gray-700 transition-colors">
              <Home className="h-4 w-4 text-gray-500" />
              <Link href="/properties" className="w-full text-sm font-medium">My Properties</Link>
            </DropdownMenuItem>
            
            <div className="border-t border-gray-100 my-1"></div>
            
            <DropdownMenuItem className="cursor-pointer rounded-xl py-2 px-3 focus:bg-gray-50 hover:bg-gray-50 flex items-center gap-3 text-gray-700 transition-colors">
              <Globe className="h-4 w-4 text-gray-500" />
              <Link href="/become-a-host" className="w-full text-sm font-semibold text-rose-500">StayPlace Your Home!</Link>
            </DropdownMenuItem>
            
            <DropdownMenuItem
              className="cursor-pointer rounded-xl py-2 px-3 focus:bg-rose-50 hover:bg-rose-50 flex items-center gap-3 text-red-600 transition-colors"
              onClick={() => {
                localStorage.clear();
                sessionStorage.clear();
                signOut({ callbackUrl: "/sign-in" });
              }}
            >
              <LogOut className="h-4 w-4" />
              <span className="text-sm font-medium">Logout</span>
            </DropdownMenuItem>
          </div>
        ) : (
          <div className="space-y-1">
            <DropdownMenuItem className="cursor-pointer rounded-xl py-2 px-3 focus:bg-gray-50 hover:bg-gray-50 text-gray-800 transition-colors">
              <Link href="/sign-in" className="w-full text-sm font-semibold">Login</Link>
            </DropdownMenuItem>
            <DropdownMenuItem className="cursor-pointer rounded-xl py-2 px-3 focus:bg-gray-50 hover:bg-gray-50 text-gray-500 transition-colors">
              <Link href="/sign-up" className="w-full text-sm font-medium">Sign Up</Link>
            </DropdownMenuItem>
          </div>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
