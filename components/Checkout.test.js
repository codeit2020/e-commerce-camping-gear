import { render, screen, fireEvent } from "@testing-library/react";
import { CartContext } from "@/context/CartProvider";
import Checkout from "./Checkout";
import "@testing-library/jest-dom";
import React from "react";
import "react-country-state-city/dist/react-country-state-city.css";
import { useRouter } from "next/navigation";
import userEvent from "@testing-library/user-event";
import { waitFor } from "@testing-library/react";

jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
}));
global.localStorage = {
  setItem: jest.fn(),
};

describe("Checkout component", () => {
  const formObject = {
    email: "exemple_email@gmail.com",
    firstName: "exemple_firstName",
    lastName: "exemple_lastName",
    phoneNumber: "0011223344",
    country: "exemple_country",
    region: "exemple_region",
    city: "exemple_city",
    address: "exemple_address",
  };

  const mockContextValue = {
    clearCartItem: jest.fn(),
  };
  it("renders Checkout fields correctly", () => {
    useRouter.mockReturnValue({
      push: jest.fn(),
    });
    render(
      <CartContext.Provider value={mockContextValue}>
        <Checkout />
      </CartContext.Provider>
    );

    expect(screen.getByText("Customer details")).toBeInTheDocument();

    expect(screen.getByText("Email")).toBeInTheDocument();
    expect(screen.getByText("First Name")).toBeInTheDocument();
    expect(screen.getByText("Last Name")).toBeInTheDocument();
    expect(screen.getByText("Phone number")).toBeInTheDocument();

    expect(screen.getByText("Delivery details")).toBeInTheDocument();

    expect(screen.getByText("Country")).toBeInTheDocument();
    expect(screen.getByText("Region")).toBeInTheDocument();
    expect(screen.getByText("City")).toBeInTheDocument();
    expect(screen.getByText("Address")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /done/i })).toBeInTheDocument();
  });

  beforeEach(() => {
    //     // Mock localStorage.setItem
    //     jest.spyOn(Storage.prototype, "setItem").mockImplementation(jest.fn());
  });

  afterEach(() => {
    // Clear all mocks after each test
    jest.restoreAllMocks();
  });

  it("Allow user to input all fields", async () => {
    const pushMock = jest.fn();
    useRouter.mockReturnValue({
      push: pushMock,
    });

    render(
      <CartContext.Provider value={mockContextValue}>
        <Checkout />
      </CartContext.Provider>
    );
    const emailInput = screen.getByLabelText("Email");
    const firstNameInput = screen.getByLabelText("First Name");
    const lastNameInput = screen.getByLabelText("Last Name");
    const phoneNumberInput = screen.getByLabelText("Phone number");
    const countrySelect = screen.getByLabelText("Country");
    const regionSelect = screen.getByLabelText("Region");
    const citySelect = screen.getByLabelText("City");
    const addressInput = screen.getByLabelText("Address");

    await userEvent.type(emailInput, "exemple_email@gmail.com");
    await userEvent.type(firstNameInput, "exemple_firstName");
    await userEvent.type(lastNameInput, "exemple_lastName");
    await userEvent.type(phoneNumberInput, "0011223344");
    fireEvent.change(countrySelect, { target: { value: "exemple_country" } });
    fireEvent.change(regionSelect, { target: { value: "exemple_region" } });
    fireEvent.change(citySelect, { target: { value: "exemple_city" } });
    await userEvent.type(addressInput, "exemple_address");
    fireEvent.submit(screen.getByRole("form"));

    await waitFor(() => {
      expect(countrySelect.value).toBe("exemple_country");
      expect(regionSelect.value).toBe("exemple_region");
      expect(citySelect.value).toBe("exemple_city");
      expect(addressInput.value).toBe("exemple_address");
    });

    expect(emailInput.value).toBe("exemple_email@gmail.com");
    expect(firstNameInput.value).toBe("exemple_firstName");
    expect(lastNameInput.value).toBe("exemple_lastName");
    expect(phoneNumberInput.value).toBe("0011223344");
    expect(countrySelect.value).toBe("exemple_country");
    expect(regionSelect.value).toBe("exemple_region");
    expect(citySelect.value).toBe("exemple_city");
    expect(addressInput.value).toBe("exemple_address");

    expect(pushMock).toHaveBeenCalledWith("/congratulations");

    // expect(localStorage.setItem).toHaveBeenCalledWith(
    //   "customerDetails",
    //   JSON.stringify(formObject)
    // );
  });
});
