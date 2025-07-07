import { useState } from 'react';
import { motion } from 'framer-motion';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Mail, CheckCircle, AlertCircle } from 'lucide-react';

export function NewsletterSection() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email) {
      setStatus('error');
      setMessage('Please enter your email address');
      return;
    }

    if (!email.includes('@')) {
      setStatus('error');
      setMessage('Please enter a valid email address');
      return;
    }

    setStatus('loading');
    
    // Simulate API call
    setTimeout(() => {
      setStatus('success');
      setMessage('Thank you for subscribing! Check your email for confirmation.');
      setEmail('');
    }, 2000);
  };

  return (
    <section className="py-20 bg-gradient-to-br from-primary/5 to-secondary/5">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="text-center mb-12">
          <Badge variant="secondary" className="mb-6 font-semibold">
            <Mail size={16} className="mr-2" />
            Newsletter
          </Badge>
          
          <h2 className="text-section-title text-foreground mb-4 font-bold">
            Stay Updated with 
            <span className="text-gradient"> Our Latest</span>
          </h2>
          
          <p className="text-muted-foreground max-w-2xl mx-auto text-body-large">
            Subscribe to our newsletter and be the first to know about new features, updates, and exclusive offers.
          </p>
        </div>

        <Card className="max-w-2xl mx-auto">
          <CardContent className="p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex-1">
                  <Input
                    type="email"
                    placeholder="Enter your email address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    disabled={status === 'loading'}
                    className="h-12 text-base"
                  />
                </div>
                <Button
                  type="submit"
                  size="lg"
                  disabled={status === 'loading'}
                  className="h-12 px-8 font-semibold"
                >
                  {status === 'loading' ? (
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                      className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                    />
                  ) : (
                    <>
                      <Mail size={20} className="mr-2" />
                      Subscribe
                    </>
                  )}
                </Button>
              </div>

              {/* Status Message */}
              {message && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex items-center gap-2 p-3 rounded-md ${
                    status === 'success' 
                      ? 'bg-green-50 text-green-700 border border-green-200' 
                      : 'bg-red-50 text-red-700 border border-red-200'
                  }`}
                >
                  {status === 'success' ? (
                    <CheckCircle size={18} />
                  ) : (
                    <AlertCircle size={18} />
                  )}
                  <span className="text-sm font-medium">{message}</span>
                </motion.div>
              )}

              {/* Privacy Notice */}
              <div className="text-center">
                <p className="text-xs text-muted-foreground">
                  By subscribing, you agree to our{' '}
                  <a href="#privacy" className="text-primary hover:underline">
                    Privacy Policy
                  </a>{' '}
                  and consent to receive updates from our team.
                </p>
              </div>
            </form>

            {/* Benefits */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-8 pt-6 border-t border-border">
              <div className="text-center">
                <div className="text-2xl mb-2">🚀</div>
                <p className="text-sm font-medium text-foreground">New Features</p>
                <p className="text-xs text-muted-foreground">Latest updates first</p>
              </div>
              <div className="text-center">
                <div className="text-2xl mb-2">💡</div>
                <p className="text-sm font-medium text-foreground">Pro Tips</p>
                <p className="text-xs text-muted-foreground">Expert insights</p>
              </div>
              <div className="text-center">
                <div className="text-2xl mb-2">🎁</div>
                <p className="text-sm font-medium text-foreground">Exclusive Offers</p>
                <p className="text-xs text-muted-foreground">Subscriber only deals</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}