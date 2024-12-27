"use client";
import Checkout from "@/components/Checkout";
import React from "react";
import { AuthContext } from "@/context/AuthProvider";
import LoginPage from "../login/page";
import { useContext } from "react";

const checkout = () => {
  const { isLoggedIn } = useContext(AuthContext);
  console.log(isLoggedIn);
  return <>{isLoggedIn ? <Checkout /> : <LoginPage />}</>;
};

export default checkout;
