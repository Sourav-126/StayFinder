"use client";
import { Listing } from "../types";

import { toast } from "sonner";
import { deleteProperty } from "../actions/deleteProperty";
import ListingsCard from "./listings-card";
import { useRouter } from "next/navigation";
import { useCallback } from "react";

interface PropertyBoxProps {
  each: Listing;
  isApproved?: boolean;
  adminApproved?: Date | null;
}

export const PropertyBox = ({
  each,
  isApproved,
  adminApproved,
}: PropertyBoxProps) => {
  const router = useRouter();

  const handleDelete = useCallback(async () => {
    try {
      const res = await deleteProperty(each.id);

      if (res?.ok) {
        toast.success("Property deleted");
        router.refresh();
      } else {
        toast.error("Something went wrong");
      }
    } catch {
      return { ok: false, message: "Not done" };
    }
  }, [each.id, router]);

  return (
    <div className="relative">
      <ListingsCard
        reservationsData={{ price: each.price }}
        listing={{
          ...each,
          imageSrc: each.imageSrc ?? undefined,
        }}
        showSecondaryBtn={true}
        secondaryBtnLabel="Delete this Property"
        onAction={handleDelete}
      />

      {isApproved === false && (
        <div className="absolute top-2 right-2 bg-yellow-100 text-yellow-800 text-xs font-medium px-2.5 py-0.5 rounded">
          Pending Approval
        </div>
      )}
      {isApproved && (
        <div className="absolute top-2 right-2 bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded">
          Approved
        </div>
      )}
    </div>
  );
};
