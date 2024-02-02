"use client";

import envBrowser from "@/env-browser";
import { useTheme } from "next-themes";
import Image from "next/image";
import { useRouter } from "next/navigation";

const GoogleSignIn = () => {
  const { theme } = useTheme();
  const router = useRouter();
  return (
    <Image
      priority
      draggable="false"
      className="hover:cursor-pointer"
      src={`/google-buttons/web_${theme === "dark" ? "dark" : "light"}_sq_SI.svg`}
      width={200}
      height={100}
      alt="Sign In using Google"
      onClick={() => {
        const url = new URL("https://accounts.google.com/o/oauth2/v2/auth");
        url.searchParams.set("response_type", "code");
        url.searchParams.set(
          "client_id",
          envBrowser.NEXT_PUBLIC_CLIENT_ID_GOOGLE
        );
        url.searchParams.set("scope", "openid email profile");
        url.searchParams.set(
          "redirect_uri",
          `${envBrowser.NEXT_PUBLIC_SERVER_ORIGIN}/login/google`
        );
        router.push(url.toString());
      }}
    />
  );
};

export default GoogleSignIn;
