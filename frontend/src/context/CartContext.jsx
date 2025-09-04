// src/context/CartContext.jsx
import { createContext, useContext, useReducer, useEffect } from "react";

const CartContext = createContext();

const initialState = {
  cartItems: [],
};

// Reducer for cart actions
function cartReducer(state, action) {
  switch (action.type) {
    case "ADD_ITEM": {
      const existItem = state.cartItems.find((x) => x._id === action.payload._id);
      if (existItem) {
        return {
          ...state,
          cartItems: state.cartItems.map((x) =>
            x._id === existItem._id ? action.payload : x
          ),
        };
      } else {
        return { ...state, cartItems: [...state.cartItems, action.payload] };
      }
    }
    case "REMOVE_ITEM":
      return {
        ...state,
        cartItems: state.cartItems.filter((x) => x._id !== action.payload),
      };
    case "CLEAR_CART":
      return { ...state, cartItems: [] };
    default:
      return state;
  }
}

export function CartProvider({ children }) {
  const [state, dispatch] = useReducer(cartReducer, initialState, () => {
    const savedCart = localStorage.getItem("cart");
    return savedCart ? { cartItems: JSON.parse(savedCart) } : initialState;
  });

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(state.cartItems));
  }, [state.cartItems]);

  // Helper functions
  const addToCart = (item) => {
    dispatch({ type: "ADD_ITEM", payload: item });
  };

  const removeFromCart = (id) => {
    dispatch({ type: "REMOVE_ITEM", payload: id });
  };

  const clearCart = () => {
    dispatch({ type: "CLEAR_CART" });
  };

  const total = state.cartItems.reduce(
    (acc, item) => acc + item.qty * item.price,
    0
  );

  return (
    <CartContext.Provider
      value={{
        cartItems: state.cartItems,
        addToCart,
        removeFromCart,
        clearCart,
        total,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}
