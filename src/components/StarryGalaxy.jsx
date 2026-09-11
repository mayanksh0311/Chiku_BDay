import { useRef, useMemo, useEffect, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Stars, Image, OrbitControls } from "@react-three/drei";
import * as THREE from "three";
import { Compass, Sparkles } from "lucide-react";
import { carouselPhotos, polaroids, scrapbookPages, galaxyImages, config } from "../constants";

// 3D Floating Photo Plane in Galaxy
function PhotoPlane({ url, position, index }) {
  const ref = useRef();
  
  // Make the images always face the camera with subtle floating bob
  useFrame(({ camera, clock }) => {
    if (ref.current) {
      ref.current.lookAt(camera.position);
      // Gentle floating oscillation
      ref.current.position.y = position[1] + Math.sin((clock?.elapsedTime || 0) * 1.5 + index) * 0.15;
    }
  });

  return (
    <group position={position}>
      <Image
        ref={ref}
        url={url}
        scale={[2.2, 2.2, 2.2]}
        transparent
        opacity={0.95}
      />
    </group>
  );
}

// Galaxy of scattered photos
function GalaxyPhotos({ groupRef }) {
  // Extract all images from the collections
  const allImageUrls = useMemo(() => {
    const urls = [];
    
    // Add galaxy images
    galaxyImages.forEach((img) => urls.push(img.src));
    
    // Add carousel photos
    carouselPhotos.forEach((img) => urls.push(img.src));
    
    // Add polaroids
    polaroids.forEach((img) => urls.push(img.src));
    
    // Add scrapbook pages
    scrapbookPages.forEach((page) => {
      if (page.photos) {
        page.photos.forEach((img) => urls.push(img.src));
      } else if (page.src) { // Fallback in case there is a direct src
        urls.push(page.src);
      }
    });

    // Remove duplicates if any
    return [...new Set(urls)];
  }, []);

  // Spherical fibonacci distribution for uniform celestial scattering
  const photoData = useMemo(() => {
    return allImageUrls.map((url, i) => {
      const radius = 6.5 + (i % 3) * 1.8; // Varied orbital radii
      const phi = Math.acos(-1 + (2 * i) / allImageUrls.length);
      const theta = Math.sqrt(allImageUrls.length * Math.PI) * phi;

      return {
        url: url,
        position: [
          radius * Math.cos(theta) * Math.sin(phi),
          radius * Math.sin(theta) * Math.sin(phi) * 0.7, // Flatter galactic disc
          radius * Math.cos(phi),
        ],
      };
    });
  }, [allImageUrls]);

  useFrame(() => {
    if (groupRef.current) {
      groupRef.current.rotation.y += 0.0008;
    }
  });

  return (
    <group ref={groupRef}>
      {photoData.map((data, i) => (
        <PhotoPlane key={i} index={i} url={data.url} position={data.position} />
      ))}
    </group>
  );
}

// Gyroscope & Touch Controls Controller
function GyroscopeAndTouchControls({ gyroEnabled }) {
  const { camera } = useThree();
  const targetRotation = useRef({ x: 0, y: 0 });

  useEffect(() => {
    if (!gyroEnabled) return;

    const handleOrientation = (e) => {
      // gamma: left-to-right tilt [-90, 90]
      // beta: front-to-back tilt [-180, 180]
      if (e.gamma !== null && e.beta !== null) {
        const xRot = (e.beta - 45) * (Math.PI / 180) * 0.4;
        const yRot = e.gamma * (Math.PI / 180) * 0.4;
        targetRotation.current = { x: xRot, y: yRot };
      }
    };

    window.addEventListener("deviceorientation", handleOrientation);
    return () => window.removeEventListener("deviceorientation", handleOrientation);
  }, [gyroEnabled]);

  useFrame(() => {
    if (gyroEnabled) {
      // Smoothly interpolate camera position according to tilt
      camera.position.x = THREE.MathUtils.lerp(camera.position.x, Math.sin(targetRotation.current.y) * 2, 0.05);
      camera.position.y = THREE.MathUtils.lerp(camera.position.y, Math.sin(targetRotation.current.x) * 2, 0.05);
      camera.lookAt(0, 0, 0);
    }
  });

  return (
    <OrbitControls
      enableZoom={false}
      enablePan={false}
      rotateSpeed={0.6}
      autoRotate={!gyroEnabled}
      autoRotateSpeed={0.4}
      dampingFactor={0.05}
    />
  );
}

export default function StarryGalaxy() {
  const galaxyGroupRef = useRef();
  const [gyroSupported, setGyroSupported] = useState(false);
  const [gyroActive, setGyroActive] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined" && window.DeviceOrientationEvent) {
      setGyroSupported(true);
      // Auto-activate on standard non-permission browsers (Android / modern Web)
      if (typeof window.DeviceOrientationEvent.requestPermission !== "function") {
        setGyroActive(true);
      }
    }
  }, []);

  const requestGyroPermission = async () => {
    if (
      typeof window !== "undefined" &&
      typeof window.DeviceOrientationEvent?.requestPermission === "function"
    ) {
      try {
        const response = await window.DeviceOrientationEvent.requestPermission();
        if (response === "granted") {
          setGyroActive(true);
        }
      } catch (err) {
        console.log("Gyro permission error:", err);
      }
    } else {
      setGyroActive(true);
    }
  };

  return (
    <div className="w-full h-full bg-[#030308] relative overflow-hidden select-none">
      {/* Top Header Overlay */}
      <div className="absolute top-8 left-0 w-full text-center z-10 pointer-events-none px-4">
        <span className="text-[10px] font-mono tracking-[0.35em] text-amber-300/80 uppercase block mb-1">
          COSMIC ARCHIVE
        </span>
        <h2 className="text-2xl md:text-3xl font-serif text-white/90 font-light tracking-[0.2em] drop-shadow-[0_0_15px_rgba(255,255,255,0.4)]">
          UNIVERSE OF MEMORIES
        </h2>
        <p className="text-xs text-white/50 mt-1.5 tracking-wider font-light">
          {gyroActive ? "📱 Tilt phone or swipe to look around" : "👆 Drag with finger to look around"}
        </p>
      </div>

      {/* Gyroscope Activation Button if iOS requires manual permission */}
      {gyroSupported && !gyroActive && (
        <div className="absolute bottom-16 left-1/2 -translate-x-1/2 z-20">
          <button
            onClick={requestGyroPermission}
            className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/15 hover:bg-white/25 text-amber-200 text-xs font-medium backdrop-blur-md border border-amber-300/30 shadow-lg transition-all active:scale-95 cursor-pointer"
          >
            <Compass className="w-4 h-4 text-amber-300 animate-spin" />
            <span>Enable 3D Gyroscope Tilt</span>
          </button>
        </div>
      )}

      {/* 3D Three.js Canvas */}
      <Canvas
        camera={{ position: [0, 0, 1.2], fov: 75 }}
        gl={{ antialias: true, alpha: false }}
      >
        <color attach="background" args={["#030308"]} />
        <ambientLight intensity={0.8} />

        {/* Dense Twinkling Starfield */}
        <Stars
          radius={100}
          depth={60}
          count={6000}
          factor={4.5}
          saturation={0.5}
          fade
          speed={1.2}
        />

        <GalaxyPhotos groupRef={galaxyGroupRef} />
        <GyroscopeAndTouchControls gyroEnabled={gyroActive} />
      </Canvas>

      {/* Bottom celebration footer */}
      <div className="absolute bottom-6 left-0 w-full text-center z-10 pointer-events-none">
        <span className="inline-flex items-center gap-1.5 text-xs text-amber-200/60 font-serif tracking-widest">
          <Sparkles className="w-3 h-3 text-amber-300" />
          <span>Happy 25th Birthday {config.name}! ✨</span>
        </span>
      </div>
    </div>
  );
}
