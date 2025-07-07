'use client';

import { motion } from 'framer-motion';
import { ArrowRight, ShoppingBag, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { AnimatedGradientText } from '@/components/magicui/animated-gradient-text';
import { SparklesText } from '@/components/magicui/sparkles-text';
import { PulsatingButton } from '@/components/magicui/pulsating-button';
import { BorderBeam } from '@/components/magicui/border-beam';
import Link from 'next/link';

interface HeroSectionProps {
  countryCode?: string;
}

export function HeroSection({ countryCode = 'us' }: HeroSectionProps) {

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-background via-background to-muted/20">
      {/* Background Animation */}
      <div className="absolute inset-0 bg-grid-pattern opacity-10" />
      
      {/* Content Container */}
      <div className="container mx-auto px-4 text-center z-10">
        {/* Announcement Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-8"
        >
          <AnimatedGradientText>
            <Badge variant="outline" className="px-4 py-2">
              <Sparkles size={16} className="mr-2" />
              ✨ New Collection Available
            </Badge>
          </AnimatedGradientText>
        </motion.div>

        {/* Main Headline */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mb-6"
        >
          <SparklesText
            text="Modern E-Commerce Experience"
            className="text-4xl md:text-6xl lg:text-7xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent"
          />
        </motion.div>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto"
        >
          Discover our curated collection of premium products with the power of 
          modern design and seamless shopping experience.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12"
        >
          <Link href={`/${countryCode}/store`}>
            <PulsatingButton className="px-8 py-3 text-lg">
              <ShoppingBag size={20} className="mr-2" />
              Shop Now
            </PulsatingButton>
          </Link>
          <Link href={`/${countryCode}/collections`}>
            <Button variant="outline" size="lg" className="px-8 py-3 text-lg">
              <ArrowRight size={20} className="mr-2" />
              View Collection
            </Button>
          </Link>
        </motion.div>

        {/* Featured Product Preview */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.0 }}
          className="relative max-w-4xl mx-auto"
        >
          <div className="relative rounded-2xl overflow-hidden shadow-2xl">
            <BorderBeam size={250} duration={12} delay={9} />
            <div className="bg-gradient-to-r from-primary/10 to-secondary/10 p-8 rounded-2xl">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-background/50 backdrop-blur rounded-lg p-6 text-center">
                  <ShoppingBag className="w-8 h-8 mx-auto mb-3 text-primary" />
                  <h3 className="font-semibold mb-2">Premium Quality</h3>
                  <p className="text-sm text-muted-foreground">Carefully curated products</p>
                </div>
                <div className="bg-background/50 backdrop-blur rounded-lg p-6 text-center">
                  <Sparkles className="w-8 h-8 mx-auto mb-3 text-primary" />
                  <h3 className="font-semibold mb-2">Modern Design</h3>
                  <p className="text-sm text-muted-foreground">Beautiful and functional</p>
                </div>
                <div className="bg-background/50 backdrop-blur rounded-lg p-6 text-center">
                  <ArrowRight className="w-8 h-8 mx-auto mb-3 text-primary" />
                  <h3 className="font-semibold mb-2">Fast Delivery</h3>
                  <p className="text-sm text-muted-foreground">Quick and reliable shipping</p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}