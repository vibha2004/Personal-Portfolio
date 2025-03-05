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
    <div className="font-sans text-white min-h-screen overflow-hidden">
      {/* Three.js Canvas */}
      <canvas id="bg" style={{ position: 'fixed', top: 0, left: 0, zIndex: -1 }}></canvas>

      {/* Content */}
      <main className="relative z-10 px-6 sm:px-12 lg:px-24 py-20">
        <section className="max-w-7xl mx-auto">
          {/* Header Section */}
          <div className="mb-20 animate-fade-in">
            <header className="space-y-4">
              <h1 className="text-5xl md:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-blue-600 animate-text-gradient">
                Vibha Rao
              </h1>
              <p className="text-xl md:text-2xl text-gray-300 animate-slide-in-left">
                BTech in Computer Science Engineering, 2026
              </p>
              <p className="text-lg md:text-xl text-gray-400 max-w-2xl animate-slide-in-right">
                A curious and driven individual, passionate about innovation and technology. 
              </p>
            </header>
          </div>

          {/* About Me Section */}
          <div className="bg-gray-800/20 backdrop-blur-sm p-8 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 animate-fade-in-up mb-12 border-2 border-blue-400">
            <h2 className="text-3xl font-bold mb-6 text-blue-400 flex items-center">
              <span className="mr-3">🛡️</span> About Me
            </h2>
            <div className="flex flex-col md:flex-row items-center gap-8">
              <img
                src="/background/me.jpg" // Replace with your photo or avatar
                alt="Vibha Rao"
                className="w-32 h-32 rounded-full border-4 border-blue-400"
              />
              <p className="text-lg text-gray-300 flex-1">
              I am a passionate full-stack developer with a deep love for creating IoT-based projects and app development. My expertise spans both front-end and back-end technologies, allowing me to build seamless and efficient applications that integrate hardware and software. I also have a keen interest in machine learning, exploring ways to enhance automation and intelligence in my projects.But I’m not just about code—I’m also a trained Bharatanatyam dancer and Carnatic vocalist, where precision and rhythm shape my creativity just as much as tech does. And when I’m not busy building or performing, you’ll probably find me deep into a video game, strategizing my next move. I live for the challenge, whether it's in a high-stakes boss fight or solving real-world tech problems. 
 
              </p>
            </div>
          </div>

          {/* Grid Layout for Sections */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Education Section */}
            <div className="bg-gray-800/20 backdrop-blur-sm p-8 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 animate-fade-in-up border-2 border-blue-400">
              <h2 className="text-3xl font-bold mb-6 text-blue-400 flex items-center">
                <span className="mr-3">📚</span> Education
              </h2>
              <div className="space-y-4">
                <p className="text-lg text-gray-300">Vellore Institute of Technology Chennai (2022 - Present) | Btech | CGPA: 9.23</p>
                <p className="text-lg text-gray-300">St Gregorios High School (2022) |Class 12| Percentage:97.75%</p>
                <p className="text-lg text-gray-300">St Gregorios High SChool (2020) |Class 10| Percentage:98.3%</p>
              </div>
            </div>

            {/* Work Experience Section */}
            <div className="bg-gray-800/20 backdrop-blur-sm p-8 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 animate-fade-in-up delay-100 border-2 border-blue-400">
              <h2 className="text-3xl font-bold mb-6 text-blue-400 flex items-center">
                <span className="mr-3">💼</span> Work Experience
              </h2>
              <div className="space-y-6">
                <div>
                  <h3 className="text-2xl font-semibold text-blue-300">Software Developer Intern - Capital Quant</h3>
                  <p className="text-lg text-gray-300 mt-2">Developed components for the FinStinct product and a CRUD application for financial data.</p>
                </div>
                <div>
                  <h3 className="text-2xl font-semibold text-blue-300">Outreach Lead - SEDS Antariksh, VIT Chennai</h3>
                  <p className="text-lg text-gray-300 mt-2">Headed outreach initiatives, organized events for schools and NGOs.</p>
                </div>
                <div>
                  <h3 className="text-2xl font-semibold text-blue-300">Operations Member - Enactus VIT Chennai</h3>
                  <p className="text-lg text-gray-300 mt-2">Led projects empowering underprivileged women with sustainable business models.</p>
                </div>
              </div>
            </div>

            {/* Skills Section */}
            <div className="bg-gray-800/20 backdrop-blur-sm p-8 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 animate-fade-in-up delay-200 border-2 border-blue-400">
              <h2 className="text-3xl font-bold mb-6 text-blue-400 flex items-center">
                <span className="mr-3">🛠</span> Skills
              </h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                {["C++", "Python", "MySQL", "Django", "JavaScript", "Machine Learning", "Android Studio"].map((skill, index) => (
                  <div
                    key={index}
                    className="p-4 bg-gray-700/20 rounded-lg text-center hover:bg-gray-700/40 transition-colors duration-200 border border-blue-400"
                  >
                    <p className="text-lg text-gray-300">{skill}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Projects Section */}
            <div className="bg-gray-800/20 backdrop-blur-sm p-8 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 animate-fade-in-up delay-300 border-2 border-blue-400">
              <h2 className="text-3xl font-bold mb-6 text-blue-400 flex items-center">
                <span className="mr-3">📂</span> Projects
              </h2>
              <ul className="space-y-4">
                {[
                  { name: "Dynamic Food Labels App with Allergen Detection", link: "https://github.com/vibha2004/Dynamic-Food-Labels-App-with-Allergen-Detection.git" },
                  { name: "Smart Anti-Sleep Glasses for Driver Alertness Monitoring", link: "https://github.com/vibha2004/Smart-Anti-Sleep-Glasses-for-Driver-Alertness-Monitoring.git"},
                  { name: "Water Level Management System", link: "https://github.com/vibha2004/Smart-IoT-Based-Water-Level-Management-System-with-Real-Time-Notifications-via-BlynkIOT-App-.git" },
                  { name: "Inventory Management System", link: "https://github.com/vibha2004/Cloud-Based-Inventory-Management-System-with-AWS-Integration.git" },
                  { name: "AllerGlam", link: "https://github.com/vibha2004/Mobile-Scanner-App-for-Real-Time-Detection-of-Cosmetic-Allergens-.git" },
                  { name: "University E Commerce portal", link: "https://github.com/vibha2004/University-E-Commerce-Portal-Development-Using-Django-for-Campus-Retail-.git" },
                ].map((project, index) => (
                  <li key={index} className="text-lg text-gray-300">
                    <a
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-blue-400 transition-colors duration-200"
                    >
                      {project.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Certifications Section */}
            <div className="bg-gray-800/20 backdrop-blur-sm p-8 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 animate-fade-in-up delay-400 border-2 border-blue-400">
              <h2 className="text-3xl font-bold mb-6 text-blue-400 flex items-center">
                <span className="mr-3">📜</span> Certifications
              </h2>
              <ul className="list-disc ml-5 space-y-3">
                <li className="text-lg text-gray-300">Microsoft Certified: Azure AI Fundamentals (2024)</li>
                <li className="text-lg text-gray-300">Microsoft Certified: Azure Data Fundamentals (2024)</li>
                <li className="text-lg text-gray-300">Cisco Networking Academy: Introduction to Cybersecurity</li>
                <li className="text-lg text-gray-300">NPTEL Certification: Wildlife Ecology</li>
              </ul>
            </div>

            {/* Links Section */}
            <div className="bg-gray-800/20 backdrop-blur-sm p-8 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 animate-fade-in-up delay-500 border-2 border-blue-400">
              <h2 className="text-3xl font-bold mb-6 text-blue-400 flex items-center">
                <span className="mr-3">🔗</span> Links
              </h2>
              <div className="space-y-3">
                <p>
                  <a href="mailto:vibha.rao2022@vitstudent.ac.in" className="text-lg text-blue-400 hover:text-blue-300 transition-colors duration-200">
                    Email
                  </a>
                </p>
                <p>
                  <a href="https://www.linkedin.com/in/vibha-rao-b29719273/" className="text-lg text-blue-400 hover:text-blue-300 transition-colors duration-200">
                    LinkedIn
                  </a>
                </p>
                <p>
                  <a href="https://github.com/vibha2004" className="text-lg text-blue-400 hover:text-blue-300 transition-colors duration-200">
                    GitHub
                  </a>
                </p>
              </div>
            </div>
          </div>

          {/* Theme of the Portfolio Section */}
          <div className="bg-gray-800/20 backdrop-blur-sm p-8 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 animate-fade-in-up mt-12 border-2 border-blue-400">
            <h2 className="text-3xl font-bold mb-6 text-blue-400 flex items-center">
              <span className="mr-3">🎨</span> Theme of This Portfolio
            </h2>
            <p className="text-lg text-gray-300">
            This portfolio is inspired by the Sheikah Shrines from The Legend of Zelda: Breath of the Wild, blending futuristic aesthetics with interactive design. The glowing fireflies, dynamic 3D elements powered by Three.js, and immersive background bring a sense of mystery and exploration. The Three.js background on this page is designed to simulate the feeling of the shrine challenges in the game—where problem-solving, creativity, and technology come together. Just like the shrines symbolize wisdom and innovation, this space reflects a passion for building and discovery. 
            </p>
          </div>
        </section>
      </main>
    </div>
  );
};

export default AboutDetails;