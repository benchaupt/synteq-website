"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { StyledHeading } from "@/app/_components/styled-heading";
import { Logo } from "@/app/_components/logo";

type ColorOption = "lava" | "white" | "slate";

const colorOptions: { value: ColorOption; swatch: string }[] = [
  { value: "lava", swatch: "bg-lava" },
  { value: "white", swatch: "bg-white outline outline-1 outline-black/25" },
  { value: "slate", swatch: "bg-slate" },
];

const logoColors: Record<ColorOption, string> = {
  lava: "text-lava",
  white: "text-white",
  slate: "text-slate",
};

const logoAssets = [
  {
    label: "Primary Logo",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam.",
    file: "/images/logos/synteq-primary-logo.svg",
    type: "full" as const,
  },
  {
    label: "Secondary",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam.",
    file: "/assets/press-contact/synteq-logo-secondary.svg",
    type: "secondary" as const,
  },
];

function DownloadButton({ href }: { href: string }) {
  return (
    <a
      href={href}
      download
      className="group relative inline-flex w-fit items-center overflow-hidden"
    >
      <span className="absolute inset-y-0 left-0 size-6 bg-lava transition-all duration-300 ease-out group-hover:w-full" />
      <span className="relative z-10 flex shrink-0 items-center justify-center size-6">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/icons/download.svg" alt="" className="size-3.5 invert" />
      </span>
      <span className="relative z-10 pr-3 pl-2 text-sm font-bold text-lava transition-colors duration-300 group-hover:text-white">
        Download
      </span>
    </a>
  );
}

function DownloadAllButton() {
  const allFiles = logoAssets.map((a) => a.file);

  const handleDownloadAll = () => {
    allFiles.forEach((file) => {
      const a = document.createElement("a");
      a.href = file;
      a.download = "";
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    });
  };

  return (
    <button
      onClick={handleDownloadAll}
      className="group relative inline-flex w-fit items-center overflow-hidden"
    >
      <span className="absolute inset-y-0 left-0 size-6 bg-lava transition-all duration-300 ease-out group-hover:w-full" />
      <span className="relative z-10 flex shrink-0 items-center justify-center size-6">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/icons/download.svg" alt="" className="size-3.5 invert" />
      </span>
      <span className="relative z-10 pr-3 pl-2 text-sm font-bold text-lava transition-colors duration-300 group-hover:text-white">
        Download All
      </span>
    </button>
  );
}

function ColorToggles({
  active,
  onChange,
}: {
  active: ColorOption;
  onChange: (c: ColorOption) => void;
}) {
  return (
    <div className="flex gap-2">
      {colorOptions.map((opt) => (
        <button
          key={opt.value}
          onClick={() => onChange(opt.value)}
          aria-label={`${opt.value} color`}
          className={cn(
            "size-8 transition-transform duration-200 hover:scale-85",
            opt.swatch,
            active === opt.value && "scale-85",
          )}
        />
      ))}
    </div>
  );
}

export function BrandLogosSection() {
  const [logoColor, setLogoColor] = useState<ColorOption>("lava");
  const [iconColor, setIconColor] = useState<ColorOption>("lava");

  return (
    <div className="flex flex-col gap-20">
      {/* Our Logo */}
      <div className="flex flex-col gap-10">
        <div className="flex items-end justify-between gap-4">
          <StyledHeading as="h2" className="heading">
            {"Our Logo."}
          </StyledHeading>
          <DownloadAllButton />
        </div>

        <ColorToggles active={logoColor} onChange={setLogoColor} />

        <div className="flex flex-col gap-12">
          {logoAssets.map((asset) => (
            <div
              key={asset.label}
              className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start"
            >
              <div className="flex items-center py-4">
                <div
                  className={cn(
                    "inline-flex items-center py-4 transition-all duration-300",
                    logoColor === "white"
                      ? "bg-lava px-6"
                      : "bg-transparent px-0",
                  )}
                >
                  <Logo
                    size="xl"
                    className={cn(
                      "h-12 w-auto transition-colors duration-300",
                      logoColors[logoColor],
                    )}
                  />
                </div>
              </div>

              <div className="flex flex-col gap-3">
                <div className="flex items-start justify-between gap-4">
                  <h3 className="heading3 font-medium">{asset.label}</h3>
                  <DownloadButton href={asset.file} />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Icon */}
      <div className="flex flex-col gap-10">
        <div className="flex items-end justify-between gap-4">
          <StyledHeading as="h2" className="heading">
            {"Icon."}
          </StyledHeading>
          <DownloadButton href="/assets/press-contact/synteq-icon.svg" />
        </div>

        <ColorToggles active={iconColor} onChange={setIconColor} />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
          <div className="flex items-center py-4">
            <div
              className={cn(
                "inline-flex items-center py-4 transition-all duration-300",
                iconColor === "white"
                  ? "bg-lava px-6"
                  : "bg-transparent px-0",
              )}
            >
              <span
                className={cn(
                  "block h-16 w-14 transition-colors duration-300 bg-current",
                  logoColors[iconColor],
                )}
                style={{
                  maskImage: "url(/assets/press-contact/synteq-icon.svg)",
                  maskSize: "contain",
                  maskRepeat: "no-repeat",
                  maskPosition: "center",
                  WebkitMaskImage: "url(/assets/press-contact/synteq-icon.svg)",
                  WebkitMaskSize: "contain",
                  WebkitMaskRepeat: "no-repeat",
                  WebkitMaskPosition: "center",
                }}
                aria-label="Synteq Q mark"
              />
            </div>
          </div>

          <div className="flex flex-col gap-3">
            <div className="flex items-start justify-between gap-4">
              <h3 className="heading3 font-medium">Primary Logo</h3>
              <DownloadButton href="/assets/press-contact/synteq-icon.svg" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
