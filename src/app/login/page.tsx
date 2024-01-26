import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import dynamic from "next/dynamic";
import React from "react";

const Login = () => {
  const GoogleButton = dynamic(
    () => import("@/components/ui/google-oauth-button/google-oauth-button"),
    {
      ssr: false,
      loading: () => <p>Loading...</p>,
    }
  );
  return (
    <div className="flex justify-center min-h-screen place-content-center">
      <Card className="max-w-[700px] max-h-[300px]  flex flex-col justify-center m-auto">
        <CardHeader>
          <CardTitle>Login</CardTitle>
          <CardDescription>Login using Google OAuth</CardDescription>
        </CardHeader>
        <CardContent>
          <GoogleButton />
        </CardContent>
      </Card>
    </div>
  );
};

export default Login;
