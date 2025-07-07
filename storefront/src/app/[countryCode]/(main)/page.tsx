import { Metadata } from "next"

import { HeroSection } from "@/components/hero-section"
import { FeaturesSection } from "@/components/features-section"
import { StatsSection } from "@/components/stats-section"
import { ProductSection } from "@/components/product-section"
import { TestimonialsCarousel } from "@/components/testimonials-carousel"
import { PricingSection } from "@/components/pricing-section"
import { TeamSection } from "@/components/team-section"
import { TimelineSection } from "@/components/timeline-section"
import { BlogSection } from "@/components/blog-section"
import { LogoShowcase } from "@/components/logo-showcase"
import { FaqSection } from "@/components/faq-section"
import { NewsletterSection } from "@/components/newsletter-section"
import { ContactSection } from "@/components/contact-section"
import FeaturedProducts from "@modules/home/components/featured-products"
import { getCollectionsWithProducts } from "@lib/data/collections"
import { getRegion } from "@lib/data/regions"
import { getProductsList } from "@lib/data/products"

export const metadata: Metadata = {
  title: "Premium E-Commerce Store | Modern Shopping Experience",
  description: "Discover our curated collection of premium products with modern design and seamless shopping experience.",
}

export default async function Home({
  params: { countryCode },
}: {
  params: { countryCode: string }
}) {
  const collections = await getCollectionsWithProducts(countryCode)
  const region = await getRegion(countryCode)
  
  // Get featured products for the showcase
  const featuredProductsResponse = await getProductsList({
    pageParam: 0,
    limit: 6,
    countryCode,
  }).catch(() => ({ response: { products: [] } }))
  
  const featuredProducts = featuredProductsResponse.response?.products || []

  if (!collections || !region) {
    return null
  }

  return (
    <div className="min-h-screen">
      <HeroSection countryCode={countryCode} />
      <FeaturesSection />
      <StatsSection />
      <ProductSection />
      <div className="py-12">
        <FeaturedProducts collections={collections} region={region} />
      </div>
      <TestimonialsCarousel />
      <PricingSection />
      <TeamSection />
      <TimelineSection />
      <BlogSection />
      <LogoShowcase />
      <FaqSection />
      <NewsletterSection />
      <ContactSection />
    </div>
  )
}
