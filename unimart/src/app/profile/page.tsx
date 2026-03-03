// src/app/profile/page.tsx
'use client';
import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  User, Package, Heart, Star, MapPin, Phone, Edit2,
  Camera, CheckCircle, MessageCircle, Calendar, Shield
} from 'lucide-react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import ProductCard from '@/components/marketplace/ProductCard';
import { MOCK_PRODUCTS } from '@/lib/products';
import { useStore } from '@/lib/store';
import { cn } from '@/lib/utils';

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState<'listings' | 'wishlist' | 'reviews'>('listings');
  const [editing, setEditing] = useState(false);
  const { wishlist } = useStore();

  // Mock user data
  const user = {
    name: 'Chidi Okafor',
    email: 'chidi.okafor@unilag.edu.ng',
    university: 'University of Lagos',
    campus: 'Faculty of Engineering',
    joinedAt: 'January 2024',
    rating: 4.8,
    totalSales: 24,
    reviews: 18,
    bio: 'Final year Engineering student. Selling textbooks and electronics I no longer need. Fast responses guaranteed! 🎓',
    whatsapp: '+234 802 000 0000',
    verified: true,
  };

  const myListings = MOCK_PRODUCTS.slice(0, 4);
  const wishlistProducts = MOCK_PRODUCTS.filter((p) => wishlist.includes(p.id));

  const reviews = [
    { reviewer: 'Amaka E.', rating: 5, comment: 'Super fast delivery, item exactly as described!', date: '2 days ago' },
    { reviewer: 'Tunde A.', rating: 5, comment: 'Great seller, very responsive. Will buy again!', date: '1 week ago' },
    { reviewer: 'Emeka N.', rating: 4, comment: 'Item was in good condition as stated. Nice transaction.', date: '2 weeks ago' },
  ];

  return (
    <div className="min-h-screen bg-surface">
      <Navbar />

      <div className="pt-20">
        {/* Profile header */}
        <div className="bg-primary px-6 pt-8 pb-20 relative overflow-hidden">
          <div className="absolute inset-0 hero-pattern" />
          <div className="absolute top-0 right-0 w-80 h-80 bg-accent/10 rounded-full blur-3xl" />
        </div>

        <div className="max-w-5xl mx-auto px-6 -mt-12 pb-20">
          {/* Profile card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-4xl border border-primary/5 shadow-card p-6 sm:p-8 mb-8"
          >
            <div className="flex flex-col sm:flex-row items-start gap-6">

              {/* Avatar */}
              <div className="relative flex-shrink-0">
                <div className="w-24 h-24 rounded-3xl bg-primary/10 flex items-center justify-center text-primary font-display font-bold text-3xl overflow-hidden">
                  {user.name[0]}
                </div>
                <button className="absolute -bottom-1 -right-1 w-8 h-8 bg-accent rounded-xl flex items-center justify-center text-white hover:bg-accent/90 transition-colors">
                  <Camera size={14} />
                </button>
                {user.verified && (
                  <div className="absolute -top-1 -right-1 w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center">
                    <CheckCircle size={12} className="text-white" fill="white" />
                  </div>
                )}
              </div>

              {/* Info */}
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h1 className="font-display font-bold text-2xl text-ink">{user.name}</h1>
                    <div className="flex items-center gap-1 mt-1">
                      {[1,2,3,4,5].map((i) => (
                        <Star key={i} size={14} className={i <= Math.floor(user.rating) ? 'text-yellow-400 fill-yellow-400' : 'text-ink/20'} />
                      ))}
                      <span className="text-sm font-bold text-ink/60 ml-1">{user.rating}</span>
                      <span className="text-sm text-ink/30">({user.reviews} reviews)</span>
                    </div>
                  </div>
                  <button
                    onClick={() => setEditing(!editing)}
                    className="flex items-center gap-2 px-4 py-2 border border-primary/20 text-primary rounded-xl text-sm font-semibold hover:bg-primary hover:text-white transition-all"
                  >
                    <Edit2 size={14} />
                    Edit Profile
                  </button>
                </div>

                <p className="text-ink/60 text-sm mt-3 leading-relaxed max-w-lg">{user.bio}</p>

                <div className="flex flex-wrap gap-4 mt-4 text-sm text-ink/50">
                  <span className="flex items-center gap-1.5"><MapPin size={14} /> {user.university}</span>
                  <span className="flex items-center gap-1.5"><Calendar size={14} /> Joined {user.joinedAt}</span>
                  <span className="flex items-center gap-1.5"><Phone size={14} /> {user.whatsapp}</span>
                </div>
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 mt-6 pt-6 border-t border-primary/5">
              {[
                { value: myListings.length, label: 'Listings' },
                { value: user.totalSales, label: 'Total Sales' },
                { value: wishlist.length, label: 'Wishlisted' },
              ].map(({ value, label }) => (
                <div key={label} className="text-center">
                  <div className="font-display font-bold text-2xl text-primary">{value}</div>
                  <div className="text-ink/40 text-xs mt-0.5">{label}</div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Edit form */}
          {editing && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              className="bg-white rounded-3xl border border-primary/5 shadow-card p-6 mb-8 space-y-4"
            >
              <h3 className="font-display font-bold text-lg text-ink">Edit Profile</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  { label: 'Display Name', value: user.name, type: 'text' },
                  { label: 'WhatsApp Number', value: user.whatsapp, type: 'tel' },
                ].map(({ label, value, type }) => (
                  <div key={label}>
                    <label className="block text-xs font-bold text-ink/50 uppercase tracking-wider mb-2">{label}</label>
                    <input
                      type={type}
                      defaultValue={value}
                      className="w-full bg-surface border border-primary/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-accent/30"
                    />
                  </div>
                ))}
              </div>
              <div>
                <label className="block text-xs font-bold text-ink/50 uppercase tracking-wider mb-2">Bio</label>
                <textarea
                  defaultValue={user.bio}
                  rows={3}
                  className="w-full bg-surface border border-primary/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-accent/30 resize-none"
                />
              </div>
              <div className="flex gap-3">
                <button
                  onClick={() => setEditing(false)}
                  className="px-6 py-2.5 bg-primary text-white rounded-xl text-sm font-semibold"
                >
                  Save Changes
                </button>
                <button
                  onClick={() => setEditing(false)}
                  className="px-6 py-2.5 border border-primary/20 text-ink/60 rounded-xl text-sm font-semibold"
                >
                  Cancel
                </button>
              </div>
            </motion.div>
          )}

          {/* Tabs */}
          <div className="flex gap-1 bg-white rounded-2xl border border-primary/5 shadow-card p-1.5 mb-8">
            {([
              { id: 'listings', label: 'My Listings', icon: Package },
              { id: 'wishlist', label: 'Wishlist', icon: Heart },
              { id: 'reviews', label: 'Reviews', icon: Star },
            ] as const).map(({ id, label, icon: Icon }) => (
              <button
                key={id}
                onClick={() => setActiveTab(id)}
                className={cn(
                  'flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-bold transition-all',
                  activeTab === id ? 'bg-primary text-white' : 'text-ink/50 hover:text-ink'
                )}
              >
                <Icon size={15} />
                <span className="hidden sm:inline">{label}</span>
              </button>
            ))}
          </div>

          {/* Tab content */}
          {activeTab === 'listings' && (
            <div>
              {myListings.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                  {myListings.map((p, i) => <ProductCard key={p.id} product={p} index={i} />)}
                </div>
              ) : (
                <div className="text-center py-20">
                  <Package size={48} className="text-primary/20 mx-auto mb-4" />
                  <h3 className="font-display font-bold text-xl text-ink mb-2">No listings yet</h3>
                  <p className="text-ink/50 mb-6">Start selling items to your campus community</p>
                  <Link href="/upload">
                    <button className="px-6 py-3 bg-primary text-white rounded-xl font-semibold">
                      List Your First Item
                    </button>
                  </Link>
                </div>
              )}
            </div>
          )}

          {activeTab === 'wishlist' && (
            <div>
              {wishlistProducts.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                  {wishlistProducts.map((p, i) => <ProductCard key={p.id} product={p} index={i} />)}
                </div>
              ) : (
                <div className="text-center py-20">
                  <Heart size={48} className="text-primary/20 mx-auto mb-4" />
                  <h3 className="font-display font-bold text-xl text-ink mb-2">Your wishlist is empty</h3>
                  <p className="text-ink/50 mb-6">Save items you love by clicking the heart icon</p>
                  <Link href="/marketplace">
                    <button className="px-6 py-3 bg-primary text-white rounded-xl font-semibold">
                      Browse Marketplace
                    </button>
                  </Link>
                </div>
              )}
            </div>
          )}

          {activeTab === 'reviews' && (
            <div className="space-y-4">
              {reviews.map((review, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.08 }}
                  className="bg-white rounded-2xl border border-primary/5 shadow-card p-5"
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary font-bold">
                        {review.reviewer[0]}
                      </div>
                      <div>
                        <p className="font-semibold text-ink text-sm">{review.reviewer}</p>
                        <p className="text-xs text-ink/40">{review.date}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-0.5">
                      {[1,2,3,4,5].map((s) => (
                        <Star key={s} size={13} className={s <= review.rating ? 'text-yellow-400 fill-yellow-400' : 'text-ink/20'} />
                      ))}
                    </div>
                  </div>
                  <p className="text-sm text-ink/70 leading-relaxed">{review.comment}</p>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
}
