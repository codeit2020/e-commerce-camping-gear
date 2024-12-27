"use client";
import { CartContext } from "@/context/CartProvider";
import Image from "next/image";
import Link from "next/link";
import { useContext } from "react";
import React from "react";

const CartItem = () => {
  const { cartItems, addToCart, removeFromCart, clearCartItem, getCartTotal } =
    useContext(CartContext);

  return (
    <div>
      <h1 className="text-2xl bg-gray-200 rounded-2xl shadow-md w-36 h-16 mx-20 my-5 p-2 flexCenter border-2 border-slate-300">
        Cart Items
      </h1>
      <ul>
        {cartItems.map((cartItem) => (
          <li
            key={cartItem.id}
            className="rounded-lg flex flex-row  gap-4 mx-20 my-5 p-6 bg-gray-100 border-2 border-slate-400 "
          >
            <Image
              src={cartItem.image}
              alt="test"
              width={150}
              height={150}
              className="w-36 h-36 relative"
            />

            <div className="flex flex-col sm:flex-row lg:gap-40 h-full w-full mt-9 ">
              <h2 className="capitalize text-xl font-medium">
                {cartItem.name}
              </h2>
              <span className="text-xl font-medium">{cartItem.price} DH</span>
              <h3 className="mx-0">Qty : {cartItem.quantity}</h3>
            </div>

            <div className="flex sm:flex-row flex-col mt-10 w-1/5 gap-6 ml-auto ">
              <button
                className="border-2 border-green-600 w-7 h-7"
                onClick={() => addToCart(cartItem)}
              >
                +
              </button>
              <button
                className="border-2 border-green-600 w-7 h-7"
                onClick={() => removeFromCart(cartItem)}
              >
                -
              </button>
            </div>
          </li>
        ))}
      </ul>

      {/* D
E
S
T */}
      <div className="text-2xl bg-gray-200 rounded-2xl shadow-md  h-16 mx-20 my-5 p-2 flexCenter border-2 border-slate-300  sm:w-1/3">
        Total : {getCartTotal()} DH
      </div>
      <div className="flex justify-center">
        <div className="flex items-center cursor-pointer">
          <div>
            <button
              onClick={() => clearCartItem()}
              className="rounded-full shadow-sm  h-10 m-10  w-40  border-2 border-black text-black"
            >
              Clear Cart
            </button>
          </div>
          <div>
            <Link href="/checkout">
              <button className="rounded-full shadow-sm  h-10 m-10  w-40 bg-green-600 text-white">
                Check out
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
