"use client";

import { useState } from "react";
import { useLottie } from "lottie-react";
import { cn } from "@/lib/utils";
import * as animationData from "./lander.json";

const MyLottieComponent = ({className}: {className: string}) => {
  const [isReady, setIsReady] = useState(false);

  const { View } = useLottie({
    animationData: animationData,
    loop: true,
    onDOMLoaded: () => {
      // Small delay to ensure first frame is fully painted
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

export default MyLottieComponent;