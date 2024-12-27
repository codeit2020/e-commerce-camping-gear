"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useContext } from "react";
import { AuthContext } from "@/context/AuthProvider";

export default function RegisterPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  const { isLoggedIn, setIsLoggedIn } = useContext(AuthContext);

  const handleRegister = (e) => {
    e.preventDefault();
    if (typeof window !== "undefined") {
      const users = JSON.parse(localStorage.getItem("users")) || [];
      const userExists = users.find((user) => user.username === username);

      if (userExists) {
        alert("User already exists!");
      } else {
        users.push({ username, password });
        localStorage.setItem("users", JSON.stringify(users));
        localStorage.setItem(
          "loggedInUser",
          JSON.stringify({ username, password })
        );
        setIsLoggedIn(true);
        alert("User registered successfully!");
        router.push("/"); // Redirect to login
      }
    } else {
      alert("Local storage is unavailable during server-side rendering.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
          Register
        </h2>
        <form onSubmit={handleRegister} className="space-y-4">
          {/* Name Input */}
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700"
            >
              Name
            </label>
            <input
              type="text"
              name="name"
              id="name"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500"
              placeholder="Enter your name"
              required
            />
          </div>

          {/* Password Input */}
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <input
              type="password"
              name="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500"
              placeholder="Enter your password"
              required
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-2 px-4 text-white bg-green-500 hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-offset-2 rounded-lg"
          >
            Register
          </button>
        </form>
        <p className="text-sm text-center text-gray-500 mt-4">
          Already have an account?{" "}
          <a href="/login" className="text-green-500 hover:underline">
            Login
          </a>
        </p>
      </div>
    </div>
  );
}
