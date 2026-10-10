"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { authClient } from "../../../lib/auth-client";

type UpdateProfileFormProps = {
  currentName: string;
};

export default function UpdateProfileForm({
  currentName,
}: UpdateProfileFormProps) {
  const router = useRouter();

  const [name, setName] = useState(currentName);
  const [loading, setLoading] = useState(false);

  const handleUpdate = async (
    event: FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    const trimmedName = name.trim();

    if (!trimmedName) {
      toast.error("Please enter your name.");
      return;
    }

    if (trimmedName.length < 2) {
      toast.error("Name must be at least 2 characters.");
      return;
    }

    setLoading(true);

    try {
      const { error } = await authClient.updateUser({
        name: trimmedName,
      });

      if (error) {
        toast.error(
          error.message || "Failed to update profile."
        );

        setLoading(false);
        return;
      }

      toast.success("Profile updated successfully!");

      router.push("/profile");
      router.refresh();
    } catch (error) {
      console.error("Profile update failed:", error);

      toast.error(
        "Failed to update profile. Please try again."
      );

      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleUpdate} className="mt-5">
      {/* NAME */}

      <div>
        <label
          htmlFor="name"
          className="block text-[9px] font-medium text-[#555e57] sm:text-[10px]"
        >
          Name
        </label>

        <input
          id="name"
          type="text"
          value={name}
          onChange={(event) => setName(event.target.value)}
          disabled={loading}
          placeholder="Enter your name"
          className="mt-2 w-full rounded-[6px] border border-[#dce4de] bg-white px-3 py-[10px] text-[10px] text-[#303832] outline-none transition-colors placeholder:text-[#a0a7a2] focus:border-[#009846] disabled:cursor-not-allowed disabled:bg-[#f7f8f7] sm:text-[11px]"
        />
      </div>

      {/* UPDATE BUTTON */}

      <button
        type="submit"
        disabled={loading}
        className="mt-3 flex w-full items-center justify-center rounded-[6px] bg-[#009846] px-4 py-[10px] text-[9px] font-semibold text-white transition-colors hover:bg-[#00843d] disabled:cursor-not-allowed disabled:opacity-60 sm:text-[10px]"
      >
        {loading ? "Updating..." : "Update Information"}
      </button>
    </form>
  );
}