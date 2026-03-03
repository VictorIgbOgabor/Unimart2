// src/app/dashboard/page.tsx
'use client';
import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  TrendingUp, Package, Eye, Heart, DollarSign, Plus,
  Edit2, Trash2, MoreVertical, Star, ArrowUp, ArrowDown,
  Bell, Settings, CheckCircle, Clock, X
} from 'lucide-react';
import Navbar from '@/components/layout/Navbar';
import { MOCK_PRODUCTS } from '@/lib/products';
import { formatPrice, timeAgo, cn } from '@/lib/utils';

const StatCard = ({ label, value, icon: Icon, change, color }: {
  label: string; value: string; icon: React.ElementType; change?: number; color: string;
}) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    className="bg-white rounded-3xl border border-primary/5 shadow-card p-5"
  >
    <div className="flex items-start justify-between mb-3">
      <div className={cn('w-10 h-10 rounded-2xl flex items-center justify-center', color)}>
        <Icon size={20} className="text-white" />
      </div>
      {change !== undefined && (
        <div className={cn('flex items-center gap-1 text-xs font-bold px-2 py-1 rounded-lg', change >= 0 ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700')}>
          {change >= 0 ? <ArrowUp size={12} /> : <ArrowDown size={12} />}
          {Math.abs(change)}%
        </div>
      )}
    </div>
    <p className="font-display font-bold text-2xl text-ink">{value}</p>
    <p className="text-ink/50 text-sm mt-1">{label}</p>
  </motion.div>
);

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState<'active' | 'sold' | 'draft'>('active');

  // Mock data
  const myListings = MOCK_PRODUCTS.slice(0, 5);
  const stats = {
    totalEarnings: 185000,
    activeListings: 8,
    totalViews: 3421,
    savedByBuyers: 143,
  };

  const recentActivity = [
    { type: 'view', message: 'Someone viewed your MacBook listing', time: '2 min ago', icon: '👀' },
    { type: 'wishlist', message: '3 users saved your Engineering Textbook', time: '15 min ago', icon: '❤️' },
    { type: 'message', message: 'New message from Emeka about Nike Shoes', time: '1 hr ago', icon: '💬' },
    { type: 'sale', message: 'Calculus book sold for ₦6,000!', time: '2 hrs ago', icon: '🎉' },
  ];

  return (
    <div className="min-h-screen bg-surface">
      <Navbar />

      <div className="pt-20">
        {/* Header */}
        <div className="bg-primary px-6 pt-8 pb-16 relative overflow-hidden">
          <div className="absolute inset-0 hero-pattern" />
          <div className="absolute top-0 right-0 w-96 h-96 bg-accent/10 rounded-full blur-3xl" />

          <div className="max-w-7xl mx-auto relative">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-2xl bg-accent/20 flex items-center justify-center text-white font-bold text-xl border-2 border-accent/30">
                  C
                </div>
                <div>
                  <h1 className="font-display font-bold text-2xl text-white">Seller Dashboard</h1>
                  <p className="text-white/60 text-sm">Welcome back, Chidi 👋</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <button className="relative p-2.5 bg-white/10 text-white rounded-xl hover:bg-white/20 transition-colors">
                  <Bell size={18} />
                  <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-accent rounded-full" />
                </button>
                <Link href="/upload">
                  <button className="flex items-center gap-2 px-4 py-2.5 bg-accent text-white rounded-xl font-semibold text-sm">
                    <Plus size={16} /> New Listing
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-6 -mt-8 pb-20">
          {/* Stats */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            <StatCard label="Total Earnings" value={formatPrice(stats.totalEarnings)} icon={DollarSign} change={12} color="bg-accent" />
            <StatCard label="Active Listings" value={String(stats.activeListings)} icon={Package} change={0} color="bg-primary" />
            <StatCard label="Total Views" value={stats.totalViews.toLocaleString()} icon={Eye} change={8} color="bg-blue-500" />
            <StatCard label="Saved by Buyers" value={String(stats.savedByBuyers)} icon={Heart} change={-3} color="bg-pink-500" />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

            {/* Listings */}
            <div className="lg:col-span-2 space-y-5">
              <div className="bg-white rounded-3xl border border-primary/5 shadow-card overflow-hidden">
                <div className="p-5 border-b border-primary/5 flex items-center justify-between">
                  <h2 className="font-display font-bold text-lg text-ink">My Listings</h2>
                  <div className="flex gap-1 bg-surface rounded-xl p-1">
                    {(['active', 'sold', 'draft'] as const).map((tab) => (
                      <button
                        key={tab}
                        onClick={() => setActiveTab(tab)}
                        className={cn(
                          'px-4 py-1.5 rounded-lg text-xs font-bold capitalize transition-all',
                          activeTab === tab ? 'bg-white text-primary shadow-sm' : 'text-ink/50 hover:text-ink'
                        )}
                      >
                        {tab}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="divide-y divide-primary/5">
                  {myListings.map((product, i) => (
                    <motion.div
                      key={product.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.05 }}
                      className="flex items-center gap-4 p-4 hover:bg-surface/50 transition-colors"
                    >
                      <div className="relative w-14 h-14 rounded-2xl overflow-hidden bg-surface flex-shrink-0">
                        <Image src={product.images[0]} alt={product.title} fill className="object-cover" />
                      </div>

                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-semibold text-ink truncate">{product.title}</p>
                        <div className="flex items-center gap-3 mt-1 text-xs text-ink/40">
                          <span className="flex items-center gap-1"><Eye size={11} /> {product.views}</span>
                          <span className="flex items-center gap-1"><Heart size={11} /> {product.likes}</span>
                          <span>{timeAgo(product.createdAt)}</span>
                        </div>
                        <p className="font-bold text-sm text-primary mt-1">{formatPrice(product.price)}</p>
                      </div>

                      <div className="flex items-center gap-2 flex-shrink-0">
                        <span className={cn(
                          'px-2.5 py-1 text-xs font-bold rounded-lg',
                          product.sold ? 'bg-green-100 text-green-700' : 'bg-blue-100 text-blue-700'
                        )}>
                          {product.sold ? 'Sold' : 'Active'}
                        </span>
                        <div className="relative group">
                          <button className="p-2 rounded-xl hover:bg-surface transition-colors text-ink/40 hover:text-ink">
                            <MoreVertical size={16} />
                          </button>
                          <div className="absolute right-0 top-full mt-1 bg-white rounded-2xl shadow-card-hover border border-primary/5 py-1 w-36 hidden group-hover:block z-10">
                            <button className="w-full flex items-center gap-2 px-4 py-2 text-sm hover:bg-surface transition-colors">
                              <Edit2 size={13} /> Edit
                            </button>
                            <button className="w-full flex items-center gap-2 px-4 py-2 text-sm hover:bg-red-50 text-red-600 transition-colors">
                              <Trash2 size={13} /> Delete
                            </button>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>

                <div className="p-4 text-center border-t border-primary/5">
                  <Link href="/profile?tab=listings">
                    <button className="text-sm text-primary font-semibold hover:text-accent transition-colors">
                      View All Listings →
                    </button>
                  </Link>
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-5">

              {/* Rating card */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="bg-white rounded-3xl border border-primary/5 shadow-card p-5"
              >
                <h3 className="font-display font-bold text-lg text-ink mb-4">Seller Rating</h3>
                <div className="text-center">
                  <div className="font-display font-bold text-5xl text-primary mb-2">4.8</div>
                  <div className="flex items-center justify-center gap-1 mb-2">
                    {[1,2,3,4,5].map((i) => (
                      <Star key={i} size={16} className={i <= 5 ? 'text-yellow-400 fill-yellow-400' : 'text-ink/20'} />
                    ))}
                  </div>
                  <p className="text-ink/50 text-sm">Based on 24 reviews</p>
                </div>
                <div className="mt-4 space-y-2">
                  {[5, 4, 3, 2, 1].map((n) => (
                    <div key={n} className="flex items-center gap-2">
                      <span className="text-xs text-ink/50 w-3">{n}</span>
                      <Star size={10} className="text-yellow-400 fill-yellow-400" />
                      <div className="flex-1 h-1.5 bg-surface rounded-full overflow-hidden">
                        <div
                          className="h-full bg-yellow-400 rounded-full"
                          style={{ width: `${n === 5 ? 70 : n === 4 ? 20 : n === 3 ? 7 : 3}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* Recent activity */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="bg-white rounded-3xl border border-primary/5 shadow-card p-5"
              >
                <h3 className="font-display font-bold text-lg text-ink mb-4">Recent Activity</h3>
                <div className="space-y-3">
                  {recentActivity.map((activity, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <div className="w-9 h-9 rounded-xl bg-surface flex items-center justify-center text-lg flex-shrink-0">
                        {activity.icon}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-medium text-ink leading-relaxed">{activity.message}</p>
                        <p className="text-xs text-ink/30 mt-0.5">{activity.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* Quick actions */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="bg-primary rounded-3xl p-5 relative overflow-hidden"
              >
                <div className="absolute inset-0 hero-pattern" />
                <div className="relative">
                  <h3 className="font-display font-bold text-white mb-3">Quick Actions</h3>
                  <div className="grid grid-cols-2 gap-2">
                    <Link href="/upload">
                      <button className="w-full py-3 bg-white/10 text-white text-xs font-semibold rounded-2xl hover:bg-white/20 transition-colors flex flex-col items-center gap-1">
                        <Plus size={18} /> New Listing
                      </button>
                    </Link>
                    <button className="w-full py-3 bg-white/10 text-white text-xs font-semibold rounded-2xl hover:bg-white/20 transition-colors flex flex-col items-center gap-1">
                      <Settings size={18} /> Settings
                    </button>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
