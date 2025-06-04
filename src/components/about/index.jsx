"use client";
import React, { useEffect, useState } from "react";
import * as THREE from "three";

const AboutDetails = () => {
  const [currentTitle, setCurrentTitle] = useState(0);
  
  // Titles to rotate through
  const titles = [
    "an App Developer",
    "a Web Developer",
    "a Machine Learning Enthusiast",
    "a Cloud Engineer",
    "an IoT Creator",
    "a Full-Stack Wizard",
    "a Tech Explorer",
    "a Bharatanatyam Dancer",
    "a Carnatic Vocalist",
    "a Gamer"
  ];

  useEffect(() => {
    // Title rotation effect
    const titleInterval = setInterval(() => {
      setCurrentTitle((prev) => (prev + 1) % titles.length);
    }, 2000);

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
    const torusTexture = textureLoader.load('/background/donut-texture.jpg');
    const torusMaterial = new THREE.MeshStandardMaterial({
      map: torusTexture,
      color: 0xffffff,
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

    return () => {
      clearInterval(titleInterval);
    };
  }, []);

  return (
    <div className="font-sans text-white min-h-screen overflow-hidden">
      <canvas id="bg" style={{ position: 'fixed', top: 0, left: 0, zIndex: -1 }}></canvas>

      <main className="relative z-10 px-4 sm:px-8 lg:px-16 py-12">
        {/* Hero Section with Dynamic Title */}
        <section className="max-w-6xl mx-auto mb-20 text-center">
          <div className="animate-fade-in">
            <h1 className="text-5xl md:text-7xl font-bold bg-clip-text white-500 animate-text-gradient mb-4">
              Vibha Rao
            </h1>
            <div className="inline-block px-6 py-3 bg-blue-500/20 backdrop-blur-sm rounded-full border border-blue-400/50 mb-6">
              <p className="text-xl text-blue-100">
                BTech in Computer Science Engineering, 2026
              </p>
            </div>
            <div className="relative h-16">
              <div className="absolute inset-0 flex items-center justify-center">
                <p className="text-2xl md:text-3xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
                  Hello there, I am{" "}
                  <span className="inline-block min-w-[200px] text-blue-300 font-semibold">
                    {titles[currentTitle]}
                  </span>
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Rest of your existing content remains the same */}
        {/* Main Content Grid */}
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column */}
          <div className="space-y-8 lg:col-span-2">
            {/* About Me */}
            <div className="glass-card">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 rounded-full bg-blue-500/20 flex items-center justify-center mr-4">
                  <span className="text-2xl">👋</span>
                </div>
                <h2 className="text-3xl font-bold text-blue-400">About Me</h2>
              </div>
              <div className="flex flex-col md:flex-row gap-6 items-center">
                <img
                  src="/background/me.jpg"
                  alt="Vibha Rao"
                  className="w-40 h-40 rounded-full border-4 border-blue-400/50 object-cover shadow-lg"
                />
                <p className="text-gray-300 flex-1">
                 I am a passionate full-stack developer with a deep love for creating IoT-based projects and app development. My expertise spans both front-end and back-end technologies, allowing me to build seamless and efficient applications that integrate hardware and software. I also have a keen interest in machine learning, exploring ways to enhance automation and intelligence in my projects.But I'm not just about code—I'm also a trained Bharatanatyam dancer and Carnatic vocalist, where precision and rhythm shape my creativity just as much as tech does. And when I'm not busy building or performing, you'll probably find me deep into a video game, strategizing my next move. I live for the challenge, whether it's in a high-stakes boss fight or solving real-world tech problems. 
                </p>
              </div>
            </div>

            {/* Projects Section */}
            <div className="glass-card">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 rounded-full bg-blue-500/20 flex items-center justify-center mr-4">
                  <span className="text-2xl">🚀</span>
                </div>
                <h2 className="text-3xl font-bold text-blue-400">Projects</h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  { 
                    name: "Dynamic Food Labels App", 
                    link: "https://github.com/vibha2004/Dynamic-Food-Labels-App-with-Allergen-Detection.git",
                    fullName: "Dynamic Food Labels App with Allergen Detection" 
                  },
                  { 
                    name: "Anti-Sleep Glasses", 
                    link: "https://github.com/vibha2004/Smart-Anti-Sleep-Glasses-for-Driver-Alertness-Monitoring.git",
                    fullName: "Smart Anti-Sleep Glasses for Driver Alertness Monitoring" 
                  },
                  { 
                    name: "Water Level System", 
                    link: "https://github.com/vibha2004/Smart-IoT-Based-Water-Level-Management-System-with-Real-Time-Notifications-via-BlynkIOT-App-.git",
                    fullName: "Water Level Management System" 
                  },
                  { 
                    name: "Inventory System", 
                    link: "https://github.com/vibha2004/Cloud-Based-Inventory-Management-System-with-AWS-Integration.git",
                    fullName: "Inventory Management System" 
                  },
                  { 
                    name: "AllerGlam", 
                    link: "https://github.com/vibha2004/Mobile-Scanner-App-for-Real-Time-Detection-of-Cosmetic-Allergens-.git",
                    fullName: "AllerGlam Cosmetic Allergen Detection" 
                  },
                  { 
                    name: "University E-Commerce", 
                    link: "https://github.com/vibha2004/University-E-Commerce-Portal-Development-Using-Django-for-Campus-Retail-.git",
                    fullName: "University E-Commerce Portal" 
                  },
                ].map((project, index) => {
                  const initials = project.fullName
                    .split(' ')
                    .map(word => word[0])
                    .join('')
                    .substring(0, 2)
                    .toUpperCase();
                  
                  const colorGradients = [
                    'from-purple-600 to-blue-500',
                    'from-green-600 to-teal-500',
                    'from-red-600 to-pink-500',
                    'from-yellow-600 to-orange-500',
                    'from-indigo-600 to-purple-500',
                    'from-blue-600 to-cyan-500'
                  ];
                  
                  return (
                    <a
                      key={index}
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="project-card group relative overflow-hidden rounded-xl h-40"
                    >
                      <div className={`absolute inset-0 bg-gradient-to-br ${colorGradients[index % colorGradients.length]} flex items-center justify-center`}>
                        <span className="text-5xl font-bold text-white/80">{initials}</span>
                      </div>
                      
                      <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-all duration-300 flex flex-col justify-end p-4">
                        <h3 className="text-xl font-semibold text-white group-hover:text-blue-300 transition-colors">
                          {project.name}
                        </h3>
                        <div className="flex items-center mt-2 text-sm text-blue-300 opacity-0 group-hover:opacity-100 transition-opacity">
                          View on GitHub
                          <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                          </svg>
                        </div>
                      </div>
                    </a>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div className="space-y-8">
            {/* Education */}
            <div className="glass-card">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 rounded-full bg-blue-500/20 flex items-center justify-center mr-4">
                  <span className="text-2xl">🎓</span>
                </div>
                <h2 className="text-3xl font-bold text-blue-400">Education</h2>
              </div>
              <div className="space-y-4">
                <div className="timeline-item">
                  <h3 className="text-xl font-semibold text-white">VIT Chennai</h3>
                  <p className="text-gray-400">BTech in CSE | 2022-2026</p>
                  <p className="text-blue-300">CGPA: 9.23</p>
                </div>
                <div className="timeline-item">
                  <h3 className="text-xl font-semibold text-white">St Gregorios High School</h3>
                  <p className="text-gray-400">Class 12 | 2022</p>
                  <p className="text-blue-300">97.75%</p>
                </div>
                <div className="timeline-item">
                  <h3 className="text-xl font-semibold text-white">St Gregorios High School</h3>
                  <p className="text-gray-400">Class 10 | 2020</p>
                  <p className="text-blue-300">98.3%</p>
                </div>
              </div>
            </div>

            {/* Skills */}
            <div className="glass-card">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 rounded-full bg-blue-500/20 flex items-center justify-center mr-4">
                  <span className="text-2xl">🛠️</span>
                </div>
                <h2 className="text-3xl font-bold text-blue-400">Skills</h2>
              </div>
              <div className="flex flex-wrap gap-3">
                {["C++", "Python", "MySQL", "Django", "JavaScript", "ML", "Android Studio", "IoT", "Azure", "Three.js"].map((skill, index) => (
                  <span key={index} className="skill-tag">
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            {/* Work Experience */}
            <div className="glass-card">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 rounded-full bg-blue-500/20 flex items-center justify-center mr-4">
                  <span className="text-2xl">💼</span>
                </div>
                <h2 className="text-3xl font-bold text-blue-400">Experience</h2>
              </div>
              <div className="space-y-6">
                <div className="experience-item">
                  <h3 className="text-xl font-semibold text-blue-300">Capital Quant</h3>
                  <p className="text-gray-400">Software Developer Intern</p>
                  <p className="text-gray-300 mt-2">Developed financial data applications</p>
                </div>
                <div className="experience-item">
                  <h3 className="text-xl font-semibold text-blue-300">SEDS Antariksh</h3>
                  <p className="text-gray-400">Outreach Lead</p>
                  <p className="text-gray-300 mt-2">Organized STEM events</p>
                </div>
                <div className="experience-item">
                  <h3 className="text-xl font-semibold text-blue-300">Enactus</h3>
                  <p className="text-gray-400">Operations Member</p>
                  <p className="text-gray-300 mt-2">Empowered women entrepreneurs</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Full-width Section */}
        <div className="max-w-7xl mx-auto mt-12">
          {/* Portfolio Theme */}
          <div className="glass-card">
            <div className="flex items-center mb-6">
              <div className="w-12 h-12 rounded-full bg-blue-500/20 flex items-center justify-center mr-4">
                <span className="text-2xl">✨</span>
              </div>
              <h2 className="text-3xl font-bold text-blue-400">Portfolio Theme</h2>
            </div>
            <p className="text-gray-300">
              This portfolio is inspired by the Sheikah Shrines from The Legend of Zelda: Breath of the Wild, blending futuristic aesthetics with interactive design. The glowing fireflies, dynamic 3D elements powered by Three.js, and immersive background bring a sense of mystery and exploration. The Three.js background on this page is designed to simulate the feeling of the shrine challenges in the game—where problem-solving, creativity, and technology come together. Just like the shrines symbolize wisdom and innovation, this space reflects a passion for building and discovery. 
            </p>
          </div>

          {/* Contact Links */}
          <div className="glass-card mt-8">
            <div className="flex flex-wrap justify-center gap-6">
              <a href="mailto:vibha.rao2022@vitstudent.ac.in" className="contact-link">
                <span className="text-2xl mr-2">✉️</span> Email
              </a>
              <a href="https://www.linkedin.com/in/vibha-rao-b29719273/" className="contact-link">
                <span className="text-2xl mr-2">🔗</span> LinkedIn
              </a>
              <a href="https://github.com/vibha2004" className="contact-link">
                <span className="text-2xl mr-2">💻</span> GitHub
              </a>
            </div>
          </div>
        </div>
      </main>

      {/* Global Styles */}
      <style jsx global>{`
        .glass-card {
          background: rgba(30, 41, 59, 0.3);
          backdrop-filter: blur(10px);
          border-radius: 16px;
          padding: 2rem;
          border: 1px solid rgba(96, 165, 250, 0.2);
          box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
          transition: all 0.3s ease;
        }
        
        .glass-card:hover {
          border-color: rgba(96, 165, 250, 0.4);
          box-shadow: 0 8px 32px rgba(59, 130, 246, 0.2);
          transform: translateY(-2px);
        }
        
        .project-card {
          position: relative;
          height: 160px;
          border-radius: 12px;
          overflow: hidden;
          transition: all 0.3s ease;
        }
        
        .project-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 10px 20px rgba(59, 130, 246, 0.3);
        }
        
        .timeline-item {
          position: relative;
          padding-left: 24px;
        }
        
        .timeline-item:before {
          content: '';
          position: absolute;
          left: 0;
          top: 8px;
          width: 12px;
          height: 12px;
          border-radius: 50%;
          background: #3b82f6;
        }
        
        .timeline-item:not(:last-child):after {
          content: '';
          position: absolute;
          left: 5px;
          top: 20px;
          bottom: -20px;
          width: 2px;
          background: rgba(59, 130, 246, 0.3);
        }
        
        .skill-tag {
          background: rgba(59, 130, 246, 0.2);
          padding: 0.5rem 1rem;
          border-radius: 9999px;
          font-size: 0.9rem;
          border: 1px solid rgba(59, 130, 246, 0.3);
          transition: all 0.2s ease;
        }
        
        .skill-tag:hover {
          background: rgba(59, 130, 246, 0.3);
          transform: scale(1.05);
        }
        
        .experience-item {
          background: rgba(17, 24, 39, 0.4);
          padding: 1.25rem;
          border-radius: 12px;
          border-left: 3px solid #3b82f6;
        }
        
        .contact-link {
          display: flex;
          align-items: center;
          padding: 0.75rem 1.5rem;
          background: rgba(59, 130, 246, 0.1);
          border-radius: 9999px;
          border: 1px solid rgba(59, 130, 246, 0.2);
          transition: all 0.3s ease;
        }
        
        .contact-link:hover {
          background: rgba(59, 130, 246, 0.2);
          transform: translateY(-2px);
        }

        /* Animation for the rotating title */
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }

        .min-w-\[200px\] {
          min-width: 200px;
        }
      `}</style>
    </div>
  );
};

export default AboutDetails;