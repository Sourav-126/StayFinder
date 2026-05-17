"use client";

import { categories } from "@/static/config";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { Suspense } from "react";


function CategoryHandlerContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const activeCat = searchParams.get("cat");

  const params = new URLSearchParams(searchParams.toString());
  const setCategory = (cat: string) => {
    params.set("cat", cat);
    router.push(`?${params.toString()}`);
  };

  return (
    <div className="flex px-4 xs:px-8 w-full justify-start md:justify-around py-2 border-b border-gray-100 overflow-x-auto gap-4 md:gap-0 scrollbar-none">
      {categories.map((cat) => {
        return (
          <div
            onClick={() => setCategory(cat.label)}
            key={cat.label}
            className={cn(
              "flex flex-col gap-1 items-center cursor-pointer hover:bg-gray-200/40 p-4 rounded-lg hover:text-red-400",
              activeCat === cat.label && "bg-gray-100/40 text-red-400"
            )}
          >
            <cat.icon />
            {cat.label}
          </div>
        );
      })}
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
