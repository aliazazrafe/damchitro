"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { authClient } from "../../lib/auth-client";

export default function SignInPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const [socialLoading, setSocialLoading] = useState<
    "google" | "github" | null
  >(null);

  const callbackURL =
    searchParams.get("callbackURL") || "/";

  const handleSignIn = async () => {
    setError("");
    setSuccess("");

    if (!email.trim() || !password) {
      setError(
        "Please enter your email and password."
      );
      return;
    }

    setLoading(true);

    try {
      const { error } =
        await authClient.signIn.email({
          email: email.trim(),
          password,
        });

      if (error) {
        setError(
          error.message ||
            "Invalid email or password."
        );
        return;
      }

      setSuccess("Signed in successfully!");

      setTimeout(() => {
        router.push(callbackURL);
        router.refresh();
      }, 700);
    } catch {
      setError(
        "Something went wrong. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleSocialSignIn = async (
    provider: "google" | "github"
  ) => {
    setError("");
    setSuccess("");
    setSocialLoading(provider);

    try {
      const { error } =
        await authClient.signIn.social({
          provider,
          callbackURL,
          errorCallbackURL: "/signin",
        });

      if (error) {
        setError(
          error.message ||
            `${provider} authentication failed.`
        );
        setSocialLoading(null);
      }
    } catch {
      setError(
        "Social authentication failed. Please try again."
      );
      setSocialLoading(null);
    }
  };

  const disabled =
    loading || socialLoading !== null;

  return (
    <main className="min-h-screen bg-green-50 px-3 py-6 sm:px-4 sm:py-10">
      <div className="mx-auto w-full max-w-sm">
        <div className="rounded-xl border border-gray-200 bg-white px-4 py-6 shadow-sm sm:px-6 sm:py-7">
          {/* =========================
              HEADER
          ========================== */}

          <div className="text-center">
            <div className="mx-auto flex size-11 items-center justify-center rounded-xl bg-green-600 text-[22px] text-white sm:size-12 sm:text-2xl">
              🛒
            </div>

            <h1 className="mt-4 text-[22px] font-bold text-gray-900 sm:text-2xl">
              Sign In
            </h1>

            <p className="mx-auto mt-1 max-w-[280px] text-[11px] leading-4 text-gray-500 sm:text-xs">
              Sign in to your Bazar Dor account
              to continue.
            </p>
          </div>

          {/* =========================
              SIGN IN FORM
          ========================== */}

          <form
            className="mt-5 sm:mt-6"
            onSubmit={(e) => {
              e.preventDefault();
              void handleSignIn();
            }}
          >
            {/* EMAIL */}

            <div>
              <label
                htmlFor="email"
                className="mb-2 block text-[11px] font-semibold text-gray-700 sm:text-xs"
              >
                Email Address
              </label>

              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) =>
                  setEmail(e.target.value)
                }
                placeholder="you@example.com"
                autoComplete="email"
                required
                disabled={disabled}
                className="h-10 w-full rounded-md border border-gray-300 bg-white px-3 text-[11px] text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-green-600 disabled:cursor-not-allowed disabled:bg-gray-50 sm:text-xs"
              />
            </div>

            {/* PASSWORD */}

            <div className="mt-4">
              <label
                htmlFor="password"
                className="mb-2 block text-[11px] font-semibold text-gray-700 sm:text-xs"
              >
                Password
              </label>

              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) =>
                  setPassword(e.target.value)
                }
                placeholder="Enter your password"
                autoComplete="current-password"
                required
                disabled={disabled}
                className="h-10 w-full rounded-md border border-gray-300 bg-white px-3 text-[11px] text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-green-600 disabled:cursor-not-allowed disabled:bg-gray-50 sm:text-xs"
              />
            </div>

            {/* ERROR */}

            {error && (
              <div
                role="alert"
                className="mt-4 break-words rounded-md border border-red-200 bg-red-50 px-3 py-2 text-[10px] leading-4 text-red-600 sm:text-xs"
              >
                {error}
              </div>
            )}

            {/* SUCCESS */}

            {success && (
              <div
                role="status"
                className="mt-4 break-words rounded-md border border-green-200 bg-green-50 px-3 py-2 text-[10px] leading-4 text-green-700 sm:text-xs"
              >
                {success}
              </div>
            )}

            {/* SIGN IN BUTTON */}

            <button
              type="submit"
              disabled={disabled}
              className="mt-5 flex h-10 w-full items-center justify-center rounded-md bg-green-600 px-3 text-[11px] font-semibold text-white transition hover:bg-green-700 disabled:cursor-not-allowed disabled:opacity-60 sm:mt-6 sm:text-xs"
            >
              {loading
                ? "Signing In..."
                : "Sign In"}
            </button>
          </form>

          {/* =========================
              DIVIDER
          ========================== */}

          <div className="my-5 flex items-center gap-3">
            <div className="h-px flex-1 bg-gray-200" />

            <span className="shrink-0 text-[10px] text-gray-400 sm:text-xs">
              OR
            </span>

            <div className="h-px flex-1 bg-gray-200" />
          </div>

          {/* =========================
              SOCIAL LOGIN
          ========================== */}

          <div className="grid grid-cols-1 gap-2 min-[360px]:grid-cols-2 sm:gap-3">
            {/* GOOGLE */}

            <button
              type="button"
              disabled={disabled}
              onClick={() =>
                void handleSocialSignIn(
                  "google"
                )
              }
              className="flex h-10 min-w-0 items-center justify-center gap-2 rounded-md border border-gray-300 bg-white px-2 text-[11px] font-semibold text-gray-700 transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-60 sm:text-xs"
            >
              <svg
                className="size-4 shrink-0"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  fill="#4285F4"
                  d="M21.6 12.23c0-.71-.06-1.4-.18-2.06H12v3.9h5.38a4.6 4.6 0 0 1-2 3.02v2.53h3.24c1.9-1.75 2.98-4.33 2.98-7.39Z"
                />

                <path
                  fill="#34A853"
                  d="M12 22c2.7 0 4.97-.9 6.63-2.43l-3.24-2.53c-.9.6-2.05.96-3.39.96-2.61 0-4.82-1.76-5.61-4.13H3.04v2.61A10 10 0 0 0 12 22Z"
                />

                <path
                  fill="#FBBC05"
                  d="M6.39 13.87A6 6 0 0 1 6.08 12c0-.65.11-1.28.31-1.87V7.52H3.04A10 10 0 0 0 2 12c0 1.61.39 3.13 1.04 4.48l3.35-2.61Z"
                />

                <path
                  fill="#EA4335"
                  d="M12 6c1.47 0 2.79.51 3.83 1.5l2.87-2.87A9.64 9.64 0 0 0 12 2a10 10 0 0 0-8.96 5.52l3.35 2.61C7.18 7.76 9.39 6 12 6Z"
                />
              </svg>

              <span className="truncate">
                {socialLoading === "google"
                  ? "Connecting..."
                  : "Google"}
              </span>
            </button>

            {/* GITHUB */}

            <button
              type="button"
              disabled={disabled}
              onClick={() =>
                void handleSocialSignIn(
                  "github"
                )
              }
              className="flex h-10 min-w-0 items-center justify-center gap-2 rounded-md border border-gray-300 bg-white px-2 text-[11px] font-semibold text-gray-700 transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-60 sm:text-xs"
            >
              <svg
                viewBox="0 0 24 24"
                className="size-4 shrink-0"
                fill="currentColor"
                aria-hidden="true"
              >
                <path d="M12 2C6.48 2 2 6.58 2 12.23c0 4.52 2.87 8.35 6.84 9.71.5.09.68-.22.68-.49 0-.24-.01-1.05-.01-1.91-2.78.62-3.37-1.21-3.37-1.21-.45-1.18-1.11-1.49-1.11-1.49-.91-.64.07-.63.07-.63 1 .07 1.53 1.05 1.53 1.05.89 1.56 2.34 1.11 2.91.85.09-.66.35-1.11.63-1.37-2.22-.26-4.56-1.14-4.56-5.06 0-1.12.39-2.03 1.03-2.75-.1-.26-.45-1.3.1-2.71 0 0 .84-.28 2.75 1.05A9.3 9.3 0 0 1 12 6.92a9.3 9.3 0 0 1 2.5.35c1.91-1.33 2.75-1.05 2.75-1.05.55 1.41.2 2.45.1 2.71.64.72 1.03 1.63 1.03 2.75 0 3.93-2.34 4.8-4.57 5.05.36.32.68.95.68 1.92 0 1.39-.01 2.5-.01 2.84 0 .27.18.59.69.49A10.25 10.25 0 0 0 22 12.23C22 6.58 17.52 2 12 2Z" />
              </svg>

              <span className="truncate">
                {socialLoading === "github"
                  ? "Connecting..."
                  : "GitHub"}
              </span>
            </button>
          </div>

          {/* =========================
              SIGN UP LINK
          ========================== */}

          <p className="mt-5 text-center text-[11px] leading-5 text-gray-500 sm:mt-6 sm:text-xs">
            Don&apos;t have an account?{" "}
            <Link
              href="/signup"
              className="font-semibold text-green-600 hover:underline"
            >
              Sign Up
            </Link>
          </p>
        </div>

        {/* =========================
            BACK HOME
        ========================== */}

        <div className="mt-4 text-center sm:mt-5">
          <Link
            href="/"
            className="text-[11px] text-gray-500 transition hover:text-green-600 sm:text-xs"
          >
            ← Back to Home
          </Link>
        </div>
      </div>
    </main>
  );
}