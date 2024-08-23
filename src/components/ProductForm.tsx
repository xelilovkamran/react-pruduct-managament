import React, { useState, useEffect, useContext } from "react";
import { ProductContext } from "../context/ProdutContext";
import { Product } from "../types";

interface ProductFormProps {
  existingProduct?: Product | null;
  handleUpdateProduct: (product: Product) => void;
}

const ProductForm = ({
  existingProduct,
  handleUpdateProduct,
}: ProductFormProps) => {
  const [product, setProduct] = useState<Product>({
    id: Math.random().toString(36).substr(2, 9),
    name: "",
    category: "",
    price: 0,
    description: "",
    inStock: true,
  });

  const { dispatch } = useContext(ProductContext);

  useEffect(() => {
    if (existingProduct) {
      setProduct(existingProduct);
    }
  }, [existingProduct]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!existingProduct) {
      dispatch({ type: "ADD_PRODUCT", payload: product });
      setProduct({
        id: "",
        name: "",
        category: "",
        price: 0,
        description: "",
        inStock: true,
      });
      return;
    }
    setProduct({
      id: "",
      name: "",
      category: "",
      price: 0,
      description: "",
      inStock: true,
    });

    handleUpdateProduct(product); // Pass the product back to the parent for updating
  };

  return (
    <form onSubmit={handleSubmit} className="bg-gray-100 p-4 rounded-lg">
      <div className="mb-4">
        <label className="block text-gray-700">Name</label>
        <input
          type="text"
          name="name"
          value={product.name}
          onChange={handleChange}
          className="w-full px-3 py-2 border rounded"
          required
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700">Category</label>
        <input
          type="text"
          name="category"
          value={product.category}
          onChange={handleChange}
          className="w-full px-3 py-2 border rounded"
          required
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700">Price</label>
        <input
          type="number"
          name="price"
          value={product.price}
          onChange={handleChange}
          className="w-full px-3 py-2 border rounded"
          required
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700">Description</label>
        <input
          type="text"
          name="description"
          value={product.description}
          onChange={handleChange}
          className="w-full px-3 py-2 border rounded"
          required
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700">In Stock</label>
        <input
          type="checkbox"
          name="inStock"
          checked={product.inStock}
          onChange={(e) =>
            setProduct({ ...product, inStock: e.target.checked })
          }
          className="mr-2"
        />
      </div>
      <button
        type="submit"
        className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
      >
        {existingProduct ? "Update Product" : "Add Product"}
      </button>
    </form>
  );
};

export default ProductForm;
