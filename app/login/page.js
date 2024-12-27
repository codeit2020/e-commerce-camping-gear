"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useContext } from "react";
import { AuthContext } from "@/context/AuthProvider";

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  const { isLoggedIn, setIsLoggedIn } = useContext(AuthContext);

  const handleLogin = (e) => {
    e.preventDefault();
    if (typeof window !== "undefined") {
      const users = JSON.parse(localStorage.getItem("users")) || [];
      const user = users.find(
        (user) => user.username === username && user.password === password
      );

      if (user) {
        localStorage.setItem("loggedInUser", JSON.stringify(user));
        setIsLoggedIn(true);
        alert("Login successful!");
        router.push("/"); // Redirect to homepage
      } else {
        setIsLoggedIn(false);
        alert("Invalid credentials!");
      }
    } else {
      alert("Local storage is unavailable during server-side rendering.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
          Login
        </h2>
        <form onSubmit={handleLogin} className="space-y-4">
          {/* Email Input */}
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Username
            </label>
            <input
              type="username"
              name="username"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter your username"
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
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter your password"
              required
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-2 px-4 text-white bg-blue-500 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 rounded-lg"
          >
            Login
          </button>
        </form>
        <p className="text-sm text-center text-gray-500 mt-4">
          Don't have an account?{" "}
          <a href="/register" className="text-blue-500 hover:underline">
            Register
          </a>
        </p>
      </div>
    </div>
  );
}
