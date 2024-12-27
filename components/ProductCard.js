"use client";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { CartContext } from "@/context/CartProvider";
import { useContext } from "react";
import React from "react";

const ProductCard = ({ id, image, name, price, description }) => {
  const pathname = usePathname();
  const { cartItems, addToCart, removeFromCart, clearCartItem } =
    useContext(CartContext);

  const handleAddToCart = () => {
    addToCart({ id, image, name, price, description });
  };

  return (
    <section>
      <div className="rounded-md  m-6 p-6 overflow-hidden bg-feature-bg bg-center bg-no-repeat sm:bg-none flex flex-center justify-center">
        <div className="shadow-xl border-2 border-green-600 text-bold  rounded-md p-0 w-64 h-full">
          <div>
            <Image
              src={image}
              alt="product"
              width={150}
              height={150}
              className="mx-auto w-full p-0"
            />
          </div>
          <div className="w-full p-4 bg-green-600">
            <div>
              <p className="text-bold text-white capitalize">{name}</p>
              <p className="text-bold text-white">{price} DH</p>
            </div>
            <div className="flexCenter gap-4 ">
              {pathname === "/" && (
                <Link href={`/products/${id}`}>
                  <button className="rounded-full bg-white w-28 h-7 text-green-600 border-2 border-slate-200">
                    Show details
                  </button>
                </Link>
              )}
              <button
                onClick={handleAddToCart}
                className="rounded-full bg-white w-28 h-7 text-green-600 border-2 border-slate-200"
              >
                Add to cart
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductCard;
