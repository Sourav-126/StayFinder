"use client";

import { useState, useTransition, useEffect, Suspense } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { categories } from "@/static/config";
import { useSearchParams, useRouter } from "next/navigation";
import { cn } from "@/lib/utils";

function CategoryHandlerContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const activeCat = searchParams.get("cat");

  const [isPending, startTransition] = useTransition();
  const [selectedCat, setSelectedCat] = useState<string | null>(null);

  // Sync selectedCat back to null once activeCat completes its router update
  useEffect(() => {
    setSelectedCat(null);
  }, [activeCat]);

  const params = new URLSearchParams(searchParams.toString());
  const setCategory = (cat: string) => {
    setSelectedCat(cat);
    startTransition(() => {
      params.set("cat", cat);
      router.push(`?${params.toString()}`);
    });
  };

  const currentActive = selectedCat !== null ? selectedCat : activeCat;

  return (
    <div className="relative w-full bg-white select-none">
      {/* Sleek top glowing progress loader that crawls across when fetching data in background */}
      <AnimatePresence>
        {isPending && (
          <motion.div
            initial={{ width: "0%", opacity: 1 }}
            animate={{ width: "85%", opacity: 1 }}
            exit={{ width: "100%", opacity: 0 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            className="absolute top-0 left-0 h-[2.5px] bg-gradient-to-r from-red-500 to-rose-600 shadow-[0_0_8px_rgba(244,63,94,0.5)] z-50"
          />
        )}
      </AnimatePresence>

      <div className="flex px-4 xs:px-8 w-full justify-start md:justify-around py-3 border-b border-gray-100 overflow-x-auto gap-4 md:gap-0 scrollbar-none bg-white">
        {categories.map((cat) => {
          const Icon = cat.icon;
          const isActive = currentActive === cat.label;
          return (
            <div
              onClick={() => setCategory(cat.label)}
              key={cat.label}
              className={cn(
                "flex flex-col gap-1.5 items-center cursor-pointer px-4 py-2.5 rounded-xl hover:bg-red-50/40 relative group transition-all duration-300",
                isActive && "bg-red-50/50"
              )}
            >
              <motion.div
                whileHover={{ rotate: [0, -10, 10, -6, 6, 0] }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
                className={cn(
                  "text-gray-400 group-hover:text-red-400 transition-colors duration-300",
                  isActive && "text-red-500"
                )}
              >
                <Icon className="w-5 h-5 xs:w-6 xs:h-6" />
              </motion.div>
              <span
                className={cn(
                  "text-[10px] xs:text-xs font-semibold text-gray-500 group-hover:text-red-400 transition-colors duration-300 select-none",
                  isActive && "text-red-500"
                )}
              >
                {cat.label}
              </span>
              {isActive && (
                <motion.div
                  layoutId="activeCategoryUnderline"
                  className="absolute bottom-0 left-4 right-4 h-[3px] bg-gradient-to-r from-red-400 to-rose-500 rounded-full"
                  transition={{ type: "spring", stiffness: 380, damping: 30 }}
                />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default function CategoryHandler() {
  return (
    <Suspense
      fallback={
        <div className="flex px-4 xs:px-8 w-full justify-start md:justify-around py-2 border-b border-gray-100 overflow-x-auto gap-4 md:gap-0 scrollbar-none">
          <div className="animate-pulse">Loading categories...</div>
        </div>
      }
    >
      <CategoryHandlerContent />
    </Suspense>
  );
}
