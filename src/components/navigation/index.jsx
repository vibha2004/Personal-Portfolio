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

const Navigation = ({ onRotate }) => {
  const angleIncrement = 360 / BtnList.length;
  const size = useScreenSize();
  const isLarge = size >= 1024;
  const isMedium = size >= 768;
  const [hoveredButton, setHoveredButton] = useState(null);

  return (
    <div className="w-full fixed h-screen flex items-center justify-center">
      {/* Full welcome message in top left corner */}
     
        <div className="absolute top-8 left-8 z-50 max-w-2xl">

  <h1 className="text-5xl md:text-7xl font-bold font-rajdhani text-cyan-400/70 tracking-tight leading-tight uppercase
                drop-shadow-[0_0_10px_rgba(34,211,238,0.5)]
                transition-all duration-300">
    WELCOME TO MY PORTFOLIO
  </h1>

  {/* Glowing white subtitle */}
  <h2 className="text-1xl md:text-2xl font-medium font-rajdhani text-white mt-4 tracking-wider uppercase
                drop-shadow-[0_0_8px_rgba(255,255,255,0.8)_0_0_16px_rgba(255,255,255,0.4)]
                hover:drop-shadow-[0_0_12px_rgba(255,255,255,0.9)_0_0_24px_rgba(255,255,255,0.6)]
                transition-all duration-500
                animate-[pulse_3s_ease-in-out_infinite]">
    WHERE TECHNOLOGY MEETS GAMING
  </h2>


      </div>

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