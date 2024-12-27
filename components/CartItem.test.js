import { render, screen, fireEvent } from "@testing-library/react";
import { CartContext } from "@/context/CartProvider";
import CartItem from "./CartItem";
import { useRouter } from "next/router";
import "@testing-library/jest-dom";
import React from "react";

describe("CartItem Component", () => {
  // Create mock data for the context
  const mockCartItems = [
    {
      id: 1,
      name: "Test Item",
      image: "/test-image.jpg",
      quantity: 2,
    },
  ];

  const mockContextValue = {
    cartItems: mockCartItems,
    addToCart: jest.fn(),
    removeFromCart: jest.fn(),
    clearCartItem: jest.fn(),
    getCartTotal: jest.fn(() => 100),
  };

  it("renders the cart items correctly", () => {
    render(
      <CartContext.Provider value={mockContextValue}>
        <CartItem />
      </CartContext.Provider>
    );

    expect(screen.getByText("Test Item")).toBeInTheDocument();

    expect(screen.getByText("Qty : 2")).toBeInTheDocument();

    expect(screen.getByText("Total : 100 DH")).toBeInTheDocument();
  });

  it("calls addToCart when the + button is clicked", () => {
    render(
      <CartContext.Provider value={mockContextValue}>
        <CartItem />
      </CartContext.Provider>
    );

    const addButton = screen.getByText("+");

    fireEvent.click(addButton);

    expect(mockContextValue.addToCart).toHaveBeenCalledWith(mockCartItems[0]);
  });

  it("calls removeFromCart when the - button is clicked", () => {
    render(
      <CartContext.Provider value={mockContextValue}>
        <CartItem />
      </CartContext.Provider>
    );

    const removeButton = screen.getByText("-");
    fireEvent.click(removeButton);

    expect(mockContextValue.removeFromCart).toHaveBeenCalledWith(
      mockCartItems[0]
    );
  });

  it("calls clearCartItem when the Clear Cart button is clicked", () => {
    render(
      <CartContext.Provider value={mockContextValue}>
        <CartItem />
      </CartContext.Provider>
    );

    const clearButton = screen.getByText("Clear Cart");
    fireEvent.click(clearButton);

    expect(mockContextValue.clearCartItem).toHaveBeenCalled();
  });

  it("renders the checkout button and navigates correctly", () => {
    render(
      <CartContext.Provider value={mockContextValue}>
        <CartItem />
      </CartContext.Provider>
    );

    const checkoutButton = screen.getByText("Check out");
    expect(checkoutButton).toBeInTheDocument();
  });
});

// Mock next/router
jest.mock("next/router", () => ({
  useRouter: jest.fn(), // Mock useRouter hook
}));

describe("CartItem Component", () => {
  it("renders the checkout button and navigates correctly", () => {
    const mockPush = jest.fn(); // Mock the push method

    useRouter.mockReturnValue({
      push: mockPush, // This will simulate the navigation
    });

    const mockContextValue = {
      cartItems: [
        { id: 1, name: "Product 1", price: 20, quantity: 2 },
        { id: 2, name: "Product 2", price: 15, quantity: 1 },
      ],
      addItem: jest.fn(),
      removeItem: jest.fn(),
      totalPrice: 55,
      getCartTotal: jest.fn().mockReturnValue(55),
    };

    render(
      <CartContext.Provider value={mockContextValue}>
        <CartItem />
      </CartContext.Provider>
    );

    const button = screen.getByText("Check out");
    fireEvent.click(button);

    const link = screen.getByText("Check out").closest("a");
    expect(link).toHaveAttribute("href", "/checkout");
  });
});
