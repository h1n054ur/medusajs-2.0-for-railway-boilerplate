import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

interface ProductCardProps {
  product: {
    id: string;
    name: string;
    description: string;
    price: string;
    image: string;
    alt: string;
  };
}

export function ProductCard({ product }: ProductCardProps) {
  const handleAddToCart = () => {
    // TODO: Implement add to cart functionality
    console.log('Add to cart:', product.id);
  };

  return (
    <Card className="hover-lift">
      <CardContent className="p-6 text-center">
        {/* Product Image */}
        <div className="h-32 flex items-center justify-center mb-6">
          <img
            src={product.image}
            alt={product.alt}
            className="max-w-full max-h-full object-contain rounded-lg"
          />
        </div>

        {/* Product Info */}
        <h3 className="text-card-title text-foreground mb-2">
          {product.name}
        </h3>
        
        <p className="text-muted-foreground mb-6 text-sm">
          {product.description}
        </p>

        {/* Price and Action */}
        <div className="flex items-center justify-between">
          <span className="font-semibold text-foreground">
            {product.price}
          </span>
          
          <Button
            size="sm"
            onClick={handleAddToCart}
            className="px-4 py-2 text-sm font-medium"
          >
            Add to Cart
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}