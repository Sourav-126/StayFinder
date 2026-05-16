import { PrismaClient } from "@prisma/client";
import { hash } from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  console.log("Starting database seeding...");

  // 1. Clean existing records
  await prisma.reservation.deleteMany({});
  await prisma.listing.deleteMany({});
  await prisma.user.deleteMany({});

  console.log("Cleared existing database records.");

  // 2. Create seed Users
  const hashedPassword = await hash("password123", 12);
  const testUser = await prisma.user.create({
    data: {
      name: "John Doe",
      email: "john@example.com",
      hashedPassword: hashedPassword,
      image: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&q=80",
    },
  });

  const hostUser = await prisma.user.create({
    data: {
      name: "Alice Smith",
      email: "alice@example.com",
      hashedPassword: hashedPassword,
      image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80",
    },
  });

  console.log("Successfully created seed users.");

  // 3. Create 12 Seed Listings (Approved by Admin so they show on homepage)
  const listing1 = await prisma.listing.create({
    data: {
      title: "Luxury Beachfront Villa",
      description: "Experience absolute paradise in this stunning beachfront villa. Features a private infinity pool, panoramic ocean views, and custom premium interiors. Perfect for family getaways or romantic escapes.",
      imageSrc: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80",
      category: "Beach",
      roomCount: 4,
      childCount: 2,
      guestCount: 6,
      locationvalue: "US",
      price: 25000,
      isApproved: true,
      adminApproved: new Date(),
      userId: hostUser.id,
    },
  });

  const listing2 = await prisma.listing.create({
    data: {
      title: "Premium Mountain Cabin",
      description: "Nestled high in the beautiful peaks, this cozy wood cabin offers majestic alpine views, a roaring stone fireplace, and outdoor hot tub. The ultimate luxury winter retreat.",
      imageSrc: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1200&q=80",
      category: "Mountain",
      roomCount: 2,
      childCount: 1,
      guestCount: 4,
      locationvalue: "CH",
      price: 18000,
      isApproved: true,
      adminApproved: new Date(),
      userId: hostUser.id,
    },
  });

  const listing3 = await prisma.listing.create({
    data: {
      title: "Charming Castle Estate",
      description: "Live like royalty in this beautifully restored historic castle. Complete with elegant stone towers, vast lush gardens, and grand medieval dining halls. A truly unforgettable fairytale experience.",
      imageSrc: "https://images.unsplash.com/photo-1508849789987-4e5333c12b78?auto=format&fit=crop&w=1200&q=80",
      category: "Castle",
      roomCount: 8,
      childCount: 4,
      guestCount: 12,
      locationvalue: "GB",
      price: 45000,
      isApproved: true,
      adminApproved: new Date(),
      userId: hostUser.id,
    },
  });

  const listing4 = await prisma.listing.create({
    data: {
      title: "Tropical Island Hideaway",
      description: "Unwind on a secluded private island sanctuary. Surrounded by crystal clear turquoise waters and private white-sand shorelines. Perfect for sunbathing, diving, and pure relaxation.",
      imageSrc: "https://images.unsplash.com/photo-1540206395-68808572332f?auto=format&fit=crop&w=1200&q=80",
      category: "Islands",
      roomCount: 3,
      childCount: 0,
      guestCount: 6,
      locationvalue: "MV",
      price: 35000,
      isApproved: true,
      adminApproved: new Date(),
      userId: hostUser.id,
    },
  });

  const listing5 = await prisma.listing.create({
    data: {
      title: "Scenic Lakeside Glamping",
      description: "Modern luxury meets raw nature in this gorgeous lakeside safari-style glamping tent. Fully equipped kitchen, comfortable king-size bed, and a private wooden dock for kayaking and fishing.",
      imageSrc: "https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?auto=format&fit=crop&w=1200&q=80",
      category: "Camping",
      roomCount: 1,
      childCount: 2,
      guestCount: 4,
      locationvalue: "CA",
      price: 9500,
      isApproved: true,
      adminApproved: new Date(),
      userId: hostUser.id,
    },
  });

  const listing6 = await prisma.listing.create({
    data: {
      title: "Historic Provence Farmhouse",
      description: "A beautifully restored stone farmhouse in the heart of Provence. Walk through private fields of fragrant lavender, swim in the heated pool, and dine al fresco under centuries-old olive trees.",
      imageSrc: "https://images.unsplash.com/photo-1500076656116-558758c991c1?auto=format&fit=crop&w=1200&q=80",
      category: "Farms",
      roomCount: 4,
      childCount: 3,
      guestCount: 8,
      locationvalue: "FR",
      price: 15500,
      isApproved: true,
      adminApproved: new Date(),
      userId: hostUser.id,
    },
  });

  const listing7 = await prisma.listing.create({
    data: {
      title: "Uluwatu Luxury cliffside Estate",
      description: "Perched high above the Indian Ocean, this architectural masterpiece features breathtaking panoramic views, minimalist glass walls, butler service, and standard luxury amenities.",
      imageSrc: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=80",
      category: "Luxury",
      roomCount: 5,
      childCount: 0,
      guestCount: 8,
      locationvalue: "ID",
      price: 48000,
      isApproved: true,
      adminApproved: new Date(),
      userId: hostUser.id,
    },
  });

  const listing8 = await prisma.listing.create({
    data: {
      title: "Queenstown Alpine Glasshouse",
      description: "Designed for adventure enthusiasts, this glass dome cabin sits on the dramatic slopes of Queenstown. Perfect for stargazing, skiing, and hiking across wild mountain passes.",
      imageSrc: "https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=1200&q=80",
      category: "Adventure",
      roomCount: 2,
      childCount: 2,
      guestCount: 5,
      locationvalue: "NZ",
      price: 22000,
      isApproved: true,
      adminApproved: new Date(),
      userId: hostUser.id,
    },
  });

  const listing9 = await prisma.listing.create({
    data: {
      title: "Modern Scandinavian Lake House",
      description: "Relax in pure minimalist comfort right on the shores of Lake Saimaa. Features a private wood-burning sauna, outdoor firepit, and panoramic floor-to-ceiling glass lake views.",
      imageSrc: "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?auto=format&fit=crop&w=1200&q=80",
      category: "Lake",
      roomCount: 3,
      childCount: 1,
      guestCount: 6,
      locationvalue: "FI",
      price: 13800,
      isApproved: true,
      adminApproved: new Date(),
      userId: hostUser.id,
    },
  });

  const listing10 = await prisma.listing.create({
    data: {
      title: "Traditional Kyoto Ryokan",
      description: "Experience genuine Japanese hospitality in this historic countryside Ryokan. Complete with tatami mats, peaceful zen rock gardens, sliding paper doors, and natural hot spring baths.",
      imageSrc: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=1200&q=80",
      category: "CountrySide",
      roomCount: 3,
      childCount: 2,
      guestCount: 6,
      locationvalue: "JP",
      price: 16500,
      isApproved: true,
      adminApproved: new Date(),
      userId: hostUser.id,
    },
  });

  const listing11 = await prisma.listing.create({
    data: {
      title: "Sunset Coast Beach Loft",
      description: "A bright, airy loft located steps away from the warm sandy beaches of Costa del Sol. Hear the crashing waves, enjoy beautiful sunset balconies, and surf across crystal coastlines.",
      imageSrc: "https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?auto=format&fit=crop&w=1200&q=80",
      category: "Beach",
      roomCount: 2,
      childCount: 0,
      guestCount: 3,
      locationvalue: "ES",
      price: 19500,
      isApproved: true,
      adminApproved: new Date(),
      userId: hostUser.id,
    },
  });

  const listing12 = await prisma.listing.create({
    data: {
      title: "Fjord-View Mountain Lodge",
      description: "Experience dramatic Norway landscapes from this luxury wooden lodge perched on the mountains overlooking Geirangerfjord. Fully custom architectural luxury.",
      imageSrc: "https://images.unsplash.com/photo-1449034446853-66c86144b0ad?auto=format&fit=crop&w=1200&q=80",
      category: "Mountain",
      roomCount: 3,
      childCount: 2,
      guestCount: 6,
      locationvalue: "NO",
      price: 27000,
      isApproved: true,
      adminApproved: new Date(),
      userId: hostUser.id,
    },
  });

  console.log("Successfully created 12 seed listings.");

  // 4. Create Seed Reservations for John Doe (testUser.id)
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);

  const nextWeek = new Date();
  nextWeek.setDate(nextWeek.getDate() + 5);

  await prisma.reservation.create({
    data: {
      userId: testUser.id,
      listingId: listing1.id,
      startDate: tomorrow,
      endDate: nextWeek,
      totalPrice: listing1.price * 4,
    },
  });

  const laterMonthStart = new Date();
  laterMonthStart.setDate(laterMonthStart.getDate() + 15);

  const laterMonthEnd = new Date();
  laterMonthEnd.setDate(laterMonthEnd.getDate() + 20);

  await prisma.reservation.create({
    data: {
      userId: testUser.id,
      listingId: listing2.id,
      startDate: laterMonthStart,
      endDate: laterMonthEnd,
      totalPrice: listing2.price * 5,
    },
  });

  const nextMonthStart = new Date();
  nextMonthStart.setDate(nextMonthStart.getDate() + 30);

  const nextMonthEnd = new Date();
  nextMonthEnd.setDate(nextMonthEnd.getDate() + 34);

  await prisma.reservation.create({
    data: {
      userId: testUser.id,
      listingId: listing6.id,
      startDate: nextMonthStart,
      endDate: nextMonthEnd,
      totalPrice: listing6.price * 4,
    },
  });

  console.log("Successfully created seed reservations.");
  console.log("Database seeding completed successfully! 🌱");
}

main()
  .catch((e) => {
    console.error("Error during seeding process:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
