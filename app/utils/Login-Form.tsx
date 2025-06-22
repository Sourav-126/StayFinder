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
  const [, setLoading] = useState(false);

  const { register, handleSubmit } = useForm<FormData>({
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  const onSubmit: SubmitHandler<FormData> = (data) => {
    setLoading(true);
    try {
      if (origin.toLowerCase() === "signin") {
        signIn("credentials", { ...data, redirect: true }).then((callback) => {
          if (callback?.ok) {
            toast.success("Logged in Successfully!");
            router.push("/");
            router.refresh();
          } else if (callback?.error) {
            console.log(callback.error);
            toast.error("Login failed.");
          }
        });
      } else {
        axios
          .post("/api/auth/register", data)
          .then(() => {
            toast.success("Welcome to StayFinder");
            router.push("/");
          })
          .catch(() => toast.error("Registration failed."));
      }
    } catch (error) {
      console.error(error);
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
        >
          {origin === "Signup" ? "Signup" : "Signin"}
        </Button>
        <Button
          onClick={() => signIn("google")}
          className="w-full cursor-pointer"
          type="button"
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
