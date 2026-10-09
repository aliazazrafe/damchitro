"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { authClient } from "../../lib/auth-client";

export default function SignUpPage() {
  const router = useRouter();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const [socialLoading, setSocialLoading] = useState<
    "google" | "github" | null
  >(null);

  const handleSignUp = async () => {
    setError("");
    setSuccess("");

    if (
      !name.trim() ||
      !email.trim() ||
      !password ||
      !confirmPassword
    ) {
      setError("Please fill in all fields.");
      return;
    }

    if (password.length < 8) {
      setError("Password must be at least 8 characters.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setLoading(true);

    try {
      const { error } = await authClient.signUp.email({
        name: name.trim(),
        email: email.trim(),
        password,
      });

      if (error) {
        setError(error.message || "Failed to create account.");
        return;
      }

      setSuccess("Account created successfully!");

      setTimeout(() => {
        router.push("/signin");
        router.refresh();
      }, 700);
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleSocialSignUp = async (
    provider: "google" | "github"
  ) => {
    setError("");
    setSuccess("");
    setSocialLoading(provider);

    try {
      const { error } = await authClient.signIn.social({
        provider,
        callbackURL: "/",
        errorCallbackURL: "/signup",
      });

      if (error) {
        setError(
          error.message || `${provider} authentication failed.`
        );
        setSocialLoading(null);
      }
    } catch {
      setError("Social authentication failed. Please try again.");
      setSocialLoading(null);
    }
  };

  const disabled = loading || socialLoading !== null;

  return (
    <main className="min-h-screen bg-green-50 px-4 py-10">
      <div className="mx-auto w-full max-w-sm">
        <div className="rounded-xl border border-gray-200 bg-white px-6 py-7 shadow-sm">
          {/* Header */}
          <div className="text-center">
            <div className="mx-auto flex size-12 items-center justify-center rounded-xl bg-green-600 text-2xl text-white">
              🛒
            </div>

            <h1 className="mt-4 text-2xl font-bold text-gray-900">
              Sign Up
            </h1>

            <p className="mt-1 text-xs leading-4 text-gray-500">
              Create your Bazar Dor account to continue.
            </p>
          </div>

          {/* Sign Up Form */}
          <form
            className="mt-6"
            onSubmit={(e) => {
              e.preventDefault();
              void handleSignUp();
            }}
          >
            {/* Name */}
            <div>
              <label
                htmlFor="name"
                className="mb-2 block text-xs font-semibold text-gray-700"
              >
                Full Name
              </label>

              <input
                id="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter your full name"
                autoComplete="name"
                required
                disabled={disabled}
                className="h-10 w-full rounded-md border border-gray-300 bg-white px-3 text-xs text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-green-600 disabled:cursor-not-allowed disabled:bg-gray-50"
              />
            </div>

            {/* Email */}
            <div className="mt-4">
              <label
                htmlFor="email"
                className="mb-2 block text-xs font-semibold text-gray-700"
              >
                Email Address
              </label>

              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                autoComplete="email"
                required
                disabled={disabled}
                className="h-10 w-full rounded-md border border-gray-300 bg-white px-3 text-xs text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-green-600 disabled:cursor-not-allowed disabled:bg-gray-50"
              />
            </div>

            {/* Password */}
            <div className="mt-4">
              <label
                htmlFor="password"
                className="mb-2 block text-xs font-semibold text-gray-700"
              >
                Password
              </label>

              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Create a password"
                autoComplete="new-password"
                required
                minLength={8}
                disabled={disabled}
                className="h-10 w-full rounded-md border border-gray-300 bg-white px-3 text-xs text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-green-600 disabled:cursor-not-allowed disabled:bg-gray-50"
              />
            </div>

            {/* Confirm Password */}
            <div className="mt-4">
              <label
                htmlFor="confirmPassword"
                className="mb-2 block text-xs font-semibold text-gray-700"
              >
                Confirm Password
              </label>

              <input
                id="confirmPassword"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Enter your password again"
                autoComplete="new-password"
                required
                minLength={8}
                disabled={disabled}
                className="h-10 w-full rounded-md border border-gray-300 bg-white px-3 text-xs text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-green-600 disabled:cursor-not-allowed disabled:bg-gray-50"
              />
            </div>

            {/* Error */}
            {error && (
              <div
                role="alert"
                className="mt-4 rounded-md border border-red-200 bg-red-50 px-3 py-2 text-xs text-red-600"
              >
                {error}
              </div>
            )}

            {/* Success */}
            {success && (
              <div
                role="status"
                className="mt-4 rounded-md border border-green-200 bg-green-50 px-3 py-2 text-xs text-green-700"
              >
                {success}
              </div>
            )}

            {/* Sign Up Button */}
            <button
              type="submit"
              disabled={disabled}
              className="mt-6 flex h-10 w-full items-center justify-center rounded-md bg-green-600 text-xs font-semibold text-white transition hover:bg-green-700 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? "Creating Account..." : "Create Account"}
            </button>
          </form>

          {/* Divider */}
          <div className="my-5 flex items-center gap-3">
            <div className="h-px flex-1 bg-gray-200" />

            <span className="text-xs text-gray-400">
              OR
            </span>

            <div className="h-px flex-1 bg-gray-200" />
          </div>

          {/* Google + GitHub */}
          <div className="grid grid-cols-2 gap-3">
            {/* Google */}
            <button
              type="button"
              disabled={disabled}
              onClick={() => void handleSocialSignUp("google")}
              className="flex h-10 items-center justify-center gap-2 rounded-md border border-gray-300 bg-white px-2 text-xs font-semibold text-gray-700 transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-60"
            >
              <svg
                className="size-4"
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

              <span>
                {socialLoading === "google"
                  ? "Connecting..."
                  : "Google"}
              </span>
            </button>

            {/* GitHub */}
            <button
              type="button"
              disabled={disabled}
              onClick={() => void handleSocialSignUp("github")}
              className="flex h-10 items-center justify-center gap-2 rounded-md border border-gray-300 bg-white px-2 text-xs font-semibold text-gray-700 transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-60"
            >
              <svg
                viewBox="0 0 24 24"
                className="size-4"
                fill="currentColor"
                aria-hidden="true"
              >
                <path d="M12 2C6.48 2 2 6.58 2 12.23c0 4.52 2.87 8.35 6.84 9.71.5.09.68-.22.68-.49 0-.24-.01-1.05-.01-1.91-2.78.62-3.37-1.21-3.37-1.21-.45-1.18-1.11-1.49-1.11-1.49-.91-.64.07-.63.07-.63 1 .07 1.53 1.05 1.53 1.05.89 1.56 2.34 1.11 2.91.85.09-.66.35-1.11.63-1.37-2.22-.26-4.56-1.14-4.56-5.06 0-1.12.39-2.03 1.03-2.75-.1-.26-.45-1.3.1-2.71 0 0 .84-.28 2.75 1.05A9.3 9.3 0 0 1 12 6.92a9.3 9.3 0 0 1 2.5.35c1.91-1.33 2.75-1.05 2.75-1.05.55 1.41.2 2.45.1 2.71.64.72 1.03 1.63 1.03 2.75 0 3.93-2.34 4.8-4.57 5.05.36.32.68.95.68 1.92 0 1.39-.01 2.5-.01 2.84 0 .27.18.59.69.49A10.25 10.25 0 0 0 22 12.23C22 6.58 17.52 2 12 2Z" />
              </svg>

              <span>
                {socialLoading === "github"
                  ? "Connecting..."
                  : "GitHub"}
              </span>
            </button>
          </div>

          {/* Sign In Link */}
          <p className="mt-6 text-center text-xs text-gray-500">
            Already have an account?{" "}
            <Link
              href="/signin"
              className="font-semibold text-green-600 hover:underline"
            >
              Sign In
            </Link>
          </p>
        </div>

        {/* Back Home */}
        <div className="mt-5 text-center">
          <Link
            href="/"
            className="text-xs text-gray-500 transition hover:text-green-600"
          >
            ← Back to Home
          </Link>
        </div>
      </div>
    </main>
  );
}