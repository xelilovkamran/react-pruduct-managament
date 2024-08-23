import type { Product, ProductAction } from "../types/index";

const productReducer = (state: Product[], action: ProductAction) => {
  let updatedProducts;
  switch (action.type) {
    case "ADD_PRODUCT":
      updatedProducts = [...state, action.payload];
      localStorage.setItem("products", JSON.stringify(updatedProducts));
      break;
    case "UPDATE_PRODUCT":
      updatedProducts = state.map((product) =>
        product.id === action.payload.id ? action.payload : product
      );
      localStorage.setItem("products", JSON.stringify(updatedProducts));
      break;
    case "DELETE_PRODUCT":
      updatedProducts = state.filter(
        (product) => product.id !== action.payload
      );
      localStorage.setItem("products", JSON.stringify(updatedProducts));
      break;
    case "FILTER_PRODUCTS":
      if (action.payload === "") {
        return JSON.parse(localStorage.getItem("products") || "[]");
      }
      updatedProducts = state.filter((product) =>
        product.category.toLowerCase().includes(action.payload.toLowerCase())
      );
      return updatedProducts;
    case "SEARCH_PRODUCTS":
      if (action.payload === "") {
        return JSON.parse(localStorage.getItem("products") || "[]");
      }
      updatedProducts = state.filter((product) =>
        product.name.toLowerCase().includes(action.payload.toLowerCase())
      );
      return updatedProducts;
    default:
      return state;
  }
  return updatedProducts;
};

export default productReducer;
