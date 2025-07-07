import { motion } from 'framer-motion';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Calendar, Clock, ArrowRight, BookOpen } from 'lucide-react';

const blogPosts = [
  {
    id: 1,
    title: 'The Future of Web Development: Trends to Watch in 2024',
    excerpt: 'Explore the latest trends shaping the web development landscape, from AI integration to advanced frameworks.',
    author: 'Sarah Johnson',
    date: '2024-01-15',
    readTime: 8,
    category: 'Technology',
    image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=400&h=240&fit=crop',
    tags: ['Web Development', 'AI', 'Trends']
  },
  {
    id: 2,
    title: 'Building Scalable Applications with Modern Architecture',
    excerpt: 'Learn how to design and build applications that can grow with your business needs and handle increasing traffic.',
    author: 'Michael Chen',
    date: '2024-01-12',
    readTime: 12,
    category: 'Architecture',
    image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=400&h=240&fit=crop',
    tags: ['Architecture', 'Scalability', 'Performance']
  },
  {
    id: 3,
    title: 'UX Design Principles That Drive User Engagement',
    excerpt: 'Discover the key design principles that create meaningful user experiences and drive engagement.',
    author: 'Emily Rodriguez',
    date: '2024-01-10',
    readTime: 6,
    category: 'Design',
    image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=400&h=240&fit=crop',
    tags: ['UX Design', 'User Engagement', 'Interface']
  },
  {
    id: 4,
    title: 'DevOps Best Practices for Modern Development Teams',
    excerpt: 'Essential DevOps practices that streamline development workflows and improve deployment reliability.',
    author: 'Alex Thompson',
    date: '2024-01-08',
    readTime: 10,
    category: 'DevOps',
    image: 'https://images.unsplash.com/photo-1618401471353-b98afee0b2eb?w=400&h=240&fit=crop',
    tags: ['DevOps', 'CI/CD', 'Automation']
  },
  {
    id: 5,
    title: 'Product Management: From Idea to Market Success',
    excerpt: 'A comprehensive guide to product management strategies that turn innovative ideas into market-winning products.',
    author: 'Jessica Taylor',
    date: '2024-01-05',
    readTime: 9,
    category: 'Product',
    image: 'https://images.unsplash.com/photo-1552581234-26160f608093?w=400&h=240&fit=crop',
    tags: ['Product Management', 'Strategy', 'Innovation']
  },
  {
    id: 6,
    title: 'Security First: Protecting Your Applications',
    excerpt: 'Essential security practices every developer should implement to protect applications and user data.',
    author: 'David Kim',
    date: '2024-01-03',
    readTime: 11,
    category: 'Security',
    image: 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=400&h=240&fit=crop',
    tags: ['Security', 'Data Protection', 'Best Practices']
  }
];

export function BlogSection() {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4 max-w-7xl">
        {/* Section Header */}
        <div className="text-center mb-16">
          <Badge variant="secondary" className="mb-6 font-semibold">
            <BookOpen size={16} className="mr-2" />
            Latest Insights
          </Badge>
          
          <h2 className="text-section-title text-foreground mb-4 font-bold">
            From Our 
            <span className="text-gradient"> Blog</span>
          </h2>
          
          <p className="text-muted-foreground max-w-2xl mx-auto text-body-large">
            Stay updated with the latest insights, tutorials, and industry trends from our team of experts.
          </p>
        </div>

        {/* Blog Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogPosts.map((post, index) => (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="hover-lift h-full overflow-hidden">
                <div className="aspect-video relative overflow-hidden">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                  />
                  <div className="absolute top-4 left-4">
                    <Badge variant="secondary" className="text-xs">
                      {post.category}
                    </Badge>
                  </div>
                </div>
                
                <CardContent className="p-6">
                  <div className="flex items-center gap-4 text-xs text-muted-foreground mb-3">
                    <div className="flex items-center gap-1">
                      <Calendar size={14} />
                      <span>{formatDate(post.date)}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock size={14} />
                      <span>{post.readTime} min read</span>
                    </div>
                  </div>
                  
                  <h3 className="font-semibold text-foreground mb-2 line-clamp-2 leading-tight">
                    {post.title}
                  </h3>
                  
                  <p className="text-muted-foreground text-sm mb-4 line-clamp-3 leading-relaxed">
                    {post.excerpt}
                  </p>
                  
                  <div className="flex flex-wrap gap-2 mb-4">
                    {post.tags.slice(0, 2).map((tag, tagIndex) => (
                      <Badge key={tagIndex} variant="outline" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">
                      By {post.author}
                    </span>
                    <Button variant="ghost" size="sm" className="group">
                      Read More
                      <ArrowRight size={14} className="ml-1 transition-transform group-hover:translate-x-1" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* View All Button */}
        <div className="text-center mt-12">
          <Button variant="outline" size="lg" className="font-semibold">
            <BookOpen size={20} className="mr-2" />
            View All Articles
          </Button>
        </div>
      </div>
    </section>
  );
}