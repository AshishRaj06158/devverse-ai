import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

export const CustomCursor: React.FC = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [hovered, setHovered] = useState(false);
  const [mobileDevice, setMobileDevice] = useState(false);

  useEffect(() => {
    // Check if device supports touch/fine cursor pointing
    const checkTouch = window.matchMedia('(pointer: coarse)').matches;
    setMobileDevice(checkTouch);

    if (checkTouch) return;

    const handleMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const isClickable = target.closest('button, a, input, select, textarea, [role="button"]');
      setHovered(!!isClickable);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseover', handleMouseOver);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseover', handleMouseOver);
    };
  }, []);

  if (mobileDevice) return null;

  return (
    <>
      {/* Outer follow glow ring */}
      <motion.div
        className="fixed top-0 left-0 w-8 h-8 rounded-full border border-primary/45 pointer-events-none z-50 mix-blend-screen -translate-x-1/2 -translate-y-1/2 hidden md:block"
        animate={{
          x: position.x,
          y: position.y,
          scale: hovered ? 1.6 : 1,
          borderColor: hovered ? '#8B5CF6' : '#3B82F6',
          boxShadow: hovered 
            ? '0 0 15px rgba(139, 92, 246, 0.4)' 
            : '0 0 10px rgba(59, 130, 246, 0.15)'
        }}
        transition={{ type: 'spring', damping: 25, stiffness: 220, mass: 0.5 }}
      />
      {/* Center cursor dot */}
      <motion.div
        className="fixed top-0 left-0 w-2 h-2 rounded-full bg-secondary pointer-events-none z-50 -translate-x-1/2 -translate-y-1/2 hidden md:block"
        animate={{
          x: position.x,
          y: position.y,
          scale: hovered ? 0.5 : 1
        }}
        transition={{ type: 'spring', damping: 30, stiffness: 350 }}
      />
    </>
  );
};
export default CustomCursor;
