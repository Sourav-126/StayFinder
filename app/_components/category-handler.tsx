"use client";

import { categories } from "@/static/config";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";

export default function CategoryHandler() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const activeCat = searchParams.get("cat");

  const params = new URLSearchParams(searchParams.toString());
  const setCategory = (cat: string) => {
    params.set("cat", cat);
    router.push(`?${params.toString()}`);
  };
  return (
    <div className="flex  px-8 w-full justify-around  py-2 border-b border-gray-100  overflow-x-auto">
      {categories.map((cat) => {
        return (
          <div
            onClick={() => setCategory(cat.label)}
            key={cat.label}
            className={cn(
              "flex flex-col gap-1 items-center cursor-pointer hover:bg-gray-200/40  p-4  rounded-lg hover:text-red-400 ",
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
