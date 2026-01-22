"use client";

import { useState } from "react";
import { useLottie } from "lottie-react";
import { cn } from "@/lib/utils";
import * as animationData from "./cloud.json";

const CloudAnimation = ({ className }: { className?: string }) => {
  const [isReady, setIsReady] = useState(false);

  const { View } = useLottie({
    animationData: animationData,
    loop: true,
    onDOMLoaded: () => {
      requestAnimationFrame(() => {
        setIsReady(true);
      });
    },
  });

  return (
    <div
      className={cn(
        className,
        "transition-opacity duration-300",
        isReady ? "opacity-100" : "opacity-0"
      )}
    >
      {View}
    </div>
  );
};

export default CloudAnimation;
