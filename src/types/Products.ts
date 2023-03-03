export interface Products {
  id: number;
  title: string;
  price: number;
  category: string;
  description: string;
  image: string;
  count: number;
  rating: {
    count: number;
    rate: number;
  }
}