export type ActivePage = 'home' | 'shop' | 'reviews' | 'checkout' | 'contact' | 'profile';

export interface UserProfile {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  salutation: 'Ms.' | 'Mr.' | 'Mx.' | 'Dr.';
  preferredFit: 'Relaxed' | 'True to Size' | 'Tailored / Structured';
  preferredPalette: 'Earth & Terracotta' | 'Monochrome & Noir' | 'Sunwashed Chalk & Sage';
  favoriteFabric: 'French Flax Linen' | 'Raw Mulberry Silk' | 'Organic Pima Cotton';
  sizeTop: 'XS' | 'S' | 'M' | 'L' | 'XL';
  sizeBottom: '28' | '30' | '32' | '34' | '36';
  shoeSize: '37' | '38' | '39' | '40' | '41' | '42';
  street: string;
  city: string;
  state: string;
  zip: string;
  country: string;
  newsletterSubscribed: boolean;
  smsDropAlerts: boolean;
  membershipTier: 'Atelier Circle' | 'Private Collector' | 'Lumière Patron';
  rewardPoints: number;
}

export interface Product {
  id: string;
  name: string;
  category: 'Dresses & Sets' | 'Linen Tops' | 'Relaxed Trousers' | 'Knitwear';
  subtitle: string;
  description: string;
  price: number;
  originalPrice?: number;
  discountPercentage?: number;
  rating: number;
  reviewCount: number;
  badge?: string;
  isBestseller?: boolean;
  isStaffPick?: boolean;
  isFlashSale?: boolean;
  flashTimer?: string;
  colors: { name: string; hex: string }[];
  sizes: string[];
  imageUrl: string;
  altText: string;
}

export interface CartItem {
  id: string;
  productId: string;
  name: string;
  variant: string;
  price: number;
  originalPrice?: number;
  quantity: number;
  imageUrl: string;
  discountBadge?: string;
}

export interface ReviewItem {
  id: string;
  author: string;
  location: string;
  avatarUrl: string;
  timeAgo: string;
  productPurchased: string;
  rating: number;
  headline: string;
  commentary: string;
  photoUrl?: string;
  photoAlt?: string;
  fit: 'True to Size' | 'Slightly Small' | 'Slightly Relaxed';
  fabric?: string;
  weight?: string;
  tailoring?: string;
  quality: string;
  helpfulCount: number;
  isVerified: boolean;
}

export interface LookbookItem {
  id: string;
  title: string;
  handle: string;
  quote: string;
  authorLocation: string;
  imageUrl: string;
  altText: string;
  stars: number;
}
