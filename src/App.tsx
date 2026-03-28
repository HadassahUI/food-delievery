/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo } from 'react';
import { 
  Search, 
  ShoppingCart, 
  User, 
  ChevronRight, 
  Star, 
  Clock, 
  ArrowLeft, 
  Plus, 
  Minus, 
  X, 
  CheckCircle2,
  MapPin,
  CreditCard,
  Home
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { RESTAURANTS, CATEGORIES } from './constants';
import { Restaurant, FoodItem, CartItem } from './types';

type View = 'home' | 'restaurant' | 'checkout' | 'success';

export default function App() {
  const [currentView, setCurrentView] = useState<View>('home');
  const [selectedRestaurant, setSelectedRestaurant] = useState<Restaurant | null>(null);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [isCartOpen, setIsCartOpen] = useState(false);

  // Cart logic
  const addToCart = (item: FoodItem) => {
    setCart(prev => {
      const existing = prev.find(i => i.id === item.id);
      if (existing) {
        return prev.map(i => i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i);
      }
      return [...prev, { ...item, quantity: 1 }];
    });
  };

  const removeFromCart = (id: string) => {
    setCart(prev => {
      const existing = prev.find(i => i.id === id);
      if (existing && existing.quantity > 1) {
        return prev.map(i => i.id === id ? { ...i, quantity: i.quantity - 1 } : i);
      }
      return prev.filter(i => i.id !== id);
    });
  };

  const cartTotal = useMemo(() => 
    cart.reduce((sum, item) => sum + item.price * item.quantity, 0),
  [cart]);

  const filteredRestaurants = useMemo(() => {
    return RESTAURANTS.filter(r => {
      const matchesSearch = r.name.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = selectedCategory === 'All' || r.categories.includes(selectedCategory);
      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, selectedCategory]);

  const handleRestaurantClick = (restaurant: Restaurant) => {
    setSelectedRestaurant(restaurant);
    setCurrentView('restaurant');
    window.scrollTo(0, 0);
  };

  const handleCheckout = () => {
    setIsCartOpen(false);
    setCurrentView('checkout');
  };

  const handlePurchase = (e: React.FormEvent) => {
    e.preventDefault();
    setCurrentView('success');
    setCart([]);
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="sticky top-0 z-40 bg-white/80 backdrop-blur-md border-b border-gray-100 px-4 py-3">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div 
            className="flex items-center gap-2 cursor-pointer" 
            onClick={() => setCurrentView('home')}
          >
            <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center text-white font-bold text-xl">
              H
            </div>
            <span className="font-serif text-xl font-bold tracking-tight hidden sm:block">HADASSAH_HD</span>
          </div>

          <div className="flex-1 max-w-md mx-4 relative hidden md:block">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input 
              type="text" 
              placeholder="Search for restaurants or dishes..."
              className="w-full bg-gray-100 border-none rounded-full py-2 pl-10 pr-4 focus:ring-2 focus:ring-primary/20 transition-all"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <div className="flex items-center gap-4">
            <button 
              className="p-2 hover:bg-gray-100 rounded-full relative"
              onClick={() => setIsCartOpen(true)}
            >
              <ShoppingCart className="w-6 h-6" />
              {cart.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-primary text-white text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center border-2 border-white">
                  {cart.reduce((a, b) => a + b.quantity, 0)}
                </span>
              )}
            </button>
            <button className="p-2 hover:bg-gray-100 rounded-full">
              <User className="w-6 h-6" />
            </button>
          </div>
        </div>
      </nav>

      {/* Main Content Area */}
      <main className="max-w-7xl mx-auto px-4 py-6">
        <AnimatePresence mode="wait">
          {currentView === 'home' && (
            <motion.div
              key="home"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-8"
            >
              {/* Hero Section */}
              <section className="relative h-[400px] rounded-3xl overflow-hidden group">
                <img 
                  src="https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=1920&q=80" 
                  alt="Delicious Food"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-transparent flex flex-col justify-center p-8 sm:p-12">
                  <motion.h1 
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 }}
                    className="text-4xl sm:text-6xl font-serif text-white max-w-xl leading-tight"
                  >
                    Delicious food, delivered to your <span className="text-primary italic">doorstep</span>.
                  </motion.h1>
                  <motion.p 
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 }}
                    className="text-white/80 mt-4 text-lg max-w-md"
                  >
                    Experience the best local restaurants with lightning fast delivery and zero hassle.
                  </motion.p>
                  <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="mt-8 flex gap-4"
                  >
                    <button className="pill-button bg-primary text-white font-semibold hover:bg-primary/90">
                      Order Now
                    </button>
                    <button className="pill-button bg-white/20 backdrop-blur-md text-white font-semibold hover:bg-white/30">
                      Learn More
                    </button>
                  </motion.div>
                </div>
              </section>

              {/* Categories */}
              <section className="overflow-x-auto pb-4 no-scrollbar">
                <div className="flex gap-4">
                  {CATEGORIES.map((cat) => (
                    <button
                      key={cat.name}
                      onClick={() => setSelectedCategory(cat.name)}
                      className={`flex items-center gap-2 pill-button whitespace-nowrap ${
                        selectedCategory === cat.name 
                          ? 'bg-primary text-white' 
                          : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                      }`}
                    >
                      <span>{cat.icon}</span>
                      <span className="font-medium">{cat.name}</span>
                    </button>
                  ))}
                </div>
              </section>

              {/* Restaurants Grid */}
              <section className="space-y-6">
                <div className="flex items-center justify-between">
                  <h2 className="text-2xl font-serif font-bold">Popular Near You</h2>
                  <button className="text-primary font-semibold flex items-center gap-1 hover:underline">
                    View all <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredRestaurants.map((restaurant) => (
                    <motion.div
                      key={restaurant.id}
                      whileHover={{ y: -5 }}
                      onClick={() => handleRestaurantClick(restaurant)}
                      className="group cursor-pointer bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-xl transition-all"
                    >
                      <div className="relative h-48 overflow-hidden">
                        <img 
                          src={restaurant.image} 
                          alt={restaurant.name}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                          referrerPolicy="no-referrer"
                        />
                        <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-lg flex items-center gap-1 text-sm font-bold shadow-sm">
                          <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                          {restaurant.rating}
                        </div>
                      </div>
                      <div className="p-4 space-y-2">
                        <h3 className="text-lg font-bold group-hover:text-primary transition-colors">{restaurant.name}</h3>
                        <div className="flex items-center gap-4 text-sm text-gray-500">
                          <div className="flex items-center gap-1">
                            <Clock className="w-4 h-4" />
                            {restaurant.deliveryTime}
                          </div>
                          <div>•</div>
                          <div>${restaurant.deliveryFee} delivery</div>
                        </div>
                        <div className="flex gap-2 pt-2">
                          {restaurant.categories.map(c => (
                            <span key={c} className="text-[10px] uppercase tracking-wider font-bold text-gray-400 bg-gray-50 px-2 py-1 rounded">
                              {c}
                            </span>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </section>
            </motion.div>
          )}

          {currentView === 'restaurant' && selectedRestaurant && (
            <motion.div
              key="restaurant"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="space-y-8"
            >
              <button 
                onClick={() => setCurrentView('home')}
                className="flex items-center gap-2 text-gray-500 hover:text-primary transition-colors mb-4"
              >
                <ArrowLeft className="w-4 h-4" /> Back to restaurants
              </button>

              <div className="relative h-64 rounded-3xl overflow-hidden">
                <img 
                  src={selectedRestaurant.image} 
                  alt={selectedRestaurant.name}
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-black/40 flex flex-col justify-end p-8">
                  <h1 className="text-4xl font-serif text-white font-bold">{selectedRestaurant.name}</h1>
                  <div className="flex items-center gap-4 text-white/90 mt-2">
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      {selectedRestaurant.rating}
                    </div>
                    <div>•</div>
                    <div>{selectedRestaurant.deliveryTime}</div>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 space-y-8">
                  <h2 className="text-2xl font-bold border-b pb-4">Menu</h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {selectedRestaurant.menu.map((item) => (
                      <div key={item.id} className="flex gap-4 bg-white p-4 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                        <div className="w-24 h-24 rounded-xl overflow-hidden flex-shrink-0">
                          <img src={item.image} alt={item.name} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                        </div>
                        <div className="flex flex-col justify-between flex-1">
                          <div>
                            <h4 className="font-bold">{item.name}</h4>
                            <p className="text-xs text-gray-500 line-clamp-2 mt-1">{item.description}</p>
                          </div>
                          <div className="flex items-center justify-between mt-2">
                            <span className="font-bold text-primary">${item.price}</span>
                            <button 
                              onClick={() => addToCart(item)}
                              className="p-1.5 bg-gray-100 hover:bg-primary hover:text-white rounded-lg transition-colors"
                            >
                              <Plus className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="hidden lg:block">
                  <div className="sticky top-24 bg-gray-50 rounded-3xl p-6 space-y-6">
                    <h3 className="text-xl font-bold flex items-center gap-2">
                      <ShoppingCart className="w-5 h-5" /> Your Order
                    </h3>
                    {cart.length === 0 ? (
                      <p className="text-gray-400 text-center py-8">Your cart is empty</p>
                    ) : (
                      <>
                        <div className="space-y-4 max-h-[400px] overflow-y-auto pr-2">
                          {cart.map(item => (
                            <div key={item.id} className="flex items-center justify-between gap-2">
                              <div className="flex-1">
                                <p className="font-medium text-sm">{item.name}</p>
                                <p className="text-xs text-gray-400">${item.price} each</p>
                              </div>
                              <div className="flex items-center gap-2 bg-white rounded-lg p-1 border">
                                <button onClick={() => removeFromCart(item.id)} className="p-1 hover:text-primary"><Minus className="w-3 h-3" /></button>
                                <span className="text-xs font-bold w-4 text-center">{item.quantity}</span>
                                <button onClick={() => addToCart(item)} className="p-1 hover:text-primary"><Plus className="w-3 h-3" /></button>
                              </div>
                            </div>
                          ))}
                        </div>
                        <div className="border-t pt-4 space-y-2">
                          <div className="flex justify-between text-sm">
                            <span className="text-gray-500">Subtotal</span>
                            <span>${cartTotal.toFixed(2)}</span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span className="text-gray-500">Delivery Fee</span>
                            <span>${selectedRestaurant.deliveryFee.toFixed(2)}</span>
                          </div>
                          <div className="flex justify-between font-bold text-lg pt-2">
                            <span>Total</span>
                            <span>${(cartTotal + selectedRestaurant.deliveryFee).toFixed(2)}</span>
                          </div>
                        </div>
                        <button 
                          onClick={handleCheckout}
                          className="w-full pill-button bg-primary text-white font-bold py-3 shadow-lg shadow-primary/20"
                        >
                          Go to Checkout
                        </button>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {currentView === 'checkout' && (
            <motion.div
              key="checkout"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="max-w-2xl mx-auto space-y-8"
            >
              <div className="flex items-center gap-4">
                <button onClick={() => setCurrentView('restaurant')} className="p-2 hover:bg-gray-100 rounded-full">
                  <ArrowLeft className="w-5 h-5" />
                </button>
                <h1 className="text-3xl font-serif font-bold">Check out</h1>
              </div>

              <form onSubmit={handlePurchase} className="space-y-6">
                <div className="bg-gray-50 p-6 rounded-3xl space-y-6">
                  <div className="space-y-4">
                    <h3 className="font-bold flex items-center gap-2"><MapPin className="w-4 h-4 text-primary" /> Delivery Address</h3>
                    <input 
                      required
                      type="text" 
                      placeholder="Street Address"
                      className="w-full bg-white border-none rounded-xl py-3 px-4 focus:ring-2 focus:ring-primary/20"
                    />
                    <div className="grid grid-cols-2 gap-4">
                      <input 
                        required
                        type="text" 
                        placeholder="Apt / Suite"
                        className="w-full bg-white border-none rounded-xl py-3 px-4 focus:ring-2 focus:ring-primary/20"
                      />
                      <input 
                        required
                        type="text" 
                        placeholder="Postal Code"
                        className="w-full bg-white border-none rounded-xl py-3 px-4 focus:ring-2 focus:ring-primary/20"
                      />
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h3 className="font-bold flex items-center gap-2"><CreditCard className="w-4 h-4 text-primary" /> Payment Details</h3>
                    <input 
                      required
                      type="email" 
                      placeholder="EMAIL.COM"
                      className="w-full bg-white border-none rounded-xl py-3 px-4 focus:ring-2 focus:ring-primary/20"
                    />
                    <input 
                      required
                      type="text" 
                      placeholder="CARD INFORMATION"
                      className="w-full bg-white border-none rounded-xl py-3 px-4 focus:ring-2 focus:ring-primary/20"
                    />
                    <div className="grid grid-cols-2 gap-4">
                      <input 
                        required
                        type="text" 
                        placeholder="MM / YY"
                        className="w-full bg-white border-none rounded-xl py-3 px-4 focus:ring-2 focus:ring-primary/20"
                      />
                      <input 
                        required
                        type="text" 
                        placeholder="CVC"
                        className="w-full bg-white border-none rounded-xl py-3 px-4 focus:ring-2 focus:ring-primary/20"
                      />
                    </div>
                  </div>
                </div>

                <div className="bg-primary/5 p-6 rounded-3xl border border-primary/10">
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-gray-500 uppercase text-xs font-bold tracking-widest">Total Amount</span>
                    <span className="text-2xl font-bold text-primary">${(cartTotal + (selectedRestaurant?.deliveryFee || 0)).toFixed(2)}</span>
                  </div>
                  <button 
                    type="submit"
                    className="w-full pill-button bg-primary text-white font-bold py-4 text-lg shadow-xl shadow-primary/20 uppercase tracking-widest"
                  >
                    Purchase
                  </button>
                </div>
              </form>
            </motion.div>
          )}

          {currentView === 'success' && (
            <motion.div
              key="success"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="max-w-md mx-auto text-center space-y-8 py-12"
            >
              <div className="flex justify-center">
                <motion.div 
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: 'spring', damping: 10 }}
                  className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center text-green-600"
                >
                  <CheckCircle2 className="w-16 h-16" />
                </motion.div>
              </div>
              <div className="space-y-2">
                <h1 className="text-4xl font-serif font-bold uppercase tracking-tighter">CONGRATULATIONS</h1>
                <p className="text-xl text-gray-500">Your order is on its way</p>
              </div>
              <div className="relative h-1 w-full bg-gray-100 rounded-full overflow-hidden">
                <motion.div 
                  initial={{ x: '-100%' }}
                  animate={{ x: '100%' }}
                  transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
                  className="absolute inset-0 bg-primary w-1/3"
                />
              </div>
              <button 
                onClick={() => setCurrentView('home')}
                className="pill-button bg-black text-white font-bold px-12 py-4 flex items-center gap-2 mx-auto hover:bg-gray-800"
              >
                Back to Home <Home className="w-4 h-4" />
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Cart Drawer (Mobile/Tablet) */}
      <AnimatePresence>
        {isCartOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsCartOpen(false)}
              className="fixed inset-0 bg-black/40 z-50 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed right-0 top-0 bottom-0 w-full max-w-md bg-white z-50 shadow-2xl p-6 flex flex-col"
            >
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-2xl font-bold flex items-center gap-2">
                  <ShoppingCart className="w-6 h-6" /> Your Order
                </h2>
                <button onClick={() => setIsCartOpen(false)} className="p-2 hover:bg-gray-100 rounded-full">
                  <X className="w-6 h-6" />
                </button>
              </div>

              {cart.length === 0 ? (
                <div className="flex-1 flex flex-col items-center justify-center text-gray-400 space-y-4">
                  <ShoppingCart className="w-16 h-16 opacity-20" />
                  <p>Your cart is empty</p>
                  <button 
                    onClick={() => setIsCartOpen(false)}
                    className="text-primary font-bold hover:underline"
                  >
                    Start shopping
                  </button>
                </div>
              ) : (
                <>
                  <div className="flex-1 overflow-y-auto space-y-6 pr-2">
                    {cart.map(item => (
                      <div key={item.id} className="flex gap-4">
                        <div className="w-20 h-20 rounded-xl overflow-hidden flex-shrink-0">
                          <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                        </div>
                        <div className="flex-1 space-y-1">
                          <div className="flex justify-between">
                            <h4 className="font-bold">{item.name}</h4>
                            <span className="font-bold text-primary">${(item.price * item.quantity).toFixed(2)}</span>
                          </div>
                          <p className="text-xs text-gray-400">${item.price} each</p>
                          <div className="flex items-center gap-3 pt-2">
                            <div className="flex items-center gap-3 bg-gray-100 rounded-lg px-2 py-1">
                              <button onClick={() => removeFromCart(item.id)} className="hover:text-primary"><Minus className="w-3 h-3" /></button>
                              <span className="text-sm font-bold w-4 text-center">{item.quantity}</span>
                              <button onClick={() => addToCart(item)} className="hover:text-primary"><Plus className="w-3 h-3" /></button>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="border-t pt-6 space-y-4">
                    <div className="space-y-2">
                      <div className="flex justify-between text-gray-500">
                        <span>Subtotal</span>
                        <span>${cartTotal.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between text-gray-500">
                        <span>Delivery Fee</span>
                        <span>${(selectedRestaurant?.deliveryFee || 0).toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between font-bold text-xl pt-2">
                        <span>Total</span>
                        <span>${(cartTotal + (selectedRestaurant?.deliveryFee || 0)).toFixed(2)}</span>
                      </div>
                    </div>
                    <button 
                      onClick={handleCheckout}
                      className="w-full pill-button bg-primary text-white font-bold py-4 text-lg shadow-xl shadow-primary/20"
                    >
                      Checkout
                    </button>
                  </div>
                </>
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Footer */}
      <footer className="bg-gray-50 border-t border-gray-100 mt-20 py-12 px-4">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center text-white font-bold">H</div>
              <span className="font-serif text-lg font-bold">HADASSAH_HD</span>
            </div>
            <p className="text-sm text-gray-500">
              The best food delivery experience in the city. Fast, reliable, and delicious.
            </p>
          </div>
          <div>
            <h4 className="font-bold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm text-gray-500">
              <li className="hover:text-primary cursor-pointer">About Us</li>
              <li className="hover:text-primary cursor-pointer">Become a Partner</li>
              <li className="hover:text-primary cursor-pointer">Ride with Us</li>
              <li className="hover:text-primary cursor-pointer">Mobile App</li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-4">Support</h4>
            <ul className="space-y-2 text-sm text-gray-500">
              <li className="hover:text-primary cursor-pointer">Help Center</li>
              <li className="hover:text-primary cursor-pointer">Contact Us</li>
              <li className="hover:text-primary cursor-pointer">Privacy Policy</li>
              <li className="hover:text-primary cursor-pointer">Terms of Service</li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-4">Newsletter</h4>
            <p className="text-sm text-gray-500 mb-4">Get the latest offers and discounts.</p>
            <div className="flex gap-2">
              <input 
                type="email" 
                placeholder="Email address"
                className="flex-1 bg-white border border-gray-200 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-primary/20"
              />
              <button className="bg-primary text-white px-4 py-2 rounded-lg text-sm font-bold">Join</button>
            </div>
          </div>
        </div>
        <div className="max-w-7xl mx-auto mt-12 pt-8 border-t border-gray-200 text-center text-sm text-gray-400">
          © 2026 Hadassah Food Delivery. All rights reserved.
        </div>
      </footer>
    </div>
  );
}
