"use client"

import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ShimmerButton } from '@/components/magicui/shimmer-button';
import { BorderBeam } from '@/components/magicui/border-beam';
import { Star, ShoppingCart, Heart } from 'lucide-react';
import { HttpTypes } from "@medusajs/types";
import Link from 'next/link';
import Image from 'next/image';

interface ProductShowcaseProps {
  featuredProducts?: HttpTypes.StoreProduct[];
  countryCode: string;
  region: HttpTypes.StoreRegion;
}

export function ProductShowcase({ featuredProducts = [], countryCode, region }: ProductShowcaseProps) {
  // Fallback products if no real products provided
  const fallbackProducts = [
    {
      id: "1",
      title: "Premium Headphones",
      description: "High-quality wireless headphones with noise cancellation",
      thumbnail: "https://via.placeholder.com/300x300",
      handle: "premium-headphones",
      variants: [{ calculated_price: { calculated_amount: 299 } }]
    },
    {
      id: "2", 
      title: "Smart Watch",
      description: "Advanced fitness tracking and smart notifications",
      thumbnail: "https://via.placeholder.com/300x300",
      handle: "smart-watch",
      variants: [{ calculated_price: { calculated_amount: 199 } }]
    },
    {
      id: "3",
      title: "Wireless Speaker", 
      description: "Portable speaker with crystal clear sound quality",
      thumbnail: "https://via.placeholder.com/300x300",
      handle: "wireless-speaker",
      variants: [{ calculated_price: { calculated_amount: 129 } }]
    }
  ];

  const displayProducts = featuredProducts.length > 0 ? featuredProducts.slice(0, 6) : fallbackProducts;

  return (
    <section className="py-24">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <Badge variant="outline" className="mb-4">
            Our Products
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Discover Our Collection
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Explore our carefully curated selection of premium products 
            across various categories.
          </p>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {displayProducts.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="group hover:shadow-lg transition-all duration-300 relative overflow-hidden">
                <BorderBeam size={100} duration={8} delay={index * 2} />
                
                <CardHeader className="p-0">
                  <div className="relative">
                    <Image
                      src={product.thumbnail || "https://via.placeholder.com/300x300"}
                      alt={product.title || "Product"}
                      width={300}
                      height={300}
                      className="w-full h-64 object-cover rounded-t-lg group-hover:scale-105 transition-transform duration-300"
                    />
                    {index === 0 && (
                      <Badge className="absolute top-3 left-3">
                        Featured
                      </Badge>
                    )}
                    <Button
                      size="icon"
                      variant="outline"
                      className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <Heart className="w-4 h-4" />
                    </Button>
                  </div>
                </CardHeader>

                <CardContent className="p-6">
                  <div className="flex items-center gap-1 mb-2">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-4 h-4 ${
                          i < 4
                            ? "fill-yellow-400 text-yellow-400"
                            : "text-gray-300"
                        }`}
                      />
                    ))}
                    <span className="text-sm text-muted-foreground ml-1">
                      (4.8)
                    </span>
                  </div>

                  <CardTitle className="text-lg mb-2 line-clamp-1">
                    {product.title}
                  </CardTitle>
                  <CardDescription className="mb-4 line-clamp-2">
                    {product.description}
                  </CardDescription>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="text-2xl font-bold text-primary">
                        ${product.variants?.[0]?.calculated_price?.calculated_amount / 100 || 99}
                      </span>
                    </div>
                    <Link href={`/${countryCode}/products/${product.handle}`}>
                      <ShimmerButton className="px-4 py-2">
                        <ShoppingCart className="w-4 h-4 mr-2" />
                        View Product
                      </ShimmerButton>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* View All Products CTA */}
        <div className="text-center">
          <Link href={`/${countryCode}/store`}>
            <Button size="lg" variant="outline" className="px-8 py-3">
              View All Products
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}