export interface IProduct {
  id: number;
  name: string;
  description: string;
  price: number;
  category: string;
  stock: number;
}

export interface ICreateProduct {
  name: string;
  description: string;
  price: number;
  category: string;
  stock: number;
}
