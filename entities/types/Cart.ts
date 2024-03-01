export interface CartItem {
  itemId: string;
  quantity: number;
  price: number;
}

export type Cart = Record<string, CartItem>;
