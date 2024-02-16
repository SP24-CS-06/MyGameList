"use client";

import callbackGoogle from "@/actions/oauth";
import { useSearchParams } from "next/navigation";
import { useEffect } from "react";

export default function LoginGoogle() {
  const searchParams = useSearchParams();
  useEffect(() => {
    callbackGoogle(searchParams.toString());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <div>loading...</div>;
}
