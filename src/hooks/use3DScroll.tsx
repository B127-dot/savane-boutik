import { useEffect, useState } from 'react';

interface ScrollPosition {
  scrollY: number;
  scrollProgress: number;
}

export const use3DScroll = () => {
  const [scrollPos, setScrollPos] = useState<ScrollPosition>({
    scrollY: 0,
    scrollProgress: 0,
  });

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollProgress = scrollY / docHeight;

      setScrollPos({
        scrollY,
        scrollProgress,
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Initial call

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return scrollPos;
};

export const getSection3DStyle = (scrollY: number, sectionIndex: number) => {
  // Calculate perspective and rotation based on scroll position
  const viewportHeight = window.innerHeight;
  const sectionOffset = sectionIndex * viewportHeight * 0.8;
  const distanceFromTop = scrollY - sectionOffset;
  const progress = Math.max(0, Math.min(1, distanceFromTop / viewportHeight));

  // Create 3D tilt effect
  const rotateX = Math.max(-15, Math.min(0, (progress - 0.5) * 30));
  const rotateY = Math.sin(progress * Math.PI) * 2;
  const scale = 0.95 + (1 - Math.abs(progress - 0.5) * 2) * 0.05;
  const translateZ = -Math.abs(progress - 0.5) * 100;

  return {
    transform: `perspective(2000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(${scale}) translateZ(${translateZ}px)`,
    transition: 'transform 0.1s ease-out',
  };
};
