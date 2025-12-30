"use client";

import dynamic from 'next/dynamic';

const LottieComponent = dynamic(() => import('./lander'), { ssr: false });


export const LanderDynamic = ({className}: {className: string}) => {
  return (
    <LottieComponent className={className} />
  );
};