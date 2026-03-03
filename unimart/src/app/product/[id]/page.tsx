// src/app/product/[id]/page.tsx
'use client';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Heart, ShoppingCart, MessageCircle, Share2, ArrowLeft,
  Star, Eye, MapPin, Clock, Shield, ChevronLeft, ChevronRight,
  Phone, Tag, Package, CheckCircle
} from 'lucide-react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import ProductCard from '@/components/marketplace/ProductCard';
import { MOCK_PRODUCTS, getProductById, formatPrice } from '@/lib/products';
import { useStore } from '@/lib/store';
import { timeAgo, cn } from '@/lib/utils';
import { Product } from '@/types';

export default function ProductPage({ params }: { params: { id: string } }) {
  const [product, setProduct] = useState<Product | null>(null);
  const [currentImage, setCurrentImage] = useState(0);
  const [cartAdded, setCartAdded] = useState(false);
  const [contactOpen, setContactOpen] = useState(false);
  const { addToCart, toggleWishlist, isWishlisted } = useStore();

  const relatedProducts = MOCK_PRODUCTS.filter(
    (p) => p.id !== params.id && (p.category === product?.category || p.campus === product?.campus)
  ).slice(0, 4);

  useEffect(() => {
    const p = MOCK_PRODUCTS.find((p) => p.id === params.id) || MOCK_PRODUCTS[0];
    setProduct(p);
  }, [params.id]);

  if (!product) {
    return (
      <div className="min-h-screen bg-surface flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-primary border-t-accent rounded-full animate-spin" />
      </div>
    );
  }

  const wishlisted = isWishlisted(product.id);
  const conditionLabel = {
    new: 'Brand New',
    'like-new': 'Like New',
    good: 'Good',
    fair: 'Fair',
    poor: 'Poor',
  }[product.condition];

  const handleAddToCart = () => {
    addToCart(product);
    setCartAdded(true);
    setTimeout(() => setCartAdded(false), 2000);
  };

  return (
    <div className="min-h-screen bg-surface">
      <Navbar />

      <div className="pt-20 max-w-7xl mx-auto px-6 py-8">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm text-ink/50 mb-6">
          <Link href="/" className="hover:text-primary transition-colors">Home</Link>
          <span>/</span>
          <Link href="/marketplace" className="hover:text-primary transition-colors">Marketplace</Link>
          <span>/</span>
          <span className="text-ink capitalize">{product.category}</span>
          <span>/</span>
          <span className="text-ink truncate max-w-xs">{product.title}</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">

          {/* LEFT: Images */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-4"
          >
            {/* Main image */}
            <div className="relative aspect-square rounded-4xl overflow-hidden bg-white border border-primary/5 shadow-card">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentImage}
                  initial={{ opacity: 0, scale: 1.05 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="absolute inset-0"
                >
                  <Image
                    src={product.images[currentImage]}
                    alt={product.title}
                    fill
                    className="object-cover"
                  />
                </motion.div>
              </AnimatePresence>

              {/* Nav arrows */}
              {product.images.length > 1 && (
                <>
                  <button
                    onClick={() => setCurrentImage(Math.max(0, currentImage - 1))}
                    className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/80 backdrop-blur-sm flex items-center justify-center shadow-lg hover:bg-white transition-colors"
                  >
                    <ChevronLeft size={18} />
                  </button>
                  <button
                    onClick={() => setCurrentImage(Math.min(product.images.length - 1, currentImage + 1))}
                    className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/80 backdrop-blur-sm flex items-center justify-center shadow-lg hover:bg-white transition-colors"
                  >
                    <ChevronRight size={18} />
                  </button>
                </>
              )}

              {/* Badges */}
              <div className="absolute top-4 left-4 flex flex-col gap-2">
                {product.featured && (
                  <span className="px-3 py-1.5 bg-accent text-white text-xs font-bold rounded-xl">
                    ⚡ Featured
                  </span>
                )}
                {product.originalPrice && (
                  <span className="px-3 py-1.5 bg-red-500 text-white text-xs font-bold rounded-xl">
                    -{Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}% OFF
                  </span>
                )}
              </div>

              {/* Wishlist */}
              <motion.button
                onClick={() => toggleWishlist(product.id)}
                className={cn(
                  'absolute top-4 right-4 w-10 h-10 rounded-full flex items-center justify-center shadow-lg transition-all',
                  wishlisted ? 'bg-red-500 text-white' : 'bg-white text-ink/50 hover:text-red-500'
                )}
                whileHover={{ scale: 1.15 }}
                whileTap={{ scale: 0.85 }}
              >
                <Heart size={18} fill={wishlisted ? 'currentColor' : 'none'} />
              </motion.button>
            </div>

            {/* Thumbnails */}
            {product.images.length > 1 && (
              <div className="flex gap-3 overflow-x-auto pb-1">
                {product.images.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrentImage(i)}
                    className={cn(
                      'relative w-20 h-20 rounded-2xl overflow-hidden flex-shrink-0 border-2 transition-all',
                      currentImage === i ? 'border-primary' : 'border-transparent hover:border-primary/30'
                    )}
                  >
                    <Image src={img} alt="" fill className="object-cover" />
                  </button>
                ))}
              </div>
            )}
          </motion.div>

          {/* RIGHT: Details */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-6"
          >
            {/* Category + Stats */}
            <div className="flex items-center justify-between">
              <span className="px-3 py-1 bg-primary/5 text-primary text-xs font-bold rounded-lg uppercase tracking-wider">
                {product.category}
              </span>
              <div className="flex items-center gap-4 text-ink/40 text-sm">
                <span className="flex items-center gap-1"><Eye size={14} /> {product.views}</span>
                <span className="flex items-center gap-1"><Heart size={14} /> {product.likes}</span>
                <span className="flex items-center gap-1"><Clock size={14} /> {timeAgo(product.createdAt)}</span>
              </div>
            </div>

            {/* Title */}
            <h1 className="font-display font-bold text-2xl lg:text-3xl text-ink leading-tight">
              {product.title}
            </h1>

            {/* Price */}
            <div className="flex items-baseline gap-4">
              <span className="font-display font-bold text-3xl text-primary">
                {formatPrice(product.price)}
              </span>
              {product.originalPrice && (
                <span className="text-xl text-ink/30 line-through">
                  {formatPrice(product.originalPrice)}
                </span>
              )}
              {product.negotiable && (
                <span className="px-2.5 py-1 bg-green-100 text-green-700 text-xs font-bold rounded-lg">
                  Negotiable
                </span>
              )}
            </div>

            {/* Condition + Location */}
            <div className="grid grid-cols-2 gap-3">
              <div className="flex items-center gap-3 p-3.5 bg-white rounded-2xl border border-primary/5">
                <Package size={16} className="text-primary" />
                <div>
                  <p className="text-xs text-ink/40">Condition</p>
                  <p className="text-sm font-semibold text-ink">{conditionLabel}</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3.5 bg-white rounded-2xl border border-primary/5">
                <MapPin size={16} className="text-primary" />
                <div>
                  <p className="text-xs text-ink/40">Campus</p>
                  <p className="text-sm font-semibold text-ink truncate">{product.campus}</p>
                </div>
              </div>
            </div>

            {/* Description */}
            <div>
              <h3 className="font-semibold text-ink mb-2">Description</h3>
              <p className="text-ink/70 text-sm leading-relaxed">{product.description}</p>
            </div>

            {/* Tags */}
            {product.tags.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {product.tags.map((tag) => (
                  <span key={tag} className="flex items-center gap-1 px-3 py-1 bg-surface text-ink/60 text-xs rounded-lg">
                    <Tag size={11} /> {tag}
                  </span>
                ))}
              </div>
            )}

            {/* Seller card */}
            <div className="p-4 bg-white rounded-3xl border border-primary/5 shadow-card">
              <p className="text-xs text-ink/40 font-semibold uppercase tracking-wider mb-3">Seller</p>
              <div className="flex items-center gap-4">
                <div className="relative w-14 h-14 rounded-2xl overflow-hidden bg-primary/10 flex-shrink-0">
                  {product.sellerPhoto ? (
                    <Image src={product.sellerPhoto} alt={product.sellerName} fill className="object-cover" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-primary font-bold text-xl">
                      {product.sellerName[0]}
                    </div>
                  )}
                </div>
                <div className="flex-1">
                  <h4 className="font-bold text-ink">{product.sellerName}</h4>
                  <div className="flex items-center gap-1 mt-0.5">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        size={12}
                        className={i < Math.floor(product.sellerRating) ? 'text-yellow-400 fill-yellow-400' : 'text-ink/20'}
                      />
                    ))}
                    <span className="text-xs text-ink/50 ml-1">{product.sellerRating} rating</span>
                  </div>
                  <p className="text-xs text-ink/40 mt-0.5">{product.campus}</p>
                </div>
                <div className="flex items-center gap-1 px-2.5 py-1 bg-green-50 text-green-700 rounded-lg text-xs font-semibold">
                  <CheckCircle size={12} />
                  Verified
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-col gap-3">
              <div className="grid grid-cols-2 gap-3">
                <motion.button
                  onClick={handleAddToCart}
                  className={cn(
                    'flex items-center justify-center gap-2 py-4 rounded-2xl font-bold text-sm transition-all',
                    cartAdded
                      ? 'bg-green-500 text-white'
                      : 'bg-primary text-white hover:bg-primary/90'
                  )}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.97 }}
                >
                  <AnimatePresence mode="wait">
                    {cartAdded ? (
                      <motion.span key="added" initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }} className="flex items-center gap-2">
                        <CheckCircle size={18} /> Added!
                      </motion.span>
                    ) : (
                      <motion.span key="add" className="flex items-center gap-2">
                        <ShoppingCart size={18} /> Add to Cart
                      </motion.span>
                    )}
                  </AnimatePresence>
                </motion.button>

                <motion.button
                  onClick={() => toggleWishlist(product.id)}
                  className={cn(
                    'flex items-center justify-center gap-2 py-4 rounded-2xl font-bold text-sm border-2 transition-all',
                    wishlisted
                      ? 'border-red-500 text-red-500 bg-red-50'
                      : 'border-primary/20 text-primary hover:border-primary'
                  )}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.97 }}
                >
                  <Heart size={18} fill={wishlisted ? 'currentColor' : 'none'} />
                  {wishlisted ? 'Wishlisted' : 'Wishlist'}
                </motion.button>
              </div>

              <motion.button
                onClick={() => setContactOpen(!contactOpen)}
                className="w-full flex items-center justify-center gap-2 py-4 bg-accent text-white rounded-2xl font-bold hover:bg-accent/90 transition-colors"
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.98 }}
              >
                <MessageCircle size={18} />
                Contact Seller
              </motion.button>

              <AnimatePresence>
                {contactOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="overflow-hidden"
                  >
                    <div className="p-4 bg-surface rounded-2xl border border-primary/5 space-y-3">
                      <p className="text-sm text-ink/60">Send a message to <strong>{product.sellerName}</strong>:</p>
                      <textarea
                        defaultValue={`Hi! I'm interested in your "${product.title}" listed for ${formatPrice(product.price)}. Is it still available?`}
                        rows={3}
                        className="w-full bg-white border border-primary/10 rounded-xl p-3 text-sm focus:outline-none focus:ring-2 focus:ring-accent/30 resize-none"
                      />
                      <div className="flex gap-2">
                        <button className="flex-1 flex items-center justify-center gap-2 py-2.5 bg-primary text-white rounded-xl text-sm font-semibold">
                          <MessageCircle size={14} />
                          Send Message
                        </button>
                        <a
                          href={`https://wa.me/234${product.sellerId}?text=Hi! I'm interested in your "${product.title}"`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center justify-center gap-2 px-4 py-2.5 bg-green-500 text-white rounded-xl text-sm font-semibold"
                        >
                          <Phone size={14} />
                          WhatsApp
                        </a>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Safety notice */}
            <div className="flex items-start gap-3 p-4 bg-blue-50 rounded-2xl border border-blue-100">
              <Shield size={18} className="text-blue-500 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-sm font-semibold text-blue-700">Trade Safely</p>
                <p className="text-xs text-blue-600/80 mt-0.5">
                  Always meet in a safe, public campus location. Never send money before inspecting the item.
                </p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Related products */}
        {relatedProducts.length > 0 && (
          <section className="mt-20">
            <h2 className="font-display font-bold text-2xl text-ink mb-8">You Might Also Like</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
              {relatedProducts.map((p, i) => (
                <ProductCard key={p.id} product={p} index={i} />
              ))}
            </div>
          </section>
        )}
      </div>

      <Footer />
    </div>
  );
}
