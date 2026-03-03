// src/components/layout/Footer.tsx
import Link from 'next/link';
import { Instagram, Twitter, Facebook, Mail, MapPin, Phone } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-primary text-white relative overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 hero-pattern opacity-30 pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">

          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-9 h-9 rounded-xl bg-accent flex items-center justify-center">
                <span className="text-white font-display font-bold text-base">U</span>
              </div>
              <span className="font-display font-bold text-xl">
                uni<span className="text-accent">mart</span>
              </span>
            </div>
            <p className="text-white/60 text-sm leading-relaxed mb-6">
              The campus marketplace built by students, for students. Buy and sell anything within your university community.
            </p>
            <div className="flex items-center gap-3">
              {[
                { icon: Instagram, href: '#' },
                { icon: Twitter, href: '#' },
                { icon: Facebook, href: '#' },
              ].map(({ icon: Icon, href }, i) => (
                <a
                  key={i}
                  href={href}
                  className="w-9 h-9 rounded-xl bg-white/10 flex items-center justify-center hover:bg-accent transition-colors"
                >
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </div>

          {/* Links */}
          <div>
            <h4 className="font-display font-semibold mb-4 text-white">Marketplace</h4>
            <ul className="space-y-3">
              {[
                ['Browse All', '/marketplace'],
                ['Textbooks', '/marketplace?category=textbooks'],
                ['Electronics', '/marketplace?category=electronics'],
                ['Services', '/marketplace?category=services'],
                ['Clothing', '/marketplace?category=clothing'],
              ].map(([label, href]) => (
                <li key={label}>
                  <Link href={href} className="text-white/60 text-sm hover:text-accent transition-colors">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-display font-semibold mb-4 text-white">For Sellers</h4>
            <ul className="space-y-3">
              {[
                ['Start Selling', '/upload'],
                ['Seller Dashboard', '/dashboard'],
                ['Pricing Guide', '#'],
                ['Seller Tips', '#'],
                ['Safety Guide', '#'],
              ].map(([label, href]) => (
                <li key={label}>
                  <Link href={href} className="text-white/60 text-sm hover:text-accent transition-colors">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-display font-semibold mb-4 text-white">Contact</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3 text-white/60 text-sm">
                <Mail size={16} className="mt-0.5 flex-shrink-0 text-accent" />
                hello@unimart.ng
              </li>
              <li className="flex items-start gap-3 text-white/60 text-sm">
                <Phone size={16} className="mt-0.5 flex-shrink-0 text-accent" />
                +234 800 000 0000
              </li>
              <li className="flex items-start gap-3 text-white/60 text-sm">
                <MapPin size={16} className="mt-0.5 flex-shrink-0 text-accent" />
                Lagos, Nigeria
              </li>
            </ul>

            <div className="mt-6 p-4 bg-white/5 rounded-2xl border border-white/10">
              <p className="text-xs text-white/40 mb-2">Stay updated</p>
              <div className="flex gap-2">
                <input
                  type="email"
                  placeholder="your@edu.ng"
                  className="flex-1 bg-white/10 border border-white/10 rounded-xl px-3 py-2 text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-accent"
                />
                <button className="px-3 py-2 bg-accent rounded-xl text-sm font-semibold hover:bg-accent/80 transition-colors">
                  Go
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-white/40 text-sm">
            © {new Date().getFullYear()} Unimart Technologies Ltd. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            <Link href="#" className="text-white/40 text-xs hover:text-white/70 transition-colors">Privacy</Link>
            <Link href="#" className="text-white/40 text-xs hover:text-white/70 transition-colors">Terms</Link>
            <Link href="#" className="text-white/40 text-xs hover:text-white/70 transition-colors">Support</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
