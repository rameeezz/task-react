import React, { useState } from "react";
import { useTheme } from "../../context/ThemeContext";

export const Navbar = ({ toggleCart }) => {
  const { dark, toggle } = useTheme();
  return (
    <>
      <nav
        className={`mx-auto flex justify-between items-center px-4 py-4 transition-colors duration-500 border-b-border-color border-b ${dark ? "bg-black text-white" : "bg-white text-black"}`}
      >
        <div className="text-2 md:text-4xl lg:text-4xl font-bold">
          Shop<span className="text-brand">Wave</span>
        </div>
        <div className="flex gap-2">
          <button
            className={`p-2 cursor-pointer hover:opacity-80 transition-opacity bg-[#242321] rounded ${dark == true ? "" : "w-9.5 bg-emerald-100"}`}
            aria-label={dark ? "Switch to light mode" : "Switch to dark mode"}
            title={dark ? "Light mode" : "Dark mode"}
            onClick={toggle}
          >
            {dark ? "☀" : "☽"}
          </button>

          <button
            className="cursor-pointer flex justify-center items-center gap-1 text-white bg-brand p-2 w-20 rounded-2xl "
            onClick={() => {
              toggleCart();
            }}
          >
            <svg
              width="18"
              height="18"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path d="M6 2 3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"></path>
              <line x1="3" y1="6" x2="21" y2="6"></line>
              <path d="M16 10a4 4 0 01-8 0"></path>
            </svg>
            Cart
          </button>
        </div>
      </nav>
    </>
  );
};
