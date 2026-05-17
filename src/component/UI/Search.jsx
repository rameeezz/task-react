import React from "react";

export default function Search() {
  return (
    <form className="relative w-full mb-10">
      <div className="absolute inset-y-0 inset-s-0 flex items-center ps-4 pointer-events-none">
        <svg
          className="w-5 h-5 text-text-color"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          ></path>
        </svg>
      </div>
      <input
        type="text"
        className="w-full border border-border-color py-2 ps-12 rounded-lg outline-none focus:border-brand transition-all"
        placeholder="Search products..."
      />
    </form>
  );
}
