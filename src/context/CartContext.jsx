import {
  createContext,
  useReducer,
  useEffect,
  useContext,
  useCallback,
  useMemo,
} from "react";

export const CartContext = createContext(null);
function loadFromStorage() {
  try {
    const stored = localStorage.getItem("cartItems");
    return { items: stored ? JSON.parse(stored) : [] };
  } catch {
    return { items: [] };
  }
}

function reducer(state, action) {
  switch (action.type) {
    case "ADD_TO_CART": {
      const exists = state.items.find((item) => item.id === action.payload.id);

      if (exists) {
        return {
          ...state,
          items: state.items.map((item) =>
            item.id === action.payload.id
              ? { ...item, quantity: item.quantity + 1 }
              : item,
          ),
        };
      }

      return {
        ...state,
        items: [...state.items, { ...action.payload, quantity: 1 }],
      };
    }

    case "REMOVE_FROM_CART":
      return {
        ...state,
        items: state.items.filter((item) => item.id !== action.payload),
      };

    case "INCREMENT":
      return {
        ...state,
        items: state.items.map((item) =>
          item.id === action.payload
            ? { ...item, quantity: item.quantity + 1 }
            : item,
        ),
      };

    case "DECREMENT":
      return {
        ...state,
        items: state.items
          .map((item) => {
            if (item.id !== action.payload) return item;
            return item.quantity === 1
              ? null
              : { ...item, quantity: item.quantity - 1 };
          })
          .filter(Boolean),
      };

    case "CLEAR_CART":
      return { items: [] };

    default:
      return state;
  }
}

export default function CartProvider({ children }) {
  const [cartState, dispatch] = useReducer(reducer, undefined, loadFromStorage);

  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cartState.items));
  }, [cartState.items]);
  const addToCart = useCallback(
    (product) => dispatch({ type: "ADD_TO_CART", payload: product }),
    [],
  );
  const removeFromCart = useCallback(
    (id) => dispatch({ type: "REMOVE_FROM_CART", payload: id }),
    [],
  );
  const increment = useCallback(
    (id) => dispatch({ type: "INCREMENT", payload: id }),
    [],
  );
  const decrement = useCallback(
    (id) => dispatch({ type: "DECREMENT", payload: id }),
    [],
  );
  const clearCart = useCallback(() => dispatch({ type: "CLEAR_CART" }), []);
  const totalItems = useMemo(
    () => cartState.items.reduce((sum, item) => sum + item.quantity, 0),
    [cartState.items],
  );
  const totalPrice = useMemo(
    () =>
      cartState.items.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0,
      ),
    [cartState.items],
  );
console.log(totalItems);

  const value = useMemo(
    () => ({
      cartItems: cartState.items,
      totalItems,
      totalPrice,
      addToCart,
      removeFromCart,
      increment,
      decrement,
      clearCart,
    }),
    [
      cartState.items,
      totalItems,
      totalPrice,
      addToCart,
      removeFromCart,
      increment,
      decrement,
      clearCart,
    ],
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart must be used inside <CartProvider>");
  return context;
};
