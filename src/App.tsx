import { ProductProvider } from "./context/ProdutContext";
import ProductList from "./components/ProductList";
import ProductFilter from "./components/ProductFilter";

const App = () => {
  return (
    <ProductProvider>
      <div className="min-h-screen bg-gray-100 p-6">
        <h1 className="text-3xl font-bold text-center mb-8">
          Product Management
        </h1>
        <div className="max-w-4xl mx-auto">
          <ProductList />
          <ProductFilter />
        </div>
      </div>
    </ProductProvider>
  );
};

export default App;
