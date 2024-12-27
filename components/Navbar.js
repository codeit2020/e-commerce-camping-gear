"use client";
import { NAV_LINKS } from "@/data/rowData";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import Button from "./Button";
import { useEffect, useRef, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useContext } from "react";
import { CartContext } from "@/context/CartProvider";
import { AuthContext } from "@/context/AuthProvider";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false); // Dropdown state
  const dropdownRef = useRef(); // Ref for dropdown element

  const pathname = usePathname();

  console.log(pathname); // This will reflect the current path

  useEffect(() => {
    const handleClickOutside = (event) => {
      // Check if click is outside the dropdown
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside); // Add event listener

    return () => {
      document.removeEventListener("mousedown", handleClickOutside); // Cleanup event listener on unmount
    };
  }, []);

  const router = useRouter();

  const handleLogout = () => {
    if (typeof window !== "undefined") {
      localStorage.removeItem("loggedInUser"); // Remove user session
      setIsLoggedIn(false);
      alert("Logged out successfully!");
      router.push("/login"); // Redirect to login page
    } else {
      // Handle case when localStorage is unavailable (e.g., SSR)
      console.log("localStorage is unavailable during SSR.");
    }
  };

  const { cartItemsNumber } = useContext(CartContext);
  const { isLoggedIn, setIsLoggedIn } = useContext(AuthContext);

  console.log(isLoggedIn);

  return (
    <nav className="sticky top-0 flexBetween max-container padding-container  z-30 py-5 bg-white">
      <Link href="/">
        <Image src="/hilink-logo.svg" alt="logo" width={74} height={29} />
      </Link>
      <div className="hidden h-full lg:flex gap-12">
        {NAV_LINKS.map((link) => (
          <Link
            href={link.href}
            key={link.key}
            className={` ${
              pathname === link.href
                ? "text-green-600 font-bold"
                : "text-gray-50"
            }regular-16 flexCenter cursor-pointer pb-1.5 transition-all hover:font-bold dark:${
              pathname === link.href ? "text-green-600 font-bold" : "text-white"
            }`}
          >
            {/*styling the navbar elements by giving a font size, font color, and a transition hover effect ... */}
            {link.label}
          </Link>
        ))}
      </div>
      <div className="flexCenter gap-8">
        <div>
          {isLoggedIn ? (
            <button
              className="flexCenter flex-row w-32 h-14 bg-black text-white rounded-full cursor-pointer"
              onClick={handleLogout}
            >
              <Image
                src="/user.svg"
                alt="user"
                width={25}
                height={25}
                className="cursor-pointer"
              />
              Logout
            </button>
          ) : (
            <div className="flexCenter flex-row w-32 h-14 bg-black text-white rounded-full cursor-pointer">
              <Link href="/login" className="flexCenter flex-row gap-2">
                <Image
                  src="/user.svg"
                  alt="user"
                  width={25}
                  height={25}
                  className="cursor-pointer"
                />
                Login
              </Link>
            </div>
          )}
        </div>
        <Link href="/cart">
          <div className="flexCenter ">
            <Button icon="/cart.svg" />
            <div className="bg-red-600 rounded-full h-6 w-6 -mx-3 -mt-6 text-white text-center">
              {cartItemsNumber}
            </div>
          </div>
        </Link>
      </div>

      <Image
        src="/menu.svg"
        alt="menu"
        width={25}
        height={25}
        className="lg:hidden cursor-pointer"
        onClick={() => setIsMenuOpen(!isMenuOpen)}
      />
      {/*the bergerMenu will be shown only when the screen collaps, it will contain all the links from the navbar*/}
      {isMenuOpen && (
        <div
          ref={dropdownRef}
          className="absolute top-0 right-0 h-auto w-1/2 bg-slate-300  text-white flex flex-col justify-end items-center rounded lg:hidden animate-slide-in-right"
        >
          {NAV_LINKS.map((link) => (
            <Link
              href={link.href}
              key={link.key}
              onClick={() => setIsMenuOpen(false)}
              className="p-4 text-lg hover:text-green-600"
            >
              {/*styling the navbar elements by giving a font size, font color, and a transition hover effect ... */}
              {link.label}
            </Link>
          ))}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
