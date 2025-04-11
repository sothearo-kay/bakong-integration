export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
}

export const products: Product[] = [
  {
    id: 1,
    name: "Wireless Headphones",
    description: "Noise-canceling over-ear headphones with deep bass and long battery life.",
    price: 99.99,
  },
  {
    id: 2,
    name: "Smartwatch",
    description: "Feature-rich smartwatch with heart rate monitoring and GPS tracking.",
    price: 149.99,
  },
  {
    id: 3,
    name: "Bluetooth Speaker",
    description: "Portable waterproof speaker with high-quality sound and deep bass.",
    price: 79.99,
  },
  {
    id: 4,
    name: "Laptop Stand",
    description: "Adjustable aluminum laptop stand for better ergonomics and cooling.",
    price: 39.99,
  },
  {
    id: 5,
    name: "Mechanical Keyboard",
    description: "RGB backlit mechanical keyboard with tactile switches for gamers and typists.",
    price: 129.99,
  },
];
