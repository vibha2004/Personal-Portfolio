"use client";
import React, { useRef } from "react";
import { useGLTF } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";

const Wizard = React.memo(function Wizard(props) {
  const { nodes, materials } = useGLTF("/models/wizard-transformed.glb");

  const modelRef = useRef();

  useFrame((state) => {
    if (modelRef.current) {
      modelRef.current.position.y = -1.8 + Math.sin(state.clock.elapsedTime) * 0.05;
    }
  });

  return (
    <group
      ref={modelRef}
      {...props}
      
      scale={[0.19, -0.19, -0.19]} // Flip vertically by inverting Y scale
      // Modify the position here to reposition the model
      position={[0, -1, 0]} // Example: Repositioning it to the right on the x-axis
      rotation={[Math.PI / 2, 0, 19]} // Adjusted rotation to stand up
      dispose={null}
    >
      <mesh castShadow receiveShadow geometry={nodes.mesh_0.geometry} material={materials.BodyC} />
      <mesh castShadow receiveShadow geometry={nodes.mesh_1.geometry} material={materials.Courage} />
      <mesh castShadow receiveShadow geometry={nodes.mesh_2.geometry} material={materials.FitLink_EyeL} />
      <mesh castShadow receiveShadow geometry={nodes.mesh_3.geometry} material={materials.FitLink_EyeR} />
      <mesh castShadow receiveShadow geometry={nodes.mesh_4.geometry} material={materials.BodyA} />
      <mesh castShadow receiveShadow geometry={nodes.mesh_5.geometry} material={materials.BodyB} />
      <mesh castShadow receiveShadow geometry={nodes.mesh_6.geometry} material={materials.Face} />
      <mesh castShadow receiveShadow geometry={nodes.mesh_7.geometry} material={materials.FitLink_Blade} />
      <mesh castShadow receiveShadow geometry={nodes.mesh_8.geometry} material={materials.FitLink_Grip} />
      <mesh castShadow receiveShadow geometry={nodes.mesh_9.geometry} material={materials.FitLink_Sheath} />
      <mesh castShadow receiveShadow geometry={nodes.mesh_10.geometry} material={materials.Shield} />
    </group>
  );
});

export default Wizard;

useGLTF.preload("/models/wizard-transformed.glb");
