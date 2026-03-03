// src/lib/products.ts
import {
  collection,
  addDoc,
  getDocs,
  getDoc,
  doc,
  updateDoc,
  deleteDoc,
  query,
  where,
  orderBy,
  limit,
  increment,
  serverTimestamp,
  Timestamp,
} from 'firebase/firestore';
import { db } from './firebase';
import { Product, FilterState } from '@/types';

// Mock data for demo (replace with real Firestore queries)
export const MOCK_PRODUCTS: Product[] = [
  {
    id: '1',
    title: 'Engineering Mathematics Textbook (5th Ed)',
    description: 'Excellent condition. Used for just one semester. Perfect for 200-level engineering students. Has some light highlights but otherwise pristine.',
    price: 8500,
    originalPrice: 15000,
    images: ['https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=600'],
    category: 'textbooks',
    condition: 'good',
    campus: 'University of Lagos',
    university: 'University of Lagos',
    sellerId: 'seller1',
    sellerName: 'Chidi Okafor',
    sellerPhoto: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100',
    sellerRating: 4.8,
    tags: ['engineering', 'mathematics', 'textbook'],
    views: 234,
    likes: 45,
    sold: false,
    featured: true,
    createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
    updatedAt: new Date(),
    negotiable: true,
    location: 'Faculty of Engineering',
  },
  {
    id: '2',
    title: 'MacBook Air M1 (2021) - 8GB RAM',
    description: 'In perfect working condition. Bought brand new, lightly used. Comes with original charger and box. Battery health at 96%.',
    price: 420000,
    images: ['https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?w=600'],
    category: 'electronics',
    condition: 'like-new',
    campus: 'University of Lagos',
    university: 'University of Lagos',
    sellerId: 'seller2',
    sellerName: 'Amaka Eze',
    sellerPhoto: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100',
    sellerRating: 5.0,
    tags: ['macbook', 'laptop', 'apple', 'm1'],
    views: 891,
    likes: 134,
    sold: false,
    featured: true,
    createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
    updatedAt: new Date(),
    negotiable: false,
  },
  {
    id: '3',
    title: 'Nike Air Max 270 (Size 42)',
    description: 'Worn only twice. Still fresh in box. Bought for ₦65,000 but relocating. Authentic, not fake.',
    price: 42000,
    originalPrice: 65000,
    images: ['https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600'],
    category: 'clothing',
    condition: 'like-new',
    campus: 'Covenant University',
    university: 'Covenant University',
    sellerId: 'seller3',
    sellerName: 'Tunde Adeyemi',
    sellerRating: 4.6,
    tags: ['nike', 'sneakers', 'shoes'],
    views: 567,
    likes: 89,
    sold: false,
    featured: false,
    createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
    updatedAt: new Date(),
    negotiable: true,
  },
  {
    id: '4',
    title: 'Mini Study Desk + Chair Set',
    description: 'Perfect for hostel rooms. Compact design, very sturdy. Been using for 2 years, still solid. Moving off-campus, must go!',
    price: 18500,
    images: ['https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=600'],
    category: 'furniture',
    condition: 'good',
    campus: 'Ahmadu Bello University',
    university: 'Ahmadu Bello University',
    sellerId: 'seller4',
    sellerName: 'Fatima Umar',
    sellerRating: 4.9,
    tags: ['furniture', 'desk', 'study', 'hostel'],
    views: 312,
    likes: 67,
    sold: false,
    featured: false,
    createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
    updatedAt: new Date(),
    negotiable: true,
  },
  {
    id: '5',
    title: 'Calculus by James Stewart (8th Ed)',
    description: 'Standard calculus textbook for 100-level and 200-level science students. Good condition, minimal highlighting.',
    price: 6000,
    originalPrice: 12000,
    images: ['https://images.unsplash.com/photo-1509228468518-180dd4864904?w=600'],
    category: 'textbooks',
    condition: 'good',
    campus: 'University of Ibadan',
    university: 'University of Ibadan',
    sellerId: 'seller5',
    sellerName: 'Emeka Nwosu',
    sellerRating: 4.7,
    tags: ['calculus', 'mathematics', 'stewart'],
    views: 189,
    likes: 34,
    sold: false,
    featured: false,
    createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
    updatedAt: new Date(),
    negotiable: true,
  },
  {
    id: '6',
    title: 'JBL Flip 5 Bluetooth Speaker',
    description: 'Waterproof, deep bass. Perfect for dorm room vibes. All original, comes with charging cable and bag.',
    price: 35000,
    originalPrice: 55000,
    images: ['https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=600'],
    category: 'electronics',
    condition: 'like-new',
    campus: 'Lagos State University',
    university: 'Lagos State University',
    sellerId: 'seller6',
    sellerName: 'Blessing Okonkwo',
    sellerRating: 4.5,
    tags: ['jbl', 'speaker', 'bluetooth', 'audio'],
    views: 445,
    likes: 78,
    sold: false,
    featured: true,
    createdAt: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000),
    updatedAt: new Date(),
    negotiable: false,
  },
  {
    id: '7',
    title: 'Graphic Design Services (Logo, Flyers)',
    description: 'I create professional logos, event flyers, and social media graphics. Fast delivery within 24hrs. DM for portfolio.',
    price: 5000,
    images: ['https://images.unsplash.com/photo-1561070791-2526d30994b5?w=600'],
    category: 'services',
    condition: 'new',
    campus: 'Babcock University',
    university: 'Babcock University',
    sellerId: 'seller7',
    sellerName: 'Chisom Anyaegbu',
    sellerRating: 4.9,
    tags: ['design', 'graphics', 'logo', 'flyer'],
    views: 678,
    likes: 102,
    sold: false,
    featured: false,
    createdAt: new Date(Date.now() - 6 * 24 * 60 * 60 * 1000),
    updatedAt: new Date(),
    negotiable: true,
  },
  {
    id: '8',
    title: 'HP LaserJet Printer (Wireless)',
    description: 'Works perfectly. Print wirelessly from your phone. Includes ink cartridge (70% remaining). Great for assignments.',
    price: 45000,
    images: ['https://images.unsplash.com/photo-1612815154858-60aa4c59eaa6?w=600'],
    category: 'electronics',
    condition: 'good',
    campus: 'University of Nigeria',
    university: 'University of Nigeria',
    sellerId: 'seller8',
    sellerName: 'Kelechi Uba',
    sellerRating: 4.3,
    tags: ['printer', 'hp', 'wireless', 'laser'],
    views: 234,
    likes: 41,
    sold: false,
    featured: false,
    createdAt: new Date(Date.now() - 8 * 24 * 60 * 60 * 1000),
    updatedAt: new Date(),
    negotiable: true,
  },
];

// Firestore CRUD functions
export async function createProduct(productData: Omit<Product, 'id' | 'createdAt' | 'updatedAt' | 'views' | 'likes'>) {
  const docRef = await addDoc(collection(db, 'products'), {
    ...productData,
    views: 0,
    likes: 0,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  });
  return docRef.id;
}

export async function getProducts(filters?: Partial<FilterState>) {
  // In production, build dynamic query from filters
  // For now, return mock data filtered client-side
  return MOCK_PRODUCTS;
}

export async function getProductById(id: string): Promise<Product | null> {
  // Check mock first
  const mock = MOCK_PRODUCTS.find((p) => p.id === id);
  if (mock) return mock;

  try {
    const docSnap = await getDoc(doc(db, 'products', id));
    if (docSnap.exists()) {
      return { id: docSnap.id, ...docSnap.data() } as Product;
    }
  } catch (error) {
    console.error('Error getting product:', error);
  }
  return null;
}

export async function incrementViews(productId: string) {
  try {
    await updateDoc(doc(db, 'products', productId), {
      views: increment(1),
    });
  } catch (_) {
    // Silently fail for mock products
  }
}

export async function getSellerProducts(sellerId: string) {
  return MOCK_PRODUCTS.filter((p) => p.sellerId === sellerId);
}

export function formatPrice(price: number): string {
  return new Intl.NumberFormat('en-NG', {
    style: 'currency',
    currency: 'NGN',
    minimumFractionDigits: 0,
  }).format(price);
}
