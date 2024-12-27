import { render, screen, fireEvent } from "@testing-library/react";
import { CartContext } from "@/context/CartProvider";
import ProductCard from "./ProductCard";
import "@testing-library/jest-dom";
import React from "react";
import "react-country-state-city/dist/react-country-state-city.css";
import { usePathname } from "next/navigation";

jest.mock("next/navigation", () => ({
  usePathname: jest.fn(),
}));

describe("Product Card Component", () => {
  const mockProducts = [
    {
      id: 1,
      image: "/test-image.jpg",
      name: "Test Item",
      price: 20,
    },
  ];
  const mockContextValue = {
    addToCart: jest.fn(), // Mock function for adding to cart
  };
  it("renders Product Card items correctly", () => {
    render(
      <CartContext.Provider value={mockContextValue}>
        <ProductCard
          id={mockProducts[0].id}
          image={mockProducts[0].image}
          name={mockProducts[0].name}
          price={mockProducts[0].price}
        />
      </CartContext.Provider>
    );

    const image = screen.getByAltText("product");
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute(
      "src",
      expect.stringContaining("/_next/image?url=%2Ftest-image.jpg")
    );
    expect(screen.getByText("Test Item")).toBeInTheDocument();
    expect(screen.getByText("20 DH")).toBeInTheDocument();
  });

  it("Calls add to cart when *Add to cart* is clicked", () => {
    render(
      <CartContext.Provider value={mockContextValue}>
        <ProductCard
          id={mockProducts[0].id}
          image={mockProducts[0].image}
          name={mockProducts[0].name}
          price={mockProducts[0].price}
        />
      </CartContext.Provider>
    );
    const addToCartButton = screen.getByText("Add to cart");
    fireEvent.click(addToCartButton);
    expect(mockContextValue.addToCart).toHaveBeenCalledWith(mockProducts[0]);
  });
});

// Mock next/router
jest.mock("next/router", () => ({
  useRouter: jest.fn(), // Mock useRouter hook
}));

// describe("Product Component", () => {
//   it("renders the Show details button and navigates correctly", () => {
//     const mockPush = jest.fn(); // Mock the push method

//     // Mock the return value of useRouter to include the push method
//     useRouter.mockReturnValue({
//       push: mockPush, // This will simulate the navigation
//     });

//     const mockProducts = [
//       {
//         id: 1,
//         image: "/test-image.jpg",
//         name: "Test Item",
//         price: 20,
//       },
//     ];
//     const mockContextValue = {
//       addToCart: jest.fn(), // Mock function for adding to cart
//     };
//     render(
//       <CartContext.Provider value={mockContextValue}>
//         <ProductCard
//           id={mockProducts[0].id}
//           image={mockProducts[0].image}
//           name={mockProducts[0].name}
//           price={mockProducts[0].price}
//         />
//       </CartContext.Provider>
//     );

//     // Find the checkout button and simulate a click
//     const button = screen.getByText("Show details"); // Ensure text matches exactly
//     fireEvent.click(button);

//     // Check that the Link component renders an anchor tag with the correct href
//     const link = screen.getByText("Show details").closest("a");
//     expect(link).toHaveAttribute("href", "/products/1");
//   });
// });
