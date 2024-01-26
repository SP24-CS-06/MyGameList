"use client";

import { useTheme } from "next-themes";
import Image from "next/image";

const GoogleSignIn = () => {
  const { theme } = useTheme();
  return (
    <Image
      priority
      src={`/google-buttons/web_${theme || "light"}_sq_SI.svg`}
      width={200}
      height={100}
      alt="Sign In using Google"
    />
  );
};

export default GoogleSignIn;
