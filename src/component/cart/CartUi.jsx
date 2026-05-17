import { useCart } from "../../context/CartContext";

export default function CartUi({ isOpen, toggleCart }) {
  const {
    cartItems,
    totalPrice,
    increment,
    decrement,
    removeFromCart,
    clearCart,
  } = useCart();

  return (
    <div
      className={`absolute z-20 top-0 bottom-0 overflow-y-auto h-screen bg-black text-white shadow p-4 w-full md:w-96 lg:w-96 transition-all duration-300 ${
        isOpen ? "right-0" : "-right-full"
      }`}
    >
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-bold">Your Cart</h2>
        <button
          onClick={toggleCart}
          className="w-10 h-9 flex items-center justify-center rounded-full bg-gray-800 hover:bg-red-500 transition-all duration-300 text-xl font-bold"
        >
          ×
        </button>
      </div>

      {cartItems.length === 0 ? (
        <p className="text-center text-gray-400 mt-20">Your cart is empty</p>
      ) : (
        <>
          <div className="flex flex-col gap-3">
            {cartItems.map((item) => (
              <div
                key={item.id}
                className="flex items-center gap-3 border-b border-gray-700 pb-3"
              >
                {/* Image */}
                <div className="w-16 h-16 bg-white rounded p-1 shrink-0">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-contain"
                  />
                </div>

                <div className="flex-1 flex flex-col gap-1">
                  <h3 className="text-sm line-clamp-2">{item.title}</h3>
                  <p className="text-sm text-brand font-semibold">
                    ${(item.price * item.quantity).toFixed(2)}
                  </p>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <button
                        className="cursor-pointer border py-0.5 px-2 rounded hover:bg-gray-700 transition-colors"
                        onClick={() => decrement(item.id)}
                      >
                        −
                      </button>
                      <span className="w-5 text-center">{item.quantity}</span>
                      <button
                        className="cursor-pointer border py-0.5 px-2 rounded hover:bg-gray-700 transition-colors"
                        onClick={() => increment(item.id)}
                      >
                        +
                      </button>
                    </div>

                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="text-red-500 hover:text-red-400 transition-colors cursor-pointer"
                      aria-label="Remove item"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-5 h-5"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M6 7.5h12m-10.5 0v10.125A1.875 1.875 0 009.375 19.5h5.25a1.875 1.875 0 001.875-1.875V7.5M9.75 7.5V5.625A1.125 1.125 0 0110.875 4.5h2.25A1.125 1.125 0 0114.25 5.625V7.5"
                        />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 border-t border-gray-700 pt-4 flex flex-col gap-3">
            <div className="flex justify-between items-center">
              <span className="text-gray-400">Total</span>
              <span className="font-bold text-lg">
                ${totalPrice.toFixed(2)}
              </span>
            </div>
            <button
              onClick={clearCart}
              className="w-full py-2 rounded bg-red-600 hover:bg-red-700 transition-colors font-semibold"
            >
              Clear Cart
            </button>
            <button className="w-full py-2 rounded bg-brand hover:opacity-90 transition-colors font-semibold">
              Checkout
            </button>
          </div>
        </>
      )}
    </div>
  );
}
