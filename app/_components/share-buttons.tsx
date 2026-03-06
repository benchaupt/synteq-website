"use client";

import { useState } from "react";
import { Check } from "lucide-react";
import { CSSIcon } from "@/app/_components/icon";

export function ShareButtons() {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleShareX = () => {
    const url = encodeURIComponent(window.location.href);
    const text = encodeURIComponent(document.title);
    window.open(
      `https://x.com/intent/tweet?url=${url}&text=${text}`,
      "_blank",
      "noopener,noreferrer",
    );
  };

  const handleShareLinkedIn = () => {
    const url = encodeURIComponent(window.location.href);
    window.open(
      `https://www.linkedin.com/sharing/share-offsite/?url=${url}`,
      "_blank",
      "noopener,noreferrer",
    );
  };

  return (
    <div className="flex items-center gap-3">
      <button
        type="button"
        onClick={handleCopy}
        className="flex items-center justify-center text-lava origin-center hover:scale-90 transition-all outline-none"
        aria-label="Copy link to clipboard"
      >
        {copied ? (
          <Check className="size-4 text-lava" />
        ) : (
          <CSSIcon name="link" size="sm" className="text-lava transition-colors hover:text-slate" />
        )}
      </button>
      <button
        type="button"
        onClick={handleShareX}
        className="flex items-center justify-center text-lava origin-center hover:scale-90 transition-all outline-none"
        aria-label="Share on X"
      >
        <CSSIcon name="socials/x-logo" size="sm" className="text-lava transition-colors hover:text-slate" />
      </button>
      <button
        type="button"
        onClick={handleShareLinkedIn}
        className="flex items-center justify-center text-lava origin-center hover:scale-90 transition-all outline-none"
        aria-label="Share on LinkedIn"
      >
        <CSSIcon name="socials/linkedin-logo" size="sm" className="text-lava transition-colors hover:text-slate" />
      </button>
    </div>
  );
}
