"use client";

import dynamic from "next/dynamic";

const LottieComponent = dynamic(() => import("./cloud"), { ssr: false });

export const CloudDynamic = ({ className }: { className?: string }) => {
  return <LottieComponent className={className} />;
};
