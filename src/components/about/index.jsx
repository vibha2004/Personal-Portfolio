"use client"; // Mark this component as a Client Component
import React, { useEffect } from "react";
import ItemLayout from "./ItemLayout";
import * as THREE from "three"; // Import Three.js

const AboutDetails = () => {
  useEffect(() => {
    // Three.js Setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({
      canvas: document.querySelector('#bg'),
    });

    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    camera.position.setZ(30);
    camera.position.setX(-3);

    // Texture Loader
    const textureLoader = new THREE.TextureLoader();

    // Torus (Donut) with Texture
    const torusGeometry = new THREE.TorusGeometry(10, 3, 16, 100);
    const torusTexture = textureLoader.load('/background/donut-texture.jpg'); // Load texture for the donut
    const torusMaterial = new THREE.MeshStandardMaterial({
      map: torusTexture, // Apply texture to the donut
      color: 0xffffff, // Fallback color
    });
    const torus = new THREE.Mesh(torusGeometry, torusMaterial);
    scene.add(torus);

    // Lights
    const pointLight = new THREE.PointLight(0xffffff);
    pointLight.position.set(5, 5, 5);
    const ambientLight = new THREE.AmbientLight(0xffffff);
    scene.add(pointLight, ambientLight);

    // Stars
    const addStar = () => {
      const geometry = new THREE.SphereGeometry(0.25, 24, 24);
      const material = new THREE.MeshStandardMaterial({ color: 0xBFEFFF });
      const star = new THREE.Mesh(geometry, material);

      const [x, y, z] = Array(3)
        .fill()
        .map(() => THREE.MathUtils.randFloatSpread(100));

      star.position.set(x, y, z);
      scene.add(star);
    };

    Array(200).fill().forEach(addStar);

    // Background
    const spaceTexture = textureLoader.load('space.jpg');
    scene.background = spaceTexture;

    // Avatar
    const jeffTexture = textureLoader.load("/background/jeff.png");
    const jeff = new THREE.Mesh(new THREE.BoxGeometry(3, 3, 3), new THREE.MeshBasicMaterial({ map: jeffTexture }));
    scene.add(jeff);

    // Moon
    const moonTexture = textureLoader.load('/background/moon.jpg');
    const normalTexture = textureLoader.load('/background/normal.jpg');
    const moon = new THREE.Mesh(
      new THREE.SphereGeometry(3, 32, 32),
      new THREE.MeshStandardMaterial({
        map: moonTexture,
        normalMap: normalTexture,
      })
    );
    scene.add(moon);

    moon.position.z = 30;
    moon.position.setX(-10);
    jeff.position.z = -5;
    jeff.position.x = 2;

    // Scroll Animation
    const moveCamera = () => {
      const t = document.body.getBoundingClientRect().top;
      moon.rotation.x += 0.05;
      moon.rotation.y += 0.075;
      moon.rotation.z += 0.05;

      jeff.rotation.y += 0.01;
      jeff.rotation.z += 0.01;

      camera.position.z = t * -0.01;
      camera.position.x = t * -0.0002;
      camera.rotation.y = t * -0.0002;
    };

    document.body.onscroll = moveCamera;
    moveCamera();

    // Animation Loop
    const animate = () => {
      requestAnimationFrame(animate);

      torus.rotation.x += 0.01;
      torus.rotation.y += 0.005;
      torus.rotation.z += 0.01;

      moon.rotation.x += 0.005;

      renderer.render(scene, camera);
    };

    animate();
  }, []);

  return (
    <div>
      {/* Three.js Canvas */}
      <canvas id="bg" style={{ position: 'fixed', top: 0, left: 0, zIndex: -1 }}></canvas>

      {/* Content */}
      <main style={{ position: 'relative', zIndex: 1 }}>
        <section className="py-20 w-full">
          <div className="grid grid-cols-12 gap-4 xs:gap-6 md:gap-8 w-full">
            {/* Header Section */}
            <ItemLayout className={"col-span-full lg:col-span-8 row-span-2 flex-col items-start"}>
              <header>
                <h1 className="text-4xl md:text-5xl font-bold">Jeff Delaney</h1>
                <p className="text-xl md:text-2xl mt-2">🚀 Welcome to my website!</p>
              </header>
            </ItemLayout>

            {/* Manifesto Section */}
            <ItemLayout className={"col-span-full lg:col-span-8"}>
              <section>
                <h2 className="text-3xl md:text-4xl font-bold mb-4">📜 Manifesto</h2>
                <p className="text-lg md:text-xl">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                </p>
              </section>
            </ItemLayout>

            {/* Projects and Accomplishments Section */}
            <ItemLayout className={"col-span-full lg:col-span-8"}>
              <section className="light">
                <h2 className="text-3xl md:text-4xl font-bold mb-4">👩🏽‍🚀 Projects</h2>
                <p className="text-lg md:text-xl">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                </p>
              </section>
            </ItemLayout>

            {/* Work History Section */}
            <ItemLayout className={"col-span-full lg:col-span-8"}>
              <section className="left">
                <h2 className="text-3xl md:text-4xl font-bold mb-4">🌮 Work History</h2>
                <h3 className="text-2xl md:text-3xl font-semibold mt-6">McDonalds</h3>
                <p className="text-lg md:text-xl mt-2">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                </p>
              </section>
            </ItemLayout>
            <ItemLayout className={"col-span-full lg:col-span-8"}>
              <section className="left">
                <h2 className="text-3xl md:text-4xl font-bold mb-4">🌮 Work History</h2>
                <h3 className="text-2xl md:text-3xl font-semibold mt-6">McDonalds</h3>
                <p className="text-lg md:text-xl mt-2">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                </p>
              </section>
            </ItemLayout>
            <ItemLayout className={"col-span-full lg:col-span-8"}>
              <section className="left">
                <h2 className="text-3xl md:text-4xl font-bold mb-4">🌮 Work History</h2>
                <h3 className="text-2xl md:text-3xl font-semibold mt-6">McDonalds</h3>
                <p className="text-lg md:text-xl mt-2">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                </p>
              </section>
            </ItemLayout>
            <ItemLayout className={"col-span-full lg:col-span-8"}>
              <section className="left">
                <h2 className="text-3xl md:text-4xl font-bold mb-4">🌮 Work History</h2>
                <h3 className="text-2xl md:text-3xl font-semibold mt-6">McDonalds</h3>
                <p className="text-lg md:text-xl mt-2">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                </p>
              </section>
            </ItemLayout>
            <ItemLayout className={"col-span-full lg:col-span-8"}>
              <section className="left">
                <h2 className="text-3xl md:text-4xl font-bold mb-4">🌮 Work History</h2>
                <h3 className="text-2xl md:text-3xl font-semibold mt-6">McDonalds</h3>
                <p className="text-lg md:text-xl mt-2">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                </p>
              </section>
            </ItemLayout>
            <ItemLayout className={"col-span-full lg:col-span-8"}>
              <section className="left">
                <h2 className="text-3xl md:text-4xl font-bold mb-4">🌮 Work History</h2>
                <h3 className="text-2xl md:text-3xl font-semibold mt-6">McDonalds</h3>
                <p className="text-lg md:text-xl mt-2">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                </p>
              </section>
            </ItemLayout>
            <ItemLayout className={"col-span-full lg:col-span-8"}>
              <section className="left">
                <h2 className="text-3xl md:text-4xl font-bold mb-4">🌮 Work History</h2>
                <h3 className="text-2xl md:text-3xl font-semibold mt-6">McDonalds</h3>
                <p className="text-lg md:text-xl mt-2">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                </p>
              </section>
            </ItemLayout>
            <ItemLayout className={"col-span-full lg:col-span-8"}>
              <section className="left">
                <h2 className="text-3xl md:text-4xl font-bold mb-4">🌮 Work History</h2>
                <h3 className="text-2xl md:text-3xl font-semibold mt-6">McDonalds</h3>
                <p className="text-lg md:text-xl mt-2">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                </p>
              </section>
            </ItemLayout>
          </div>
        </section>
      </main>
    </div>
  );
};

export default AboutDetails;