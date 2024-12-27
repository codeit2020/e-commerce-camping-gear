"use client";
import Link from "next/link";
import React from "react";

const Congratulations = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-yellow-100">
      <div className="max-w-lg text-center p-8 bg-white rounded-lg shadow-lg">
        <div className="flex justify-center mb-4">
          <span className="text-4xl text-yellow-500">🎉</span>
        </div>
        <h1 className="text-3xl font-bold text-gray-800 mb-4">
          Congratulations!
        </h1>
        <p className="text-xl text-gray-700 mb-6">
          Your order has been successfully placed. Thank you for shopping with
          us!
        </p>
        <Link href="/">
          <button className="px-6 py-3 bg-green-500 text-white text-lg rounded-full hover:bg-green-600">
            Back to Home
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Congratulations;
