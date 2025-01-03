// SignIn.js
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAuth } from "@/app/context/authContext";

export default function SignIn() {
  const [identifier, setIdentifier] = useState(""); // Email or Phone
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const { login } = useAuth(); // Get login method from context
  const router = useRouter();

  const handleSignIn = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      const response = await fetch("/api/signin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ identifier, password }),
      });

      if (response.ok) {
        const data = await response.json();
        alert("Sign in successful!");

        // Call login method from AuthContext
        login(data.user); // Assuming data.user contains the user data

        router.push("/"); // Redirect to home or another page
      } else {
        const errorData = await response.json();
        setError(errorData.message || "Invalid credentials.");
      }
    } catch (err) {
      setError("Network error. Please try again later.");
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <form
        onSubmit={handleSignIn}
        className="bg-white p-8 rounded-lg shadow-md w-80"
      >
        <h2 className="text-2xl font-bold text-center mb-6">Sign In</h2>

        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

        <div className="mb-4">
          <label
            htmlFor="identifier"
            className="block text-sm font-semibold mb-2"
          >
            Email or Phone
          </label>
          <input
            type="text"
            id="identifier"
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-yellow-400"
            value={identifier}
            onChange={(e) => setIdentifier(e.target.value)}
            required
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="password"
            className="block text-sm font-semibold mb-2"
          >
            Password
          </label>
          <input
            type="password"
            id="password"
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-yellow-400"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <button
          type="submit"
          className="w-full bg-yellow-500 text-white py-2 px-4 rounded-lg font-semibold hover:bg-yellow-400 transition duration-300"
        >
          Sign In
        </button>

        <p className="text-sm text-center mt-4">
          Dont have an account?
          <Link href="/register" className="text-yellow-500 hover:underline">
            Register here
          </Link>
        </p>
      </form>
    </div>
  );
}
