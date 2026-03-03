// src/components/marketplace/ProductCard.tsx
'use client';
import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, ShoppingCart, Eye, Star, MapPin, MessageCircle } from 'lucide-react';
import { Product } from '@/types';
import { useStore } from '@/lib/store';
import { formatPrice, timeAgo } from '@/lib/utils';
import { cn } from '@/lib/utils';

interface ProductCardProps {
  product: Product;
  index?: number;
}

export default function ProductCard({ product, index = 0 }: ProductCardProps) {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [cartAdded, setCartAdded] = useState(false);
  const { addToCart, toggleWishlist, isWishlisted } = useStore();
  const wishlisted = isWishlisted(product.id);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product);
    setCartAdded(true);
    setTimeout(() => setCartAdded(false), 1800);
  };

  const handleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleWishlist(product.id);
  };

  const discount = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : null;

  const conditionColor = {
    new: 'bg-green-100 text-green-700',
    'like-new': 'bg-blue-100 text-blue-700',
    good: 'bg-yellow-100 text-yellow-700',
    fair: 'bg-orange-100 text-orange-700',
    poor: 'bg-red-100 text-red-700',
  }[product.condition];

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.06, duration: 0.4, ease: 'easeOut' }}
      className="product-card"
    >
      <Link href={`/product/${product.id}`}>
        <div className="bg-white rounded-3xl overflow-hidden border border-primary/5 hover:border-primary/10 transition-all shadow-card group">

          {/* Image */}
          <div className="relative aspect-[4/3] overflow-hidden bg-surface">
            {!imageLoaded && (
              <div className="absolute inset-0 skeleton" />
            )}
            <Image
              src={product.images[0]}
              alt={product.title}
              fill
              className={cn(
                'object-cover group-hover:scale-105 transition-transform duration-500',
                imageLoaded ? 'opacity-100' : 'opacity-0'
              )}
              onLoad={() => setImageLoaded(true)}
            />

            {/* Badges */}
            <div className="absolute top-3 left-3 flex flex-col gap-2">
              {product.featured && (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="px-2.5 py-1 bg-accent text-white text-xs font-bold rounded-lg"
                >
                  ⚡ Featured
                </motion.span>
              )}
              {discount && (
                <span className="px-2.5 py-1 bg-red-500 text-white text-xs font-bold rounded-lg">
                  -{discount}%
                </span>
              )}
            </div>

            {/* Condition badge */}
            <div className="absolute top-3 right-3">
              <span className={cn('px-2.5 py-1 text-xs font-semibold rounded-lg capitalize', conditionColor)}>
                {product.condition === 'like-new' ? 'Like New' : product.condition}
              </span>
            </div>

            {/* Wishlist button */}
            <motion.button
              onClick={handleWishlist}
              className={cn(
                'absolute bottom-3 right-3 w-9 h-9 rounded-full flex items-center justify-center transition-all backdrop-blur-sm',
                wishlisted
                  ? 'bg-red-500 text-white'
                  : 'bg-white/80 text-ink/50 hover:bg-white hover:text-red-500'
              )}
              whileHover={{ scale: 1.15 }}
              whileTap={{ scale: 0.9 }}
            >
              <Heart size={16} fill={wishlisted ? 'currentColor' : 'none'} />
            </motion.button>

            {/* Stats overlay */}
            <div className="absolute bottom-3 left-3 flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
              <div className="flex items-center gap-1 bg-black/50 text-white text-xs px-2 py-1 rounded-lg backdrop-blur-sm">
                <Eye size={11} />
                {product.views}
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="p-4">
            {/* Location */}
            <div className="flex items-center gap-1 text-ink/40 text-xs mb-2">
              <MapPin size={11} />
              {product.campus}
            </div>

            {/* Title */}
            <h3 className="font-semibold text-ink text-sm leading-snug line-clamp-2 mb-2 group-hover:text-primary transition-colors">
              {product.title}
            </h3>

            {/* Seller */}
            <div className="flex items-center gap-1.5 mb-3">
              <div className="w-5 h-5 rounded-full bg-primary/20 flex items-center justify-center text-primary text-[10px] font-bold overflow-hidden">
                {product.sellerPhoto ? (
                  <Image src={product.sellerPhoto} alt={product.sellerName} width={20} height={20} className="object-cover" />
                ) : (
                  product.sellerName[0]
                )}
              </div>
              <span className="text-xs text-ink/50">{product.sellerName}</span>
              <div className="flex items-center gap-0.5 ml-auto">
                <Star size={11} className="text-yellow-400 fill-yellow-400" />
                <span className="text-xs font-semibold text-ink/60">{product.sellerRating}</span>
              </div>
            </div>

            {/* Price */}
            <div className="flex items-center justify-between">
              <div>
                <div className="flex items-baseline gap-2">
                  <span className="font-display font-bold text-lg text-primary">
                    {formatPrice(product.price)}
                  </span>
                  {product.originalPrice && (
                    <span className="text-xs text-ink/30 line-through">
                      {formatPrice(product.originalPrice)}
                    </span>
                  )}
                </div>
                {product.negotiable && (
                  <span className="text-xs text-green-600 font-medium">Negotiable</span>
                )}
              </div>

              {/* Add to cart */}
              <motion.button
                onClick={handleAddToCart}
                className={cn(
                  'relative w-10 h-10 rounded-2xl flex items-center justify-center transition-all overflow-hidden',
                  cartAdded ? 'bg-green-500' : 'bg-primary hover:bg-accent'
                )}
                whileHover={{ scale: 1.08 }}
                whileTap={{ scale: 0.92 }}
              >
                <AnimatePresence mode="wait">
                  {cartAdded ? (
                    <motion.span
                      key="check"
                      initial={{ scale: 0, rotate: -90 }}
                      animate={{ scale: 1, rotate: 0 }}
                      exit={{ scale: 0 }}
                      className="text-white text-base"
                    >
                      ✓
                    </motion.span>
                  ) : (
                    <motion.div
                      key="cart"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      exit={{ scale: 0 }}
                    >
                      <ShoppingCart size={16} className="text-white" />
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.button>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

// Skeleton loader
export function ProductCardSkeleton() {
  return (
    <div className="bg-white rounded-3xl overflow-hidden border border-primary/5 shadow-card">
      <div className="aspect-[4/3] skeleton" />
      <div className="p-4 space-y-3">
        <div className="skeleton h-3 w-24 rounded" />
        <div className="skeleton h-4 w-full rounded" />
        <div className="skeleton h-4 w-3/4 rounded" />
        <div className="flex justify-between items-center">
          <div className="skeleton h-6 w-28 rounded" />
          <div className="skeleton w-10 h-10 rounded-2xl" />
        </div>
      </div>
    </div>
  );
}
