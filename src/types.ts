export interface Lead {
  id: string;
  firstName: string;
  email: string;
  timestamp: string;
  couponCode: string;
}

export interface MenuItem {
  id: string;
  name: string;
  price: string;
  description: string;
  image: string;
  category: 'bread' | 'pastry' | 'confectionery';
  details: {
    ingredients: string[];
    allergens: string[];
    tasteProfile: string[];
    prepTime: string;
  };
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  rating: number;
  comment: string;
  avatarSeed: string;
  date: string;
}

export interface Reservation {
  id: string;
  name: string;
  email: string;
  itemId: string;
  itemName: string;
  quantity: number;
  pickupTime: string;
}
