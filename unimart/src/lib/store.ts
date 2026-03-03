// src/lib/store.ts
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Product, CartItem } from '@/types';

interface StoreState {
  // Cart
  cart: CartItem[];
  addToCart: (product: Product) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  cartTotal: () => number;
  cartCount: () => number;

  // Wishlist
  wishlist: string[];
  toggleWishlist: (productId: string) => void;
  isWishlisted: (productId: string) => boolean;

  // UI State
  cartOpen: boolean;
  setCartOpen: (open: boolean) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  selectedCampus: string;
  setSelectedCampus: (campus: string) => void;
}

export const useStore = create<StoreState>()(
  persist(
    (set, get) => ({
      // Cart
      cart: [],
      addToCart: (product) => {
        const existing = get().cart.find((i) => i.product.id === product.id);
        if (existing) {
          set((state) => ({
            cart: state.cart.map((i) =>
              i.product.id === product.id
                ? { ...i, quantity: i.quantity + 1 }
                : i
            ),
          }));
        } else {
          set((state) => ({
            cart: [...state.cart, { product, quantity: 1 }],
          }));
        }
      },
      removeFromCart: (productId) =>
        set((state) => ({
          cart: state.cart.filter((i) => i.product.id !== productId),
        })),
      updateQuantity: (productId, quantity) => {
        if (quantity <= 0) {
          get().removeFromCart(productId);
          return;
        }
        set((state) => ({
          cart: state.cart.map((i) =>
            i.product.id === productId ? { ...i, quantity } : i
          ),
        }));
      },
      clearCart: () => set({ cart: [] }),
      cartTotal: () =>
        get().cart.reduce(
          (total, item) => total + item.product.price * item.quantity,
          0
        ),
      cartCount: () =>
        get().cart.reduce((total, item) => total + item.quantity, 0),

      // Wishlist
      wishlist: [],
      toggleWishlist: (productId) => {
        const isWishlisted = get().wishlist.includes(productId);
        set((state) => ({
          wishlist: isWishlisted
            ? state.wishlist.filter((id) => id !== productId)
            : [...state.wishlist, productId],
        }));
      },
      isWishlisted: (productId) => get().wishlist.includes(productId),

      // UI
      cartOpen: false,
      setCartOpen: (open) => set({ cartOpen: open }),
      searchQuery: '',
      setSearchQuery: (query) => set({ searchQuery: query }),
      selectedCampus: 'All Campuses',
      setSelectedCampus: (campus) => set({ selectedCampus: campus }),
    }),
    {
      name: 'unimart-store',
      partialize: (state) => ({
        cart: state.cart,
        wishlist: state.wishlist,
        selectedCampus: state.selectedCampus,
      }),
    }
  )
);
