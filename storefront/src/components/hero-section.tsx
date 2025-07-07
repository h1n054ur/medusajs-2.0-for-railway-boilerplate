'use client';

import { motion } from 'framer-motion';
import { ArrowRight, ShoppingBag, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  AnimatedSpan,
  Terminal,
  TypingAnimation,
} from '@/components/magicui/terminal';
import Link from 'next/link';

interface HeroSectionProps {
  countryCode?: string;
}

export function HeroSection({ countryCode = 'us' }: HeroSectionProps) {
  const handleShopNow = () => {
    // Navigation handled by Link component
  };

  const handleLearnMore = () => {
    // Navigation handled by Link component  
  };

  return (
    <div className="hero-gradient py-20 lg:py-32">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="text-center lg:text-left">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <Badge variant="default" className="mb-6 font-semibold px-4 py-2">
                  <Sparkles size={16} className="mr-2" />
                  NEW COLLECTION AVAILABLE
                </Badge>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
              >
                <h1 className="text-hero text-foreground mb-6 font-black leading-tight">
                  Premium
                  <span className="text-gradient glitch-animation block mt-2 relative">
                    E-Commerce
                  </span>
                  Experience
                </h1>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
              >
                <p className="text-muted-foreground mb-8 max-w-full lg:max-w-lg mx-auto lg:mx-0 text-body-large">
                  Discover our curated collection of premium products, 
                  crafted with care for your modern lifestyle.
                </p>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.8 }}
              >
                <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                  <Link href={`/${countryCode}/store`}>
                    <Button
                      size="lg"
                      onClick={handleShopNow}
                      className="px-8 py-3 text-base font-semibold rounded-lg shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-200 ease-in-out"
                    >
                      <ShoppingBag size={20} className="mr-2" />
                      Shop Now
                    </Button>
                  </Link>
                  
                  <Link href={`/${countryCode}/collections`}>
                    <Button
                      variant="outline"
                      size="lg"
                      onClick={handleLearnMore}
                      className="px-8 py-3 text-base font-semibold rounded-lg border-border text-foreground hover:border-primary hover:bg-primary hover:text-primary-foreground hover:-translate-y-1 transition-all duration-200 ease-in-out"
                    >
                      <ArrowRight size={20} className="mr-2" />
                      View Collections
                    </Button>
                  </Link>
                </div>
              </motion.div>
            </div>
          </motion.div>

          {/* Terminal Demo */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="flex justify-center">
              <div className="hover-lift w-full max-w-2xl rounded-2xl shadow-2xl">
                <Terminal className="w-full min-h-[400px]">
                  <TypingAnimation>&gt; npx create-medusa-store my-store</TypingAnimation>

                  <AnimatedSpan delay={1500} className="text-green-500">
                    <span>✔ Preflight checks.</span>
                  </AnimatedSpan>

                  <AnimatedSpan delay={2000} className="text-green-500">
                    <span>✔ Verifying framework. Found Next.js + Medusa.</span>
                  </AnimatedSpan>

                  <AnimatedSpan delay={2500} className="text-green-500">
                    <span>✔ Validating Tailwind CSS.</span>
                  </AnimatedSpan>

                  <AnimatedSpan delay={3000} className="text-green-500">
                    <span>✔ Installing ShadCN components.</span>
                  </AnimatedSpan>

                  <AnimatedSpan delay={3500} className="text-green-500">
                    <span>✔ Setting up Magic UI animations.</span>
                  </AnimatedSpan>

                  <AnimatedSpan delay={4000} className="text-green-500">
                    <span>✔ Configuring bubblegum theme.</span>
                  </AnimatedSpan>

                  <TypingAnimation delay={4500} className="text-muted-foreground">
                    Success! E-commerce store ready. 🚀
                  </TypingAnimation>
                </Terminal>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}