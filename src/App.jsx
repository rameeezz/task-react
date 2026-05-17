import { useEffect, useState, useCallback } from "react";
import axios from "axios";
import { Navbar } from "./component/UI/Navbar";
import Search from "./component/UI/Search";
import SideNav from "./component/UI/SideNav";
import ProductCard from "./component/product/ProductCard";
import { useTheme } from "./context/ThemeContext";
import CartUi from "./component/cart/CartUi";

function App() {
  const { dark } = useTheme();
  const BASE_URL = import.meta.env.VITE_API_URL;

  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [cartOpen, setCartOpen] = useState(false);
  function toggleCart() {
    setCartOpen(!cartOpen);
  }
  const fetchProducts = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      const { data } = await axios.get(`${BASE_URL}products`);
      setProducts(data);
      setFilteredProducts(data);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to load");
    } finally {
      setLoading(false);
    }
  }, [BASE_URL]);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  return (
    <>
      <CartUi isOpen={cartOpen} toggleCart={toggleCart} />
      <Navbar toggleCart={toggleCart} />
      <div
        className={`min-h-screen grid grid-cols-12 transition-colors duration-500 ${dark ? "bg-black text-white" : "bg-white text-black"}`}
      >
        <div className="col-span-12 md:col-span-3 lg:col-span-3 p-4 border-e border-border-color">
          <h3 className="text-text-color font-bold tracking-tight mb-3">
            CATEGORIES
          </h3>
          <SideNav
            products={products}
            loading={loading}
            setFilteredProducts={setFilteredProducts}
          />
        </div>

        <div className="col-span-8 p-4">
          <Search />

          {loading ? (
            <div className="flex justify-center items-center h-64">
              <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
            </div>
          ) : error ? (
            <div className="text-red-500 text-center py-10">{error}</div>
          ) : (
            <div className="grid grid-cols-1  md:grid-cols-3 lg:grid-cols-5 gap-5">
              {filteredProducts.map((item) => (
                <ProductCard key={item.id} itemDetails={item} />
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default App;
