import { Restaurant } from "./types";

export const RESTAURANTS: Restaurant[] = [
  {
    id: "1",
    name: "Hadassah Kitchen",
    rating: 4.8,
    deliveryTime: "20-30 min",
    deliveryFee: 2.99,
    image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=800&q=80",
    categories: ["Healthy", "Salads", "Bowls"],
    menu: [
      {
        id: "h1",
        name: "Quinoa Power Bowl",
        description: "Organic quinoa, roasted sweet potato, kale, and lemon tahini dressing.",
        price: 14.99,
        image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=400&q=80",
        category: "Bowls"
      },
      {
        id: "h2",
        name: "Avocado Toast Deluxe",
        description: "Sourdough bread, smashed avocado, poached egg, and chili flakes.",
        price: 12.50,
        image: "https://images.unsplash.com/photo-1525351484163-7529414344d8?auto=format&fit=crop&w=400&q=80",
        category: "Breakfast"
      }
    ]
  },
  {
    id: "2",
    name: "Burger Craft",
    rating: 4.5,
    deliveryTime: "15-25 min",
    deliveryFee: 1.50,
    image: "https://images.unsplash.com/photo-1571091718767-18b5b1457add?auto=format&fit=crop&w=800&q=80",
    categories: ["Burgers", "Fast Food"],
    menu: [
      {
        id: "b1",
        name: "Signature Truffle Burger",
        description: "Wagyu beef, truffle aioli, caramelized onions, and swiss cheese.",
        price: 18.99,
        image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=400&q=80",
        category: "Burgers"
      }
    ]
  },
  {
    id: "3",
    name: "Pasta Paradiso",
    rating: 4.7,
    deliveryTime: "25-35 min",
    deliveryFee: 3.00,
    image: "https://images.unsplash.com/photo-1473093226795-af9932fe5856?auto=format&fit=crop&w=800&q=80",
    categories: ["Italian", "Pasta"],
    menu: [
      {
        id: "p1",
        name: "Wild Mushroom Risotto",
        description: "Arborio rice, porcini mushrooms, parmesan, and truffle oil.",
        price: 21.00,
        image: "https://images.unsplash.com/photo-1476124369491-e7addf5db371?auto=format&fit=crop&w=400&q=80",
        category: "Pasta"
      }
    ]
  }
];

export const CATEGORIES = [
  { name: "All", icon: "🍽️" },
  { name: "Burgers", icon: "🍔" },
  { name: "Healthy", icon: "🥗" },
  { name: "Italian", icon: "🍝" },
  { name: "Pizza", icon: "🍕" },
  { name: "Sushi", icon: "🍣" },
  { name: "Desserts", icon: "🍰" },
];
