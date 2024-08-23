import { useContext, useState } from "react";
import { Product } from "../types";
import { ProductContext } from "../context/ProdutContext";
import ProductForm from "./ProductForm";

const ProductList = () => {
  const { state, dispatch } = useContext(ProductContext);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  const deleteProduct = (id: string | number) => {
    dispatch({ type: "DELETE_PRODUCT", payload: id });
  };

  const startEditingProduct = (product: Product) => {
    setEditingProduct(product);
  };

  const handleUpdateProduct = (updatedProduct: Product) => {
    dispatch({ type: "UPDATE_PRODUCT", payload: updatedProduct });
    setEditingProduct(null);
  };

  return (
    <>
      <ProductForm
        existingProduct={editingProduct}
        handleUpdateProduct={handleUpdateProduct}
      />
      <div className="container mx-auto p-4">
        <h2 className="text-2xl font-bold mb-4">Product List</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {state.length !== 0 &&
            state.map((product: Product, index: number) => (
              <div key={index} className="bg-white shadow-md rounded-lg p-4">
                <h3 className="text-xl font-semibold">{product.name}</h3>
                <p className="text-gray-700">{product.description}</p>
                <p className="text-gray-900 font-bold">
                  Price: ${product.price}
                </p>
                <p className="text-gray-600">Category: {product.category}</p>
                <p
                  className={`text-sm ${
                    product.inStock ? "text-green-600" : "text-red-600"
                  }`}
                >
                  {product.inStock ? "In Stock" : "Out of Stock"}
                </p>
                <button
                  onClick={() => deleteProduct(product.id)}
                  className="mt-2 bg-red-500 text-white py-1 px-2 rounded hover:bg-red-600"
                >
                  Delete
                </button>
                <button
                  onClick={() => startEditingProduct(product)}
                  className="mt-2 ml-2 bg-green-500 text-white py-1 px-2 rounded hover:bg-green-600"
                >
                  Update
                </button>
              </div>
            ))}
        </div>
      </div>
    </>
  );
};

export default ProductList;
