import { useState } from 'react';
import { Link, useLocation } from 'wouter';
import { motion } from 'framer-motion';
import { 
  Package, 
  Search, 
  ShoppingCart, 
  User, 
  Menu as MenuIcon,
  X,
  Sun,
  Moon
} from 'lucide-react';
import { AnimatedText } from './animated-text';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { useTheme } from './theme-provider';

const navigationItems = [
  { label: 'Home', href: '/' },
  { label: 'Products', href: '/products' },
  { label: 'About', href: '/about' },
  { label: 'Contact', href: '/contact' },
];

export function Header() {
  const [location, setLocation] = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const { theme, setTheme } = useTheme();

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
    // TODO: Implement search functionality
  };

  return (
    <>
      <header className="nav-header glass-effect sticky top-0 z-50 border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="flex items-center gap-2">
                <motion.div
                  whileHover={{ rotate: 180 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="w-8 h-8 bg-primary rounded-md flex items-center justify-center">
                    <Package size={20} className="text-primary-foreground" />
                  </div>
                </motion.div>
                <h1 className="text-xl font-bold text-foreground">
                  <AnimatedText variant="gradient">Zesty</AnimatedText>
                </h1>
              </div>
            </motion.div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
              {navigationItems.map((item) => (
                <Button
                  key={item.href}
                  variant="ghost"
                  asChild
                  className={`font-medium transition-colors ${
                    location === item.href 
                      ? 'text-primary' 
                      : 'text-muted-foreground hover:text-primary'
                  }`}
                >
                  <Link href={item.href}>{item.label}</Link>
                </Button>
              ))}
            </nav>

            {/* Actions */}
            <div className="flex items-center gap-2">
              {/* Desktop Search */}
              <div className="hidden md:flex items-center">
                <div className="relative">
                  <Search size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
                  <Input
                    placeholder="Search products..."
                    value={searchQuery}
                    onChange={handleSearchChange}
                    className="w-72 pl-10 bg-background/50 border-border/40 focus:border-primary"
                  />
                </div>
              </div>
              
              <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground">
                <ShoppingCart size={20} />
              </Button>
              
              <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground">
                <User size={20} />
              </Button>

              {/* Theme Toggle */}
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
                className="text-muted-foreground hover:text-foreground"
              >
                {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
              </Button>

              {/* Mobile Menu */}
              <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
                <SheetTrigger asChild>
                  <Button variant="ghost" size="sm" className="md:hidden text-muted-foreground hover:text-foreground">
                    <MenuIcon size={20} />
                  </Button>
                </SheetTrigger>
                <SheetContent side="right" className="w-64">
                  <div className="flex flex-col space-y-4 mt-8">
                    {navigationItems.map((item) => (
                      <Button
                        key={item.href}
                        variant="ghost"
                        asChild
                        className={`justify-start font-medium transition-colors ${
                          location === item.href 
                            ? 'text-primary bg-primary/10' 
                            : 'text-muted-foreground hover:text-foreground'
                        }`}
                        onClick={() => setMobileOpen(false)}
                      >
                        <Link href={item.href}>{item.label}</Link>
                      </Button>
                    ))}
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>
      </header>
    </>
  );
}