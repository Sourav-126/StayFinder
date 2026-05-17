"use client";

import React from "react";

export default function GlobalLoading() {
  return (
    <div className="max-w-[1920px] mx-auto px-4 md:px-8 py-24 select-none">
      {/* Categories skeleton line (similar to our CategoryHandler) */}
      <div className="flex gap-4 overflow-hidden py-3 border-b border-gray-100 mb-6 justify-start md:justify-around">
        {Array.from({ length: 10 }).map((_, i) => (
          <div key={i} className="flex flex-col items-center gap-2 px-4 py-2 min-w-[70px] animate-pulse">
            <div className="w-6 h-6 bg-gray-200 rounded-full" />
            <div className="h-3 bg-gray-200 rounded-md w-10" />
          </div>
        ))}
      </div>

      {/* Grid of Skeleton Cards */}
      <div className="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-x-6 gap-y-10 mt-4">
        {Array.from({ length: 10 }).map((_, i) => (
          <div key={i} className="flex flex-col gap-3">
            {/* Image Skeleton */}
            <div className="w-full aspect-square bg-gray-200/70 rounded-2xl animate-pulse shadow-sm" />
            
            {/* Text Skeleton */}
            <div className="flex flex-col gap-2.5 px-1">
              {/* Title */}
              <div className="h-4.5 bg-gray-200/70 rounded-full w-3/4 animate-pulse" />
              {/* Location */}
              <div className="h-3.5 bg-gray-200/70 rounded-full w-1/2 animate-pulse" />
              {/* Price per night */}
              <div className="h-4 bg-gray-200/70 rounded-full w-1/3 animate-pulse mt-1" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
