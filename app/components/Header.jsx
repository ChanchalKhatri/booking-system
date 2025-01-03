"use client";

import Link from "next/link";
import React from "react";
import { useAuth } from "../context/authContext"; // Importing the Auth context

const Header = () => {
  const { isLoggedIn, logout } = useAuth(); // Access the login state from context

  return (
    <header className="bg-gray-900 text-white shadow-lg">
      <div className="container mx-auto flex justify-between items-center py-4 px-6">
        <div>
          <Link href="/">
            <h1 className="text-3xl font-bold hover:text-yellow-300 transition duration-300">
              RestoBook
            </h1>
          </Link>
        </div>
        <nav>
          <ul className="flex space-x-6">
            <li>
              <Link
                href="/"
                className="text-lg hover:text-yellow-300 transition duration-300"
              >
                Home
              </Link>
            </li>

            {isLoggedIn ? (
              // Show "Booking" if logged in
              <li>
                <Link
                  href="/booking"
                  className="text-lg hover:text-yellow-300 transition duration-300"
                >
                  Booking
                </Link>
              </li>
            ) : (
              // Otherwise, show "Sign In"
              <li>
                <Link
                  href="/signin"
                  className="text-lg hover:text-yellow-300 transition duration-300"
                >
                  Sign In
                </Link>
              </li>
            )}

            {isLoggedIn && (
              // Optionally, add a Logout button
              <li>
                <button
                  onClick={logout}
                  className="text-lg hover:text-yellow-300 transition duration-300"
                >
                  Logout
                </button>
              </li>
            )}
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
