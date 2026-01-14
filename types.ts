export enum Category {
  ALL = 'Semua',
  FRUIT = 'Buah',
  VEGETABLE = 'Sayur',
  MEAT = 'Daging & Ikan',
  DAIRY = 'Susu & Telur',
  PANTRY = 'Sembako'
}

export interface Product {
  id: number;
  name: string;
  price: number;
  category: Category;
  image: string;
  unit: string;
}

export interface CartItem extends Product {
  quantity: number;
}
