"use client";

import { useEffect } from "react";
import { Button } from "@/components/ui/button";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Global boundary caught runtime error:", error);
  }, [error]);

  return (
    <div className="flex h-[75vh] flex-col items-center justify-center text-center px-4">
      <div className="max-w-md space-y-6">
        <h1 className="text-4xl font-extrabold text-red-500 tracking-tight">
          Oops! Something went wrong
        </h1>
        <p className="text-muted-foreground text-lg">
          We encountered an unexpected error. The technical details have been logged securely. Please try again or refresh the page.
        </p>
        <div className="flex justify-center gap-4">
          <Button onClick={() => window.location.reload()} variant="outline" className="cursor-pointer">
            Refresh Page
          </Button>
          <Button onClick={() => reset()} className="bg-red-400 hover:bg-red-500 text-white cursor-pointer">
            Try Again
          </Button>
        </div>
      </div>
    </div>
  );
}
