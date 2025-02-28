"use client";
import { BtnList } from "@/app/data";
import React, { useState } from "react";
import NavButton from "./NavButton";
import useScreenSize from "../hooks/useScreenSize";
import ResponsiveComponent from "../ResponsiveComponent";
import { motion } from "framer-motion";

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.3,
    },
  },
};

// Glowing Fairy SVG
const FairyGlow = () => (
  <svg
    width="150"
    height="150"
    viewBox="0 0 150 150"
    xmlns="http://www.w3.org/2000/svg"
    style={{
      position: "absolute",
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%)",
      filter: "drop-shadow(0 0 20px rgba(255, 223, 186, 0.8))",
      zIndex: -1,
    }}
  >
    {/* Sparkle 1 */}
    <g transform="translate(50, 50)">
      <circle cx="0" cy="0" r="5" fill="url(#sparkleGradient)" />
      <path
        d="M0 -10 L0 10 M-10 0 L10 0"
        stroke="rgba(255, 255, 255, 0.8)"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M-7 -7 L7 7 M7 -7 L-7 7"
        stroke="rgba(255, 255, 255, 0.8)"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </g>

    {/* Sparkle 2 */}
    <g transform="translate(100, 30)">
      <circle cx="0" cy="0" r="4" fill="url(#sparkleGradient)" />
      <path
        d="M0 -8 L0 8 M-8 0 L8 0"
        stroke="rgba(255, 255, 255, 0.8)"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M-6 -6 L6 6 M6 -6 L-6 6"
        stroke="rgba(255, 255, 255, 0.8)"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </g>

    {/* Sparkle 3 */}
    <g transform="translate(30, 100)">
      <circle cx="0" cy="0" r="6" fill="url(#sparkleGradient)" />
      <path
        d="M0 -12 L0 12 M-12 0 L12 0"
        stroke="rgba(255, 255, 255, 0.8)"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M-9 -9 L9 9 M9 -9 L-9 9"
        stroke="rgba(255, 255, 255, 0.8)"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </g>

    {/* Glow Effect */}
    <circle
      cx="75"
      cy="75"
      r="50"
      fill="none"
      stroke="rgba(255, 223, 186, 0.3)"
      strokeWidth="10"
    />
    <circle
      cx="75"
      cy="75"
      r="60"
      fill="none"
      stroke="rgba(255, 223, 186, 0.2)"
      strokeWidth="10"
    />

    {/* Gradients */}
    <defs>
      {/* Sparkle Gradient */}
      <radialGradient id="sparkleGradient" cx="50%" cy="50%" r="50%" fx="50%" fy="50%">
        <stop offset="0%" style={{ stopColor: "rgba(255, 223, 186, 0.9)", stopOpacity: 1 }} />
        <stop offset="100%" style={{ stopColor: "rgba(255, 255, 255, 0.5)", stopOpacity: 1 }} />
      </radialGradient>
    </defs>
  </svg>
);

const Navigation = ({ onRotate }) => {
  const angleIncrement = 360 / BtnList.length;
  const size = useScreenSize();
  const isLarge = size >= 1024;
  const isMedium = size >= 768;
  const [hoveredButton, setHoveredButton] = useState(null);

  return (
    <div className="w-full fixed h-screen flex items-center justify-center">
      <ResponsiveComponent>
        {({ size }) => {
          return size && size >= 480 ? (
            <motion.div
              variants={container}
              initial="hidden"
              animate="show"
              className="w-max flex items-center justify-center relative hover:pause animate-spin-slow group"
            >
              {BtnList.map((btn, index) => {
                const angleRad = (index * angleIncrement * Math.PI) / 180;
                const radius = isLarge
                  ? "calc(20vw - 1rem)"
                  : isMedium
                  ? "calc(30vw - 1rem)"
                  : "calc(40vw - 1rem)";
                const x = `calc(${radius}*${Math.cos(angleRad)})`;
                const y = `calc(${radius}*${Math.sin(angleRad)})`;

                return (
                  <div
                    key={btn.label}
                    style={{ position: "absolute", transform: `translate(${x}, ${y})` }}
                    onMouseEnter={() => setHoveredButton(btn.label)}
                    onMouseLeave={() => setHoveredButton(null)}
                  >
                    {hoveredButton === btn.label && (
                      <motion.div
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        style={{
                          position: "absolute",
                          top: "50%",
                          left: "50%",
                          transform: "translate(-50%, -50%)",
                          zIndex: -1,
                        }}
                      >
                        <FairyGlow />
                      </motion.div>
                    )}
                    <NavButton
                      x={0}
                      y={0}
                      {...btn}
                      onClick={() => onRotate(Math.PI / 2)}
                    />
                  </div>
                );
              })}
            </motion.div>
          ) : null;
        }}
      </ResponsiveComponent>
    </div>
  );
};

export default Navigation;
