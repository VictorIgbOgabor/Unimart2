// src/app/page.tsx
'use client';
import { useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import {
  ArrowRight, ShieldCheck, Zap, Users, Star, ChevronRight,
  Search, BookOpen, Laptop, Shirt, Sofa, Wrench, Package
} from 'lucide-react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import ProductCard from '@/components/marketplace/ProductCard';
import { MOCK_PRODUCTS } from '@/lib/products';
import { formatPrice } from '@/lib/utils';

// Floating elements
const FloatingCard = ({ className, children }: { className: string; children: React.ReactNode }) => (
  <motion.div
    animate={{ y: [0, -12, 0] }}
    transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
    className={className}
  >
    {children}
  </motion.div>
);

const StatItem = ({ number, label, delay = 0 }: { number: string; label: string; delay?: number }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay, duration: 0.5 }}
      className="text-center"
    >
      <div className="font-display font-bold text-3xl lg:text-4xl text-white mb-1">{number}</div>
      <div className="text-white/60 text-sm">{label}</div>
    </motion.div>
  );
};

const CategoryPill = ({ emoji, label, href, delay = 0 }: { emoji: string; label: string; href: string; delay?: number }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.8 }}
    whileInView={{ opacity: 1, scale: 1 }}
    viewport={{ once: true }}
    transition={{ delay, type: 'spring', stiffness: 300 }}
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.95 }}
  >
    <Link href={href}>
      <div className="flex items-center gap-3 px-5 py-3.5 bg-white rounded-2xl border border-primary/5 hover:border-primary/20 hover:shadow-card transition-all cursor-pointer group">
        <span className="text-2xl">{emoji}</span>
        <span className="font-semibold text-sm text-ink group-hover:text-primary transition-colors">{label}</span>
        <ChevronRight size={14} className="text-ink/30 ml-auto group-hover:text-accent transition-colors group-hover:translate-x-0.5" />
      </div>
    </Link>
  </motion.div>
);

const FeatureCard = ({ icon: Icon, title, desc, delay = 0 }: {
  icon: React.ElementType; title: string; desc: string; delay?: number;
}) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ delay, duration: 0.5 }}
    className="p-6 bg-white rounded-3xl border border-primary/5 hover:shadow-card-hover transition-all group"
  >
    <div className="w-12 h-12 rounded-2xl bg-primary/5 flex items-center justify-center mb-4 group-hover:bg-accent/10 transition-colors">
      <Icon size={24} className="text-primary group-hover:text-accent transition-colors" />
    </div>
    <h3 className="font-display font-bold text-ink mb-2">{title}</h3>
    <p className="text-ink/60 text-sm leading-relaxed">{desc}</p>
  </motion.div>
);

export default function HomePage() {
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] });
  const heroY = useTransform(scrollYProgress, [0, 1], ['0%', '30%']);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  const featuredProducts = MOCK_PRODUCTS.filter((p) => p.featured).slice(0, 4);
  const recentProducts = MOCK_PRODUCTS.slice(0, 8);

  return (
    <div className="min-h-screen">
      <Navbar />

      {/* ═══════════════════════════════════════
          HERO SECTION
      ═══════════════════════════════════════ */}
      <section
        ref={heroRef}
        className="relative min-h-screen flex items-center justify-center overflow-hidden bg-primary noise"
      >
        {/* Gradient mesh */}
        <div className="absolute inset-0">
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-primary via-primary/95 to-[#0f1a5c]" />
          <div className="absolute top-1/4 -right-32 w-96 h-96 rounded-full bg-accent/20 blur-3xl" />
          <div className="absolute bottom-1/4 -left-32 w-80 h-80 rounded-full bg-blue-500/10 blur-3xl" />
          <div className="absolute top-0 left-0 right-0 bottom-0 hero-pattern" />
        </div>

        {/* Floating product cards */}
        <div className="absolute right-8 top-32 hidden xl:block">
          <FloatingCard className="w-64">
            <div className="bg-white/10 blur-overlay border border-white/10 rounded-3xl p-4">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-xl bg-accent/20 flex items-center justify-center">
                  <Laptop size={18} className="text-accent" />
                </div>
                <div>
                  <p className="text-white text-xs font-semibold">MacBook Air M1</p>
                  <p className="text-white/50 text-xs">Electronics</p>
                </div>
              </div>
              <p className="text-accent font-display font-bold">₦420,000</p>
              <div className="flex items-center gap-1 mt-1">
                {[1,2,3,4,5].map(i => <Star key={i} size={10} className="text-yellow-400 fill-yellow-400" />)}
                <span className="text-white/50 text-xs ml-1">5.0</span>
              </div>
            </div>
          </FloatingCard>
        </div>

        <div className="absolute left-8 bottom-40 hidden xl:block">
          <motion.div
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
            className="w-56"
          >
            <div className="bg-white/10 blur-overlay border border-white/10 rounded-3xl p-4">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-8 h-8 rounded-full bg-green-400/20 flex items-center justify-center">
                  <span className="text-xs">🔥</span>
                </div>
                <span className="text-white text-xs font-semibold">Just Sold!</span>
              </div>
              <p className="text-white/70 text-xs">Calculus Textbook</p>
              <p className="text-green-400 text-sm font-bold mt-1">₦6,000</p>
            </div>
          </motion.div>
        </div>

        {/* Hero content */}
        <motion.div
          style={{ y: heroY, opacity: heroOpacity }}
          className="relative z-10 text-center px-6 max-w-4xl mx-auto pt-24"
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="inline-flex items-center gap-2 px-4 py-2 bg-accent/20 border border-accent/30 rounded-full text-accent text-sm font-semibold mb-8"
          >
            <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
            🎓 Nigeria&apos;s #1 Campus Marketplace
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.7 }}
            className="font-display font-bold text-5xl sm:text-6xl lg:text-7xl text-white leading-tight mb-6"
          >
            Buy & Sell
            <br />
            <span className="text-accent">On Campus,</span>
            <br />
            Like a Pro.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.45, duration: 0.6 }}
            className="text-white/60 text-lg sm:text-xl max-w-2xl mx-auto mb-10 leading-relaxed"
          >
            Unimart connects students to buy, sell, and discover amazing deals —
            textbooks, electronics, services, and more. All within your campus.
          </motion.p>

          {/* Search bar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.5 }}
            className="max-w-xl mx-auto mb-8"
          >
            <div className="flex gap-3 p-2 bg-white/10 blur-overlay border border-white/20 rounded-2xl">
              <div className="flex-1 flex items-center gap-3 px-4">
                <Search size={18} className="text-white/40" />
                <input
                  type="text"
                  placeholder="Search textbooks, laptops, services..."
                  className="flex-1 bg-transparent text-white placeholder:text-white/30 text-sm focus:outline-none"
                />
              </div>
              <Link href="/marketplace">
                <motion.button
                  className="px-6 py-3 bg-accent text-white rounded-xl font-semibold text-sm hover:bg-accent/90 transition-colors whitespace-nowrap"
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                >
                  Search
                </motion.button>
              </Link>
            </div>
          </motion.div>

          {/* CTA buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Link href="/marketplace">
              <motion.button
                className="flex items-center gap-2 px-8 py-4 bg-white text-primary rounded-2xl font-bold text-base hover:bg-accent hover:text-white transition-all group"
                whileHover={{ scale: 1.03, y: -2 }}
                whileTap={{ scale: 0.97 }}
              >
                Browse Marketplace
                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </motion.button>
            </Link>
            <Link href="/upload">
              <motion.button
                className="flex items-center gap-2 px-8 py-4 border-2 border-white/30 text-white rounded-2xl font-bold text-base hover:border-accent hover:text-accent transition-all"
                whileHover={{ scale: 1.03, y: -2 }}
                whileTap={{ scale: 0.97 }}
              >
                Start Selling Free
              </motion.button>
            </Link>
          </motion.div>

          {/* Trust badges */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className="flex items-center justify-center gap-6 mt-12 flex-wrap"
          >
            {['10K+ Students', 'Verified Sellers', 'Free to Use', 'Campus-Only'].map((badge) => (
              <div key={badge} className="flex items-center gap-2 text-white/50 text-sm">
                <div className="w-1.5 h-1.5 rounded-full bg-accent" />
                {badge}
              </div>
            ))}
          </motion.div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/40"
        >
          <div className="w-6 h-10 rounded-full border-2 border-white/20 flex items-center justify-center">
            <div className="w-1 h-3 bg-white/40 rounded-full" />
          </div>
        </motion.div>
      </section>

      {/* ═══════════════════════════════════════
          STATS BAR
      ═══════════════════════════════════════ */}
      <section className="bg-primary py-12 border-t border-white/5">
        <div className="max-w-5xl mx-auto px-6">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            <StatItem number="10,000+" label="Active Students" delay={0} />
            <StatItem number="50+" label="Universities" delay={0.1} />
            <StatItem number="25,000+" label="Items Listed" delay={0.2} />
            <StatItem number="₦500M+" label="Value Traded" delay={0.3} />
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          CATEGORIES
      ═══════════════════════════════════════ */}
      <section className="py-20 px-6 bg-surface">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <p className="text-accent text-sm font-bold uppercase tracking-widest mb-3">Categories</p>
            <h2 className="font-display font-bold text-3xl lg:text-4xl text-ink">
              Find What You Need
            </h2>
            <p className="text-ink/50 mt-3">Browse by category or search for exactly what you want</p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {[
              { emoji: '📚', label: 'Textbooks & Courseware', href: '/marketplace?category=textbooks', delay: 0 },
              { emoji: '💻', label: 'Electronics & Gadgets', href: '/marketplace?category=electronics', delay: 0.05 },
              { emoji: '👕', label: 'Fashion & Clothing', href: '/marketplace?category=clothing', delay: 0.1 },
              { emoji: '🛋️', label: 'Furniture & Hostel Items', href: '/marketplace?category=furniture', delay: 0.15 },
              { emoji: '🔧', label: 'Student Services', href: '/marketplace?category=services', delay: 0.2 },
              { emoji: '📦', label: 'Everything Else', href: '/marketplace', delay: 0.25 },
            ].map((cat) => (
              <CategoryPill key={cat.label} {...cat} />
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          FEATURED PRODUCTS
      ═══════════════════════════════════════ */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-end justify-between mb-12">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <p className="text-accent text-sm font-bold uppercase tracking-widest mb-3">Spotlight</p>
              <h2 className="font-display font-bold text-3xl lg:text-4xl text-ink">Featured Listings</h2>
            </motion.div>
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
            >
              <Link href="/marketplace?featured=true">
                <button className="flex items-center gap-2 text-primary font-semibold text-sm hover:text-accent transition-colors group">
                  See All
                  <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                </button>
              </Link>
            </motion.div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.map((product, i) => (
              <ProductCard key={product.id} product={product} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          HOW IT WORKS
      ═══════════════════════════════════════ */}
      <section className="py-20 px-6 bg-surface">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <p className="text-accent text-sm font-bold uppercase tracking-widest mb-3">Simple Process</p>
            <h2 className="font-display font-bold text-3xl lg:text-4xl text-ink">How Unimart Works</h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
            {/* Connector line (desktop) */}
            <div className="hidden md:block absolute top-10 left-1/4 right-1/4 h-0.5 bg-gradient-to-r from-accent/30 to-accent/30 via-accent" />

            {[
              { step: '01', title: 'Create Account', desc: 'Sign up with your student email. Verify your university status to join your campus community.', emoji: '🎓' },
              { step: '02', title: 'List or Browse', desc: 'Post items for free in seconds, or browse thousands of listings from verified campus sellers.', emoji: '🛍️' },
              { step: '03', title: 'Connect & Trade', desc: 'Chat with sellers, agree on price, and meet safely on campus. Fast, easy, secure.', emoji: '🤝' },
            ].map(({ step, title, desc, emoji }, i) => (
              <motion.div
                key={step}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
                className="relative text-center"
              >
                <div className="w-20 h-20 rounded-full bg-white border-4 border-primary/10 flex items-center justify-center text-3xl mx-auto mb-6 shadow-card relative z-10">
                  {emoji}
                </div>
                <div className="absolute -top-1 -right-1 md:right-auto md:left-1/2 md:-translate-x-1/2 w-7 h-7 rounded-full bg-accent text-white text-xs font-bold flex items-center justify-center z-20">
                  {i + 1}
                </div>
                <h3 className="font-display font-bold text-xl text-ink mb-2">{title}</h3>
                <p className="text-ink/60 text-sm leading-relaxed max-w-xs mx-auto">{desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          RECENT LISTINGS
      ═══════════════════════════════════════ */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-end justify-between mb-12">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <p className="text-accent text-sm font-bold uppercase tracking-widest mb-3">Fresh Drops</p>
              <h2 className="font-display font-bold text-3xl lg:text-4xl text-ink">Just Listed</h2>
            </motion.div>
            <Link href="/marketplace">
              <button className="flex items-center gap-2 text-primary font-semibold text-sm hover:text-accent transition-colors group">
                Browse All
                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </button>
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {recentProducts.map((product, i) => (
              <ProductCard key={product.id} product={product} index={i} />
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mt-12"
          >
            <Link href="/marketplace">
              <motion.button
                className="inline-flex items-center gap-2 px-8 py-4 bg-primary text-white rounded-2xl font-bold hover:bg-accent transition-colors group"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
              >
                View All Listings
                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </motion.button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          WHY UNIMART
      ═══════════════════════════════════════ */}
      <section className="py-20 px-6 bg-surface">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <p className="text-accent text-sm font-bold uppercase tracking-widest mb-3">Our Edge</p>
            <h2 className="font-display font-bold text-3xl lg:text-4xl text-ink">Built for Campus Life</h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <FeatureCard
              icon={ShieldCheck}
              title="Campus-Verified Sellers"
              desc="All sellers are verified university students. Trade with confidence knowing exactly who you're dealing with."
              delay={0}
            />
            <FeatureCard
              icon={Zap}
              title="Lightning Fast Listings"
              desc="List any item in under 2 minutes. Take a photo, set your price, and start receiving offers immediately."
              delay={0.1}
            />
            <FeatureCard
              icon={Users}
              title="Your Campus, Your Market"
              desc="Items are filtered by campus so you see what's available near you. Meet locally, trade safely."
              delay={0.2}
            />
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          CTA BANNER
      ═══════════════════════════════════════ */}
      <section className="py-20 px-6 bg-primary relative overflow-hidden noise">
        <div className="absolute inset-0 hero-pattern" />
        <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-accent/10 blur-3xl" />

        <div className="relative max-w-3xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
          >
            <div className="text-5xl mb-6">🚀</div>
            <h2 className="font-display font-bold text-3xl lg:text-5xl text-white mb-4">
              Ready to Start?
            </h2>
            <p className="text-white/60 text-lg mb-10">
              Join 10,000+ students already buying and selling on Unimart. It&apos;s free, fast, and made for campus.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/auth">
                <motion.button
                  className="flex items-center gap-2 px-8 py-4 bg-accent text-white rounded-2xl font-bold text-base hover:bg-accent/90 transition-colors group"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.97 }}
                >
                  Create Free Account
                  <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                </motion.button>
              </Link>
              <Link href="/marketplace">
                <motion.button
                  className="px-8 py-4 border-2 border-white/30 text-white rounded-2xl font-bold text-base hover:border-white hover:bg-white/10 transition-all"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.97 }}
                >
                  Browse First
                </motion.button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
