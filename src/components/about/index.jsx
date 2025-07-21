"use client";
import React, { useEffect, useState, useRef } from "react";
import * as THREE from "three";

const AboutDetails = () => {
  const [currentTitle, setCurrentTitle] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const canvasRef = useRef(null);
  
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
    // Check if mobile
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    checkIfMobile();
    window.addEventListener('resize', checkIfMobile);
    
    // Title rotation effect
    const titleInterval = setInterval(() => {
      setCurrentTitle((prev) => (prev + 1) % titles.length);
    }, 2000);

    // Three.js Setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75, 
      window.innerWidth / window.innerHeight, 
      0.1, 
      1000
    );
    const renderer = new THREE.WebGLRenderer({
      canvas: canvasRef.current,
      antialias: true,
      alpha: true
    });

    renderer.setPixelRatio(Math.min(window.devicePixelRatio, isMobile ? 1 : 2));
    renderer.setSize(window.innerWidth, window.innerHeight);
    
    // Adjust camera position based on device
    if (isMobile) {
      camera.position.setZ(40);
      camera.position.setX(-5);
    } else {
      camera.position.setZ(30);
      camera.position.setX(-3);
    }

    // Texture Loader
    const textureLoader = new THREE.TextureLoader();

    // Torus (Donut) with Texture - simpler geometry for mobile
    const torusGeometry = new THREE.TorusGeometry(
      isMobile ? 8 : 10, 
      isMobile ? 2 : 3, 
      isMobile ? 8 : 16, 
      isMobile ? 50 : 100
    );
    const torusTexture = textureLoader.load('/background/donut-texture.jpg');
    const torusMaterial = new THREE.MeshStandardMaterial({
      map: torusTexture,
      color: 0xffffff,
    });
    const torus = new THREE.Mesh(torusGeometry, torusMaterial);
    scene.add(torus);

    // Lights - reduced intensity for mobile
    const pointLight = new THREE.PointLight(0xffffff, isMobile ? 0.8 : 1);
    pointLight.position.set(5, 5, 5);
    const ambientLight = new THREE.AmbientLight(0xffffff, isMobile ? 0.5 : 0.8);
    scene.add(pointLight, ambientLight);

    // Stars - fewer stars on mobile
    const addStar = () => {
      const geometry = new THREE.SphereGeometry(0.2, 16, 16);
      const material = new THREE.MeshStandardMaterial({ color: 0xBFEFFF });
      const star = new THREE.Mesh(geometry, material);

      const [x, y, z] = Array(3)
        .fill()
        .map(() => THREE.MathUtils.randFloatSpread(isMobile ? 80 : 100));

      star.position.set(x, y, z);
      scene.add(star);
    };

    Array(isMobile ? 100 : 200).fill().forEach(addStar);

    // Background
    const spaceTexture = textureLoader.load('space.jpg');
    scene.background = spaceTexture;

    // Avatar - smaller on mobile
    const jeffTexture = textureLoader.load("/background/jeff.png");
    const jeff = new THREE.Mesh(
      new THREE.BoxGeometry(isMobile ? 2 : 3, isMobile ? 2 : 3, isMobile ? 2 : 3), 
      new THREE.MeshBasicMaterial({ map: jeffTexture })
    );
    scene.add(jeff);

    // Moon - smaller and further on mobile
    const moonTexture = textureLoader.load('/background/moon.jpg');
    const normalTexture = textureLoader.load('/background/normal.jpg');
    const moon = new THREE.Mesh(
      new THREE.SphereGeometry(isMobile ? 2 : 3, isMobile ? 16 : 32, isMobile ? 16 : 32),
      new THREE.MeshStandardMaterial({
        map: moonTexture,
        normalMap: normalTexture,
      })
    );
    scene.add(moon);

    moon.position.z = isMobile ? 35 : 30;
    moon.position.setX(isMobile ? -15 : -10);
    jeff.position.z = -5;
    jeff.position.x = 2;

    // Scroll Animation - less intense on mobile
    const moveCamera = () => {
      const t = document.body.getBoundingClientRect().top;
      moon.rotation.x += isMobile ? 0.02 : 0.05;
      moon.rotation.y += isMobile ? 0.03 : 0.075;
      moon.rotation.z += isMobile ? 0.02 : 0.05;

      jeff.rotation.y += isMobile ? 0.005 : 0.01;
      jeff.rotation.z += isMobile ? 0.005 : 0.01;

      camera.position.z = t * (isMobile ? -0.005 : -0.01);
      camera.position.x = t * (isMobile ? -0.0001 : -0.0002);
      camera.rotation.y = t * (isMobile ? -0.0001 : -0.0002);
    };

    // Throttle scroll events for mobile
    let lastScroll = 0;
    const scrollThrottle = 100; // ms
    const handleScroll = () => {
      const now = Date.now();
      if (now - lastScroll >= scrollThrottle) {
        moveCamera();
        lastScroll = now;
      }
    };

    if (isMobile) {
      window.addEventListener('scroll', handleScroll);
    } else {
      document.body.onscroll = moveCamera;
    }
    moveCamera();

    // Animation Loop - simplified for mobile
    const animate = () => {
      requestAnimationFrame(animate);

      torus.rotation.x += isMobile ? 0.005 : 0.01;
      torus.rotation.y += isMobile ? 0.0025 : 0.005;
      torus.rotation.z += isMobile ? 0.005 : 0.01;

      moon.rotation.x += isMobile ? 0.002 : 0.005;

      renderer.render(scene, camera);
    };

    animate();

    // Handle resize
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener('resize', handleResize);

    return () => {
      clearInterval(titleInterval);
      if (isMobile) {
        window.removeEventListener('scroll', handleScroll);
      } else {
        document.body.onscroll = null;
      }
      window.removeEventListener('resize', handleResize);
    };
  }, [isMobile]);

  return (
    <div className="font-sans text-white min-h-screen overflow-x-hidden">
      <canvas 
        id="bg" 
        ref={canvasRef}
        style={{ 
          position: 'fixed', 
          top: 0, 
          left: 0, 
          zIndex: -1,
          width: '100%',
          height: '100%'
        }}
      ></canvas>

      <main className="relative z-10 px-4 sm:px-8 lg:px-16 py-8 sm:py-12">
        {/* Hero Section with Dynamic Title */}
        <section className="max-w-6xl mx-auto mb-12 sm:mb-20 text-center">
          <div className="animate-fade-in">
            <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold bg-clip-text white-500 animate-text-gradient mb-4">
              Vibha Rao
            </h1>
            <div className="inline-block px-4 py-2 sm:px-6 sm:py-3 bg-blue-500/20 backdrop-blur-sm rounded-full border border-blue-400/50 mb-4 sm:mb-6">
              <p className="text-base sm:text-xl text-blue-100">
                BTech in Computer Science Engineering, 2026
              </p>
            </div>
            <div className="relative h-12 sm:h-16">
              <div className="absolute inset-0 flex items-center justify-center">
                <p className="text-lg sm:text-2xl md:text-3xl text-gray-300 max-w-3xl mx-auto leading-relaxed px-2">
                  Hello there, I am{" "}
                  <span className="inline-block min-w-[160px] sm:min-w-[200px] text-blue-300 font-semibold">
                    {titles[currentTitle]}
                  </span>
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Main Content Grid */}
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
          {/* Left Column */}
          <div className="space-y-6 sm:space-y-8 lg:col-span-2">
            {/* About Me */}
            <div className="glass-card">
              <div className="flex items-center mb-4 sm:mb-6">
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-blue-500/20 flex items-center justify-center mr-3 sm:mr-4">
                  <span className="text-xl sm:text-2xl">👋</span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-bold text-blue-400">About Me</h2>
              </div>
              <div className="flex flex-col md:flex-row gap-4 sm:gap-6 items-center">
                <img
                  src="/background/me.jpg"
                  alt="Vibha Rao"
                  className="w-32 h-32 sm:w-40 sm:h-40 rounded-full border-4 border-blue-400/50 object-cover shadow-lg"
                />
                <p className="text-sm sm:text-base text-gray-300 flex-1">
                  I am a passionate full-stack developer with a deep love for creating IoT-based projects and app development. My expertise spans both front-end and back-end technologies, allowing me to build seamless and efficient applications that integrate hardware and software. I also have a keen interest in machine learning, exploring ways to enhance automation and intelligence in my projects. But I'm not just about code—I'm also a trained Bharatanatyam dancer and Carnatic vocalist, where precision and rhythm shape my creativity just as much as tech does. And when I'm not busy building or performing, you'll probably find me deep into a video game, strategizing my next move. I live for the challenge, whether it's in a high-stakes boss fight or solving real-world tech problems. 
                </p>
              </div>
            </div>

            {/* Projects Section */}
            <div className="glass-card">
              <div className="flex items-center mb-4 sm:mb-6">
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-blue-500/20 flex items-center justify-center mr-3 sm:mr-4">
                  <span className="text-xl sm:text-2xl">🚀</span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-bold text-blue-400">Projects</h2>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                {[
                  { 
                    name: "SmartFoods OCR Food Analyzer", 
                    link: "https://github.com/vibha2004/Dynamic-Food-Labels-App-with-Allergen-Detection.git",
                    fullName: "Dynamic Food Labels App with Allergen Detection",
                    tech: "Android Studio · OCR · TTS"
                  },
                  { 
                    name: "AWS Inventory Management", 
                    link: "https://github.com/vibha2004/Cloud-Based-Inventory-Management-System-with-AWS-Integration.git",
                    fullName: "AWS Inventory Management System",
                    tech: "AWS · Cloud Computing"
                  },
                  { 
                    name: "Anti-Sleep Glasses", 
                    link: "https://github.com/vibha2004/Smart-Anti-Sleep-Glasses-for-Driver-Alertness-Monitoring.git",
                    fullName: "Smart Anti-Sleep Glasses",
                    tech: "Wearable Tech · Sensors"
                  },
                  { 
                    name: "Energy Consumption Prediction", 
                    link: "https://github.com/vibha2004/Residential-Energy-Consumption-Forecasting-Using-Gradient-Descent-",
                    fullName: "Energy Consumption Prediction Model",
                    tech: "Python · TensorFlow"
                  },
                  { 
                    name: "Water Level System", 
                    link: "https://github.com/vibha2004/Smart-IoT-Based-Water-Level-Management-System-with-Real-Time-Notifications-via-BlynkIOT-App-.git",
                    fullName: "Water Level Management System",
                    tech: "IoT · Blynk"
                  },
                  { 
                    name: "University E-Commerce", 
                    link: "https://github.com/vibha2004/University-E-Commerce-Portal-Development-Using-Django-for-Campus-Retail",
                    fullName: "University E-Commerce Portal",
                    tech: "Django · AWS"
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
                      className="project-card group relative overflow-hidden rounded-lg sm:rounded-xl h-32 sm:h-40"
                    >
                      <div className={`absolute inset-0 bg-gradient-to-br ${colorGradients[index % colorGradients.length]} flex items-center justify-center`}>
                        <span className="text-3xl sm:text-5xl font-bold text-white/80">{initials}</span>
                      </div>
                      
                      <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-all duration-300 flex flex-col justify-end p-3 sm:p-4">
                        <h3 className="text-base sm:text-xl font-semibold text-white group-hover:text-blue-300 transition-colors">
                          {project.name}
                        </h3>
                        <p className="text-xs sm:text-sm text-gray-300 mt-1">
                          {project.tech}
                        </p>
                        <div className="flex items-center mt-1 sm:mt-2 text-xs sm:text-sm text-blue-300 opacity-0 group-hover:opacity-100 transition-opacity">
                          View on GitHub
                          <svg className="w-3 h-3 sm:w-4 sm:h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
          <div className="space-y-6 sm:space-y-8">
            {/* Education */}
            <div className="glass-card">
              <div className="flex items-center mb-4 sm:mb-6">
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-blue-500/20 flex items-center justify-center mr-3 sm:mr-4">
                  <span className="text-xl sm:text-2xl">🎓</span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-bold text-blue-400">Education</h2>
              </div>
              <div className="space-y-3 sm:space-y-4">
                <div className="timeline-item">
                  <h3 className="text-lg sm:text-xl font-semibold text-white">VIT Chennai</h3>
                  <p className="text-sm sm:text-base text-gray-400">BTech in CSE | 2022-2026</p>
                  <p className="text-sm sm:text-base text-blue-300">CGPA: 9.23</p>
                </div>
                <div className="timeline-item">
                  <h3 className="text-lg sm:text-xl font-semibold text-white">St Gregorios High School</h3>
                  <p className="text-sm sm:text-base text-gray-400">ISC Grade 12 | 2022</p>
                  <p className="text-sm sm:text-base text-blue-300">97.75%</p>
                </div>
                <div className="timeline-item">
                  <h3 className="text-lg sm:text-xl font-semibold text-white">St Gregorios High School</h3>
                  <p className="text-sm sm:text-base text-gray-400">ICSE Grade 10 | 2020</p>
                  <p className="text-sm sm:text-base text-blue-300">98.3%</p>
                </div>
              </div>
            </div>

            {/* Work Experience */}
            <div className="glass-card">
              <div className="flex items-center mb-4 sm:mb-6">
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-blue-500/20 flex items-center justify-center mr-3 sm:mr-4">
                  <span className="text-xl sm:text-2xl">💼</span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-bold text-blue-400">Experience</h2>
              </div>
              <div className="space-y-4 sm:space-y-6">
                <div className="experience-item">
                  <h3 className="text-lg sm:text-xl font-semibold text-blue-300">Quest1 - NLP Intern</h3>
                  <p className="text-sm sm:text-base text-gray-300 mt-1">
                    Researched multilingual NLP systems using LLaMA, Mistral, and Sarvam across 10 Indian languages, achieving 30% latency reduction and 25% accuracy gain
                  </p>
                </div>
                <div className="experience-item">
                  <h3 className="text-lg sm:text-xl font-semibold text-blue-300">Capital Quant - SDE Intern</h3>
                  <p className="text-sm sm:text-base text-gray-300 mt-1">
                    Developed key JSON processing and CRUD modules for Finstinct's core product, enhancing document workflow efficiency
                  </p>
                </div>
                <div className="experience-item">
                  <h3 className="text-lg sm:text-xl font-semibold text-blue-300">SEDS Antariksh - Outreach Head</h3>
                  <p className="text-sm sm:text-base text-gray-300 mt-1">
                    Led astronomy outreach programs impacting 200+ students and managed hackathons with 200+ participants
                  </p>
                </div>
              </div>
            </div>

            {/* Skills */}
            <div className="glass-card">
              <div className="flex items-center mb-4 sm:mb-6">
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-blue-500/20 flex items-center justify-center mr-3 sm:mr-4">
                  <span className="text-xl sm:text-2xl">🛠️</span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-bold text-blue-400">Skills</h2>
              </div>
              <div className="space-y-4">
                <div>
                  <h3 className="text-sm font-semibold text-blue-300 mb-2">Languages/Frameworks</h3>
                  <div className="flex flex-wrap gap-2">
                    {["C", "C++", "Python", "Java", "Django", "React Native", "Streamlit", "Pandas", "scikit-learn"].map((skill, index) => (
                      <span key={index} className="skill-tag text-xs sm:text-sm">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-blue-300 mb-2">Cloud/Tools/Databases</h3>
                  <div className="flex flex-wrap gap-2">
                    {["AWS", "Azure", "MariaDB", "GitHub", "Android Studio", "Arduino", "Gradle", "Figma"].map((skill, index) => (
                      <span key={index} className="skill-tag text-xs sm:text-sm">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-blue-300 mb-2">Coursework</h3>
                  <div className="flex flex-wrap gap-2">
                    {["DSA", "OS", "Computer Networks", "DBMS", "OOPs", "Web Dev", "ML", "IoT"].map((skill, index) => (
                      <span key={index} className="skill-tag text-xs sm:text-sm">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Certifications */}
            <div className="glass-card">
              <div className="flex items-center mb-4 sm:mb-6">
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-blue-500/20 flex items-center justify-center mr-3 sm:mr-4">
                  <span className="text-xl sm:text-2xl">🏆</span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-bold text-blue-400">Certifications</h2>
              </div>
              <div className="space-y-3">
                <div className="flex items-start">
                  <span className="text-blue-400 mr-2">•</span>
                  <p className="text-sm sm:text-base text-gray-300">Microsoft Certified: Azure AI Fundamentals (2024)</p>
                </div>
                <div className="flex items-start">
                  <span className="text-blue-400 mr-2">•</span>
                  <p className="text-sm sm:text-base text-gray-300">Microsoft Certified: Azure Data Fundamentals (2024)</p>
                </div>
                <div className="flex items-start">
                  <span className="text-blue-400 mr-2">•</span>
                  <p className="text-sm sm:text-base text-gray-300">Cisco: Introduction to Cybersecurity (2023)</p>
                </div>
                <div className="flex items-start">
                  <span className="text-blue-400 mr-2">•</span>
                  <p className="text-sm sm:text-base text-gray-300">Cisco: Introduction to Packet Tracer (2023)</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Full-width Section */}
        <div className="max-w-7xl mx-auto mt-8 sm:mt-12">
          {/* Awards */}
          <div className="glass-card">
            <div className="flex items-center mb-4 sm:mb-6">
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-blue-500/20 flex items-center justify-center mr-3 sm:mr-4">
                <span className="text-xl sm:text-2xl">🌟</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold text-blue-400">Awards</h2>
            </div>
            <div className="flex items-start">
              <span className="text-blue-400 mr-2">•</span>
              <p className="text-sm sm:text-base text-gray-300">
                INSPIRE (SHE) Scholarship eligibility letter offered by Dept. of Science and Technology, Govt. of India (2023)
              </p>
            </div>
          </div>

          {/* Portfolio Theme */}
          <div className="glass-card mt-6 sm:mt-8">
            <div className="flex items-center mb-4 sm:mb-6">
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-blue-500/20 flex items-center justify-center mr-3 sm:mr-4">
                <span className="text-xl sm:text-2xl">✨</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold text-blue-400">Portfolio Theme</h2>
            </div>
            <p className="text-sm sm:text-base text-gray-300">
              This portfolio is inspired by the Sheikah Shrines from The Legend of Zelda: Breath of the Wild, blending futuristic aesthetics with interactive design. The glowing fireflies, dynamic 3D elements powered by Three.js, and immersive background bring a sense of mystery and exploration. The Three.js background on this page is designed to simulate the feeling of the shrine challenges in the game—where problem-solving, creativity, and technology come together. Just like the shrines symbolize wisdom and innovation, this space reflects a passion for building and discovery. 
            </p>
          </div>

          {/* Contact Links */}
          <div className="glass-card mt-6 sm:mt-8">
            <div className="flex flex-wrap justify-center gap-3 sm:gap-6">
              <a href="mailto:vibha.rao2022@vitstudent.ac.in" className="contact-link text-sm sm:text-base">
                <span className="text-xl sm:text-2xl mr-2">✉️</span> Email
              </a>
              <a href="https://www.linkedin.com/in/vibha-rao-b29719273/" className="contact-link text-sm sm:text-base">
                <span className="text-xl sm:text-2xl mr-2">🔗</span> LinkedIn
              </a>
              <a href="https://github.com/vibha2004" className="contact-link text-sm sm:text-base">
                <span className="text-xl sm:text-2xl mr-2">💻</span> GitHub
              </a>
              <a href="tel:9004745416" className="contact-link text-sm sm:text-base">
                <span className="text-xl sm:text-2xl mr-2">📞</span> Call
              </a>
            </div>
          </div>
        </div>
      </main>

      {/* Global Styles */}
      <style jsx global>{`
        body {
          overflow-x: hidden;
          touch-action: pan-y;
        }
        
        .glass-card {
          background: rgba(30, 41, 59, 0.3);
          backdrop-filter: blur(8px);
          -webkit-backdrop-filter: blur(8px);
          border-radius: 12px;
          padding: 1.5rem;
          border: 1px solid rgba(96, 165, 250, 0.2);
          box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
          transition: all 0.3s ease;
        }
        
        .glass-card:hover {
          border-color: rgba(96, 165, 250, 0.4);
          box-shadow: 0 8px 25px rgba(59, 130, 246, 0.2);
          transform: translateY(-2px);
        }
        
        .project-card {
          position: relative;
          height: 130px;
          border-radius: 10px;
          overflow: hidden;
          transition: all 0.3s ease;
        }
        
        .project-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 8px 15px rgba(59, 130, 246, 0.3);
        }
        
        .timeline-item {
          position: relative;
          padding-left: 20px;
        }
        
        .timeline-item:before {
          content: '';
          position: absolute;
          left: 0;
          top: 8px;
          width: 10px;
          height: 10px;
          border-radius: 50%;
          background: #3b82f6;
        }
        
        .timeline-item:not(:last-child):after {
          content: '';
          position: absolute;
          left: 4px;
          top: 18px;
          bottom: -15px;
          width: 2px;
          background: rgba(59, 130, 246, 0.3);
        }
        
        .skill-tag {
          background: rgba(59, 130, 246, 0.2);
          padding: 0.4rem 0.8rem;
          border-radius: 9999px;
          font-size: 0.8rem;
          border: 1px solid rgba(59, 130, 246, 0.3);
          transition: all 0.2s ease;
          white-space: nowrap;
        }
        
        .skill-tag:hover {
          background: rgba(59, 130, 246, 0.3);
          transform: scale(1.05);
        }
        
        .experience-item {
          background: rgba(17, 24, 39, 0.4);
          padding: 1rem;
          border-radius: 10px;
          border-left: 3px solid #3b82f6;
        }
        
        .contact-link {
          display: flex;
          align-items: center;
          padding: 0.5rem 1rem;
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

        @media (max-width: 640px) {
          .glass-card {
            padding: 1.25rem;
          }
          
          .project-card {
            height: 120px;
          }
        }
      `}</style>
    </div>
  );
};

export default AboutDetails;