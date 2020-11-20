export interface Shop {
  _id: string;
  name: string;
  email: string;
  postcode: string;
  phone: string;
  logo: string;
}
export interface Product {
  _id: string;
  name: string;
  price: number;
  description: string;
  stock: number;
  image: string;
  shop_id: string;
  category: string;
}
