"use client";

import dynamic from "next/dynamic";
import { Suspense } from "react";

// Dynamically import Lottie with no SSR
const Lottie = dynamic(() => import("lottie-react"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-64 animate-pulse bg-gray-200/10 rounded-lg" />
  ),
});

const AnimationLottie = ({ animationPath, width }) => {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationPath,
    style: {
      width: width || "95%",
      height: "auto",
    },
  };

  return (
    <Suspense
      fallback={
        <div className="w-full h-64 animate-pulse bg-gray-200/10 rounded-lg" />
      }
    >
      <Lottie {...defaultOptions} />
    </Suspense>
  );
};

export default AnimationLottie;
