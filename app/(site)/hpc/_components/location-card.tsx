"use client";

import { useEffect, useState } from "react";
import { Maximize2, Minimize2 } from "lucide-react";
import {
  motion,
  useMotionValue,
  useTransform,
  animate,
} from "motion/react";

// ── Configurable appearance ──────────────────────────
const SVG_WIDTH = 5795;
const SVG_HEIGHT = 3821;
const DEFAULT_SCALE = 50; // Default zoom (50x = tight crop on dot)
const HOVER_SCALE = 5; // Zoom out to 5x on hover / mobile expand
const DOT_SIZE_ZOOMED = 24; // px — dot size when tight-zoomed (default)
const DOT_SIZE_BASE = 24; // px — dot size when zoomed out (hover)
const DOT_COLOR = "#0F1315"; // lava
const DOT_BORDER_COLOR = "#FFFFFF";
const ANIM_DURATION = 0.35; // seconds
const ANIM_EASE: [number, number, number, number] = [0.4, 0, 0.2, 1]; // ease-in-out

// ── Types ────────────────────────────────────────────
export interface LocationGroup {
  state: string;
  type: "domestic" | "international";
  names: string[];
  dots: { x: number; y: number }[];
}

// ── Card component ───────────────────────────────────
export function LocationCard({
  group,
  international = false,
}: {
  group: LocationGroup;
  international?: boolean;
}) {
  const [hovered, setHovered] = useState(false);
  const [mobileExpanded, setMobileExpanded] = useState(false);
  const [isTouch, setIsTouch] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setIsTouch(window.matchMedia("(pointer: coarse)").matches);
  }, []);

  const { names, dots } = group;

  // Centroid of all dots — zoom anchor point
  const centerX = dots.reduce((s, d) => s + d.x, 0) / dots.length;
  const centerY = dots.reduce((s, d) => s + d.y, 0) / dots.length;

  const isZoomedOut = (!isTouch && hovered) || mobileExpanded;
  const targetScale = isZoomedOut ? HOVER_SCALE / DEFAULT_SCALE : 1;

  // Single motion value drives BOTH the zoom layer and dot counter-scale.
  // useTransform derives the dot scale from the zoom scale every frame,
  // so they never desync — the product is always constant.
  const zoomScale = useMotionValue(1);
  const dotCounterScale = useTransform(zoomScale, (s) => {
    const target = s < 1 ? DOT_SIZE_BASE : DOT_SIZE_ZOOMED;
    return target / (DOT_SIZE_ZOOMED * s);
  });

  useEffect(() => {
    const controls = animate(zoomScale, targetScale, {
      duration: ANIM_DURATION,
      ease: ANIM_EASE,
    });
    return () => controls.stop();
  }, [targetScale, zoomScale]);

  // Centroid as % of the SVG / map element
  const cxPct = (centerX / SVG_WIDTH) * 100;
  const cyPct = (centerY / SVG_HEIGHT) * 100;

  return (
    <div
      className="relative flex flex-col justify-between border border-black bg-offwhite overflow-hidden aspect-[4/5] p-4 cursor-pointer md:cursor-default"
      onMouseEnter={() => !isTouch && setHovered(true)}
      onMouseLeave={() => !isTouch && setHovered(false)}
      onClick={() => isTouch && setMobileExpanded((prev) => !prev)}
    >
      {/* Map clip container */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Positioning layer — places the dot centroid at the card center */}
        <div
          style={{
            position: "absolute",
            width: `${DEFAULT_SCALE * 100}%`,
            aspectRatio: `${SVG_WIDTH} / ${SVG_HEIGHT}`,
            left: "50%",
            top: "50%",
            transform: `translate(-${cxPct}%, -${cyPct}%)`,
          }}
        >
          {/* Zoom layer — scales around the centroid, driven by motion value */}
          <motion.div
            style={{
              width: "100%",
              height: "100%",
              transformOrigin: `${cxPct}% ${cyPct}%`,
              scale: zoomScale,
            }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/global_map.svg"
              alt=""
              className="size-full"
              draggable={false}
            />

            {/* Dots — positioned in SVG coordinate space, counter-scaled in sync */}
            {dots.map((dot, i) => (
              <motion.div
                key={i}
                style={{
                  position: "absolute",
                  left: `${(dot.x / SVG_WIDTH) * 100}%`,
                  top: `${(dot.y / SVG_HEIGHT) * 100}%`,
                  width: DOT_SIZE_ZOOMED,
                  height: DOT_SIZE_ZOOMED,
                  borderRadius: "50%",
                  backgroundColor: DOT_COLOR,
                  border: `2px solid ${DOT_BORDER_COLOR}`,
                  x: "-50%",
                  y: "-50%",
                  scale: dotCounterScale,
                }}
              />
            ))}
          </motion.div>
        </div>
      </div>

      {/* Bottom gradient for text legibility */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-offwhite/90 to-transparent" />

      {/* Type icon — top right */}
      <div className="relative z-10 flex justify-end">
        {international ? (
          <svg
            width="18"
            height="18"
            viewBox="0 0 18 18"
            fill="currentColor"
            className="text-lava"
          >
            <path d="M8.81526 13.0774C6.52776 13.0774 4.24846 12.7577 2.05115 12.11C2.04295 12.4379 1.77239 12.7085 1.43623 12.7085C1.10008 12.7085 0.821314 12.4297 0.821314 12.0936V11.2737C0.821314 11.0769 0.919701 10.8883 1.07548 10.7735C1.23946 10.6588 1.44443 10.626 1.63301 10.6916C6.2654 12.233 11.3733 12.233 16.0057 10.6916C16.1943 10.626 16.3993 10.6588 16.5632 10.7735C16.7272 10.8883 16.8174 11.0769 16.8174 11.2737V12.0936C16.8174 12.4297 16.5386 12.7085 16.2025 12.7085C15.8663 12.7085 15.5958 12.4461 15.5876 12.11C13.3821 12.7577 11.1028 13.0774 8.81526 13.0774Z" />
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M8.81348 0C13.6753 0 17.6277 3.95168 17.6279 8.81348C17.6279 13.6754 13.6754 17.6279 8.81348 17.6279C3.95168 17.6277 0 13.6753 0 8.81348C0.000196364 3.9518 3.9518 0.000196368 8.81348 0ZM11.668 5.95703C9.77515 5.72023 7.85386 5.72011 5.96094 5.95605C5.53995 9.31911 5.86542 12.7723 6.93848 16.0029C6.95739 16.0574 6.9668 16.1132 6.96973 16.1689C7.56031 16.3171 8.17764 16.3974 8.81348 16.3975C9.44986 16.3975 10.0681 16.3173 10.6592 16.1689C10.6617 16.1113 10.6709 16.0532 10.6914 15.9961C11.7642 12.7721 12.0884 9.32144 11.668 5.95703ZM12.9316 6.15039C13.2834 9.33447 12.9991 12.583 12.0801 15.6562C14.6312 14.4334 16.3975 11.826 16.3975 8.81348C16.3974 8.17624 16.3168 7.55759 16.168 6.96582C16.1106 6.96392 16.0534 6.95602 15.9961 6.93457C14.9938 6.60106 13.9688 6.33958 12.9316 6.15039ZM4.70117 6.14746C3.65915 6.33684 2.6299 6.59956 1.62305 6.93457C1.56851 6.95229 1.51326 6.95998 1.45898 6.96289C1.30977 7.55544 1.22952 8.17531 1.22949 8.81348C1.22949 11.7729 2.93549 14.3399 5.41406 15.5889C5.44845 15.5821 5.48416 15.5771 5.52051 15.5762C4.62607 12.5225 4.35255 9.30262 4.70117 6.14746ZM12.0879 1.97363C12.3709 2.92553 12.5943 3.89343 12.7559 4.87109C13.7338 5.03332 14.7019 5.25703 15.6533 5.54102C14.9057 3.98518 13.6436 2.72139 12.0879 1.97363ZM5.41797 2.03516C3.91912 2.78917 2.70163 4.02423 1.97363 5.53809C2.92758 5.25412 3.89807 5.03109 4.87793 4.86914C5.03491 3.91785 5.24895 2.97496 5.52051 2.04785C5.48545 2.047 5.45121 2.0415 5.41797 2.03516ZM8.81348 1.22949C8.17778 1.22952 7.56019 1.30894 6.96973 1.45703C6.96735 1.51508 6.95816 1.57324 6.93848 1.62988C6.60495 2.63224 6.34349 3.65662 6.1543 4.69336C7.92171 4.4978 9.7092 4.49834 11.4756 4.69434C11.2864 3.65536 11.0253 2.62835 10.6914 1.62305C10.6733 1.56859 10.6647 1.51299 10.6621 1.45801C10.0703 1.30922 9.45078 1.22949 8.81348 1.22949Z"
            />
          </svg>
        ) : (
          <svg
            width="20"
            height="13"
            viewBox="0 0 20 13"
            fill="currentColor"
            className="text-lava"
          >
            <path d="M0 0V6.92408H19.3874V5.53926H10.4394V4.15445H19.3874V2.76963H10.4394V1.38482H19.3874V0H0ZM1.49134 0.692408C1.68911 0.692408 1.87877 0.76536 2.01861 0.895207C2.15845 1.02506 2.23701 1.20118 2.23701 1.38482C2.23701 1.56846 2.15845 1.74457 2.01861 1.87442C1.87877 2.00427 1.68911 2.07722 1.49134 2.07722C1.29358 2.07722 1.10392 2.00427 0.964078 1.87442C0.824233 1.74457 0.745671 1.56846 0.745671 1.38482C0.745671 1.20118 0.824233 1.02506 0.964078 0.895207C1.10392 0.76536 1.29358 0.692408 1.49134 0.692408ZM4.47403 0.692408C4.67179 0.692408 4.86145 0.76536 5.00129 0.895207C5.14114 1.02506 5.2197 1.20118 5.2197 1.38482C5.2197 1.56846 5.14114 1.74457 5.00129 1.87442C4.86145 2.00427 4.67179 2.07722 4.47403 2.07722C4.27626 2.07722 4.0866 2.00427 3.94676 1.87442C3.80692 1.74457 3.72836 1.56846 3.72836 1.38482C3.72836 1.20118 3.80692 1.02506 3.94676 0.895207C4.0866 0.76536 4.27626 0.692408 4.47403 0.692408ZM7.45671 0.692408C7.65447 0.692408 7.84413 0.76536 7.98398 0.895207C8.12382 1.02506 8.20238 1.20118 8.20238 1.38482C8.20238 1.56846 8.12382 1.74457 7.98398 1.87442C7.84413 2.00427 7.65447 2.07722 7.45671 2.07722C7.25895 2.07722 7.06928 2.00427 6.92944 1.87442C6.7896 1.74457 6.71104 1.56846 6.71104 1.38482C6.71104 1.20118 6.7896 1.02506 6.92944 0.895207C7.06928 0.76536 7.25895 0.692408 7.45671 0.692408ZM2.98268 2.76963C3.18045 2.76963 3.37011 2.84258 3.50995 2.97243C3.64979 3.10229 3.72836 3.2784 3.72836 3.46204C3.72836 3.64568 3.64979 3.82179 3.50995 3.95165C3.37011 4.0815 3.18045 4.15445 2.98268 4.15445C2.78492 4.15445 2.59526 4.0815 2.45542 3.95165C2.31557 3.82179 2.23701 3.64568 2.23701 3.46204C2.23701 3.2784 2.31557 3.10229 2.45542 2.97243C2.59526 2.84258 2.78492 2.76963 2.98268 2.76963ZM5.96537 2.76963C6.16313 2.76963 6.35279 2.84258 6.49264 2.97243C6.63248 3.10229 6.71104 3.2784 6.71104 3.46204C6.71104 3.64568 6.63248 3.82179 6.49264 3.95165C6.35279 4.0815 6.16313 4.15445 5.96537 4.15445C5.7676 4.15445 5.57794 4.0815 5.4381 3.95165C5.29826 3.82179 5.2197 3.64568 5.2197 3.46204C5.2197 3.2784 5.29826 3.10229 5.4381 2.97243C5.57794 2.84258 5.7676 2.76963 5.96537 2.76963ZM8.94805 2.76963C9.14578 2.76963 9.33544 2.84258 9.47529 2.97243C9.61515 3.10229 9.69376 3.2784 9.69376 3.46204C9.69376 3.64568 9.61515 3.82179 9.47529 3.95165C9.33544 4.0815 9.14578 4.15445 8.94805 4.15445C8.75029 4.15445 8.56063 4.0815 8.42079 3.95165C8.28094 3.82179 8.20238 3.64568 8.20238 3.46204C8.20238 3.2784 8.28094 3.10229 8.42079 2.97243C8.56063 2.84258 8.75029 2.76963 8.94805 2.76963ZM1.49134 4.84686C1.68911 4.84686 1.87877 4.91981 2.01861 5.04966C2.15845 5.17951 2.23701 5.35562 2.23701 5.53926C2.23701 5.7229 2.15845 5.89902 2.01861 6.02887C1.87877 6.15872 1.68911 6.23167 1.49134 6.23167C1.29358 6.23167 1.10392 6.15872 0.964078 6.02887C0.824233 5.89902 0.745671 5.7229 0.745671 5.53926C0.745671 5.35562 0.824233 5.17951 0.964078 5.04966C1.10392 4.91981 1.29358 4.84686 1.49134 4.84686ZM4.47403 4.84686C4.67179 4.84686 4.86145 4.91981 5.00129 5.04966C5.14114 5.17951 5.2197 5.35562 5.2197 5.53926C5.2197 5.7229 5.14114 5.89902 5.00129 6.02887C4.86145 6.15872 4.67179 6.23167 4.47403 6.23167C4.27626 6.23167 4.0866 6.15872 3.94676 6.02887C3.80692 5.89902 3.72836 5.7229 3.72836 5.53926C3.72836 5.35562 3.80692 5.17951 3.94676 5.04966C4.0866 4.91981 4.27626 4.84686 4.47403 4.84686ZM7.45671 4.84686C7.65447 4.84686 7.84413 4.91981 7.98398 5.04966C8.12382 5.17951 8.20238 5.35562 8.20238 5.53926C8.20238 5.7229 8.12382 5.89902 7.98398 6.02887C7.84413 6.15872 7.65447 6.23167 7.45671 6.23167C7.25895 6.23167 7.06928 6.15872 6.92944 6.02887C6.7896 5.89902 6.71104 5.7229 6.71104 5.53926C6.71104 5.35562 6.7896 5.17951 6.92944 5.04966C7.06928 4.91981 7.25895 4.84686 7.45671 4.84686ZM0 8.3089V9.69371H19.3874V8.3089H0ZM0 11.0785V12.4633H19.3874V11.0785H0Z" />
          </svg>
        )}
      </div>

      {/* Bottom row: cities + controls */}
      <div className="relative z-10 flex items-end justify-between gap-2">
        <div className="flex flex-col">
          {names.map((name) => (
            <span key={name} className="text-body-lg md:text-body font-medium text-lava">
              {name}
            </span>
          ))}
        </div>

        {/* Mobile: zoom toggle */}
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            setMobileExpanded((prev) => !prev);
          }}
          className="md:hidden shrink-0 text-lava"
          aria-label={mobileExpanded ? "Zoom in" : "Zoom out"}
        >
          {mobileExpanded ? (
            <Minimize2 size={16} />
          ) : (
            <Maximize2 size={16} />
          )}
        </button>
      </div>
    </div>
  );
}
