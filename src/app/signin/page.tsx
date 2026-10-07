"use client";
import React from "react";

import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
const SignInPage = () => {
  const router = useRouter();
  const onSubmit = async (e: React.SubmitEvent<HTMLElement>) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const user = Object.fromEntries(formData.entries()) as {
      email: string;
      password: string;
    };

    const { data, error } = await authClient.signIn.email({
      ...user,
      callbackURL: "/",
    });

    if (data) {
      console.log(data);
      router.push("/");
    }
    if (error) {
      toast.error("Invalid password");

      console.log(error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center mt-5">
      <h2 className="text-2xl font-bold mb-2 text-red-700">সাইন ইন</h2>
      <form onSubmit={onSubmit}>
        <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-md border p-6">
          <label className="label">Email:</label>
          <input
            name="email"
            type="email"
            className="input w-full"
            placeholder="Email..."
          />

          <label className="label">Password:</label>
          <input
            name="password"
            type="password"
            className="input w-full"
            placeholder="Password..."
          />

          <button
            type="submit"
            className="btn btn-neutral bg-red-700 text-white mt-4"
          >
            সাইন ইন করুন
          </button>
        </fieldset>
      </form>
    </div>
  );
};

export default SignInPage;
