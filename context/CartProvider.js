"use client";
import { createContext, useState, useEffect } from "react";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState(() => {
    if (typeof window !== "undefined") {
      // Load initial state from localStorage
      const savedCart = localStorage.getItem("cartItems");
      return savedCart ? JSON.parse(savedCart) : [];
    }
    return [];
  });

  useEffect(() => {
    if (typeof window !== "undefined") {
      // Save cart items to localStorage whenever they change
      localStorage.setItem("cartItems", JSON.stringify(cartItems));
    }
  }, [cartItems]);

  const [cartItemsNumber, setCartItemsNumber] = useState(() => {
    if (typeof window !== "undefined") {
      // Load initial state from localStorage
      const savedItemsNumber = localStorage.getItem("cartItemsNumber");
      return savedItemsNumber ? JSON.parse(savedItemsNumber) : 0;
    }
    return 0;
  });

  useEffect(() => {
    if (typeof window !== "undefined") {
      // Save cart items to localStorage whenever they change
      localStorage.setItem("cartItemsNumber", JSON.stringify(cartItemsNumber));
    }
  }, [cartItemsNumber]);

  function addToCart(item) {
    const foundedCartItem = cartItems.find(
      (cartItem) => cartItem.id === item.id
    );
    if (foundedCartItem) {
      setCartItems(
        cartItems.map((cartItem) =>
          cartItem.id === item.id
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        )
      );
    } else {
      setCartItems([...cartItems, { ...item, quantity: 1 }]);
    }
    setCartItemsNumber((prevItemsNumber) => prevItemsNumber + 1);
  }

  function removeFromCart(item) {
    const foundedCartItem = cartItems.find(
      (cartItem) => cartItem.id === item.id
    );
    if (foundedCartItem.quantity === 1) {
      setCartItems(cartItems.filter((cartItem) => cartItem.id !== item.id));
    } else {
      setCartItems(
        cartItems.map((cartItem) =>
          cartItem.id !== item.id
            ? cartItem
            : { ...cartItem, quantity: cartItem.quantity - 1 }
        )
      );
    }
    setCartItemsNumber((prevItemsNumber) => prevItemsNumber - 1);
  }
  function clearCartItem() {
    setCartItems([]);
    setCartItemsNumber(0);
  }
  function getCartTotal() {
    return cartItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
  }

  // function navbarCartItemsNumber() {
  //   if (addToCart) {
  //     setCartItemsNumber((prevItemsNumber) => prevItemsNumber + 1);
  //   } else if (removeFromCart) {
  //     setCartItemsNumber((prevItemsNumber) => prevItemsNumber - 1);
  //   } else if (clearCartItem) {
  //     setCartItemsNumber(0);
  //   }
  // }
  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        clearCartItem,
        getCartTotal,
        cartItemsNumber,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
