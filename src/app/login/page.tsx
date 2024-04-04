import GoogleSignIn from "@/components/GoogleSignIn";
import React from "react";

export default function Login() {
  return (
    <div className="min-h-screen grid place-content-center">
      <div className="py-6 px-8 border rounded-md grid gap-5 border-gray-400">
        <h2 className="text-lg text-center">Sign In</h2>
        <GoogleSignIn />
      </div>
    </div>
  );
}
