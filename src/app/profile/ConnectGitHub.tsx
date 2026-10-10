"use client";

import { useState } from "react";
import { authClient } from "../../lib/auth-client";

export default function ConnectGitHub() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleConnect = async () => {
    setLoading(true);
    setError("");

    try {
      const result = await authClient.linkSocial({
        provider: "github",
        callbackURL: "/profile?github=connected",
      });

      if (result.error) {
        setError(
          result.error.message || "Failed to connect GitHub."
        );
        setLoading(false);
      }
    } catch {
      setError("Something went wrong. Please try again.");
      setLoading(false);
    }
  };

  return (
    <div className="mt-5 rounded-[9px] border border-[#e2e8e3] bg-[#fbfcfb] px-3 py-4 sm:px-4">
      <h2 className="text-[13px] font-bold text-[#273029] sm:text-[14px]">
        Connected Accounts
      </h2>

      <p className="mt-1 text-[10px] leading-5 text-[#737c76]">
        Connect your GitHub account to sign in more easily.
      </p>

      <button
        type="button"
        onClick={handleConnect}
        disabled={loading}
        className="mt-3 inline-flex w-full items-center justify-center gap-2 rounded-[6px] border border-[#d5ddd7] bg-white px-4 py-[10px] text-[11px] font-semibold text-[#303832] transition-colors hover:bg-[#f0f5f1] disabled:cursor-not-allowed disabled:opacity-60 min-[400px]:w-auto"
      >
        <svg
          width="17"
          height="17"
          viewBox="0 0 24 24"
          fill="currentColor"
          aria-hidden="true"
        >
          <path d="M12 .5C5.65.5.5 5.65.5 12c0 5.08 3.29 9.39 7.86 10.91.58.11.79-.25.79-.56 0-.28-.01-1.02-.02-2-3.2.7-3.88-1.36-3.88-1.36-.52-1.33-1.28-1.68-1.28-1.68-1.05-.72.08-.71.08-.71 1.16.08 1.77 1.19 1.77 1.19 1.03 1.77 2.71 1.26 3.37.96.1-.75.4-1.26.73-1.55-2.55-.29-5.23-1.28-5.23-5.69 0-1.26.45-2.29 1.19-3.1-.12-.29-.52-1.47.11-3.06 0 0 .97-.31 3.18 1.18A11.1 11.1 0 0 1 12 6.13c.98 0 1.97.13 2.9.39 2.21-1.49 3.18-1.18 3.18-1.18.63 1.59.23 2.77.11 3.06.74.81 1.19 1.84 1.19 3.1 0 4.42-2.69 5.4-5.25 5.68.41.35.78 1.03.78 2.08 0 1.5-.01 2.71-.01 3.08 0 .31.21.68.8.56A11.51 11.51 0 0 0 23.5 12C23.5 5.65 18.35.5 12 .5Z" />
        </svg>

        {loading ? "Connecting..." : "Connect GitHub"}
      </button>

      {error && (
        <p className="mt-3 text-[10px] text-red-600">
          {error}
        </p>
      )}
    </div>
  );
}