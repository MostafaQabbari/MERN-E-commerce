import { createContext, useContext, useReducer, useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";

const CartContext = createContext();

const initialState = { cartItems: [] };

function getUserId() {
  try {
    const token = localStorage.getItem("token");
    if (!token) return "guest";
    const decoded = jwtDecode(token);
    return decoded.id || "guest";
  } catch {
    return "guest";
  }
}

function cartReducer(state, action) {
  switch (action.type) {
    case "ADD_ITEM": {
      const item = {
        ...action.payload,
        qty: Number(action.payload.qty) || 1,
      };
      const existItem = state.cartItems.find((x) => x._id === item._id);
      if (existItem) {
        return {
          ...state,
          cartItems: state.cartItems.map((x) =>
            x._id === existItem._id ? { ...x, qty: x.qty + item.qty } : x
          ),
        };
      } else {
        return { ...state, cartItems: [...state.cartItems, item] };
      }
    }
    case "REMOVE_ITEM":
      return {
        ...state,
        cartItems: state.cartItems.filter((x) => x._id !== action.payload),
      };
    case "CLEAR_CART":
      return { ...state, cartItems: [] };
    case "LOAD_CART":
      return { ...state, cartItems: action.payload };
    default:
      return state;
  }
}

export function CartProvider({ children }) {
  const [cartKey, setCartKey] = useState(`cart_${getUserId()}`);
  
  const [state, dispatch] = useReducer(cartReducer, initialState, () => {
    try {
      const key = `cart_${getUserId()}`;
      const savedCart = localStorage.getItem(key);
      return savedCart ? { cartItems: JSON.parse(savedCart) } : initialState;
    } catch {
      return initialState;
    }
  });

  // When token changes (login/logout), reload the correct cart
  useEffect(() => {
    const handleStorageChange = () => {
      const newKey = `cart_${getUserId()}`;
      setCartKey(newKey);
      try {
        const savedCart = localStorage.getItem(newKey);
        dispatch({
          type: "LOAD_CART",
          payload: savedCart ? JSON.parse(savedCart) : [],
        });
      } catch {
        dispatch({ type: "LOAD_CART", payload: [] });
      }
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  // Save cart to localStorage under user-specific key
  useEffect(() => {
    localStorage.setItem(cartKey, JSON.stringify(state.cartItems));
  }, [state.cartItems, cartKey]);

  const addToCart = (item) => dispatch({ type: "ADD_ITEM", payload: item });
  const removeFromCart = (id) => dispatch({ type: "REMOVE_ITEM", payload: id });
  const clearCart = () => dispatch({ type: "CLEAR_CART" });

  const total = state.cartItems.reduce(
    (acc, item) => acc + (Number(item.qty) || 0) * (Number(item.price) || 0),
    0
  );

  const totalItems = state.cartItems.reduce(
    (acc, item) => acc + (Number(item.qty) || 0),
    0
  );

  return (
    <CartContext.Provider
      value={{ cartItems: state.cartItems, addToCart, removeFromCart, clearCart, total, totalItems }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}


//chatgbt code 
// // src/context/CartContext.jsx
// import { createContext, useContext, useReducer, useEffect } from "react";

// const CartContext = createContext();

// const initialState = {
//   cartItems: [],
// };

// // Reducer for cart actions
// function cartReducer(state, action) {
//   switch (action.type) {
//     case "ADD_ITEM": {
//       const item = {
//         ...action.payload,
//         qty: Number(action.payload.qty) || 1, // ✅ always ensure qty is a number
//       };

//       const existItem = state.cartItems.find((x) => x._id === item._id);
//       if (existItem) {
//         return {
//           ...state,
//           cartItems: state.cartItems.map((x) =>
//             x._id === existItem._id ? { ...x, qty: x.qty + item.qty } : x
//           ),
//         };
//       } else {
//         return { ...state, cartItems: [...state.cartItems, item] };
//       }
//     }
//     case "REMOVE_ITEM":
//       return {
//         ...state,
//         cartItems: state.cartItems.filter((x) => x._id !== action.payload),
//       };
//     case "CLEAR_CART":
//       return { ...state, cartItems: [] };
//     default:
//       return state;
//   }
// }

// export function CartProvider({ children }) {
//   const [state, dispatch] = useReducer(cartReducer, initialState, () => {
//     const savedCart = localStorage.getItem("cart");
//     return savedCart ? { cartItems: JSON.parse(savedCart) } : initialState;
//   });

//   // Save cart to localStorage whenever it changes
//   useEffect(() => {
//     localStorage.setItem("cart", JSON.stringify(state.cartItems));
//   }, [state.cartItems]);

//   // Helper functions
//   const addToCart = (item) => {
//     dispatch({ type: "ADD_ITEM", payload: item });
//   };

//   const removeFromCart = (id) => {
//     dispatch({ type: "REMOVE_ITEM", payload: id });
//   };

//   const clearCart = () => {
//     dispatch({ type: "CLEAR_CART" });
//   };

//   // ✅ Prevent NaN by forcing qty and price to numbers
//   const total = state.cartItems.reduce(
//     (acc, item) => acc + (Number(item.qty) || 0) * (Number(item.price) || 0),
//     0
//   );

//   // ✅ Add totalItems for the badge
//   const totalItems = state.cartItems.reduce(
//     (acc, item) => acc + (Number(item.qty) || 0),
//     0
//   );

//   return (
//     <CartContext.Provider
//       value={{
//         cartItems: state.cartItems,
//         addToCart,
//         removeFromCart,
//         clearCart,
//         total,
//         totalItems, // ✅ use this for the cart badge
//       }}
//     >
//       {children}
//     </CartContext.Provider>
//   );
// }

// export function useCart() {
//   return useContext(CartContext);
// }
