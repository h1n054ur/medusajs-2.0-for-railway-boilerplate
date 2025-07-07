'use client';

import { motion } from 'framer-motion';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Users, Github, Twitter, Linkedin, Mail } from 'lucide-react';

const teamMembers = [
  {
    id: 1,
    name: 'Sarah Johnson',
    role: 'CEO & Founder',
    bio: 'Visionary leader with 15+ years in tech, passionate about building products that make a difference.',
    avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b77c?w=300&h=300&fit=crop&crop=face',
    social: {
      twitter: 'https://twitter.com/sarahj',
      linkedin: 'https://linkedin.com/in/sarahj',
      github: 'https://github.com/sarahj'
    }
  },
  {
    id: 2,
    name: 'Michael Chen',
    role: 'CTO',
    bio: 'Full-stack architect who loves solving complex problems and building scalable systems.',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&h=300&fit=crop&crop=face',
    social: {
      twitter: 'https://twitter.com/michaelc',
      linkedin: 'https://linkedin.com/in/michaelc',
      github: 'https://github.com/michaelc'
    }
  },
  {
    id: 3,
    name: 'Emily Rodriguez',
    role: 'Head of Design',
    bio: 'Creative designer focused on user experience and creating beautiful, functional interfaces.',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=300&h=300&fit=crop&crop=face',
    social: {
      twitter: 'https://twitter.com/emilyr',
      linkedin: 'https://linkedin.com/in/emilyr'
    }
  },
  {
    id: 4,
    name: 'David Kim',
    role: 'Lead Developer',
    bio: 'Passionate developer who enjoys mentoring others and contributing to open-source projects.',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop&crop=face',
    social: {
      twitter: 'https://twitter.com/davidk',
      linkedin: 'https://linkedin.com/in/davidk',
      github: 'https://github.com/davidk'
    }
  },
  {
    id: 5,
    name: 'Jessica Taylor',
    role: 'Product Manager',
    bio: 'Data-driven product manager who bridges the gap between user needs and business goals.',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300&h=300&fit=crop&crop=face',
    social: {
      twitter: 'https://twitter.com/jessicat',
      linkedin: 'https://linkedin.com/in/jessicat'
    }
  },
  {
    id: 6,
    name: 'Alex Thompson',
    role: 'DevOps Engineer',
    bio: 'Infrastructure expert ensuring our systems run smoothly and scale efficiently.',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=300&h=300&fit=crop&crop=face',
    social: {
      twitter: 'https://twitter.com/alext',
      linkedin: 'https://linkedin.com/in/alext',
      github: 'https://github.com/alext'
    }
  }
];

export function TeamSection() {
  return (
    <section className="py-20 bg-muted/20">
      <div className="container mx-auto px-4 max-w-7xl">
        {/* Section Header */}
        <div className="text-center mb-16">
          <Badge variant="secondary" className="mb-6 font-semibold">
            <Users size={16} className="mr-2" />
            Our Team
          </Badge>
          
          <h2 className="text-section-title text-foreground mb-4 font-bold">
            Meet the 
            <span className="text-gradient"> Amazing People</span>
          </h2>
          
          <p className="text-muted-foreground max-w-2xl mx-auto text-body-large">
            We're a diverse team of passionate individuals working together to build something extraordinary.
          </p>
        </div>

        {/* Team Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {teamMembers.map((member, index) => (
            <motion.div
              key={member.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="hover-lift h-full">
                <CardContent className="p-6 text-center">
                  <div className="mb-4">
                    <Avatar className="w-20 h-20 mx-auto mb-4">
                      <AvatarImage src={member.avatar} alt={member.name} />
                      <AvatarFallback className="text-lg">
                        {member.name.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                  </div>
                  
                  <h3 className="text-lg font-semibold text-foreground mb-1">
                    {member.name}
                  </h3>
                  
                  <p className="text-primary font-medium mb-3 text-sm">
                    {member.role}
                  </p>
                  
                  <p className="text-muted-foreground text-sm mb-4 leading-relaxed">
                    {member.bio}
                  </p>
                  
                  {/* Social Links */}
                  <div className="flex justify-center gap-2">
                    {member.social.twitter && (
                      <Button
                        variant="ghost"
                        size="sm"
                        className="w-9 h-9 p-0"
                        asChild
                      >
                        <a href={member.social.twitter} target="_blank" rel="noopener noreferrer">
                          <Twitter size={16} />
                        </a>
                      </Button>
                    )}
                    {member.social.linkedin && (
                      <Button
                        variant="ghost"
                        size="sm"
                        className="w-9 h-9 p-0"
                        asChild
                      >
                        <a href={member.social.linkedin} target="_blank" rel="noopener noreferrer">
                          <Linkedin size={16} />
                        </a>
                      </Button>
                    )}
                    {member.social.github && (
                      <Button
                        variant="ghost"
                        size="sm"
                        className="w-9 h-9 p-0"
                        asChild
                      >
                        <a href={member.social.github} target="_blank" rel="noopener noreferrer">
                          <Github size={16} />
                        </a>
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Join Team CTA */}
        <div className="mt-16 text-center">
          <Card className="max-w-2xl mx-auto">
            <CardContent className="p-8">
              <h3 className="text-xl font-semibold text-foreground mb-4">
                Want to join our team?
              </h3>
              <p className="text-muted-foreground mb-6">
                We're always looking for talented individuals who share our passion for innovation and excellence.
              </p>
              <Button size="lg" className="font-semibold">
                <Mail size={20} className="mr-2" />
                View Open Positions
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}