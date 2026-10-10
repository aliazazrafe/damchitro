"use client";

import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import toast from "react-hot-toast";

export default function SocialLoginToast() {
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const login = searchParams.get("login");
    const callbackURL = searchParams.get("callbackURL");

    if (login !== "success") {
      return;
    }

    toast.success("Signed in successfully!", {
      id: "social-login-success",
    });

    if (callbackURL && callbackURL.startsWith("/")) {
      const timer = setTimeout(() => {
        router.replace(callbackURL);
        router.refresh();
      }, 700);

      return () => clearTimeout(timer);
    }

    router.replace("/");
    router.refresh();
  }, [searchParams, router]);

  return null;
}