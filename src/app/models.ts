export interface Shop {
  _id: string;
  // esto es solo para trabajar con la fakeapi
  id:number;
  name: string;
  email: string;
  postcode: string;
  // esto es solo para trabajar con la fakeapi
  postCode: string;
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
