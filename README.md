# 🏠 StayFinder

<div align="center">
  <img src="https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=next.js&logoColor=white" alt="Next.js" />
  <img src="https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript" />
  <img src="https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white" alt="Tailwind CSS" />
  <img src="https://img.shields.io/badge/Prisma-3982CE?style=for-the-badge&logo=Prisma&logoColor=white" alt="Prisma" />
</div>

<div align="center">
  <h3>🌟 Your Ultimate Accommodation Discovery Platform</h3>
  <p>A modern, full-stack Airbnb clone built with Next.js, featuring seamless property booking, hosting capabilities, and an intuitive user experience.</p>
</div>

---

## ✨ Features

### 🏡 **Property Management**
- **Advanced Search & Filtering** - Find perfect stays by location, dates, guest count, and amenities
- **Interactive Property Listings** - Detailed property cards with high-quality images and descriptions
- **Category-Based Browsing** - Explore properties by type (apartments, houses, unique stays, etc.)
- **Favorites System** - Save and manage your preferred properties

### 🎯 **Booking Experience**
- **Smart Date Selection** - Calendar-based booking with availability checking
- **Guest & Room Configuration** - Customize your stay requirements
- **Real-time Availability** - Instant booking confirmation
- **Booking Management** - Track and manage your reservations

### 🏠 **Host Dashboard**
- **Property Listing Wizard** - Step-by-step property registration process
- **Multi-step Form** - Category selection, location mapping, amenities, pricing
- **Image Upload System** - Secure property photo management
- **Listing Management** - Edit, update, and manage your properties

### 🔐 **Authentication & Security**
- **NextAuth.js Integration** - Secure authentication with multiple providers
- **Protected Routes** - Role-based access control
- **User Profiles** - Personalized user experience
- **Session Management** - Secure user sessions

### 🎨 **Modern UI/UX**
- **Responsive Design** - Seamless experience across all devices
- **Dark/Light Theme** - User preference-based theming
- **Smooth Animations** - Enhanced user interactions
- **Accessibility Compliant** - WCAG guidelines followed

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn
- Git

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/username/stayfinder.git
   cd stayfinder
   ```

2. **Install dependencies**
   ```bash
   pnpm install
   # or
   yarn install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env.local
   ```
   
   Update your `.env.local` with:
   ```env
   # Database
   DATABASE_URL="your-database-url"
   
   # NextAuth
   NEXTAUTH_SECRET="your-nextauth-secret"
   NEXTAUTH_URL="http://localhost:3000"
   
   # OAuth Providers (Optional)
   GOOGLE_CLIENT_ID="your-google-client-id"
   GOOGLE_CLIENT_SECRET="your-google-client-secret"
   
   # Image Upload (Cloudinary/S3)
   BLOB_READ_AND_WRITE_TOKEN-"your-bercel-blob -token"
   ```

4. **Set up the database**
   ```bash
   npx prisma generate
   OR pnpm prisma generate
   npx prisma db push
   ```

5. **Run the development server**
   ```bash
   Pnpm  dev
   # or
   yarn dev
   ```

6. **Open your browser**
   Navigate to [[https://stay-finder-dusky.vercel.app/](https://stay-finder-dusky.vercel.app/)]

---

## 🛠️ Tech Stack

### **Frontend**
- **Next.js 14** - React framework with App Router
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first CSS framework
- **Shadcn/ui** - Reusable component library
- **Lucide React** - Beautiful icons

### **Backend**
- **Next.js API Routes** - Serverless API endpoints
- **Prisma ORM** - Database toolkit and ORM
- **NextAuth.js** - Authentication solution

### **Database & Storage**
- **PostgreSQL** - Primary database
- **VERCEL BLOB** - Image storage and optimization

### **Development Tools**
- **ESLint** - Code linting
- **Prettier** - Code formatting
- **Husky** - Git hooks

---

## 🗂️ Project Structure

```
stayfinder/
├── app/                    # Next.js App Router
│   ├── (auth)/            # Authentication routes
│   ├── api/               # API routes
│   ├── components/        # Reusable components
│   └── types/             # TypeScript definitions
├── components/            # UI components
│   └── ui/               # Shadcn/ui components
├── lib/                   # Utility functions
├── prisma/               # Prisma schema and migrations
├── public/               # Static assets
└── styles/               # Global styles
```

---

## 🔧 API Endpoints

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login

### Properties
- `GET /api/properties` - Get all properties
- `POST /api/properties` - Create new property
- `GET /api/properties/[id]` - Get property details
- `PUT /api/properties/[id]` - Update property
- `DELETE /api/properties/[id]` - Delete property

### Bookings
- `POST /api/bookings` - Create booking
- `GET /api/bookings` - Get user bookings
- `PUT /api/bookings/[id]` - Update booking

---

## 🚀 Deployment

### Vercel (Recommended)
1. Push your code to GitHub
2. Connect your repository to Vercel
3. Add environment variables in Vercel dashboard
4. Deploy automatically on every push

### Manual Deployment
```bash
npm run build
npm run start
```

---

## 🤝 Contributing

We welcome contributions! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 🙏 Acknowledgments

- **Next.js Team** - For the amazing framework
- **Vercel** - For seamless deployment
- **Shadcn** - For the beautiful UI components
- **Airbnb** - For the inspiration

---

## 📧 Contact

**Your Name** - [@your-twitter](https://twitter.com/your-twitter) - your.email@example.com

**Project Link** - [https://github.com/username/stayfinder](https://github.com/username/stayfinder)

**Live Demo** - [https://stayfinder.vercel.app](https://stayfinder.vercel.app)

---

<div align="center">
  <p>Made with ❤️ by [Your Name]</p>
  <p>⭐ Star this repository if you found it helpful!</p>
</div>
