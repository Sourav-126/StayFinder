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
