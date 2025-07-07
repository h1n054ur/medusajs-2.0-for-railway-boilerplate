import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Star, Quote } from 'lucide-react';

const testimonials = [
  {
    id: 1,
    name: "Sarah Johnson",
    role: "Product Manager",
    company: "TechCorp",
    avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b77c?w=150&h=150&fit=crop&crop=face",
    content: "This platform has completely transformed how we approach product development. The intuitive design and powerful features make it a joy to use every day. Highly recommended!",
    rating: 5,
  },
  {
    id: 2,
    name: "Michael Chen",
    role: "Senior Developer",
    company: "StartupXYZ",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
    content: "The developer experience is outstanding. Clean APIs, excellent documentation, and a supportive community. The integration was seamless and saved us weeks of work.",
    rating: 5,
  },
  {
    id: 3,
    name: "Emily Rodriguez",
    role: "UX Designer",
    company: "CreativeStudio",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
    content: "As a designer, I appreciate the attention to detail and the beautiful components. It's rare to find a tool that's both functional and aesthetically pleasing. The design system is exceptional.",
    rating: 5,
  },
  {
    id: 4,
    name: "David Kim",
    role: "CEO",
    company: "InnovateLab",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
    content: "The ROI we've seen since implementing this solution has been incredible. Our team's productivity has increased by 40% in just three months.",
    rating: 5,
  },
  {
    id: 5,
    name: "Jessica Taylor",
    role: "Marketing Director",
    company: "GrowthCo",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop&crop=face",
    content: "The analytics and insights provided have revolutionized our marketing strategy. We can now make data-driven decisions with confidence. Our conversion rates improved by 35% in just two months.",
    rating: 4,
  },
  {
    id: 6,
    name: "Alex Thompson",
    role: "CTO",
    company: "ScaleTech",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face",
    content: "Scalability was our biggest concern, but this platform handles our growing needs effortlessly. The performance is consistently excellent. We've scaled from 1K to 100K users with zero downtime.",
    rating: 5,
  },
];

export function TestimonialsCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const cardsToShow = 4;

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => {
        const nextIndex = prevIndex + 1;
        return nextIndex >= testimonials.length - cardsToShow + 1 ? 0 : nextIndex;
      });
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const visibleTestimonials = testimonials.slice(currentIndex, currentIndex + cardsToShow);

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        size={16}
        className={`${
          i < rating ? 'text-yellow-500 fill-yellow-500' : 'text-gray-300'
        }`}
      />
    ));
  };

  return (
    <section className="py-20 bg-muted/30">
      <div className="container mx-auto px-4 max-w-7xl">
        {/* Section Header */}
        <div className="text-center mb-16">
          <Badge variant="secondary" className="mb-6 font-semibold">
            <Quote size={16} className="mr-2" />
            Testimonials
          </Badge>
          
          <h2 className="text-section-title text-foreground mb-4 font-bold">
            What Our 
            <span className="text-gradient"> Customers</span> Say
          </h2>
          
          <p className="text-muted-foreground max-w-2xl mx-auto text-body-large">
            Don't just take our word for it. Here's what real customers are saying about their experience.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="relative overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 min-h-[320px]"
            >
              {visibleTestimonials.map((testimonial) => (
                <Card key={testimonial.id} className="hover-lift h-full flex flex-col">
                  <CardContent className="p-6 flex flex-col h-full min-h-[320px]">
                    {/* Rating */}
                    <div className="flex items-center gap-1 mb-4">
                      {renderStars(testimonial.rating)}
                    </div>

                    {/* Content */}
                    <blockquote className="text-muted-foreground mb-6 flex-grow leading-relaxed text-sm line-clamp-6">
                      "{testimonial.content}"
                    </blockquote>

                    {/* Author */}
                    <div className="flex items-center gap-3">
                      <Avatar className="h-12 w-12">
                        <AvatarImage src={testimonial.avatar} alt={testimonial.name} />
                        <AvatarFallback>
                          {testimonial.name.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="font-semibold text-foreground text-sm">
                          {testimonial.name}
                        </div>
                        <div className="text-muted-foreground text-xs">
                          {testimonial.role} at {testimonial.company}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Indicators */}
        <div className="flex justify-center gap-2 mt-8">
          {Array.from({ length: testimonials.length - cardsToShow + 1 }, (_, i) => (
            <button
              key={i}
              onClick={() => setCurrentIndex(i)}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                i === currentIndex ? 'bg-primary w-8' : 'bg-muted-foreground/30'
              }`}
              aria-label={`Go to testimonial group ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}