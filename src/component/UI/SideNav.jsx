import { useState } from "react";

export default function SideNav({ products, loading, setFilteredProducts }) {
  const [active, setActive] = useState(null);

  const categories = [...new Set(products.map((item) => item.category))];

  function handleSelect(category) {
    setActive(category);
    setFilteredProducts(products.filter((item) => item.category === category));
  }

  function handleAll() {
    setActive(null);
    setFilteredProducts(products);
  }

  // Loading UI is now controlled by App.jsx, but we can show a simple guard
  if (loading)
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );

  return (
    <nav className="flex flex-col gap-2">
      <button
        onClick={handleAll}
        className={
          active === null
            ? "bg-brand text-white w-full py-2 text-left ps-4 rounded capitalize hover:brightness-110 transition-all cursor-pointer"
            : "text-left ps-4 text-text-color capitalize hover:brightness-110 transition-all cursor-pointer"
        }
      >
        All Products
      </button>

      {categories.map((category) => (
        <button
          key={category}
          onClick={() => handleSelect(category)}
          className={
            active === category
              ? "bg-brand text-white w-full py-2 text-left ps-4 rounded capitalize hover:brightness-110 transition-all cursor-pointer"
              : "text-left ps-4 text-text-color capitalize hover:brightness-110 transition-all cursor-pointer text-sm"
          }
        >
          {category}
        </button>
      ))}
    </nav>
  );
}
