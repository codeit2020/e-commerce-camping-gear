"use client";
import React, { useState, useEffect } from "react";
import {
  CitySelect,
  CountrySelect,
  StateSelect,
} from "react-country-state-city";
import "react-country-state-city/dist/react-country-state-city.css";
import { useContext } from "react";
import { CartContext } from "@/context/CartProvider";
//import { useRouter } from "next/router";
import { usePathname, useRouter } from "next/navigation";

const Checkout = () => {
  const formObject = {
    email: "",
    firstName: "",
    lastName: "",
    phoneNumber: "",
    country: "",
    region: "",
    city: "",
    address: "",
  };
  const [form, setForm] = useState(formObject);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [countryid, setCountryid] = useState(0);
  const [stateid, setstateid] = useState(0);
  const router = useRouter();

  function handleEmailInput(event) {
    setForm({ ...form, email: event.target.value });
  }
  function handlePhoneNumberInput(event) {
    setForm({ ...form, phoneNumber: event.target.value });
  }
  function handleFirstNameInput(event) {
    setForm({ ...form, firstName: event.target.value });
  }
  function handleLastNameInput(event) {
    setForm({ ...form, lastName: event.target.value });
  }
  function handleAddressInput(event) {
    setForm({ ...form, address: event.target.value });
  }

  function handleSubmit(event) {
    event.preventDefault();
    setIsSubmitted(true);
    localStorage.setItem("customerDetails", JSON.stringify(form));
    router.push("/congratulations");
  }

  useEffect(() => {
    const savedData = localStorage.getItem("customerDetails");
    if (savedData) {
      setForm(JSON.parse(savedData));
    }
  }, []);

  const { clearCartItem } = useContext(CartContext);

  return (
    <div className=" bg-slate-300 rounded-3xl ">
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-lg m-10">
          <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
            Customer details
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4" role="form">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email
            </label>
            <input
              type="text"
              name="email"
              id="email"
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500"
              value={form.email}
              onChange={handleEmailInput}
              placeholder="Enter your name"
              required
            />

            <label
              htmlFor="firstName"
              className="block text-sm font-medium text-gray-700"
            >
              First Name
            </label>
            <input
              type="text"
              name="firstName"
              id="firstName"
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500"
              value={form.firstName}
              onChange={handleFirstNameInput}
              placeholder="Enter your first name"
              required
            />

            <label
              htmlFor="lastName"
              className="block text-sm font-medium text-gray-700"
            >
              Last Name
            </label>
            <input
              type="text"
              name="lastName"
              id="lastName"
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500"
              value={form.lastName}
              onChange={handleLastNameInput}
              placeholder="Enter your last name"
              required
            />

            <label
              htmlFor="phoneNumber"
              className="block text-sm font-medium text-gray-700"
            >
              Phone number
            </label>
            <input
              type="text"
              name="phoneNumber"
              id="phoneNumber"
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500"
              value={form.phoneNumber}
              onChange={handlePhoneNumberInput}
              placeholder="Enter your phone number"
              required
            />

            <h3 className="text-2xl font-bold text-center text-gray-800 mb-6">
              Delivery details
            </h3>

            <div>
              <div className="container">
                <div className="row">
                  <div className="col">
                    <label
                      htmlFor="countrySelect"
                      className="block text-sm font-medium text-gray-700 p-2"
                    >
                      Country
                    </label>
                    <CountrySelect
                      id="countrySelect"
                      onChange={(e) => {
                        setCountryid(e.id);
                        setForm({ ...form, country: e.name });
                        localStorage.setItem(
                          "customerDetails",
                          JSON.stringify({ ...form, country: e.name })
                        );
                      }}
                      placeHolder="Select Country"
                    />
                  </div>
                  <div className="col">
                    <label
                      htmlFor="regionSelect"
                      className="block text-sm font-medium text-gray-700 p-2"
                    >
                      Region
                    </label>
                    <StateSelect
                      id="regionSelect"
                      disabled={!countryid}
                      countryid={countryid}
                      onChange={(e) => {
                        setstateid(e.id);
                        setForm({ ...form, region: e.name });
                        localStorage.setItem(
                          "customerDetails",
                          JSON.stringify({ ...form, region: e.name })
                        );
                      }}
                      placeHolder="Select State"
                    />
                  </div>
                  <div className="col">
                    <label
                      htmlFor="citySelect"
                      className="block text-sm font-medium text-gray-700 p-2"
                    >
                      City
                    </label>
                    <CitySelect
                      id="citySelect"
                      disabled={!stateid}
                      countryid={countryid}
                      stateid={stateid}
                      onChange={(e) => {
                        setForm({ ...form, city: e.name }); // Update city in form
                        localStorage.setItem(
                          "customerDetails",
                          JSON.stringify({ ...form, city: e.name })
                        );
                      }}
                      placeHolder="Select City"
                    />
                  </div>
                </div>
                <label
                  htmlFor="address"
                  className="block text-sm font-medium text-gray-700 p-2"
                >
                  Address
                </label>
                <input
                  type="text"
                  name="address"
                  id="address"
                  className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500"
                  value={form.address}
                  onChange={handleAddressInput}
                  placeholder="Enter your adress"
                  required
                />
              </div>
            </div>
            <button
              onClick={clearCartItem}
              type="submit"
              className="w-full py-2 px-4 text-white bg-blue-500 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 rounded-lg"
            >
              Done
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
