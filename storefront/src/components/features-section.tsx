'use client';

import { motion } from 'framer-motion';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { MagicCard } from '@/components/magicui/magic-card';
import { NumberTicker } from '@/components/magicui/number-ticker';
import { 
  Truck, 
  Shield, 
  CreditCard, 
  Headphones, 
  Zap, 
  Heart
} from 'lucide-react';

const features = [
  {
    id: 1,
    icon: Truck,
    title: "Free Shipping",
    description: "Free shipping on orders over $50",
    stat: 24,
    statLabel: "Hour Delivery"
  },
  {
    id: 2,
    icon: Shield,
    title: "Secure Payments",
    description: "100% secure payment processing",
    stat: 256,
    statLabel: "Bit Encryption"
  },
  {
    id: 3,
    icon: CreditCard,
    title: "Easy Returns",
    description: "30-day return policy",
    stat: 30,
    statLabel: "Day Returns"
  },
  {
    id: 4,
    icon: Headphones,
    title: "24/7 Support",
    description: "Round-the-clock customer service",
    stat: 24,
    statLabel: "Hour Support"
  },
  {
    id: 5,
    icon: Zap,
    title: "Fast Checkout",
    description: "One-click purchase experience",
    stat: 1,
    statLabel: "Click Checkout"
  },
  {
    id: 6,
    icon: Heart,
    title: "Wishlist",
    description: "Save items for later",
    stat: 99,
    statLabel: "Satisfaction"
  }
];

export function FeaturesSection() {
  return (
    <section className="py-24 bg-muted/30">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <Badge variant="secondary" className="mb-4">
            Why Choose Us
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Unmatched Shopping Experience
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            We provide the best features to make your shopping experience 
            smooth, secure, and enjoyable.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <MagicCard className="cursor-pointer border-2 hover:shadow-xl transition-all duration-300">
                <CardHeader className="text-center">
                  <div className="w-16 h-16 mx-auto mb-4 bg-primary/10 rounded-full flex items-center justify-center">
                    <feature.icon className="w-8 h-8 text-primary" />
                  </div>
                  <CardTitle className="text-xl mb-2">{feature.title}</CardTitle>
                  <CardDescription>{feature.description}</CardDescription>
                </CardHeader>
                <CardContent className="text-center">
                  <div className="flex items-center justify-center gap-1">
                    <NumberTicker value={feature.stat} className="text-2xl font-bold text-primary" />
                    <span className="text-sm text-muted-foreground">{feature.statLabel}</span>
                  </div>
                </CardContent>
              </MagicCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}