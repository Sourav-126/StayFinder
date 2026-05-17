"use client";

import { useForm, SubmitHandler } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Icons } from "../_components/icons";
import Link from "next/link";
import { signIn } from "next-auth/react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { toast } from "sonner";

interface FormData {
  name?: string;
  email: string;
  password: string;
}

interface LoginFormProps {
  origin?: "signin" | "Signup";
}

export const LoginForm = ({ origin = "signin" }: LoginFormProps) => {
  const router = useRouter();
  const [loadingType, setLoadingType] = useState<"credentials" | "google" | null>(null);

  const { register, handleSubmit } = useForm<FormData>({
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  const handleGoogleLogin = async () => {
    setLoadingType("google");
    try {
      await signIn("google", { callbackUrl: "/" });
    } catch (error) {
      console.error("Google authentication error:", error);
      toast.error("Failed to connect with Google.");
      setLoadingType(null);
    }
  };

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    setLoadingType("credentials");

    try {
      if (origin.toLowerCase() === "signin") {
        const result = await signIn("credentials", {
          ...data,
          redirect: false,
        });

        if (result?.ok && !result?.error) {
          toast.success("Logged in Successfully!");
          router.push("/");
          router.refresh();
        } else {
          toast.error(result?.error || "Login failed.");
        }
      } else {
        await axios.post("/api/auth/register", data);
        toast.success("Welcome to StayFinder");
        // Automatically sign in the user after registration
        const result = await signIn("credentials", {
          email: data.email,
          password: data.password,
          redirect: false,
        });
        if (result?.ok && !result?.error) {
          router.push("/");
          router.refresh();
        } else {
          router.push("/sign-in");
        }
      }
    } catch (error) {
      console.error("Authentication error:", error);
      toast.error("An unexpected error occurred.");
    } finally {
      setLoadingType(null);
    }
  };

  return (
    <div className="flex h-screen justify-center items-center px-4">
      <div className="space-y-2 w-full xs:w-4/5 sm:w-1/2 max-w-md flex flex-col items-center">
        {origin === "Signup" && (
          <Input {...register("name")} type="text" placeholder="Your name" />
        )}
        <Input
          {...register("email", { required: true })}
          type="email"
          placeholder="Enter your Email here"
        />
        <Input
          {...register("password", { required: true })}
          type="password"
          placeholder="Password"
        />
        <Button
          onClick={handleSubmit(onSubmit)}
          className="w-full cursor-pointer"
          disabled={loadingType !== null}
        >
          {loadingType === "credentials" ? (
            <div className="flex items-center gap-2">
              <div className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
              <span>Please wait...</span>
            </div>
          ) : (
            origin === "Signup" ? "Signup" : "Signin"
          )}
        </Button>
        <Button
          onClick={handleGoogleLogin}
          className="w-full cursor-pointer"
          type="button"
          disabled={loadingType !== null}
        >
          {loadingType === "google" ? (
            <div className="flex items-center gap-2">
              <div className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
              <span>Connecting...</span>
            </div>
          ) : (
            <>
              <Icons.Google />
              <span>{origin === "Signup" ? "Sign-up with Google" : "Sign-in with Google"}</span>
            </>
          )}
        </Button>
        {origin === "Signup" ? (
          <span>
            Already have an Account?
            <Link className="font-semibold underline" href="/sign-in">
              SignIn
            </Link>
          </span>
        ) : (
          <span>
            New to StayFinder?
            <Link className="font-semibold underline" href="/sign-up">
              SignUp
            </Link>
          </span>
        )}
      </div>
    </div>
  );
};
