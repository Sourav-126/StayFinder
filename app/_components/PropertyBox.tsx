"use client";

import { toast } from "sonner";
import { deleteProperty } from "../actions/deleteProperty";
import ListingsCard from "./listings-card";
import { useRouter } from "next/navigation";
import { useCallback } from "react";

export const PropertyBox = ({ each }) => {
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
    } catch (error) {
      toast.error("Error deleting property");
    }
  }, [each.id, router]);

  console.log(each);

  return (
    <div>
      <ListingsCard
        reservationsData={each}
        listing={each}
        showSecondaryBtn={true}
        secondaryBtnLabel="Delete this Property"
        onAction={handleDelete}
      />
    </div>
  );
};
