import { getAuthSession } from "@/app/utils/auth";
import { LoginForm } from "@/app/utils/Login-Form";

export default async function Signin() {
  const session = await getAuthSession();

  if (session?.user) {
    return (
      <div className="w-full h-screen flex flex-col justify-center items-center">
        <h1 className="text-3xl font-semibold">
          Hello, {session.user.name} 👋
        </h1>
        <p className="text-gray-600 mt-2">You are logged in.</p>
        <a className="text-blue-600 mt-2 text-sm" href="/">
          Go to Homepage
        </a>
      </div>
    );
  }

  return (
    <div>
      <LoginForm origin="signin" />
    </div>
  );
}
