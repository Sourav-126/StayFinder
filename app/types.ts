// types.ts
export type Listing = {
  id: string;
  createdAt: string;
  updatedAt: string;
  userId: string | null;
  title: string;
  description: string | null;
  imageSrc: string | null;
  category: string;
  roomCount: number;
  childCount: number;
  guestCount: number;
  locationvalue: string;
  price: number;
};

export type Reservation = {
  id: string;
  startDate: Date;
  endDate: Date;
  totalPrice: number;
  userId: string; // or string | null if schema allows
  listingId: string | null;
  Listing: Listing | null;
};

export type SafeUser = {
  id: string;
  name?: string;
  email?: string;
  image?: string;
  favoriteIds?: string[];
};

export type CountrySelectValue = {
  label: string;
  value: string;
  latlng: number[];
  region: string;
};

export interface SessionUser {
  id: string;
  name?: string;
  email?: string;
  image?: string;
}
