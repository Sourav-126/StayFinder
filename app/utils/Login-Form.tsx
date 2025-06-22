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
  const [loading, setLoading] = useState(false);

  const { register, handleSubmit } = useForm<FormData>({
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    setLoading(true);

    try {
      if (origin.toLowerCase() === "signin") {
        // Remove redirect: true to handle redirect manually
        const result = await signIn("credentials", {
          ...data,
          redirect: false, // Changed to false
        });

        if (result?.ok && !result?.error) {
          toast.success("Logged in Successfully!");
          router.push("/");
          router.refresh();
        } else {
          console.log("Sign in error:", result?.error);
          toast.error(result?.error || "Login failed.");
        }
      } else {
        await axios.post("/api/auth/register", data);
        toast.success("Welcome to StayFinder");
        router.push("/");
      }
    } catch (error) {
      console.error("Authentication error:", error);
      toast.error("An unexpected error occurred.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex h-screen justify-center items-center">
      <div className="space-y-2 w-full sm:w-1/2 flex flex-col items-center">
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
          disabled={loading}
        >
          {loading ? "Loading..." : origin === "Signup" ? "Signup" : "Signin"}
        </Button>
        <Button
          onClick={() => signIn("google")}
          className="w-full cursor-pointer"
          type="button"
          disabled={loading}
        >
          <Icons.Google />
          {origin === "Signup" ? "Sign-up with Google" : "Sign-in with Google"}
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
