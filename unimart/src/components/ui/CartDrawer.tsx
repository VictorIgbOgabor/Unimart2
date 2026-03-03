// src/components/ui/CartDrawer.tsx
'use client';
import { AnimatePresence, motion } from 'framer-motion';
import { X, ShoppingBag, Minus, Plus, Trash2, ArrowRight } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useStore } from '@/lib/store';
import { formatPrice } from '@/lib/utils';

export default function CartDrawer() {
  const { cart, cartOpen, setCartOpen, removeFromCart, updateQuantity, cartTotal } = useStore();

  return (
    <AnimatePresence>
      {cartOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setCartOpen(false)}
            className="fixed inset-0 bg-ink/50 backdrop-blur-sm z-[60]"
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', stiffness: 300, damping: 35 }}
            className="fixed right-0 top-0 h-full w-full max-w-md bg-white z-[70] flex flex-col shadow-2xl"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-5 border-b border-primary/5">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center">
                  <ShoppingBag size={20} className="text-accent" />
                </div>
                <div>
                  <h2 className="font-display font-bold text-lg text-ink">Your Cart</h2>
                  <p className="text-xs text-ink/50">{cart.length} items</p>
                </div>
              </div>
              <button
                onClick={() => setCartOpen(false)}
                className="p-2 rounded-xl hover:bg-surface transition-colors"
              >
                <X size={20} className="text-ink/60" />
              </button>
            </div>

            {/* Cart items */}
            <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4">
              <AnimatePresence mode="popLayout">
                {cart.length === 0 ? (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex flex-col items-center justify-center h-full py-20 gap-4"
                  >
                    <div className="w-20 h-20 rounded-full bg-surface flex items-center justify-center">
                      <ShoppingBag size={32} className="text-primary/30" />
                    </div>
                    <p className="text-ink/50 text-center text-sm">
                      Your cart is empty.<br />
                      Discover great deals on campus!
                    </p>
                    <Link href="/marketplace" onClick={() => setCartOpen(false)}>
                      <button className="px-6 py-2.5 bg-primary text-white rounded-xl text-sm font-semibold">
                        Browse Marketplace
                      </button>
                    </Link>
                  </motion.div>
                ) : (
                  cart.map((item) => (
                    <motion.div
                      key={item.product.id}
                      layout
                      initial={{ opacity: 0, x: 30 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -30, height: 0 }}
                      className="flex gap-4 p-4 bg-surface rounded-2xl"
                    >
                      <div className="relative w-20 h-20 rounded-xl overflow-hidden flex-shrink-0 bg-primary/5">
                        <Image
                          src={item.product.images[0]}
                          alt={item.product.title}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="text-sm font-semibold text-ink truncate">
                          {item.product.title}
                        </h3>
                        <p className="text-xs text-ink/50 mt-0.5">{item.product.campus}</p>
                        <p className="text-accent font-bold text-sm mt-1">
                          {formatPrice(item.product.price)}
                        </p>
                        <div className="flex items-center gap-3 mt-2">
                          <div className="flex items-center gap-2 bg-white rounded-lg border border-primary/10 p-1">
                            <button
                              onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                              className="w-6 h-6 flex items-center justify-center rounded hover:bg-primary/5 transition-colors"
                            >
                              <Minus size={12} />
                            </button>
                            <span className="text-xs font-bold w-4 text-center">{item.quantity}</span>
                            <button
                              onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                              className="w-6 h-6 flex items-center justify-center rounded hover:bg-primary/5 transition-colors"
                            >
                              <Plus size={12} />
                            </button>
                          </div>
                          <button
                            onClick={() => removeFromCart(item.product.id)}
                            className="p-1.5 text-red-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all"
                          >
                            <Trash2 size={14} />
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  ))
                )}
              </AnimatePresence>
            </div>

            {/* Footer */}
            {cart.length > 0 && (
              <div className="border-t border-primary/5 px-6 py-5 space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-ink/60 text-sm">Subtotal</span>
                  <span className="font-display font-bold text-lg text-ink">
                    {formatPrice(cartTotal())}
                  </span>
                </div>
                <p className="text-xs text-ink/40 text-center">
                  Contact sellers individually to complete your purchase
                </p>
                <button className="w-full flex items-center justify-center gap-2 py-4 bg-primary text-white rounded-2xl font-semibold hover:bg-primary/90 transition-colors group">
                  Checkout
                  <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
