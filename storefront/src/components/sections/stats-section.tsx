import { NumberTicker } from '@/components/magicui/number-ticker';
import { Card, CardContent } from '@/components/ui/card';
import { Users, ShoppingBag, Star, Globe } from 'lucide-react';

const stats = [
  {
    icon: Users,
    value: 50000,
    label: "Happy Customers",
    suffix: "+"
  },
  {
    icon: ShoppingBag,
    value: 100000,
    label: "Orders Delivered", 
    suffix: "+"
  },
  {
    icon: Star,
    value: 4.9,
    label: "Average Rating",
    suffix: "/5"
  },
  {
    icon: Globe,
    value: 25,
    label: "Countries Served",
    suffix: "+"
  }
];

export function StatsSection() {
  return (
    <section className="py-16 bg-primary/5">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <Card key={index} className="text-center border-0 shadow-none bg-transparent">
              <CardContent className="p-6">
                <div className="w-12 h-12 mx-auto mb-4 bg-primary/10 rounded-full flex items-center justify-center">
                  <stat.icon className="w-6 h-6 text-primary" />
                </div>
                <div className="text-3xl md:text-4xl font-bold text-primary mb-2">
                  <NumberTicker value={stat.value} />
                  {stat.suffix}
                </div>
                <p className="text-muted-foreground">{stat.label}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}