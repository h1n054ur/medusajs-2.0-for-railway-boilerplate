import { Badge } from '@/components/ui/badge';
import { Building2 } from 'lucide-react';

const partners = [
  {
    id: 1,
    name: 'TechCorp',
    logo: 'https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=200&h=100&fit=crop',
    category: 'Technology'
  },
  {
    id: 2,
    name: 'InnovateLab',
    logo: 'https://images.unsplash.com/photo-1590479773265-7464e5d48118?w=200&h=100&fit=crop',
    category: 'Innovation'
  },
  {
    id: 3,
    name: 'GlobalTech',
    logo: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=200&h=100&fit=crop',
    category: 'Enterprise'
  },
  {
    id: 4,
    name: 'StartupXYZ',
    logo: 'https://images.unsplash.com/photo-1599305445820-3b5b6b84b8b3?w=200&h=100&fit=crop',
    category: 'Startup'
  },
  {
    id: 5,
    name: 'CreativeStudio',
    logo: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=200&h=100&fit=crop',
    category: 'Design'
  },
  {
    id: 6,
    name: 'DataFlow',
    logo: 'https://images.unsplash.com/photo-1551808525-51a94da548ce?w=200&h=100&fit=crop',
    category: 'Analytics'
  },
  {
    id: 7,
    name: 'CloudBase',
    logo: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=200&h=100&fit=crop',
    category: 'Cloud'
  },
  {
    id: 8,
    name: 'SecureNet',
    logo: 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=200&h=100&fit=crop',
    category: 'Security'
  }
];

export function LogoShowcase() {
  return (
    <section className="py-20 bg-gradient-to-br from-primary/5 to-secondary/5 overflow-hidden">
      <div className="container mx-auto px-4 max-w-6xl">
        {/* Section Header */}
        <div className="text-center mb-16">
          <Badge variant="secondary" className="mb-6 font-semibold">
            <Building2 size={16} className="mr-2" />
            Trusted By
          </Badge>
          
          <h2 className="text-section-title text-foreground mb-4 font-bold">
            Leading Companies 
            <span className="text-gradient"> Choose Us</span>
          </h2>
          
          <p className="text-muted-foreground max-w-2xl mx-auto text-body-large">
            Join thousands of companies that trust our platform to power their business operations.
          </p>
        </div>

        {/* Logo Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
          {partners.map((partner, index) => (
            <div
              key={partner.id}
              className="flex items-center justify-center p-6 bg-background/60 rounded-lg border border-border/50 hover:border-primary/30 transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
            >
              <div className="relative group">
                <img
                  src={partner.logo}
                  alt={partner.name}
                  className="h-12 w-auto object-contain filter grayscale hover:grayscale-0 transition-all duration-300 opacity-60 group-hover:opacity-100"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-secondary/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded"></div>
              </div>
            </div>
          ))}
        </div>

        {/* Marquee Animation */}
        <div className="relative overflow-hidden">
          <div className="flex animate-marquee">
            {[...partners, ...partners].map((partner, index) => (
              <div
                key={`${partner.id}-${index}`}
                className="flex items-center justify-center px-8 py-4 bg-background/40 rounded-lg border border-border/30 mx-2 min-w-[200px]"
              >
                <img
                  src={partner.logo}
                  alt={partner.name}
                  className="h-8 w-auto object-contain filter grayscale opacity-50"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
          <div className="text-center">
            <div className="text-3xl font-bold text-primary mb-2">500+</div>
            <div className="text-sm text-muted-foreground">Companies Trust Us</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-primary mb-2">50+</div>
            <div className="text-sm text-muted-foreground">Countries Worldwide</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-primary mb-2">99.9%</div>
            <div className="text-sm text-muted-foreground">Uptime Guarantee</div>
          </div>
        </div>
      </div>
    </section>
  );
}