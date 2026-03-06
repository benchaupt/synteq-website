"use client";

import { cn } from "@/lib/utils";
import { useState } from "react";

const interestOptions = [
  "Hardware",
  "HPC",
  "Digital Mining",
  "Services",
  "Investment",
  "Press",
  "Other",
] as const;

export function ContactForm() {
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [isSubmitting, setIsSubmitting] = useState(false);

  function toggleInterest(option: string) {
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(option)) {
        next.delete(option);
      } else {
        next.add(option);
      }
      return next;
    });
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsSubmitting(true);

    // TODO: HubSpot integration
    const formData = new FormData(e.currentTarget);
    const data = {
      firstName: formData.get("firstName"),
      lastName: formData.get("lastName"),
      email: formData.get("email"),
      company: formData.get("company"),
      interests: Array.from(selected),
      message: formData.get("message"),
    };

    console.log("Form submitted:", data);
    setIsSubmitting(false);
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      {/* Name row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <input
          type="text"
          name="firstName"
          placeholder="First Name"
          required
          className="h-12 border border-lava-25 bg-white px-4 text-body text-lava placeholder:text-slate-60 focus:outline-none focus:border-lava transition-colors"
        />
        <input
          type="text"
          name="lastName"
          placeholder="Last Name"
          required
          className="h-12 border border-lava-25 bg-white px-4 text-body text-lava placeholder:text-slate-60 focus:outline-none focus:border-lava transition-colors"
        />
      </div>

      {/* Email */}
      <input
        type="email"
        name="email"
        placeholder="Work Email"
        required
        className="h-12 border border-lava-25 bg-white px-4 text-body text-lava placeholder:text-slate-60 focus:outline-none focus:border-lava transition-colors"
      />

      {/* Company */}
      <input
        type="text"
        name="company"
        placeholder="Company Name"
        className="h-12 border border-lava-25 bg-white px-4 text-body text-lava placeholder:text-slate-60 focus:outline-none focus:border-lava transition-colors"
      />

      {/* Interests */}
      <fieldset className="flex flex-col gap-3 pt-2">
        <legend className="text-body font-medium text-lava">
          What are you interested in?
        </legend>
        <div className="flex flex-wrap gap-2.5">
          {interestOptions.map((option) => (
            <button
              key={option}
              type="button"
              onClick={() => toggleInterest(option)}
              className={cn(
                "h-10 px-5 border text-sm font-medium transition-colors",
                selected.has(option)
                  ? "border-lava bg-lava text-white"
                  : "border-lava-25 bg-white text-lava hover:border-lava",
              )}
            >
              {option}
            </button>
          ))}
        </div>
      </fieldset>

      {/* Message */}
      <textarea
        name="message"
        placeholder="Your Message Here"
        rows={5}
        className="border border-lava-25 bg-white px-4 py-3 text-body text-lava placeholder:text-slate-60 focus:outline-none focus:border-lava transition-colors resize-none"
      />

      {/* Submit */}
      <button
        type="submit"
        disabled={isSubmitting}
        className="mt-2 h-12 w-fit px-8 bg-lava text-white text-sm font-semibold hover:bg-lava-90 transition-colors disabled:opacity-50"
      >
        {isSubmitting ? "Sending..." : "Contact"}
      </button>
    </form>
  );
}
