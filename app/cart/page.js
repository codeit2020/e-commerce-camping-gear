"use client";
import CartItem from "@/components/CartItem";
import { AuthContext } from "@/context/AuthProvider";
import React from "react";
import LoginPage from "../login/page";
import { useContext } from "react";

const cart = () => {
  const { isLoggedIn } = useContext(AuthContext);
  return <>{isLoggedIn ? <CartItem /> : <LoginPage></LoginPage>}</>;
};

export default cart;
