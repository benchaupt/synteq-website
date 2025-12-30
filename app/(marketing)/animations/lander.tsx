"use client";

import { useLottie } from "lottie-react";
import * as animationData from "./lander.json";

const MyLottieComponent = ({className}: {className: string}) => {
  const defaultOptions = {
    animationData: animationData,
    loop: true,
  };

  const { View } = useLottie(defaultOptions);

  return (
    <>
      <div className={className}>
        {View}
      </div>
    </>
  );
};

export default MyLottieComponent;