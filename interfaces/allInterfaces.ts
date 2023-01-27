export interface userData {
  name: string;
  email: string;
  password: string;
  shop: any | shopData[];
}

export interface shopData {
  price: string;
  items: number;
  quantity: string;
}
