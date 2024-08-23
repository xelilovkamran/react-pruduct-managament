import React, { createContext, useReducer, useMemo } from "react";
import type { Product, ProductAction } from "../types/index";
import productReducer from "./ProductReducer";

interface ProductContextType {
  state: Product[];
  dispatch: React.Dispatch<ProductAction>;
}

let initialProducts: Product[] = [];

const ProductContext = createContext<ProductContextType>({
  state: initialProducts,
  dispatch: () => null,
});

function ProductProvider({ children }: { children: React.ReactNode }) {
  initialProducts = useMemo(() => {
    return (initialProducts = JSON.parse(
      localStorage.getItem("products") || "[]"
    ));
  }, []);
  const [state, dispatch] = useReducer(productReducer, initialProducts);

  return (
    <ProductContext.Provider value={{ state, dispatch }}>
      {children}
    </ProductContext.Provider>
  );
}

export { ProductContext, ProductProvider };
