"use client";

import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Icons } from "../_components/icons";
import Link from "next/link";
import { signIn } from "next-auth/react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
export const LoginForm = ({ origin = "signIn" }) => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const { register, handleSubmit } = useForm({
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  const onSubmit = (data: any) => {
    setLoading(true);
    try {
      if (origin == "signin") {
        signIn("credentials", { ...data, redirect: false }).then((callback) => {
          if (callback?.ok) {
            console.log("Logged In Successfully");
            router.refresh();
          } else if (callback?.error) {
            console.log(callback.error);
            throw new Error("Something went wrong");
          }
        });
      } else {
        axios
          .post("http://localhost:3000/api/auth/register", data)
          .then(() => [console.log("user created Hopefully")]);
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
        {origin == "Signup" && (
          <Input {...register("name")} type="text" placeholder="Your name" />
        )}
        <Input
          {...register("email")}
          type="email"
          placeholder="Enter your Email here"
        />
        <Input
          {...register("password")}
          type="password"
          placeholder="Password"
        />
        <Button
          onClick={handleSubmit(onSubmit)}
          className="w-full cursor-pointer"
        >
          {" "}
          {origin == "Signup" ? "Signup" : "Signin"}
        </Button>
        <Button
          onClick={() => signIn("google")}
          className="w-full cursor-pointer"
          type="button"
        >
          <Icons.Google />
          {origin == "Signup" ? "Sign-up with Google" : "Sign-in with Google"}
        </Button>
        {origin == "Signup" ? (
          <span>
            {" "}
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
