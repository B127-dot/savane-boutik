import React, { createContext, useContext, useState, useEffect } from 'react';

export interface User {
  id: string;
  email: string;
  name: string;
  role: 'admin' | 'user';
  shopName?: string;
  phone?: string;
  address?: string;
}

export interface Category {
  id: string;
  name: string;
  description: string;
  userId: string;
}

export interface ShopSettings {
  userId: string;
  shopName: string;
  logo?: string;
  primaryColor: string;
  shopUrl: string;
  description: string;
  phone: string;
  address: string;
  socialLinks: {
    whatsapp?: string;
    facebook?: string;
    instagram?: string;
  };
}

export interface CartItem {
  productId: string;
  quantity: number;
  selectedVariants?: { [key: string]: string };
}

export interface PromoCode {
  id: string;
  code: string;
  type: 'percentage' | 'fixed';
  value: number;
  userId: string;
  expiresAt: string;
  isActive: boolean;
}

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  images: string[];
  categoryId: string;
  stock: number;
  status: 'active' | 'inactive';
  userId: string;
  variants?: {
    [key: string]: string[];
  };
  seoTitle?: string;
  seoDescription?: string;
}

export interface Order {
  id: string;
  userId: string;
  products: { 
    productId: string; 
    quantity: number; 
    price: number;
    selectedVariants?: { [key: string]: string };
  }[];
  total: number;
  status: 'pending' | 'confirmed' | 'shipped' | 'delivered' | 'cancelled';
  createdAt: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  deliveryAddress: string;
  paymentMethod: 'orange_money' | 'moov_money' | 'cod' | 'wave';
  promoCode?: string;
  discount?: number;
}

interface AppContextType {
  user: User | null;
  products: Product[];
  orders: Order[];
  categories: Category[];
  shopSettings: ShopSettings | null;
  cart: CartItem[];
  promoCodes: PromoCode[];
  
  // Auth
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  signup: (email: string, password: string, name: string, shopName: string) => Promise<boolean>;
  
  // Products
  addProduct: (product: Omit<Product, 'id' | 'userId'>) => void;
  updateProduct: (id: string, product: Partial<Product>) => void;
  deleteProduct: (id: string) => void;
  
  // Categories
  addCategory: (category: Omit<Category, 'id' | 'userId'>) => void;
  updateCategory: (id: string, category: Partial<Category>) => void;
  deleteCategory: (id: string) => void;
  
  // Orders
  addOrder: (order: Omit<Order, 'id' | 'createdAt' | 'userId'>) => void;
  updateOrderStatus: (id: string, status: Order['status']) => void;
  
  // Cart
  addToCart: (item: CartItem) => void;
  removeFromCart: (productId: string) => void;
  updateCartItem: (productId: string, quantity: number) => void;
  clearCart: () => void;
  
  // Shop Settings
  updateShopSettings: (settings: Partial<ShopSettings>) => void;
  
  // Promo Codes
  addPromoCode: (promoCode: Omit<PromoCode, 'id' | 'userId'>) => void;
  updatePromoCode: (id: string, promoCode: Partial<PromoCode>) => void;
  deletePromoCode: (id: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};

// Mock data
const mockCategories: Category[] = [
  { id: '1', name: 'Électronique', description: 'Appareils électroniques', userId: '1' },
  { id: '2', name: 'Mode', description: 'Vêtements et accessoires', userId: '1' },
  { id: '3', name: 'Maison', description: 'Articles pour la maison', userId: '1' }
];

const mockProducts: Product[] = [
  {
    id: '1',
    name: 'Laptop Gaming',
    description: 'Ordinateur portable haute performance',
    price: 650000, // Prix en XOF
    images: ['/placeholder.svg'],
    categoryId: '1',
    stock: 10,
    status: 'active',
    userId: '1'
  },
  {
    id: '2',
    name: 'Smartphone',
    description: 'Téléphone dernière génération',
    price: 450000, // Prix en XOF
    images: ['/placeholder.svg'],
    categoryId: '1',
    stock: 25,
    status: 'active',
    userId: '1'
  }
];

const mockShopSettings: ShopSettings = {
  userId: '1',
  shopName: 'Ma Boutique',
  primaryColor: '#22c55e',
  shopUrl: 'ma-boutique',
  description: 'Votre boutique en ligne au Burkina Faso',
  phone: '+226 70 12 34 56',
  address: 'Ouagadougou, Burkina Faso',
  socialLinks: {
    whatsapp: '+22670123456'
  }
};

const mockOrders: Order[] = [
  {
    id: '1',
    userId: '1',
    products: [{ productId: '1', quantity: 1, price: 650000 }],
    total: 650000,
    status: 'pending',
    createdAt: new Date().toISOString(),
    customerName: 'Jean Ouédraogo',
    customerEmail: 'client@example.com',
    customerPhone: '+226 70 12 34 56',
    deliveryAddress: 'Secteur 15, Ouagadougou',
    paymentMethod: 'orange_money'
  }
];

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [products, setProducts] = useState<Product[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [categories, setCategories] = useState<Category[]>(mockCategories);
  const [shopSettings, setShopSettings] = useState<ShopSettings | null>(null);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [promoCodes, setPromoCodes] = useState<PromoCode[]>([]);

  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      const user = JSON.parse(savedUser);
      setUser(user);
      
      // Load user-specific data
      const userProducts = localStorage.getItem(`products_${user.id}`);
      if (userProducts) {
        setProducts(JSON.parse(userProducts));
      } else {
        setProducts(mockProducts);
      }
      
      const userOrders = localStorage.getItem(`orders_${user.id}`);
      if (userOrders) {
        setOrders(JSON.parse(userOrders));
      } else {
        setOrders(mockOrders);
      }
      
      const userCategories = localStorage.getItem(`categories_${user.id}`);
      if (userCategories) {
        setCategories(JSON.parse(userCategories));
      }
      
      const userShopSettings = localStorage.getItem(`shopSettings_${user.id}`);
      if (userShopSettings) {
        setShopSettings(JSON.parse(userShopSettings));
      } else {
        setShopSettings({ ...mockShopSettings, userId: user.id });
      }
      
      const userPromoCodes = localStorage.getItem(`promoCodes_${user.id}`);
      if (userPromoCodes) {
        setPromoCodes(JSON.parse(userPromoCodes));
      }
    }
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    // Mock authentication
    if (email === 'admin@test.com' && password === 'admin') {
      const mockUser: User = {
        id: '1',
        email,
        name: 'Admin User',
        role: 'admin'
      };
      setUser(mockUser);
      localStorage.setItem('user', JSON.stringify(mockUser));
      return true;
    }
    return false;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  const signup = async (email: string, password: string, name: string, shopName: string): Promise<boolean> => {
    // Mock signup
    const mockUser: User = {
      id: Date.now().toString(),
      email,
      name,
      role: 'user',
      shopName
    };
    setUser(mockUser);
    localStorage.setItem('user', JSON.stringify(mockUser));
    
    // Initialize shop settings
    const initialShopSettings: ShopSettings = {
      ...mockShopSettings,
      userId: mockUser.id,
      shopName,
      shopUrl: shopName.toLowerCase().replace(/\s+/g, '-')
    };
    setShopSettings(initialShopSettings);
    localStorage.setItem(`shopSettings_${mockUser.id}`, JSON.stringify(initialShopSettings));
    
    return true;
  };

  const addProduct = (product: Omit<Product, 'id' | 'userId'>) => {
    if (!user) return;
    const newProduct: Product = {
      ...product,
      id: Date.now().toString(),
      userId: user.id
    };
    const updatedProducts = [...products, newProduct];
    setProducts(updatedProducts);
    localStorage.setItem(`products_${user.id}`, JSON.stringify(updatedProducts));
  };

  const updateProduct = (id: string, productUpdate: Partial<Product>) => {
    if (!user) return;
    const updatedProducts = products.map(p => 
      p.id === id ? { ...p, ...productUpdate } : p
    );
    setProducts(updatedProducts);
    localStorage.setItem(`products_${user.id}`, JSON.stringify(updatedProducts));
  };

  const deleteProduct = (id: string) => {
    if (!user) return;
    const updatedProducts = products.filter(p => p.id !== id);
    setProducts(updatedProducts);
    localStorage.setItem(`products_${user.id}`, JSON.stringify(updatedProducts));
  };

  // Categories
  const addCategory = (category: Omit<Category, 'id' | 'userId'>) => {
    if (!user) return;
    const newCategory: Category = {
      ...category,
      id: Date.now().toString(),
      userId: user.id
    };
    const updatedCategories = [...categories, newCategory];
    setCategories(updatedCategories);
    localStorage.setItem(`categories_${user.id}`, JSON.stringify(updatedCategories));
  };

  const updateCategory = (id: string, categoryUpdate: Partial<Category>) => {
    if (!user) return;
    const updatedCategories = categories.map(c => 
      c.id === id ? { ...c, ...categoryUpdate } : c
    );
    setCategories(updatedCategories);
    localStorage.setItem(`categories_${user.id}`, JSON.stringify(updatedCategories));
  };

  const deleteCategory = (id: string) => {
    if (!user) return;
    const updatedCategories = categories.filter(c => c.id !== id);
    setCategories(updatedCategories);
    localStorage.setItem(`categories_${user.id}`, JSON.stringify(updatedCategories));
  };

  const addOrder = (order: Omit<Order, 'id' | 'createdAt' | 'userId'>) => {
    if (!user) return;
    const newOrder: Order = {
      ...order,
      id: Date.now().toString(),
      userId: user.id,
      createdAt: new Date().toISOString()
    };
    const updatedOrders = [...orders, newOrder];
    setOrders(updatedOrders);
    localStorage.setItem(`orders_${user.id}`, JSON.stringify(updatedOrders));
  };

  const updateOrderStatus = (id: string, status: Order['status']) => {
    if (!user) return;
    const updatedOrders = orders.map(o => 
      o.id === id ? { ...o, status } : o
    );
    setOrders(updatedOrders);
    localStorage.setItem(`orders_${user.id}`, JSON.stringify(updatedOrders));
  };

  // Cart functions
  const addToCart = (item: CartItem) => {
    const existingItem = cart.find(i => i.productId === item.productId);
    if (existingItem) {
      updateCartItem(item.productId, existingItem.quantity + item.quantity);
    } else {
      setCart([...cart, item]);
    }
  };

  const removeFromCart = (productId: string) => {
    setCart(cart.filter(item => item.productId !== productId));
  };

  const updateCartItem = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setCart(cart.map(item => 
      item.productId === productId ? { ...item, quantity } : item
    ));
  };

  const clearCart = () => {
    setCart([]);
  };

  // Shop Settings
  const updateShopSettings = (settings: Partial<ShopSettings>) => {
    if (!user || !shopSettings) return;
    const updated = { ...shopSettings, ...settings };
    setShopSettings(updated);
    localStorage.setItem(`shopSettings_${user.id}`, JSON.stringify(updated));
  };

  // Promo Codes
  const addPromoCode = (promoCode: Omit<PromoCode, 'id' | 'userId'>) => {
    if (!user) return;
    const newPromoCode: PromoCode = {
      ...promoCode,
      id: Date.now().toString(),
      userId: user.id
    };
    const updatedPromoCodes = [...promoCodes, newPromoCode];
    setPromoCodes(updatedPromoCodes);
    localStorage.setItem(`promoCodes_${user.id}`, JSON.stringify(updatedPromoCodes));
  };

  const updatePromoCode = (id: string, promoCodeUpdate: Partial<PromoCode>) => {
    if (!user) return;
    const updatedPromoCodes = promoCodes.map(pc => 
      pc.id === id ? { ...pc, ...promoCodeUpdate } : pc
    );
    setPromoCodes(updatedPromoCodes);
    localStorage.setItem(`promoCodes_${user.id}`, JSON.stringify(updatedPromoCodes));
  };

  const deletePromoCode = (id: string) => {
    if (!user) return;
    const updatedPromoCodes = promoCodes.filter(pc => pc.id !== id);
    setPromoCodes(updatedPromoCodes);
    localStorage.setItem(`promoCodes_${user.id}`, JSON.stringify(updatedPromoCodes));
  };

  return (
    <AppContext.Provider value={{
      user,
      products,
      orders,
      categories,
      shopSettings,
      cart,
      promoCodes,
      login,
      logout,
      signup,
      addProduct,
      updateProduct,
      deleteProduct,
      addCategory,
      updateCategory,
      deleteCategory,
      addOrder,
      updateOrderStatus,
      addToCart,
      removeFromCart,
      updateCartItem,
      clearCart,
      updateShopSettings,
      addPromoCode,
      updatePromoCode,
      deletePromoCode
    }}>
      {children}
    </AppContext.Provider>
  );
};