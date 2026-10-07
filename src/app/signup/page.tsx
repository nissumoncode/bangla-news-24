"use client";

import { authClient } from "@/lib/auth-client";
import { redirect } from "next/navigation";
import React from "react";
const SignUpPage = () => {
  const onSubmit = async (e: React.SubmitEvent<HTMLElement>) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const user = Object.fromEntries(formData.entries());

    const { data, error } = await authClient.signUp.email({
      ...user,
      callbackURL: "/",
    });

    if (data) {
      console.log(data);
      redirect("/");
    }
    if (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center mt-5">
      <h2 className="text-2xl font-bold mb-2 text-red-700">সাইন আপ</h2>
      <form onSubmit={onSubmit}>
        <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-md border p-6">
          <label className="label">Name:</label>
          <input
            name="name"
            type="text"
            className="input w-full"
            placeholder="Name..."
          />
          <label className="label">Image Url (Optional):</label>
          <input
            name="image"
            type="url"
            className="input w-full"
            placeholder="Url..."
          />

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
            সাইন আপ করুন
          </button>
        </fieldset>
      </form>
    </div>
  );
};

export default SignUpPage;
