"use client";

import { useState } from "react";
import { Check } from "lucide-react";
import { CSSIcon } from "@/app/_components/icon";

export function CopyLinkButton() {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <button
      type="button"
      onClick={handleCopy}
      className="group flex items-center justify-center self-center text-lava hover:scale-90 transition-all outline-none"
      aria-label="Copy link to clipboard"
    >
      {copied ? (
        <Check className="size-5 text-lava" />
      ) : (
        <CSSIcon name="link" size="md" className="text-lava transition-colors group-hover:text-slate" />
      )}
    </button>
  );
}
