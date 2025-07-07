import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Badge } from '@/components/ui/badge';
import { Users, Award, Globe, TrendingUp } from 'lucide-react';

const stats = [
  {
    id: 1,
    icon: Users,
    label: 'Happy Customers',
    value: 50000,
    suffix: '+',
    description: 'Trusted by businesses worldwide'
  },
  {
    id: 2,
    icon: Award,
    label: 'Awards Won',
    value: 25,
    suffix: '+',
    description: 'Industry recognition and excellence'
  },
  {
    id: 3,
    icon: Globe,
    label: 'Countries Served',
    value: 120,
    suffix: '+',
    description: 'Global reach and accessibility'
  },
  {
    id: 4,
    icon: TrendingUp,
    label: 'Growth Rate',
    value: 98,
    suffix: '%',
    description: 'Year-over-year customer satisfaction'
  }
];

function CountUpAnimation({ 
  value, 
  duration = 2000 
}: { 
  value: number; 
  duration?: number; 
}) {
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    let startTime: number;
    let animationFrame: number;

    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime;
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);

      // Easing function for smooth animation
      const easeOut = 1 - Math.pow(1 - progress, 3);
      setDisplayValue(Math.floor(value * easeOut));

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      }
    };

    animationFrame = requestAnimationFrame(animate);

    return () => {
      if (animationFrame) {
        cancelAnimationFrame(animationFrame);
      }
    };
  }, [value, duration]);

  return <span>{displayValue.toLocaleString()}</span>;
}

export function StatsSection() {
  return (
    <section className="py-20 bg-primary/5">
      <div className="container mx-auto px-4 max-w-7xl">
        {/* Section Header */}
        <div className="text-center mb-16">
          <Badge variant="secondary" className="mb-6 font-semibold">
            <TrendingUp size={16} className="mr-2" />
            Our Impact
          </Badge>
          
          <h2 className="text-section-title text-foreground mb-4 font-bold">
            Numbers That 
            <span className="text-gradient"> Matter</span>
          </h2>
          
          <p className="text-muted-foreground max-w-2xl mx-auto text-body-large">
            See the impact we've made and the trust we've built with our community.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <div className="mb-4 flex justify-center">
                <div className="p-4 rounded-full bg-primary/10 border-2 border-primary/20">
                  <stat.icon size={40} className="text-primary" />
                </div>
              </div>
              
              <div className="mb-2">
                <span className="text-4xl md:text-5xl font-bold text-foreground">
                  <CountUpAnimation value={stat.value} />
                  {stat.suffix}
                </span>
              </div>
              
              <h3 className="text-lg font-semibold text-foreground mb-2">
                {stat.label}
              </h3>
              
              <p className="text-sm text-muted-foreground">
                {stat.description}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Additional Info */}
        <div className="mt-16 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-background/60 border border-border"
          >
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <span className="text-sm font-medium text-foreground">
              Live statistics updated in real-time
            </span>
          </motion.div>
        </div>
      </div>
    </section>
  );
}