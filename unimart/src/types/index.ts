// src/types/index.ts

export interface User {
  uid: string;
  email: string;
  displayName: string;
  photoURL?: string;
  university: string;
  campus: string;
  joinedAt: Date;
  rating: number;
  totalSales: number;
  bio?: string;
  whatsapp?: string;
  verified: boolean;
}

export interface Product {
  id: string;
  title: string;
  description: string;
  price: number;
  originalPrice?: number;
  images: string[];
  category: Category;
  condition: Condition;
  campus: string;
  university: string;
  sellerId: string;
  sellerName: string;
  sellerPhoto?: string;
  sellerRating: number;
  tags: string[];
  views: number;
  likes: number;
  sold: boolean;
  featured: boolean;
  createdAt: Date;
  updatedAt: Date;
  negotiable: boolean;
  location?: string;
}

export type Category =
  | 'textbooks'
  | 'electronics'
  | 'clothing'
  | 'furniture'
  | 'sports'
  | 'food'
  | 'services'
  | 'stationery'
  | 'beauty'
  | 'other';

export type Condition = 'new' | 'like-new' | 'good' | 'fair' | 'poor';

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface WishlistItem {
  productId: string;
  addedAt: Date;
}

export interface Message {
  id: string;
  senderId: string;
  receiverId: string;
  productId: string;
  content: string;
  createdAt: Date;
  read: boolean;
}

export interface Review {
  id: string;
  reviewerId: string;
  reviewerName: string;
  reviewerPhoto?: string;
  sellerId: string;
  productId: string;
  rating: number;
  comment: string;
  createdAt: Date;
}

export interface FilterState {
  category: Category | 'all';
  campus: string;
  priceMin: number | null;
  priceMax: number | null;
  condition: Condition | 'all';
  sortBy: 'newest' | 'price-asc' | 'price-desc' | 'popular';
}

export const CATEGORIES: { value: Category | 'all'; label: string; emoji: string }[] = [
  { value: 'all', label: 'All Items', emoji: '🛍️' },
  { value: 'textbooks', label: 'Textbooks', emoji: '📚' },
  { value: 'electronics', label: 'Electronics', emoji: '💻' },
  { value: 'clothing', label: 'Clothing', emoji: '👕' },
  { value: 'furniture', label: 'Furniture', emoji: '🛋️' },
  { value: 'sports', label: 'Sports', emoji: '⚽' },
  { value: 'food', label: 'Food & Snacks', emoji: '🍕' },
  { value: 'services', label: 'Services', emoji: '🔧' },
  { value: 'stationery', label: 'Stationery', emoji: '✏️' },
  { value: 'beauty', label: 'Beauty', emoji: '💄' },
  { value: 'other', label: 'Other', emoji: '📦' },
];

export const CAMPUSES = [
  'All Campuses',
  'University of Lagos',
  'University of Ibadan',
  'Ahmadu Bello University',
  'University of Nigeria',
  'Obafemi Awolowo University',
  'University of Benin',
  'Lagos State University',
  'Covenant University',
  'Babcock University',
  'Pan-Atlantic University',
];

export const CONDITIONS: { value: Condition | 'all'; label: string }[] = [
  { value: 'all', label: 'Any Condition' },
  { value: 'new', label: 'Brand New' },
  { value: 'like-new', label: 'Like New' },
  { value: 'good', label: 'Good' },
  { value: 'fair', label: 'Fair' },
  { value: 'poor', label: 'Poor' },
];
