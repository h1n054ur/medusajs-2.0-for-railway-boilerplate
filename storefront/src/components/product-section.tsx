import { motion } from 'framer-motion';
import { ArrowRight, Sparkles } from 'lucide-react';
import { ProductCard } from './product-card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

const featuredProducts = [
  {
    id: '1',
    name: 'Premium Ceramic Planter',
    description: 'Handcrafted ceramic planter perfect for indoor plants',
    price: '$49.99',
    image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=200&h=150',
    alt: 'Elegant ceramic vase with green plant',
  },
  {
    id: '2',
    name: 'Artisan Candle Set',
    description: 'Hand-poured soy candles with natural fragrances',
    price: '$34.99',
    image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=200&h=150',
    alt: 'Modern minimalist candle set',
  },
  {
    id: '3',
    name: 'Designer Coffee Mug',
    description: 'Premium ceramic mug with unique artistic pattern',
    price: '$24.99',
    image: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=200&h=150',
    alt: 'Premium ceramic coffee mug with artistic design',
  },
  {
    id: '4',
    name: 'Natural Skincare Set',
    description: 'Organic skincare collection with botanical extracts',
    price: '$79.99',
    image: 'https://images.unsplash.com/photo-1570194065650-d99fb4bedf0a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=200&h=150',
    alt: 'Natural skincare products with botanical ingredients',
  },
  {
    id: '5',
    name: 'Wireless Headphones',
    description: 'Premium audio quality with noise cancellation',
    price: '$149.99',
    image: 'https://images.unsplash.com/photo-1606220945770-b5b6c2c55bf1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=200&h=150',
    alt: 'Sleek wireless headphones with modern design',
  },
  {
    id: '6',
    name: 'Artisan Jewelry',
    description: 'Handcrafted jewelry with precious stones',
    price: '$89.99',
    image: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=200&h=150',
    alt: 'Elegant handmade jewelry pieces',
  },
  {
    id: '7',
    name: 'Organic Cotton Throw',
    description: 'Soft, sustainable throw blanket for home comfort',
    price: '$64.99',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=200&h=150',
    alt: 'Luxurious organic cotton throw blanket',
  },
  {
    id: '8',
    name: 'Chef\'s Knife Set',
    description: 'Professional-grade kitchen knives for culinary enthusiasts',
    price: '$199.99',
    image: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=200&h=150',
    alt: 'Professional chef\'s knife set with wooden handles',
  },
];

export function ProductSection() {
  const handleViewAll = () => {
    // TODO: Navigate to products page
    console.log('Navigate to all products');
  };

  return (
    <div className="py-20 bg-background">
      <div className="container mx-auto px-4 max-w-7xl">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="text-center mb-16">
            <Badge variant="secondary" className="mb-6 font-semibold">
              <Sparkles size={16} className="mr-2" />
              Our Products
            </Badge>
            
            <h2 className="text-section-title text-foreground mb-4 font-bold">
              Handcrafted with{' '}
              <span className="text-shimmer inline-block ml-2">
                Love
              </span>
            </h2>
            
            <p className="text-muted-foreground max-w-2xl mx-auto text-body-large">
              Each product is carefully selected and crafted to bring you the finest 
              natural ingredients for your wellness journey.
            </p>
          </div>
        </motion.div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-12">
          {featuredProducts.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <ProductCard product={product} />
            </motion.div>
          ))}
        </div>

        {/* View All Button */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          <div className="text-center">
            <Button
              variant="outline"
              size="lg"
              onClick={handleViewAll}
              className="px-8 py-3 text-base font-semibold rounded-lg border-border text-foreground hover:border-primary hover:bg-primary hover:text-primary-foreground hover:-translate-y-1 transition-all duration-200 ease-in-out"
            >
              View All Products
              <ArrowRight size={16} className="ml-2" />
            </Button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}