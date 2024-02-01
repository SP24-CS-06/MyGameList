import GoogleSignIn from "@/components/GoogleSignIn";
import React from "react";

const Login = () => {
  return (
    <div className="min-h-screen grid place-content-center">
      <div className="py-6 px-8 border rounded-md grid gap-5">
        <h2 className="text-lg text-center">Sign in with Google</h2>
        <GoogleSignIn />
      </div>
    </div>
  );
};

export default Login;
