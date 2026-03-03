// src/app/upload/page.tsx
'use client';
import { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Upload, X, Camera, DollarSign, Tag, MapPin, Package,
  CheckCircle, AlertCircle, Plus, ArrowRight, Info
} from 'lucide-react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { CATEGORIES, CAMPUSES, CONDITIONS, Category, Condition } from '@/types';
import { cn } from '@/lib/utils';

interface FormData {
  title: string;
  description: string;
  price: string;
  originalPrice: string;
  category: Category;
  condition: Condition;
  campus: string;
  negotiable: boolean;
  tags: string;
  images: string[];
}

export default function UploadPage() {
  const [step, setStep] = useState(1);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [dragOver, setDragOver] = useState(false);
  const [form, setForm] = useState<FormData>({
    title: '',
    description: '',
    price: '',
    originalPrice: '',
    category: 'textbooks',
    condition: 'good',
    campus: 'University of Lagos',
    negotiable: false,
    tags: '',
    images: [],
  });

  const totalSteps = 3;

  const handleImageUpload = (files: FileList | null) => {
    if (!files) return;
    const newImages: string[] = [];
    Array.from(files).slice(0, 5 - form.images.length).forEach((file) => {
      const url = URL.createObjectURL(file);
      newImages.push(url);
    });
    setForm({ ...form, images: [...form.images, ...newImages] });
  };

  const handleSubmit = async () => {
    setSubmitting(true);
    await new Promise((r) => setTimeout(r, 2000)); // Simulate API call
    setSubmitting(false);
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-surface flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center px-6 max-w-md"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', stiffness: 300, delay: 0.2 }}
            className="w-24 h-24 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-6"
          >
            <CheckCircle size={48} className="text-green-500" />
          </motion.div>
          <h1 className="font-display font-bold text-3xl text-ink mb-3">Listed Successfully!</h1>
          <p className="text-ink/60 mb-8">
            Your item is now live on Unimart. Buyers can now find and contact you about it.
          </p>
          <div className="flex flex-col gap-3">
            <a href="/marketplace">
              <button className="w-full py-4 bg-primary text-white rounded-2xl font-bold">
                View Marketplace
              </button>
            </a>
            <button
              onClick={() => { setSubmitted(false); setStep(1); setForm({ ...form, title: '', description: '', images: [] }); }}
              className="w-full py-4 border-2 border-primary text-primary rounded-2xl font-bold"
            >
              List Another Item
            </button>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-surface">
      <Navbar />

      <div className="pt-24 pb-20">
        {/* Header */}
        <div className="bg-primary py-12 px-6 mb-8 relative overflow-hidden">
          <div className="absolute inset-0 hero-pattern" />
          <div className="max-w-2xl mx-auto relative text-center">
            <h1 className="font-display font-bold text-3xl text-white mb-2">List Your Item</h1>
            <p className="text-white/60">Reach thousands of students on your campus</p>
          </div>
        </div>

        <div className="max-w-2xl mx-auto px-6">
          {/* Progress */}
          <div className="mb-10">
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm font-semibold text-ink">Step {step} of {totalSteps}</span>
              <span className="text-sm text-ink/50">{Math.round((step / totalSteps) * 100)}% complete</span>
            </div>
            <div className="h-2 bg-primary/10 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-primary to-accent rounded-full"
                initial={{ width: '33%' }}
                animate={{ width: `${(step / totalSteps) * 100}%` }}
                transition={{ type: 'spring', stiffness: 200 }}
              />
            </div>
            <div className="flex justify-between mt-2">
              {['Details', 'Pricing', 'Preview'].map((label, i) => (
                <span
                  key={label}
                  className={cn('text-xs font-medium transition-colors', step > i ? 'text-primary' : 'text-ink/30')}
                >
                  {label}
                </span>
              ))}
            </div>
          </div>

          <AnimatePresence mode="wait">
            {/* ─── STEP 1: Product Details ─── */}
            {step === 1 && (
              <motion.div
                key="step1"
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -30 }}
                className="space-y-6"
              >
                <div className="bg-white rounded-3xl border border-primary/5 shadow-card p-6 space-y-5">
                  <h2 className="font-display font-bold text-xl text-ink">Product Details</h2>

                  {/* Images upload */}
                  <div>
                    <label className="block text-sm font-semibold text-ink mb-2">
                      Photos <span className="text-ink/40 font-normal">(up to 5)</span>
                    </label>
                    <div
                      onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
                      onDragLeave={() => setDragOver(false)}
                      onDrop={(e) => { e.preventDefault(); setDragOver(false); handleImageUpload(e.dataTransfer.files); }}
                      className={cn(
                        'relative border-2 border-dashed rounded-2xl p-6 text-center transition-all cursor-pointer',
                        dragOver ? 'border-accent bg-accent/5' : 'border-primary/20 hover:border-primary/40'
                      )}
                      onClick={() => document.getElementById('imageInput')?.click()}
                    >
                      <input
                        id="imageInput"
                        type="file"
                        multiple
                        accept="image/*"
                        className="hidden"
                        onChange={(e) => handleImageUpload(e.target.files)}
                      />
                      <Upload size={32} className="text-primary/30 mx-auto mb-3" />
                      <p className="text-sm font-semibold text-ink/70">Drop photos here or click to upload</p>
                      <p className="text-xs text-ink/40 mt-1">PNG, JPG up to 10MB each</p>
                    </div>

                    {form.images.length > 0 && (
                      <div className="grid grid-cols-5 gap-3 mt-3">
                        {form.images.map((img, i) => (
                          <div key={i} className="relative aspect-square rounded-xl overflow-hidden bg-surface group">
                            <Image src={img} alt="" fill className="object-cover" />
                            <button
                              onClick={() => setForm({ ...form, images: form.images.filter((_, j) => j !== i) })}
                              className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center"
                            >
                              <X size={18} className="text-white" />
                            </button>
                            {i === 0 && (
                              <span className="absolute bottom-1 left-1 bg-primary text-white text-[10px] font-bold px-1.5 py-0.5 rounded">
                                Cover
                              </span>
                            )}
                          </div>
                        ))}
                        {form.images.length < 5 && (
                          <button
                            onClick={() => document.getElementById('imageInput')?.click()}
                            className="aspect-square rounded-xl border-2 border-dashed border-primary/20 flex items-center justify-center hover:border-primary/40 transition-colors"
                          >
                            <Plus size={18} className="text-primary/40" />
                          </button>
                        )}
                      </div>
                    )}
                  </div>

                  {/* Title */}
                  <div>
                    <label className="block text-sm font-semibold text-ink mb-2">Title *</label>
                    <input
                      type="text"
                      placeholder="e.g. Engineering Mathematics 3rd Edition"
                      value={form.title}
                      onChange={(e) => setForm({ ...form, title: e.target.value })}
                      className="w-full bg-surface border border-primary/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-accent/30"
                      maxLength={100}
                    />
                    <p className="text-xs text-ink/30 mt-1 text-right">{form.title.length}/100</p>
                  </div>

                  {/* Description */}
                  <div>
                    <label className="block text-sm font-semibold text-ink mb-2">Description *</label>
                    <textarea
                      rows={4}
                      placeholder="Describe your item in detail. Include condition, why you're selling, and any other relevant info..."
                      value={form.description}
                      onChange={(e) => setForm({ ...form, description: e.target.value })}
                      className="w-full bg-surface border border-primary/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-accent/30 resize-none"
                    />
                  </div>

                  {/* Category + Condition */}
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-semibold text-ink mb-2">Category *</label>
                      <select
                        value={form.category}
                        onChange={(e) => setForm({ ...form, category: e.target.value as Category })}
                        className="w-full bg-surface border border-primary/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-accent/30"
                      >
                        {CATEGORIES.filter((c) => c.value !== 'all').map((c) => (
                          <option key={c.value} value={c.value}>{c.emoji} {c.label}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-ink mb-2">Condition *</label>
                      <select
                        value={form.condition}
                        onChange={(e) => setForm({ ...form, condition: e.target.value as Condition })}
                        className="w-full bg-surface border border-primary/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-accent/30"
                      >
                        {CONDITIONS.filter((c) => c.value !== 'all').map((c) => (
                          <option key={c.value} value={c.value}>{c.label}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Campus */}
                  <div>
                    <label className="block text-sm font-semibold text-ink mb-2">
                      <span className="flex items-center gap-1.5"><MapPin size={14} /> Your Campus *</span>
                    </label>
                    <select
                      value={form.campus}
                      onChange={(e) => setForm({ ...form, campus: e.target.value })}
                      className="w-full bg-surface border border-primary/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-accent/30"
                    >
                      {CAMPUSES.filter((c) => c !== 'All Campuses').map((c) => (
                        <option key={c} value={c}>{c}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <button
                  onClick={() => setStep(2)}
                  disabled={!form.title || !form.description}
                  className="w-full flex items-center justify-center gap-2 py-4 bg-primary text-white rounded-2xl font-bold disabled:opacity-50 disabled:cursor-not-allowed hover:bg-accent transition-colors group"
                >
                  Continue to Pricing
                  <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                </button>
              </motion.div>
            )}

            {/* ─── STEP 2: Pricing ─── */}
            {step === 2 && (
              <motion.div
                key="step2"
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -30 }}
                className="space-y-6"
              >
                <div className="bg-white rounded-3xl border border-primary/5 shadow-card p-6 space-y-5">
                  <h2 className="font-display font-bold text-xl text-ink">Pricing & Tags</h2>

                  {/* Price */}
                  <div>
                    <label className="block text-sm font-semibold text-ink mb-2">Selling Price *</label>
                    <div className="relative">
                      <span className="absolute left-4 top-1/2 -translate-y-1/2 text-ink/40 font-bold">₦</span>
                      <input
                        type="number"
                        placeholder="0"
                        value={form.price}
                        onChange={(e) => setForm({ ...form, price: e.target.value })}
                        className="w-full bg-surface border border-primary/10 rounded-xl pl-8 pr-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-accent/30"
                      />
                    </div>
                  </div>

                  {/* Original price */}
                  <div>
                    <label className="block text-sm font-semibold text-ink mb-1">
                      Original Price <span className="text-ink/40 font-normal">(optional — shows discount)</span>
                    </label>
                    <div className="relative">
                      <span className="absolute left-4 top-1/2 -translate-y-1/2 text-ink/40 font-bold">₦</span>
                      <input
                        type="number"
                        placeholder="0"
                        value={form.originalPrice}
                        onChange={(e) => setForm({ ...form, originalPrice: e.target.value })}
                        className="w-full bg-surface border border-primary/10 rounded-xl pl-8 pr-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-accent/30"
                      />
                    </div>
                  </div>

                  {/* Negotiable toggle */}
                  <div className="flex items-center justify-between p-4 bg-surface rounded-2xl">
                    <div>
                      <p className="text-sm font-semibold text-ink">Open to Negotiation?</p>
                      <p className="text-xs text-ink/50">Buyers can make offers below your listed price</p>
                    </div>
                    <button
                      onClick={() => setForm({ ...form, negotiable: !form.negotiable })}
                      className={cn(
                        'relative w-12 h-6 rounded-full transition-colors',
                        form.negotiable ? 'bg-accent' : 'bg-ink/20'
                      )}
                    >
                      <motion.div
                        className="absolute top-1 w-4 h-4 bg-white rounded-full shadow"
                        animate={{ left: form.negotiable ? '26px' : '4px' }}
                        transition={{ type: 'spring', stiffness: 500 }}
                      />
                    </button>
                  </div>

                  {/* Tags */}
                  <div>
                    <label className="block text-sm font-semibold text-ink mb-1">
                      Tags <span className="text-ink/40 font-normal">(comma separated)</span>
                    </label>
                    <div className="relative">
                      <Tag size={14} className="absolute left-4 top-1/2 -translate-y-1/2 text-ink/40" />
                      <input
                        type="text"
                        placeholder="e.g. textbook, engineering, 200-level"
                        value={form.tags}
                        onChange={(e) => setForm({ ...form, tags: e.target.value })}
                        className="w-full bg-surface border border-primary/10 rounded-xl pl-10 pr-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-accent/30"
                      />
                    </div>
                    <p className="text-xs text-ink/40 mt-1">
                      Tags help buyers find your listing more easily
                    </p>
                  </div>

                  {/* Pricing tip */}
                  <div className="flex items-start gap-3 p-4 bg-amber-50 rounded-2xl border border-amber-100">
                    <Info size={16} className="text-amber-600 flex-shrink-0 mt-0.5" />
                    <p className="text-xs text-amber-700">
                      <strong>Pricing tip:</strong> Items priced 20-30% below market value sell 3x faster. Research similar listings to find the sweet spot.
                    </p>
                  </div>
                </div>

                <div className="flex gap-3">
                  <button
                    onClick={() => setStep(1)}
                    className="px-6 py-4 border-2 border-primary/20 text-primary rounded-2xl font-bold hover:border-primary transition-colors"
                  >
                    Back
                  </button>
                  <button
                    onClick={() => setStep(3)}
                    disabled={!form.price}
                    className="flex-1 flex items-center justify-center gap-2 py-4 bg-primary text-white rounded-2xl font-bold disabled:opacity-50 hover:bg-accent transition-colors group"
                  >
                    Preview Listing
                    <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              </motion.div>
            )}

            {/* ─── STEP 3: Preview ─── */}
            {step === 3 && (
              <motion.div
                key="step3"
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -30 }}
                className="space-y-6"
              >
                <div className="bg-white rounded-3xl border border-primary/5 shadow-card overflow-hidden">
                  {/* Preview image */}
                  <div className="aspect-video relative bg-surface">
                    {form.images[0] ? (
                      <Image src={form.images[0]} alt="Preview" fill className="object-cover" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <Camera size={48} className="text-primary/20" />
                      </div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                    <div className="absolute bottom-4 left-4">
                      <span className="px-3 py-1.5 bg-accent text-white text-xs font-bold rounded-xl capitalize">
                        {form.category}
                      </span>
                    </div>
                  </div>

                  <div className="p-6 space-y-4">
                    <h3 className="font-display font-bold text-xl text-ink">{form.title || 'Your Product Title'}</h3>

                    <div className="flex items-baseline gap-3">
                      <span className="font-display font-bold text-2xl text-primary">
                        ₦{Number(form.price || 0).toLocaleString()}
                      </span>
                      {form.originalPrice && (
                        <span className="text-ink/30 line-through">₦{Number(form.originalPrice).toLocaleString()}</span>
                      )}
                      {form.negotiable && (
                        <span className="text-green-600 text-sm font-semibold">Negotiable</span>
                      )}
                    </div>

                    <p className="text-ink/60 text-sm leading-relaxed">
                      {form.description || 'Your product description will appear here.'}
                    </p>

                    <div className="flex items-center gap-4 text-sm text-ink/50">
                      <span className="flex items-center gap-1"><MapPin size={13} /> {form.campus}</span>
                      <span className="flex items-center gap-1"><Package size={13} /> {form.condition}</span>
                    </div>

                    {form.tags && (
                      <div className="flex flex-wrap gap-2">
                        {form.tags.split(',').map((tag) => (
                          <span key={tag} className="px-2.5 py-1 bg-surface text-ink/60 text-xs rounded-lg">
                            #{tag.trim()}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                <div className="p-4 bg-green-50 rounded-2xl border border-green-100 flex items-start gap-3">
                  <CheckCircle size={18} className="text-green-500 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm font-semibold text-green-700">Looking good!</p>
                    <p className="text-xs text-green-600/80">Your listing is ready to go live. It will be visible to all students on {form.campus}.</p>
                  </div>
                </div>

                <div className="flex gap-3">
                  <button
                    onClick={() => setStep(2)}
                    className="px-6 py-4 border-2 border-primary/20 text-primary rounded-2xl font-bold"
                  >
                    Back
                  </button>
                  <motion.button
                    onClick={handleSubmit}
                    disabled={submitting}
                    className="flex-1 flex items-center justify-center gap-2 py-4 bg-accent text-white rounded-2xl font-bold hover:bg-accent/90 transition-colors"
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    {submitting ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        Publishing...
                      </>
                    ) : (
                      <>🚀 Publish Listing</>
                    )}
                  </motion.button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      <Footer />
    </div>
  );
}
