"use client";
import React, { useEffect, useState, useRef } from "react";

const FireFliesBackground = () => {
  const [fireflies, setFireflies] = useState([]);
  const cursorRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    if (typeof window === "undefined") return; // Ensure client-side rendering

    const createFirefly = () => ({
      id: Math.random(),
      top: Math.random() * window.innerHeight,
      left: Math.random() * window.innerWidth,
      size: Math.random() * 8 + 5, // **Larger fireflies (5px - 13px)**
      glowColor: Math.random() > 0.5 ? "rgb(250, 250, 224)" : "rgb(102, 195, 242)", // **Brighter yellowish-white glow**
      blurSize: Math.random() * 20 , // **More intense glow (10px - 30px)**
      animationDuration: Math.random() * 15 + 5, // **More active floating (5s - 20s)**
      flickerDelay: Math.random() * 2, // **Flicker delay (more dynamic)**
    });

    // Create **250** fireflies (way denser)
    setFireflies(Array.from({ length: 170 }, createFirefly));

    const handleMouseMove = (event) => {
      cursorRef.current = { x: event.clientX, y: event.clientY };
      setFireflies((currentFireflies) =>
        currentFireflies.map((firefly) => {
          const dx = event.clientX - firefly.left;
          const dy = event.clientY - firefly.top;
          const distance = Math.sqrt(dx * dx + dy * dy);

          // **Move away more visibly if close to the cursor**
          if (distance < 120) {
            return {
              ...firefly,
              left: firefly.left + (dx > 0 ? -15 : 15), // Bigger movement
              top: firefly.top + (dy > 0 ? -15 : 15),
            };
          }
          return firefly;
        })
      );
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div className="fixed top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
      {fireflies.map((firefly) => (
        <div
          key={firefly.id}
          className="absolute rounded-full transition-all duration-100"
          style={{
            width: `${firefly.size}px`,
            height: `${firefly.size}px`,
            top: `${firefly.top}px`,
            left: `${firefly.left}px`,
            background: `radial-gradient(circle, ${firefly.glowColor} 40%, rgba(255,255,255,0) 80%)`,
            filter: `blur(${firefly.blurSize}px)`,
            animation: `
              float ${firefly.animationDuration}s ease-in-out infinite alternate,
              pulse 3s ease-in-out infinite ${firefly.flickerDelay}s,
              flicker 1s infinite alternate ${firefly.flickerDelay}s
            `,
          }}
        ></div>
      ))}
      <style>
        {`
          @keyframes float {
            0% { transform: translateY(0px) translateX(0px); }
            100% { transform: translateY(-15px) translateX(10px); } /* More movement */
          }
          @keyframes pulse {
            0%, 100% { opacity: 1; }
            50% { opacity: 0.85; } /* Slight dimming */
          }
          @keyframes flicker {
            0% { opacity: 1; }
            50% { opacity: 0.6; } /* Stronger flicker effect */
            100% { opacity: 0.9; }
          }
        `}
      </style>
    </div>
  );
};

export default FireFliesBackground;
