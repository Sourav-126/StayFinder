"use client";
import { toast } from "sonner";
import { deleteProperty } from "../actions/deleteProperty";
import ListingsCard from "./listings-card";
import { useRouter } from "next/navigation";

export const PropertyBox = async ({ each }) => {
  const router = useRouter();
  const handleDelete = async () => {
    const res = await deleteProperty(each.id);
    if (res?.ok) {
      toast.success("Property deleted");
      router.refresh();
    }
    toast.error("Something went Wrong");
  };
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
