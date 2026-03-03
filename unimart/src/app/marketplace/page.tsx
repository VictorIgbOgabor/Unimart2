// src/app/marketplace/page.tsx
'use client';
import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, SlidersHorizontal, Grid3X3, List, X, ChevronDown } from 'lucide-react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import ProductCard, { ProductCardSkeleton } from '@/components/marketplace/ProductCard';
import { MOCK_PRODUCTS } from '@/lib/products';
import { CATEGORIES, CAMPUSES, CONDITIONS, FilterState, Category, Condition } from '@/types';
import { cn } from '@/lib/utils';

const defaultFilters: FilterState = {
  category: 'all',
  campus: 'All Campuses',
  priceMin: null,
  priceMax: null,
  condition: 'all',
  sortBy: 'newest',
};

export default function MarketplacePage() {
  const [filters, setFilters] = useState<FilterState>(defaultFilters);
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [loading] = useState(false);

  const filteredProducts = useMemo(() => {
    return MOCK_PRODUCTS.filter((p) => {
      if (filters.category !== 'all' && p.category !== filters.category) return false;
      if (filters.campus !== 'All Campuses' && p.campus !== filters.campus) return false;
      if (filters.condition !== 'all' && p.condition !== filters.condition) return false;
      if (filters.priceMin && p.price < filters.priceMin) return false;
      if (filters.priceMax && p.price > filters.priceMax) return false;
      if (searchQuery) {
        const q = searchQuery.toLowerCase();
        if (
          !p.title.toLowerCase().includes(q) &&
          !p.description.toLowerCase().includes(q) &&
          !p.tags.some((t) => t.includes(q))
        ) return false;
      }
      return true;
    }).sort((a, b) => {
      switch (filters.sortBy) {
        case 'price-asc': return a.price - b.price;
        case 'price-desc': return b.price - a.price;
        case 'popular': return b.views - a.views;
        default: return b.createdAt.getTime() - a.createdAt.getTime();
      }
    });
  }, [filters, searchQuery]);

  const hasActiveFilters = filters.category !== 'all' || filters.campus !== 'All Campuses' ||
    filters.condition !== 'all' || filters.priceMin !== null || filters.priceMax !== null;

  return (
    <div className="min-h-screen bg-surface">
      <Navbar />

      {/* Header */}
      <div className="bg-primary pt-24 pb-12 px-6 relative overflow-hidden">
        <div className="absolute inset-0 hero-pattern" />
        <div className="max-w-7xl mx-auto relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h1 className="font-display font-bold text-3xl lg:text-4xl text-white mb-2">
              Campus Marketplace
            </h1>
            <p className="text-white/60">
              {filteredProducts.length} listings available
            </p>
          </motion.div>

          {/* Search */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mt-6 flex gap-3"
          >
            <div className="flex-1 flex items-center gap-3 bg-white/10 border border-white/20 rounded-2xl px-4 py-3 blur-overlay">
              <Search size={18} className="text-white/40" />
              <input
                type="text"
                placeholder="Search for anything..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="flex-1 bg-transparent text-white placeholder:text-white/30 text-sm focus:outline-none"
              />
              {searchQuery && (
                <button onClick={() => setSearchQuery('')}>
                  <X size={16} className="text-white/50" />
                </button>
              )}
            </div>
            <button
              onClick={() => setFiltersOpen(!filtersOpen)}
              className={cn(
                'flex items-center gap-2 px-4 py-3 rounded-2xl border font-semibold text-sm transition-all',
                filtersOpen || hasActiveFilters
                  ? 'bg-accent border-accent text-white'
                  : 'bg-white/10 border-white/20 text-white hover:bg-white/20'
              )}
            >
              <SlidersHorizontal size={16} />
              Filters
              {hasActiveFilters && (
                <span className="w-5 h-5 bg-white text-accent rounded-full text-xs font-bold flex items-center justify-center">
                  !
                </span>
              )}
            </button>
          </motion.div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Filter panel */}
        <AnimatePresence>
          {filtersOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="overflow-hidden mb-8"
            >
              <div className="bg-white rounded-3xl border border-primary/5 shadow-card p-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">

                  {/* Category */}
                  <div>
                    <label className="block text-xs font-bold text-ink/50 uppercase tracking-wider mb-2">Category</label>
                    <div className="relative">
                      <select
                        value={filters.category}
                        onChange={(e) => setFilters({ ...filters, category: e.target.value as Category | 'all' })}
                        className="w-full appearance-none bg-surface border border-primary/10 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-accent/30 cursor-pointer"
                      >
                        {CATEGORIES.map((c) => (
                          <option key={c.value} value={c.value}>{c.emoji} {c.label}</option>
                        ))}
                      </select>
                      <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-ink/40 pointer-events-none" />
                    </div>
                  </div>

                  {/* Campus */}
                  <div>
                    <label className="block text-xs font-bold text-ink/50 uppercase tracking-wider mb-2">Campus</label>
                    <div className="relative">
                      <select
                        value={filters.campus}
                        onChange={(e) => setFilters({ ...filters, campus: e.target.value })}
                        className="w-full appearance-none bg-surface border border-primary/10 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-accent/30 cursor-pointer"
                      >
                        {CAMPUSES.map((c) => (
                          <option key={c} value={c}>{c}</option>
                        ))}
                      </select>
                      <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-ink/40 pointer-events-none" />
                    </div>
                  </div>

                  {/* Condition */}
                  <div>
                    <label className="block text-xs font-bold text-ink/50 uppercase tracking-wider mb-2">Condition</label>
                    <div className="relative">
                      <select
                        value={filters.condition}
                        onChange={(e) => setFilters({ ...filters, condition: e.target.value as Condition | 'all' })}
                        className="w-full appearance-none bg-surface border border-primary/10 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-accent/30 cursor-pointer"
                      >
                        {CONDITIONS.map((c) => (
                          <option key={c.value} value={c.value}>{c.label}</option>
                        ))}
                      </select>
                      <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-ink/40 pointer-events-none" />
                    </div>
                  </div>

                  {/* Price range */}
                  <div>
                    <label className="block text-xs font-bold text-ink/50 uppercase tracking-wider mb-2">Price Range (₦)</label>
                    <div className="flex gap-2">
                      <input
                        type="number"
                        placeholder="Min"
                        value={filters.priceMin || ''}
                        onChange={(e) => setFilters({ ...filters, priceMin: e.target.value ? Number(e.target.value) : null })}
                        className="w-full bg-surface border border-primary/10 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-accent/30"
                      />
                      <input
                        type="number"
                        placeholder="Max"
                        value={filters.priceMax || ''}
                        onChange={(e) => setFilters({ ...filters, priceMax: e.target.value ? Number(e.target.value) : null })}
                        className="w-full bg-surface border border-primary/10 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-accent/30"
                      />
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between mt-6 pt-4 border-t border-primary/5">
                  <button
                    onClick={() => setFilters(defaultFilters)}
                    className="text-sm text-ink/50 hover:text-red-500 transition-colors font-medium"
                  >
                    Reset All Filters
                  </button>
                  <button
                    onClick={() => setFiltersOpen(false)}
                    className="px-5 py-2 bg-primary text-white rounded-xl text-sm font-semibold hover:bg-accent transition-colors"
                  >
                    Apply Filters ({filteredProducts.length})
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Category pills */}
        <div className="flex gap-2 overflow-x-auto pb-2 mb-8 -mx-6 px-6 scrollbar-hide">
          {CATEGORIES.map((cat) => (
            <button
              key={cat.value}
              onClick={() => setFilters({ ...filters, category: cat.value as Category | 'all' })}
              className={cn(
                'flex-shrink-0 flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold transition-all',
                filters.category === cat.value
                  ? 'bg-primary text-white shadow-card'
                  : 'bg-white text-ink/60 hover:bg-primary/5 border border-primary/5'
              )}
            >
              <span>{cat.emoji}</span>
              {cat.label}
            </button>
          ))}
        </div>

        {/* Toolbar */}
        <div className="flex items-center justify-between mb-6">
          <p className="text-ink/60 text-sm">
            <span className="font-bold text-ink">{filteredProducts.length}</span> results found
          </p>
          <div className="flex items-center gap-3">
            <div className="relative">
              <select
                value={filters.sortBy}
                onChange={(e) => setFilters({ ...filters, sortBy: e.target.value as FilterState['sortBy'] })}
                className="appearance-none bg-white border border-primary/10 rounded-xl px-4 py-2 text-sm font-medium focus:outline-none pr-8 cursor-pointer"
              >
                <option value="newest">Newest First</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="popular">Most Popular</option>
              </select>
              <ChevronDown size={12} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-ink/40 pointer-events-none" />
            </div>
            <div className="flex items-center gap-1 bg-white border border-primary/10 rounded-xl p-1">
              <button
                onClick={() => setViewMode('grid')}
                className={cn('p-1.5 rounded-lg transition-all', viewMode === 'grid' ? 'bg-primary text-white' : 'text-ink/40 hover:text-ink')}
              >
                <Grid3X3 size={16} />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={cn('p-1.5 rounded-lg transition-all', viewMode === 'list' ? 'bg-primary text-white' : 'text-ink/40 hover:text-ink')}
              >
                <List size={16} />
              </button>
            </div>
          </div>
        </div>

        {/* Products grid */}
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {Array.from({ length: 8 }).map((_, i) => <ProductCardSkeleton key={i} />)}
          </div>
        ) : filteredProducts.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-24"
          >
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="font-display font-bold text-xl text-ink mb-2">No listings found</h3>
            <p className="text-ink/50 mb-6">Try adjusting your filters or search query</p>
            <button
              onClick={() => { setFilters(defaultFilters); setSearchQuery(''); }}
              className="px-6 py-3 bg-primary text-white rounded-xl font-semibold text-sm"
            >
              Clear All Filters
            </button>
          </motion.div>
        ) : (
          <motion.div
            layout
            className={cn(
              'grid gap-6',
              viewMode === 'grid'
                ? 'grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4'
                : 'grid-cols-1'
            )}
          >
            <AnimatePresence>
              {filteredProducts.map((product, i) => (
                <ProductCard key={product.id} product={product} index={i} />
              ))}
            </AnimatePresence>
          </motion.div>
        )}
      </div>

      <Footer />
    </div>
  );
}
