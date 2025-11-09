"use client";

import { AlertCircle } from "lucide-react";

export const PendingApprovalBanner = () => {
  return (
    <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-4">
      <div className="flex">
        <div className="flex-shrink-0">
          <AlertCircle className="h-5 w-5 text-yellow-400" />
        </div>
        <div className="ml-3">
          <p className="text-sm text-yellow-700">
            Your listing is pending admin approval. This usually takes 1-2
            business days.
          </p>
        </div>
      </div>
    </div>
  );
};
