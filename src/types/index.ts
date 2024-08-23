export type Product = {
  id: string | number;
  name: string;
  category: string;
  price: number;
  description: string;
  inStock: boolean;
};

export type ProductAction =
  | { type: "ADD_PRODUCT"; payload: Product }
  | { type: "UPDATE_PRODUCT"; payload: Product }
  | { type: "DELETE_PRODUCT"; payload: string | number }
  | { type: "FILTER_PRODUCTS"; payload: string }
  | { type: "SEARCH_PRODUCTS"; payload: string };
