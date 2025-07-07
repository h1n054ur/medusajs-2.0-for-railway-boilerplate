import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface AnimatedTextProps {
  children: ReactNode;
  variant?: 'gradient' | 'glitch' | 'shimmer' | 'wave' | 'bounce';
  className?: string;
  sx?: any;
}

export function AnimatedText({ 
  children, 
  variant = 'gradient', 
  className = '', 
  sx = {} 
}: AnimatedTextProps) {
  const animationClasses = {
    gradient: 'text-gradient',
    glitch: 'glitch-animation',
    shimmer: 'text-shimmer',
    wave: 'text-wave',
    bounce: 'text-bounce',
  };

  const getAnimationClass = () => {
    return animationClasses[variant] || '';
  };

  return (
    <span
      className={`${getAnimationClass()} ${className}`}
      style={sx}
    >
      {children}
    </span>
  );
}

interface FadeInTextProps {
  children: ReactNode;
  delay?: number;
  direction?: 'up' | 'down' | 'left' | 'right';
  className?: string;
  sx?: any;
}

export function FadeInText({ 
  children, 
  delay = 0, 
  direction = 'up',
  className = '',
  sx = {} 
}: FadeInTextProps) {
  const directions = {
    up: { y: 30 },
    down: { y: -30 },
    left: { x: -30 },
    right: { x: 30 },
  };

  return (
    <motion.div
      initial={{ opacity: 0, ...directions[direction] }}
      whileInView={{ opacity: 1, y: 0, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay }}
      className={className}
      style={sx}
    >
      {children}
    </motion.div>
  );
}

interface TypewriterTextProps {
  text: string;
  delay?: number;
  speed?: number;
  className?: string;
  sx?: any;
}

export function TypewriterText({ 
  text, 
  delay = 0, 
  speed = 0.1,
  className = '',
  sx = {} 
}: TypewriterTextProps) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      transition={{ delay }}
      className={className}
      style={sx}
    >
      {text.split('').map((char, index) => (
        <motion.span
          key={index}
          variants={{
            hidden: { opacity: 0 },
            visible: { opacity: 1 },
          }}
          transition={{ duration: speed, delay: delay + index * speed }}
        >
          {char}
        </motion.span>
      ))}
    </motion.div>
  );
}