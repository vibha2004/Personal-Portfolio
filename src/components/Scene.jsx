"use client";
import React, { useState } from "react";
import Wizard from "./Wizard";
import Navigation from "./Navigation";

export default function Scene() {
  const [rotationY, setRotationY] = useState(0);

  // Function to rotate the model when a button is clicked
  const handleRotate = (angle) => {
    setRotationY((prev) => prev + angle);
  };

  return (
    <div className="relative w-full h-full">
      <Wizard rotationY={rotationY} />
      <Navigation onRotate={handleRotate} />
    </div>
  );
}
