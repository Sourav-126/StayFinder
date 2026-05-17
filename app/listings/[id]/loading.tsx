"use client";

import React from "react";

export default function ListingDetailsLoading() {
  return (
    <div className="max-w-[1920px] mx-auto px-4 md:px-8 py-24 select-none">
      {/* Main Details Wrapper */}
      <div className="w-full md:w-[70%] mx-auto">
        {/* Title */}
        <div className="h-10 bg-gray-200/70 rounded-full w-2/3 animate-pulse mb-3" />
        {/* Location Subtext */}
        <div className="h-5 bg-gray-200/70 rounded-full w-1/3 animate-pulse mb-6" />

        {/* Large Hero Image Banner */}
        <div className="w-full aspect-[21/10] sm:aspect-[21/9] min-h-[260px] max-h-[500px] bg-gray-200/70 rounded-2xl animate-pulse mb-8" />

        {/* Split Grid */}
        <div className="grid grid-cols-5 gap-6 lg:gap-10">
          {/* Left details pane */}
          <div className="left col-span-5 lg:col-span-3 space-y-6">
            {/* Host info card skeleton */}
            <div className="flex items-center gap-4 bg-gray-50 border border-gray-100/50 p-4 rounded-2xl animate-pulse shadow-sm">
              <div className="w-12 h-12 bg-gray-200 rounded-full" />
              <div className="space-y-2 flex-1">
                <div className="h-4 bg-gray-200 rounded-full w-1/3" />
                <div className="h-3 bg-gray-200 rounded-full w-1/4" />
              </div>
            </div>

            <hr className="border-gray-100" />

            {/* Core indicators (Guests, Rooms, Kids) skeletons */}
            <div className="grid grid-cols-3 gap-3">
              <div className="p-4 bg-gray-50 border border-gray-100/50 rounded-2xl flex flex-col items-center gap-2 animate-pulse">
                <div className="w-6 h-6 bg-gray-200 rounded-full" />
                <div className="h-3 bg-gray-200 rounded-full w-12" />
              </div>
              <div className="p-4 bg-gray-50 border border-gray-100/50 rounded-2xl flex flex-col items-center gap-2 animate-pulse">
                <div className="w-6 h-6 bg-gray-200 rounded-full" />
                <div className="h-3 bg-gray-200 rounded-full w-12" />
              </div>
              <div className="p-4 bg-gray-50 border border-gray-100/50 rounded-2xl flex flex-col items-center gap-2 animate-pulse">
                <div className="w-6 h-6 bg-gray-200 rounded-full" />
                <div className="h-3 bg-gray-200 rounded-full w-12" />
              </div>
            </div>

            <hr className="border-gray-100" />

            {/* Aircover skeleton */}
            <div className="space-y-3 animate-pulse">
              <div className="h-6 bg-gray-200 rounded-full w-24" />
              <div className="h-4 bg-gray-200 rounded-full w-full" />
              <div className="h-4 bg-gray-200 rounded-full w-5/6" />
            </div>
          </div>

          {/* Right reservation widget pane */}
          <div className="right col-span-5 lg:col-span-2">
            <div className="bg-gray-50 border border-gray-100/50 p-5 rounded-2xl animate-pulse space-y-4 shadow-sm">
              <div className="h-6 bg-gray-200 rounded-full w-1/3" />
              <div className="h-44 bg-gray-200 rounded-xl w-full" />
              <div className="h-10 bg-gray-200 rounded-xl w-full" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
