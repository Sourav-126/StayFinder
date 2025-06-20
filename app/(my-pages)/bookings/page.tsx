import { getAuthSession } from "@/app/utils/auth";

export const Bookings = async () => {
  const session = getAuthSession();
  return <div>Bookings</div>;
};
