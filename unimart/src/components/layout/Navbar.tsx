// src/components/layout/Navbar.tsx
'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ShoppingBag,
  Heart,
  Search,
  Menu,
  X,
  User,
  Plus,
  ChevronDown,
  Bell,
  LogOut,
  Package,
  LayoutDashboard,
} from 'lucide-react';
import { useStore } from '@/lib/store';
import { logOut } from '@/lib/auth';
import { cn } from '@/lib/utils';
import CartDrawer from '@/components/ui/CartDrawer';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const { cartCount, setCartOpen, searchQuery, setSearchQuery } = useStore();
  const pathname = usePathname();

  // Mock auth state - replace with useAuth()
  const isAuthenticated = false;
  const user = null;

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { href: '/marketplace', label: 'Marketplace' },
    { href: '/marketplace?category=textbooks', label: 'Textbooks' },
    { href: '/marketplace?category=electronics', label: 'Electronics' },
    { href: '/marketplace?category=services', label: 'Services' },
  ];

  return (
    <>
      <CartDrawer />

      <motion.header
        className={cn(
          'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
          scrolled
            ? 'bg-white/90 blur-overlay shadow-md border-b border-primary/10'
            : 'bg-transparent'
        )}
        initial={{ y: -80 }}
        animate={{ y: 0 }}
        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-between h-16 lg:h-20">

            {/* Logo */}
            <Link href="/" className="flex items-center gap-2 group">
              <motion.div
                className="w-9 h-9 rounded-xl bg-primary flex items-center justify-center"
                whileHover={{ rotate: 10, scale: 1.05 }}
                transition={{ type: 'spring', stiffness: 400 }}
              >
                <span className="text-white font-display font-bold text-base">U</span>
              </motion.div>
              <span className={cn(
                'font-display font-bold text-xl transition-colors',
                scrolled ? 'text-primary' : 'text-white'
              )}>
                uni<span className="text-accent">mart</span>
              </span>
            </Link>

            {/* Desktop nav */}
            <nav className="hidden lg:flex items-center gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    'px-4 py-2 rounded-lg text-sm font-medium transition-all underline-anim',
                    scrolled ? 'text-ink hover:text-primary' : 'text-white/80 hover:text-white'
                  )}
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            {/* Actions */}
            <div className="flex items-center gap-2">

              {/* Search toggle */}
              <motion.button
                onClick={() => setSearchOpen(!searchOpen)}
                className={cn(
                  'p-2.5 rounded-xl transition-all',
                  scrolled
                    ? 'text-ink hover:bg-primary/5'
                    : 'text-white/80 hover:text-white hover:bg-white/10'
                )}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Search size={20} />
              </motion.button>

              {/* Wishlist */}
              <Link href="/profile?tab=wishlist">
                <motion.button
                  className={cn(
                    'p-2.5 rounded-xl transition-all hidden sm:flex',
                    scrolled
                      ? 'text-ink hover:bg-primary/5'
                      : 'text-white/80 hover:text-white hover:bg-white/10'
                  )}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Heart size={20} />
                </motion.button>
              </Link>

              {/* Cart */}
              <motion.button
                onClick={() => setCartOpen(true)}
                className="relative p-2.5 rounded-xl transition-all text-ink bg-accent/10 hover:bg-accent/20"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <ShoppingBag size={20} className="text-accent" />
                <AnimatePresence>
                  {cartCount() > 0 && (
                    <motion.span
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      exit={{ scale: 0 }}
                      className="absolute -top-1 -right-1 w-5 h-5 bg-accent text-white text-xs font-bold rounded-full flex items-center justify-center"
                    >
                      {cartCount()}
                    </motion.span>
                  )}
                </AnimatePresence>
              </motion.button>

              {/* Sell button */}
              <Link href="/upload">
                <motion.button
                  className="hidden sm:flex items-center gap-1.5 px-4 py-2 bg-accent text-white rounded-xl text-sm font-semibold hover:bg-accent/90 transition-colors"
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                >
                  <Plus size={16} />
                  Sell
                </motion.button>
              </Link>

              {/* User menu */}
              {isAuthenticated ? (
                <div className="relative">
                  <button
                    onClick={() => setUserMenuOpen(!userMenuOpen)}
                    className="flex items-center gap-2 p-1.5 rounded-xl hover:bg-primary/5 transition-all"
                  >
                    <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
                      <User size={16} className="text-primary" />
                    </div>
                    <ChevronDown size={14} className={cn('transition-transform', userMenuOpen && 'rotate-180')} />
                  </button>

                  <AnimatePresence>
                    {userMenuOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 10, scale: 0.95 }}
                        className="absolute right-0 top-12 w-52 bg-white rounded-2xl shadow-card-hover border border-primary/5 overflow-hidden"
                      >
                        <div className="p-1">
                          <Link href="/dashboard" className="flex items-center gap-3 px-4 py-3 hover:bg-surface rounded-xl transition-colors text-sm">
                            <LayoutDashboard size={16} className="text-primary" />
                            Dashboard
                          </Link>
                          <Link href="/profile" className="flex items-center gap-3 px-4 py-3 hover:bg-surface rounded-xl transition-colors text-sm">
                            <User size={16} className="text-primary" />
                            Profile
                          </Link>
                          <Link href="/profile?tab=listings" className="flex items-center gap-3 px-4 py-3 hover:bg-surface rounded-xl transition-colors text-sm">
                            <Package size={16} className="text-primary" />
                            My Listings
                          </Link>
                          <hr className="my-1 border-primary/5" />
                          <button
                            onClick={() => logOut()}
                            className="w-full flex items-center gap-3 px-4 py-3 hover:bg-red-50 rounded-xl transition-colors text-sm text-red-600"
                          >
                            <LogOut size={16} />
                            Sign Out
                          </button>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ) : (
                <Link href="/auth">
                  <motion.button
                    className={cn(
                      'hidden sm:flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-semibold border transition-all',
                      scrolled
                        ? 'border-primary text-primary hover:bg-primary hover:text-white'
                        : 'border-white text-white hover:bg-white hover:text-primary'
                    )}
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                  >
                    Sign In
                  </motion.button>
                </Link>
              )}

              {/* Mobile hamburger */}
              <button
                onClick={() => setMobileOpen(!mobileOpen)}
                className="lg:hidden p-2.5 rounded-xl hover:bg-primary/5 transition-all"
              >
                {mobileOpen
                  ? <X size={20} className={scrolled ? 'text-ink' : 'text-white'} />
                  : <Menu size={20} className={scrolled ? 'text-ink' : 'text-white'} />
                }
              </button>
            </div>
          </div>

          {/* Search bar */}
          <AnimatePresence>
            {searchOpen && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="overflow-hidden pb-4"
              >
                <div className="relative">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-primary/40" size={18} />
                  <input
                    type="text"
                    placeholder="Search textbooks, electronics, services..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full bg-white border border-primary/10 rounded-2xl pl-11 pr-4 py-3.5 text-sm focus:outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent shadow-card"
                    autoFocus
                  />
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Mobile menu */}
        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="lg:hidden bg-white border-t border-primary/10 overflow-hidden"
            >
              <div className="px-4 py-4 flex flex-col gap-1">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setMobileOpen(false)}
                    className="px-4 py-3 rounded-xl text-sm font-medium text-ink hover:bg-surface hover:text-primary transition-all"
                  >
                    {link.label}
                  </Link>
                ))}
                <hr className="my-2 border-primary/5" />
                <Link href="/upload" onClick={() => setMobileOpen(false)}>
                  <button className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-accent text-white rounded-xl text-sm font-semibold">
                    <Plus size={16} /> Start Selling
                  </button>
                </Link>
                {!isAuthenticated && (
                  <Link href="/auth" onClick={() => setMobileOpen(false)}>
                    <button className="w-full px-4 py-3 border border-primary text-primary rounded-xl text-sm font-semibold hover:bg-primary hover:text-white transition-all">
                      Sign In
                    </button>
                  </Link>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.header>
    </>
  );
}
