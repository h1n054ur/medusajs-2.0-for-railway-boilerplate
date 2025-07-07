import { Badge } from '@/components/ui/badge';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { HelpCircle } from 'lucide-react';

const faqs = [
  {
    id: '1',
    question: 'How do I get started with your platform?',
    answer: 'Getting started is easy! Simply sign up for a free account, complete the onboarding process, and you\'ll have access to all our basic features. Our setup wizard will guide you through the initial configuration in just a few minutes.'
  },
  {
    id: '2',
    question: 'What payment methods do you accept?',
    answer: 'We accept all major credit cards (Visa, MasterCard, American Express), PayPal, bank transfers, and digital wallets like Apple Pay and Google Pay. All payments are processed securely through our encrypted payment gateway.'
  },
  {
    id: '3',
    question: 'Can I cancel my subscription anytime?',
    answer: 'Yes, you can cancel your subscription at any time with no cancellation fees. Your account will remain active until the end of your current billing period, and you\'ll continue to have access to all features during that time.'
  },
  {
    id: '4',
    question: 'Do you offer customer support?',
    answer: 'We provide 24/7 customer support through multiple channels including live chat, email, and phone. Our premium users also get access to priority support with faster response times and dedicated account managers.'
  },
  {
    id: '5',
    question: 'Is my data secure and private?',
    answer: 'Absolutely. We use enterprise-grade encryption, regular security audits, and comply with GDPR, CCPA, and other privacy regulations. Your data is stored in secure data centers with multiple backups and redundancies.'
  },
  {
    id: '6',
    question: 'Can I upgrade or downgrade my plan?',
    answer: 'Yes, you can change your plan at any time. Upgrades take effect immediately, while downgrades will take effect at the start of your next billing cycle. We\'ll prorate any charges or credits accordingly.'
  },
  {
    id: '7',
    question: 'Do you offer integrations with other tools?',
    answer: 'We offer integrations with over 100 popular tools including CRM systems, email marketing platforms, analytics tools, and more. We also provide a robust API for custom integrations.'
  },
  {
    id: '8',
    question: 'What happens if I exceed my usage limits?',
    answer: 'We\'ll notify you when you\'re approaching your limits. You can either upgrade your plan or purchase additional usage credits. We won\'t interrupt your service without prior notice and options to resolve the situation.'
  }
];

export function FaqSection() {
  return (
    <section className="py-20 bg-muted/30">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Section Header */}
        <div className="text-center mb-16">
          <Badge variant="secondary" className="mb-6 font-semibold">
            <HelpCircle size={16} className="mr-2" />
            FAQ
          </Badge>
          
          <h2 className="text-section-title text-foreground mb-4 font-bold">
            Frequently Asked 
            <span className="text-gradient"> Questions</span>
          </h2>
          
          <p className="text-muted-foreground max-w-2xl mx-auto text-body-large">
            Find answers to common questions about our platform, features, and services.
          </p>
        </div>

        {/* FAQ Accordion */}
        <Accordion type="single" collapsible className="w-full">
          {faqs.map((faq) => (
            <AccordionItem key={faq.id} value={faq.id} className="border-border">
              <AccordionTrigger className="text-left hover:no-underline py-6">
                <span className="font-semibold text-foreground pr-4">
                  {faq.question}
                </span>
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground pb-6 leading-relaxed">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
        
        {/* Contact CTA */}
        <div className="text-center mt-12">
          <p className="text-muted-foreground mb-4">
            Still have questions? We're here to help!
          </p>
          <a 
            href="#contact" 
            className="text-primary hover:text-primary/80 font-semibold transition-colors"
          >
            Contact our support team →
          </a>
        </div>
      </div>
    </section>
  );
}