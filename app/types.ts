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
  isApproved: boolean;
  adminApproved: Date;
};

export type Reservation = {
  id: string;
  startDate: Date;
  endDate: Date;
  totalPrice: number;
  userId: string;
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

export interface User {
  name: string | null;
  image: string | null;
}

export interface ListingType {
  id: string;
  title: string;
  description: string | null;
  imageSrc: string | null;
  category: string;
  roomCount: number;
  childCount: number;
  guestCount: number;
  locationvalue: string;
  price: number;
  createdAt: Date;
  updatedAt: Date;
  userId: string | null;
  isApproved: boolean;
  User: User | null;
}
