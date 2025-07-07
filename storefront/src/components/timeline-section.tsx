'use client';

import { motion } from 'framer-motion';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Calendar, Rocket, Users, Award, Globe, TrendingUp } from 'lucide-react';

const timelineEvents = [
  {
    id: 1,
    year: '2020',
    title: 'Company Founded',
    description: 'Started with a vision to revolutionize the way businesses operate in the digital age.',
    icon: Rocket,
    color: 'bg-blue-500',
    achievements: ['Initial funding secured', 'Core team assembled', 'First MVP launched']
  },
  {
    id: 2,
    year: '2021',
    title: 'Product Launch',
    description: 'Officially launched our platform with core features and gained first 1,000 users.',
    icon: Users,
    color: 'bg-green-500',
    achievements: ['1,000+ active users', 'Product-market fit achieved', 'Series A funding']
  },
  {
    id: 3,
    year: '2022',
    title: 'Major Expansion',
    description: 'Expanded to international markets and launched advanced features.',
    icon: Globe,
    color: 'bg-purple-500',
    achievements: ['Global expansion', '10,000+ users', 'Advanced features launched']
  },
  {
    id: 4,
    year: '2023',
    title: 'Industry Recognition',
    description: 'Received multiple awards and recognition for innovation and excellence.',
    icon: Award,
    color: 'bg-yellow-500',
    achievements: ['Industry awards won', '50,000+ users', 'Enterprise partnerships']
  },
  {
    id: 5,
    year: '2024',
    title: 'Continued Growth',
    description: 'Ongoing innovation and expansion with new features and market penetration.',
    icon: TrendingUp,
    color: 'bg-pink-500',
    achievements: ['AI integration', '100,000+ users', 'New product lines']
  }
];

export function TimelineSection() {
  return (
    <section className="py-20 bg-muted/20">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Section Header */}
        <div className="text-center mb-16">
          <Badge variant="secondary" className="mb-6 font-semibold">
            <Calendar size={16} className="mr-2" />
            Our Journey
          </Badge>
          
          <h2 className="text-section-title text-foreground mb-4 font-bold">
            Building the 
            <span className="text-gradient"> Future Together</span>
          </h2>
          
          <p className="text-muted-foreground max-w-2xl mx-auto text-body-large">
            From a small startup to a global platform, here's our journey of growth, innovation, and success.
          </p>
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical Line */}
          <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary via-secondary to-primary"></div>
          
          {/* Timeline Events */}
          <div className="space-y-12">
            {timelineEvents.map((event, index) => (
              <motion.div
                key={event.id}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                viewport={{ once: true }}
                className="relative flex items-start gap-6"
              >
                {/* Timeline Icon */}
                <div className="relative z-10 flex-shrink-0">
                  <div className={`w-12 h-12 rounded-full ${event.color} flex items-center justify-center shadow-lg`}>
                    <event.icon size={24} className="text-white" />
                  </div>
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <Card className="hover-lift">
                    <CardContent className="p-6">
                      <div className="flex items-center gap-3 mb-3">
                        <Badge variant="outline" className="font-semibold">
                          {event.year}
                        </Badge>
                        <h3 className="text-lg font-semibold text-foreground">
                          {event.title}
                        </h3>
                      </div>
                      
                      <p className="text-muted-foreground mb-4 leading-relaxed">
                        {event.description}
                      </p>
                      
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                        {event.achievements.map((achievement, achievementIndex) => (
                          <div
                            key={achievementIndex}
                            className="flex items-center gap-2 text-sm text-muted-foreground"
                          >
                            <div className="w-1.5 h-1.5 rounded-full bg-primary"></div>
                            <span>{achievement}</span>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Future Vision */}
        <div className="mt-16 text-center">
          <Card className="max-w-2xl mx-auto">
            <CardContent className="p-8">
              <div className="mb-4">
                <div className="w-16 h-16 mx-auto rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
                  <Rocket size={32} className="text-white" />
                </div>
              </div>
              
              <h3 className="text-xl font-semibold text-foreground mb-4">
                What's Next?
              </h3>
              
              <p className="text-muted-foreground mb-6">
                We're just getting started. Our roadmap includes exciting new features, 
                expanded global reach, and continued innovation to serve our growing community.
              </p>
              
              <div className="flex flex-wrap justify-center gap-4 text-sm">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-primary"></div>
                  <span>AI-powered features</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-secondary"></div>
                  <span>Mobile applications</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-primary"></div>
                  <span>Advanced analytics</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}