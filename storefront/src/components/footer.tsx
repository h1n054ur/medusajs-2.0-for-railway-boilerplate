import { Link } from 'wouter';
import { Package, Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';
import { Button } from '@/components/ui/button';

const footerSections = [
  {
    title: 'Products',
    links: [
      { label: 'Home & Living', href: '/category/home-living' },
      { label: 'Kitchen & Dining', href: '/category/kitchen-dining' },
      { label: 'Beauty & Wellness', href: '/category/beauty-wellness' },
      { label: 'Electronics', href: '/category/electronics' },
      { label: 'Fashion', href: '/category/fashion' },
    ],
  },
  {
    title: 'Company',
    links: [
      { label: 'About Us', href: '/about' },
      { label: 'Our Story', href: '/story' },
      { label: 'Careers', href: '/careers' },
      { label: 'Press', href: '/press' },
      { label: 'Contact', href: '/contact' },
    ],
  },
  {
    title: 'Support',
    links: [
      { label: 'Help Center', href: '/help' },
      { label: 'Shipping Info', href: '/shipping' },
      { label: 'Returns', href: '/returns' },
      { label: 'Size Guide', href: '/size-guide' },
      { label: 'Track Order', href: '/track' },
    ],
  },
];

const socialLinks = [
  { icon: Facebook, href: '#', label: 'Facebook' },
  { icon: Twitter, href: '#', label: 'Twitter' },
  { icon: Instagram, href: '#', label: 'Instagram' },
  { icon: Linkedin, href: '#', label: 'LinkedIn' },
];

const legalLinks = [
  { label: 'Privacy Policy', href: '/privacy' },
  { label: 'Terms of Service', href: '/terms' },
  { label: 'Cookie Policy', href: '/cookies' },
];

export function Footer() {
  return (
    <footer className="bg-card border-t border-border py-16">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* Brand Section */}
          <div className="md:col-span-1">
            <div className="mb-6">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 bg-primary rounded-md flex items-center justify-center">
                  <Package size={20} className="text-primary-foreground" />
                </div>
                <h3 className="text-lg font-bold text-foreground">
                  ModernCommerce
                </h3>
              </div>
              
              <p className="text-muted-foreground mb-6 leading-relaxed">
                Curating premium products for modern lifestyles with exceptional quality and design.
              </p>
              
              <div className="flex gap-2">
                {socialLinks.map((social) => (
                  <Button
                    key={social.label}
                    variant="ghost"
                    size="sm"
                    asChild
                    className="text-muted-foreground hover:text-primary"
                  >
                    <a href={social.href} aria-label={social.label}>
                      <social.icon size={20} />
                    </a>
                  </Button>
                ))}
              </div>
            </div>
          </div>

          {/* Footer Links */}
          {footerSections.map((section) => (
            <div key={section.title} className="md:col-span-1">
              <h4 className="font-semibold text-foreground mb-4">
                {section.title}
              </h4>
              
              <ul className="space-y-2">
                {section.links.map((link) => (
                  <li key={link.href}>
                    <Link href={link.href}>
                      <span className="text-muted-foreground text-sm hover:text-primary transition-colors cursor-pointer">
                        {link.label}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Footer Bottom */}
        <div className="border-t border-border mt-12 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-muted-foreground text-sm">
            © 2024 ModernCommerce. All rights reserved.
          </p>
          
          <div className="flex gap-6">
            {legalLinks.map((link) => (
              <Link key={link.href} href={link.href}>
                <span className="text-muted-foreground text-sm hover:text-primary transition-colors cursor-pointer">
                  {link.label}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}