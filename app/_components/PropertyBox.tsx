"use client";
import { Listing } from "../types";

import { toast } from "sonner";
import { deleteProperty } from "../actions/deleteProperty";
import ListingsCard from "./listings-card";
import { useRouter } from "next/navigation";
import { useCallback } from "react";

type PropertyBoxProps = {
  each: Listing;
};

export const PropertyBox = ({ each }: PropertyBoxProps) => {
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

  console.log(each);

  return (
    <div>
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
    </div>
  );
};
