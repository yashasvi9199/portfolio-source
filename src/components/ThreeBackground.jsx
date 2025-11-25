import React, { useRef, useEffect } from "react";
import * as THREE from "three";

const ThreeBackground = () => {
  const mountRef = useRef(null);
  const frameRef = useRef();
  const scrollY = useRef(0);

  useEffect(() => {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: "high-performance",
    });

    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    mountRef.current.appendChild(renderer.domElement);

    // Create particle system 1 (Background)
    const particlesGeometry = new THREE.BufferGeometry();
    const particlesCount = 2000;
    
    const posArray = new Float32Array(particlesCount * 3);
    const colorArray = new Float32Array(particlesCount * 3);

    for(let i = 0; i < particlesCount * 3; i++) {
      posArray[i] = (Math.random() - 0.5) * 20;
      colorArray[i] = Math.random() * 0.5 + 0.5; // Brighter colors
    }

    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
    particlesGeometry.setAttribute('color', new THREE.BufferAttribute(colorArray, 3));

    const particlesMaterial = new THREE.PointsMaterial({
      size: 0.015,
      vertexColors: true,
      transparent: true,
      opacity: 0.6,
      blending: THREE.AdditiveBlending
    });

    const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(particlesMesh);

    // Create particle system 2 (Foreground - fewer, larger, faster)
    const particlesGeometry2 = new THREE.BufferGeometry();
    const particlesCount2 = 500;
    
    const posArray2 = new Float32Array(particlesCount2 * 3);
    const colorArray2 = new Float32Array(particlesCount2 * 3);

    for(let i = 0; i < particlesCount2 * 3; i++) {
      posArray2[i] = (Math.random() - 0.5) * 15;
      colorArray2[i] = Math.random() * 0.5 + 0.5;
    }

    particlesGeometry2.setAttribute('position', new THREE.BufferAttribute(posArray2, 3));
    particlesGeometry2.setAttribute('color', new THREE.BufferAttribute(colorArray2, 3));

    const particlesMaterial2 = new THREE.PointsMaterial({
      size: 0.025,
      vertexColors: true,
      transparent: true,
      opacity: 0.8,
      blending: THREE.AdditiveBlending
    });

    const particlesMesh2 = new THREE.Points(particlesGeometry2, particlesMaterial2);
    scene.add(particlesMesh2);

    camera.position.z = 8;

    // Mouse interaction
    const mouse = { x: 0, y: 0 };
    
    const handleMouseMove = (event) => {
      mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
      mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
    };

    window.addEventListener('mousemove', handleMouseMove);

    // Scroll interaction
    const handleScroll = () => {
      scrollY.current = window.scrollY;
    };
    window.addEventListener('scroll', handleScroll);

    // Animation loop
    const clock = new THREE.Clock();
    
    const animate = () => {
      const elapsedTime = clock.getElapsedTime();
      
      // Gentle rotation - Layer 1
      particlesMesh.rotation.y = elapsedTime * 0.02 + scrollY.current * 0.0005;
      particlesMesh.rotation.x = elapsedTime * 0.01 + scrollY.current * 0.0002;
      
      // Gentle rotation - Layer 2 (Faster)
      particlesMesh2.rotation.y = elapsedTime * 0.03 + scrollY.current * 0.0008;
      particlesMesh2.rotation.x = elapsedTime * 0.015 + scrollY.current * 0.0003;

      // Mouse & Scroll influence - Layer 1
      const targetY1 = (mouse.y * 0.5) - (scrollY.current * 0.002); // Scroll moves particles up
      particlesMesh.position.x += (mouse.x * 0.5 - particlesMesh.position.x) * 0.05;
      particlesMesh.position.y += (targetY1 - particlesMesh.position.y) * 0.05;

      // Mouse & Scroll influence - Layer 2 (More responsive)
      const targetY2 = (mouse.y * 0.8) - (scrollY.current * 0.004); // Faster parallax for foreground
      particlesMesh2.position.x += (mouse.x * 0.8 - particlesMesh2.position.x) * 0.06;
      particlesMesh2.position.y += (targetY2 - particlesMesh2.position.y) * 0.06;

      // Pulsing effect
      particlesMesh.scale.setScalar(1 + Math.sin(elapsedTime) * 0.1);
      particlesMesh2.scale.setScalar(1 + Math.sin(elapsedTime * 1.5) * 0.15);

      renderer.render(scene, camera);
      frameRef.current = requestAnimationFrame(animate);
    };

    animate();

    // Handle resize
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(frameRef.current);
      if (mountRef.current && renderer.domElement.parentNode === mountRef.current) {
        mountRef.current.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div
      ref={mountRef}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        zIndex: 0,
        pointerEvents: "none",
      }}
    />
  );
};

export default ThreeBackground;
