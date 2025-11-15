"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useEffect, useState } from "react";

type TherapyMode = "default" | "calm" | "energy" | "balance" | "healing";

interface ParallaxLeafProps {
  side: "left" | "right";
  mode: TherapyMode;
}

const leafColors = {
  default: ["#10b981", "#059669", "#047857"],
  calm: ["#3b82f6", "#2563eb", "#1d4ed8"],
  energy: ["#f97316", "#ea580c", "#dc2626"],
  balance: ["#a855f7", "#9333ea", "#ec4899"],
  healing: ["#14b8a6", "#0d9488", "#0891b2"],
};

export default function ParallaxLeaf({ side, mode }: ParallaxLeafProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const { scrollY } = useScroll();

  const leftX = useTransform(scrollY, [0, 1000], [0, -150]);
  const rightX = useTransform(scrollY, [0, 1000], [0, 150]);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 100);
    return () => clearTimeout(timer);
  }, []);

  const colors = leafColors[mode];
  const xTransform = side === "left" ? leftX : rightX;

  return (
    <div
      className={`absolute ${
        side === "left" ? "left-0" : "right-0"
      } bottom-0 w-64 sm:w-80 h-64 sm:h-80 pointer-events-none z-0 ${
        side === "left" ? "-left-8 sm:left-0" : "-right-8 sm:right-0"
      }`}
    >
      {/* Large leaf */}
      <motion.div
        initial={{
          scale: 0,
          rotate: side === "left" ? -20 : 20,
          opacity: 0,
        }}
        animate={{
          scale: isLoaded ? 1 : 0,
          rotate: side === "left" ? -20 : 20,
          opacity: isLoaded ? 0.85 : 0,
        }}
        transition={{
          duration: 1.2,
          delay: 0.2,
          type: "spring",
          stiffness: 60,
          damping: 25,
        }}
        style={{
          x: xTransform,
        }}
        className={`absolute ${
          side === "left" ? "bottom-0 left-0" : "bottom-0 right-0"
        }`}
      >
        <CustomLeafSVG
          size={180}
          color={colors[0]}
          side={side}
          className="drop-shadow-xl"
        />
      </motion.div>

      {/* Medium leaf */}
      <motion.div
        initial={{
          scale: 0,
          rotate: side === "left" ? -10 : 10,
          opacity: 0,
        }}
        animate={{
          scale: isLoaded ? 1 : 0,
          rotate: side === "left" ? -10 : 10,
          opacity: isLoaded ? 0.7 : 0,
        }}
        transition={{
          duration: 1.2,
          delay: 0.4,
          type: "spring",
          stiffness: 60,
          damping: 25,
        }}
        style={{
          x: xTransform,
        }}
        className={`absolute ${
          side === "left" ? "bottom-20 left-12" : "bottom-20 right-12"
        }`}
      >
        <CustomLeafSVG
          size={130}
          color={colors[1]}
          side={side}
          className="drop-shadow-lg"
        />
      </motion.div>

      {/* Small leaf */}
      <motion.div
        initial={{
          scale: 0,
          rotate: side === "left" ? -30 : 30,
          opacity: 0,
        }}
        animate={{
          scale: isLoaded ? 1 : 0,
          rotate: side === "left" ? -30 : 30,
          opacity: isLoaded ? 0.5 : 0,
        }}
        transition={{
          duration: 1.2,
          delay: 0.6,
          type: "spring",
          stiffness: 60,
          damping: 25,
        }}
        style={{
          x: xTransform,
        }}
        className={`absolute ${
          side === "left" ? "bottom-40 left-20" : "bottom-40 right-20"
        }`}
      >
        <CustomLeafSVG
          size={90}
          color={colors[2]}
          side={side}
          className="drop-shadow-md"
        />
      </motion.div>
    </div>
  );
}

interface CustomLeafSVGProps {
  size: number;
  color: string;
  side: "left" | "right";
  className?: string;
}

function CustomLeafSVG({
  size,
  color,
  side,
  className = "",
}: CustomLeafSVGProps) {
  const gradientId = `leafGradient-${color}-${side}`;
  const radialGradientId = `radialGradient-${color}-${side}`;

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 200 200"
      className={className}
      style={{
        filter: "drop-shadow(0 4px 12px rgba(0,0,0,0.15))",
        transition: "all 0.8s cubic-bezier(0.4, 0, 0.2, 1)",
      }}
    >
      <defs>
        <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor={color} stopOpacity="0.95">
            <animate
              attributeName="stop-color"
              dur="0.8s"
              values={`${color};${color}`}
            />
          </stop>
          <stop offset="50%" stopColor={color} stopOpacity="0.85">
            <animate
              attributeName="stop-color"
              dur="0.8s"
              values={`${color};${color}`}
            />
          </stop>
          <stop offset="100%" stopColor={color} stopOpacity="0.7">
            <animate
              attributeName="stop-color"
              dur="0.8s"
              values={`${color};${color}`}
            />
          </stop>
        </linearGradient>
        <radialGradient id={radialGradientId} cx="50%" cy="30%">
          <stop offset="0%" stopColor={color} stopOpacity="0.3" />
          <stop offset="100%" stopColor={color} stopOpacity="0" />
        </radialGradient>
      </defs>

      {side === "left" ? (
        <g>
          {/* Main leaf shape - more natural and elegant */}
          <path
            d="M 100 20 Q 120 40, 130 70 Q 135 90, 130 110 Q 120 140, 100 160 Q 80 140, 70 110 Q 65 90, 70 70 Q 80 40, 100 20 Z"
            fill={`url(#${gradientId})`}
            stroke={color}
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* Central vein */}
          <path
            d="M 100 20 Q 100 60, 100 100 Q 100 130, 100 160"
            stroke={color}
            strokeWidth="2"
            fill="none"
            opacity="0.4"
            strokeLinecap="round"
          />

          {/* Side veins - left side */}
          <path
            d="M 100 50 Q 85 55, 75 65"
            stroke={color}
            strokeWidth="1"
            fill="none"
            opacity="0.3"
            strokeLinecap="round"
          />
          <path
            d="M 100 80 Q 82 85, 72 95"
            stroke={color}
            strokeWidth="1"
            fill="none"
            opacity="0.3"
            strokeLinecap="round"
          />
          <path
            d="M 100 110 Q 85 115, 75 125"
            stroke={color}
            strokeWidth="1"
            fill="none"
            opacity="0.3"
            strokeLinecap="round"
          />

          {/* Side veins - right side */}
          <path
            d="M 100 50 Q 115 55, 125 65"
            stroke={color}
            strokeWidth="1"
            fill="none"
            opacity="0.3"
            strokeLinecap="round"
          />
          <path
            d="M 100 80 Q 118 85, 128 95"
            stroke={color}
            strokeWidth="1"
            fill="none"
            opacity="0.3"
            strokeLinecap="round"
          />
          <path
            d="M 100 110 Q 115 115, 125 125"
            stroke={color}
            strokeWidth="1"
            fill="none"
            opacity="0.3"
            strokeLinecap="round"
          />

          {/* Highlight effect */}
          <ellipse
            cx="100"
            cy="60"
            rx="20"
            ry="30"
            fill={`url(#${radialGradientId})`}
          />
        </g>
      ) : (
        <g>
          {/* Main leaf shape - mirrored for right side */}
          <path
            d="M 100 20 Q 80 40, 70 70 Q 65 90, 70 110 Q 80 140, 100 160 Q 120 140, 130 110 Q 135 90, 130 70 Q 120 40, 100 20 Z"
            fill={`url(#${gradientId})`}
            stroke={color}
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* Central vein */}
          <path
            d="M 100 20 Q 100 60, 100 100 Q 100 130, 100 160"
            stroke={color}
            strokeWidth="2"
            fill="none"
            opacity="0.4"
            strokeLinecap="round"
          />

          {/* Side veins - left side */}
          <path
            d="M 100 50 Q 85 55, 75 65"
            stroke={color}
            strokeWidth="1"
            fill="none"
            opacity="0.3"
            strokeLinecap="round"
          />
          <path
            d="M 100 80 Q 82 85, 72 95"
            stroke={color}
            strokeWidth="1"
            fill="none"
            opacity="0.3"
            strokeLinecap="round"
          />
          <path
            d="M 100 110 Q 85 115, 75 125"
            stroke={color}
            strokeWidth="1"
            fill="none"
            opacity="0.3"
            strokeLinecap="round"
          />

          {/* Side veins - right side */}
          <path
            d="M 100 50 Q 115 55, 125 65"
            stroke={color}
            strokeWidth="1"
            fill="none"
            opacity="0.3"
            strokeLinecap="round"
          />
          <path
            d="M 100 80 Q 118 85, 128 95"
            stroke={color}
            strokeWidth="1"
            fill="none"
            opacity="0.3"
            strokeLinecap="round"
          />
          <path
            d="M 100 110 Q 115 115, 125 125"
            stroke={color}
            strokeWidth="1"
            fill="none"
            opacity="0.3"
            strokeLinecap="round"
          />

          {/* Highlight effect */}
          <ellipse
            cx="100"
            cy="60"
            rx="20"
            ry="30"
            fill={`url(#${radialGradientId})`}
          />
        </g>
      )}
    </svg>
  );
}
