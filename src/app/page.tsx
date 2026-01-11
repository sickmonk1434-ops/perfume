import { Button } from "@/components/ui/button";
import { ShoppingBag, ArrowRight, Star } from "lucide-react";
import Image from "next/image";
import { getProducts } from "@/lib/actions"; // Import server action
import Link from "next/link"; // Use Link
import { AddToCartButton } from "@/components/cart/add-to-cart-button";

export default async function Home() {
  const products = await getProducts(); // Fetch real data

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[80vh] flex items-center justify-center overflow-hidden">
        {/* Abstract Background - In real app, use a high quality video or image */}
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-black to-gray-900 z-0">
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1615634260167-c8cdede054de?q=80')] bg-cover bg-center opacity-30 mix-blend-overlay"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] to-transparent"></div>
        </div>

        <div className="relative z-10 container px-6 text-center space-y-6 max-w-4xl mx-auto">
          <div className="inline-block px-3 py-1 border border-[#D4AF37]/30 rounded-full bg-[#D4AF37]/10 backdrop-blur-sm mb-4">
            <span className="text-[#D4AF37] text-sm font-semibold tracking-wide uppercase">Launch Offer • 0% Alcohol</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-bold font-heading text-white tracking-tight leading-tight">
            Discover Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#D4AF37] to-[#F3E5AB]">Signature Scent</span>
          </h1>
          <p className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto font-light">
            Luxury fragrances crafted for the sophisticated. Experience premium scents starting at an exclusive launch price.
          </p>
          <div className="pt-4 flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button size="lg" className="bg-[#D4AF37] text-black hover:bg-[#F3E5AB] font-semibold text-base min-w-[200px]">
              Shop Collection <ShoppingBag className="ml-2 w-4 h-4" />
            </Button>
            <Link href="/track">
              <Button variant="outline" size="lg" className="border-[#D4AF37]/50 text-[#D4AF37] hover:bg-[#D4AF37]/10 min-w-[200px]">
                Track Order <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-24 container px-6 mx-auto">
        <div className="text-center mb-16 space-y-2">
          <h2 className="text-3xl md:text-4xl font-heading font-bold">Exquisite Collection</h2>
          <div className="w-24 h-1 bg-[#D4AF37] mx-auto rounded-full"></div>
          <p className="text-gray-400">Handpicked essences from around the world.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {products.map((product) => (
            <div key={product.id} className="group relative bg-white/5 border border-white/10 rounded-xl overflow-hidden hover:border-[#D4AF37]/50 transition-all duration-300 hover:shadow-[0_0_30px_rgba(212,175,55,0.15)]">
              {/* Product Image */}
              <div className="aspect-[3/4] relative overflow-hidden bg-gray-800">
                <Image
                  src={product.image_url}
                  alt={product.name}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-3 right-3 bg-black/70 backdrop-blur-md text-white text-xs px-2 py-1 rounded border border-white/20">
                  {product.stock < 10 ? 'Low Stock' : 'In Stock'}
                </div>
                <div className="absolute top-3 left-3 bg-[#D4AF37]/90 backdrop-blur-md text-black font-bold text-[10px] px-2 py-1 rounded">
                  ALCOHOL FREE
                </div>
              </div>

              {/* Content */}
              <div className="p-6 space-y-3">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-lg font-bold font-heading text-white">{product.name}</h3>
                    <div className="flex items-center gap-1 text-[#D4AF37] text-xs">
                      <Star className="w-3 h-3 fill-current" />
                      <Star className="w-3 h-3 fill-current" />
                      <Star className="w-3 h-3 fill-current" />
                      <Star className="w-3 h-3 fill-current" />
                      <Star className="w-3 h-3 fill-current" />
                    </div>
                  </div>
                </div>

                <p className="text-sm text-gray-400 line-clamp-2 min-h-[40px]">
                  {product.description}
                </p>

                <div className="pt-2 flex items-center justify-between">
                  <div className="flex flex-col">
                    <span className="text-xs text-gray-500 line-through">₹{product.price}</span>
                    <span className="text-xl font-bold text-[#D4AF37]">₹{product.sale_price}</span>
                  </div>
                  <AddToCartButton product={product} />
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Banner / Trust Section */}
      <section className="py-20 bg-white/5 border-y border-white/10">
        <div className="container px-6 mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          <div className="space-y-2">
            <h3 className="text-[#D4AF37] font-heading font-bold text-xl">0% Alcohol Formula</h3>
            <p className="text-gray-400 text-sm">Pure fragrance oils that are gentle on skin and long-lasting.</p>
          </div>
          <div className="space-y-2">
            <h3 className="text-[#D4AF37] font-heading font-bold text-xl">Fast Shipping</h3>
            <p className="text-gray-400 text-sm">Express delivery across India within 3-5 days.</p>
          </div>
          <div className="space-y-2">
            <h3 className="text-[#D4AF37] font-heading font-bold text-xl">Secure Payment</h3>
            <p className="text-gray-400 text-sm">100% secure payment processing for peace of mind.</p>
          </div>
        </div>
      </section>
    </div>
  );
}
