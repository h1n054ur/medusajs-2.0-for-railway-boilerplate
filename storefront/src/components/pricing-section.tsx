import { motion } from 'framer-motion';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Check, Crown, Zap, Star } from 'lucide-react';

const pricingPlans = [
  {
    id: 'starter',
    name: 'Starter',
    price: 9,
    period: 'month',
    description: 'Perfect for individuals and small projects',
    icon: Zap,
    features: [
      'Up to 5 projects',
      '10GB storage',
      'Email support',
      'Basic analytics',
      'Mobile app access',
      'Community forum'
    ],
    buttonText: 'Start Free Trial',
    buttonVariant: 'outline' as const,
    popular: false
  },
  {
    id: 'professional',
    name: 'Professional',
    price: 29,
    period: 'month',
    description: 'Best for growing businesses and teams',
    icon: Crown,
    features: [
      'Unlimited projects',
      '100GB storage',
      'Priority support',
      'Advanced analytics',
      'Team collaboration',
      'Custom integrations',
      'API access',
      'White-label options'
    ],
    buttonText: 'Get Started',
    buttonVariant: 'default' as const,
    popular: true
  },
  {
    id: 'enterprise',
    name: 'Enterprise',
    price: 99,
    period: 'month',
    description: 'Advanced features for large organizations',
    icon: Star,
    features: [
      'Everything in Professional',
      'Unlimited storage',
      'Dedicated support',
      'Custom analytics',
      'SSO integration',
      'Advanced security',
      'Custom contracts',
      'Dedicated account manager'
    ],
    buttonText: 'Contact Sales',
    buttonVariant: 'outline' as const,
    popular: false
  }
];

export function PricingSection() {
  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4 max-w-7xl">
        {/* Section Header */}
        <div className="text-center mb-16">
          <Badge variant="secondary" className="mb-6 font-semibold">
            <Crown size={16} className="mr-2" />
            Pricing
          </Badge>
          
          <h2 className="text-section-title text-foreground mb-4 font-bold">
            Choose Your 
            <span className="text-gradient"> Perfect Plan</span>
          </h2>
          
          <p className="text-muted-foreground max-w-2xl mx-auto text-body-large">
            Flexible pricing options designed to grow with your business. Start free, upgrade when you need more.
          </p>
        </div>

        {/* Pricing Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {pricingPlans.map((plan, index) => (
            <motion.div
              key={plan.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="relative"
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 z-10">
                  <Badge className="bg-primary text-primary-foreground font-semibold px-4 py-1">
                    Most Popular
                  </Badge>
                </div>
              )}
              
              <Card className={`hover-lift h-full relative ${
                plan.popular 
                  ? 'border-primary shadow-lg scale-105' 
                  : 'border-border'
              }`}>
                <CardHeader className="text-center pb-4">
                  <div className="mb-4 flex justify-center">
                    <div className={`p-3 rounded-full ${
                      plan.popular 
                        ? 'bg-primary text-primary-foreground' 
                        : 'bg-primary/10 text-primary'
                    }`}>
                      <plan.icon size={32} />
                    </div>
                  </div>
                  
                  <h3 className="text-xl font-bold text-foreground mb-2">
                    {plan.name}
                  </h3>
                  
                  <div className="mb-4">
                    <span className="text-4xl font-bold text-foreground">
                      ${plan.price}
                    </span>
                    <span className="text-muted-foreground ml-1">
                      /{plan.period}
                    </span>
                  </div>
                  
                  <p className="text-sm text-muted-foreground">
                    {plan.description}
                  </p>
                </CardHeader>
                
                <CardContent className="pt-0">
                  <Button 
                    variant={plan.buttonVariant}
                    className="w-full mb-6 h-11 font-semibold"
                    size="lg"
                  >
                    {plan.buttonText}
                  </Button>
                  
                  <ul className="space-y-3">
                    {plan.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center gap-3">
                        <div className="flex-shrink-0">
                          <div className="w-5 h-5 rounded-full bg-green-100 flex items-center justify-center">
                            <Check size={12} className="text-green-600" />
                          </div>
                        </div>
                        <span className="text-sm text-muted-foreground">
                          {feature}
                        </span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Additional Info */}
        <div className="mt-16 text-center">
          <p className="text-muted-foreground mb-4">
            All plans include a 14-day free trial. No credit card required.
          </p>
          <div className="flex flex-wrap justify-center gap-6 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <Check size={16} className="text-green-600" />
              <span>No setup fees</span>
            </div>
            <div className="flex items-center gap-2">
              <Check size={16} className="text-green-600" />
              <span>Cancel anytime</span>
            </div>
            <div className="flex items-center gap-2">
              <Check size={16} className="text-green-600" />
              <span>24/7 support</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}