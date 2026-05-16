import { withAuth } from "next-auth/middleware";

export default withAuth({
  pages: {
    signIn: "/sign-in",
  },
});

export const config = {
  matcher: [
    "/bookings",
    "/bookings/:path*",
    "/favorites",
    "/favorites/:path*",
    "/properties",
    "/properties/:path*",
    "/become-a-host",
    "/become-a-host/:path*",
  ],
};
