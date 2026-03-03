# 🎓 Unimart — Campus Marketplace

> Nigeria's #1 Student-Only Marketplace. Built for campus life.

![Unimart Banner](https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=1200&q=80)

## ✨ Overview

Unimart is a full-featured campus marketplace where university students can buy and sell items within their campus community. Built with a Jumia-level UX but with a unique, youthful startup aesthetic.

## 🛠 Tech Stack

| Technology | Purpose |
|-----------|---------|
| **Next.js 14** | React framework with App Router |
| **TypeScript** | Type safety |
| **Tailwind CSS** | Utility-first styling |
| **Framer Motion** | Animations & transitions |
| **Firebase Auth** | Student authentication |
| **Firestore** | Real-time database |
| **Firebase Storage** | Image uploads |
| **Zustand** | Global state management |

## 🎨 Design System

```
Colors:
  Primary:    #1E2A78  (Deep Indigo Blue)
  Accent:     #FF7A00  (Vibrant Orange)
  Background: #F5F6FA  (Soft Surface)
  Text:       #111827  (Near Black)

Typography:
  Display: Syne (headers, branding)
  Body: DM Sans (content, UI)
  Mono: JetBrains Mono (code)
```

## 📁 Project Structure

```
src/
├── app/
│   ├── page.tsx              # Landing page
│   ├── marketplace/
│   │   └── page.tsx          # Browse listings with filters
│   ├── product/[id]/
│   │   └── page.tsx          # Product detail page
│   ├── upload/
│   │   └── page.tsx          # 3-step listing wizard
│   ├── dashboard/
│   │   └── page.tsx          # Seller dashboard
│   ├── profile/
│   │   └── page.tsx          # User profile
│   ├── auth/
│   │   └── page.tsx          # Login / Signup
│   ├── layout.tsx            # Root layout
│   └── globals.css           # Global styles
├── components/
│   ├── layout/
│   │   ├── Navbar.tsx        # Responsive navigation
│   │   └── Footer.tsx        # Site footer
│   ├── marketplace/
│   │   └── ProductCard.tsx   # Product card + skeleton
│   └── ui/
│       └── CartDrawer.tsx    # Slide-in cart
├── lib/
│   ├── firebase.ts           # Firebase init
│   ├── auth.ts               # Auth functions
│   ├── products.ts           # Product CRUD + mock data
│   ├── store.ts              # Zustand global store
│   └── utils.ts              # Helpers (formatPrice, etc.)
├── hooks/
│   └── useAuth.ts            # Auth state hook
└── types/
    └── index.ts              # TypeScript interfaces
```

## 🚀 Getting Started

### 1. Install dependencies
```bash
cd unimart
npm install
```

### 2. Configure Firebase
```bash
cp .env.example .env.local
```
Then fill in your Firebase credentials from [console.firebase.google.com](https://console.firebase.google.com).

**Firebase Setup:**
1. Create a new project at firebase.google.com
2. Enable **Authentication** → Email/Password + Google
3. Create **Firestore Database** in production mode
4. Enable **Storage** for image uploads
5. Copy config to `.env.local`

### 3. Run development server
```bash
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000)

### 4. Build for production
```bash
npm run build
npm start
```

## 📱 Pages

| Route | Description |
|-------|-------------|
| `/` | Landing page with hero, categories, featured products |
| `/marketplace` | Browse all listings with advanced filters |
| `/product/[id]` | Product detail with contact seller |
| `/upload` | 3-step product listing wizard |
| `/dashboard` | Seller stats, listings management |
| `/profile` | User profile, wishlist, reviews |
| `/auth` | Login / Signup with Google OAuth |

## 🎬 Animation Features

- **Hero Section**: Parallax scroll, floating product cards, staggered reveals
- **Product Cards**: Hover lift effect, cart add animation, wishlist toggle
- **Page Transitions**: Smooth enter/exit animations
- **Skeleton Loading**: Shimmer loading states
- **Cart Drawer**: Spring-based slide animation
- **Filter Panel**: Collapsible with height animation
- **Step Wizard**: Slide transitions between steps

## 🗄️ Firestore Data Structure

```
/users/{uid}
  - displayName, email, university, campus
  - rating, totalSales, verified, bio, whatsapp

/products/{productId}
  - title, description, price, originalPrice
  - images[], category, condition, campus
  - sellerId, sellerName, sellerRating
  - views, likes, sold, featured, negotiable
  - createdAt, updatedAt

/messages/{messageId}
  - senderId, receiverId, productId, content
  - createdAt, read
```

## 🔐 Firebase Security Rules (Firestore)

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /users/{userId} {
      allow read: if request.auth != null;
      allow write: if request.auth.uid == userId;
    }
    match /products/{productId} {
      allow read: if true;
      allow create: if request.auth != null;
      allow update, delete: if request.auth.uid == resource.data.sellerId;
    }
  }
}
```

## 🔮 Roadmap

- [ ] Real-time messaging (Firebase Realtime DB)
- [ ] Push notifications
- [ ] Campus verification via .edu email
- [ ] Product image compression
- [ ] Seller ratings & review system
- [ ] WhatsApp deep link integration
- [ ] Admin moderation panel
- [ ] PWA support (offline browsing)
- [ ] Mobile app (React Native)

## 📦 Deployment

Deploy to Vercel in one click:
1. Push to GitHub
2. Import to [vercel.com](https://vercel.com)
3. Add Firebase env vars in Vercel dashboard
4. Deploy!

---

Built with ❤️ for Nigerian university students.
