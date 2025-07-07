import { Metadata } from "next"

import { HeroSection } from "@/components/hero-section"
import { FeaturesSection } from "@/components/features-section"
import { StatsSection } from "@/components/sections/stats-section"
import { ProductShowcase } from "@/components/sections/product-showcase"
import { NewsletterSection } from "@/components/newsletter-section"
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
      <ProductShowcase 
        featuredProducts={featuredProducts} 
        countryCode={countryCode} 
        region={region}
      />
      <div className="py-12">
        <FeaturedProducts collections={collections} region={region} />
      </div>
      <NewsletterSection />
    </div>
  )
}
