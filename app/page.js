"use client"; // Add this line at the top of your file

import Link from "next/link";
import Image from "next/image";
import hero_image from "./source/images/hero-img.png";
import { useReducer } from "react";
import { useAuth } from "./context/authContext";

// Reducer for filter functionality
const filterReducer = (state, action) => {
  switch (action.type) {
    case "FILTER_BY_CATEGORY":
      return { ...state, category: action.payload };
    default:
      return state;
  }
};

export default function Home() {
  const { isLoggedIn } = useAuth();
  // UseReducer for filter state
  const [state, dispatch] = useReducer(filterReducer, {
    category: "all",
  });

  // Dummy data for menu items with image path
  const menuItems = [
    {
      id: 1,
      name: "Pasta",
      category: "Italian",
      price: 12,
      image: hero_image,
    },
    {
      id: 2,
      name: "Burger",
      category: "American",
      price: 8,
      image: hero_image,
    },
    {
      id: 3,
      name: "Sushi",
      category: "Japanese",
      price: 15,
      image: hero_image,
    },
    {
      id: 4,
      name: "Pizza",
      category: "Italian",
      price: 10,
      image: hero_image,
    },
    {
      id: 5,
      name: "Tacos",
      category: "Mexican",
      price: 9,
      image: hero_image,
    },
  ];

  // Filter menu items based on selected category
  const filteredItems =
    state.category === "all"
      ? menuItems
      : menuItems.filter((item) => item.category === state.category);

  return (
    <>
      {/* Hero Section */}
      <section className="bg-white text-gray-900 py-16">
        <div className="container mx-auto flex items-center justify-between px-6">
          <div className="text-center md:text-left md:w-1/2">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Enjoy Your Healthy <br />
              Delicious Food
            </h1>
            <p className="text-lg mb-8">
              We are a team of talented chefs crafting your favorite dishes with
              care and love.
            </p>
            <div className="flex justify-center md:justify-start gap-6">
              <Link
                // href="/booking"
                href={isLoggedIn ? "/booking" : "/signin"}
                className="bg-yellow-500 text-gray-900 py-3 px-6 rounded-lg text-lg font-semibold hover:bg-yellow-400 transition duration-300"
              >
                Book a Table
              </Link>
            </div>
          </div>
          <div className="hidden md:block md:w-1/2">
            <Image
              src={hero_image}
              alt="Healthy and delicious food served in a restaurant"
              width={500}
              height={300}
              className="w-8/12 h-auto rounded-lg ml-auto"
            />
          </div>
        </div>
      </section>

      {/* Menu Section with Filter */}
      <section className="bg-gray-100 py-16">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-8">Our Menu</h2>

          {/* Filter Buttons */}
          <div className="flex justify-center mb-8 gap-6">
            <button
              className={`px-6 py-2 rounded-lg text-lg font-semibold ${
                state.category === "all" ? "bg-yellow-500" : "bg-gray-300"
              }`}
              onClick={() =>
                dispatch({ type: "FILTER_BY_CATEGORY", payload: "all" })
              }
            >
              All
            </button>
            <button
              className={`px-6 py-2 rounded-lg text-lg font-semibold ${
                state.category === "Italian" ? "bg-yellow-500" : "bg-gray-300"
              }`}
              onClick={() =>
                dispatch({ type: "FILTER_BY_CATEGORY", payload: "Italian" })
              }
            >
              Italian
            </button>
            <button
              className={`px-6 py-2 rounded-lg text-lg font-semibold ${
                state.category === "American" ? "bg-yellow-500" : "bg-gray-300"
              }`}
              onClick={() =>
                dispatch({ type: "FILTER_BY_CATEGORY", payload: "American" })
              }
            >
              American
            </button>
            <button
              className={`px-6 py-2 rounded-lg text-lg font-semibold ${
                state.category === "Japanese" ? "bg-yellow-500" : "bg-gray-300"
              }`}
              onClick={() =>
                dispatch({ type: "FILTER_BY_CATEGORY", payload: "Japanese" })
              }
            >
              Japanese
            </button>
            <button
              className={`px-6 py-2 rounded-lg text-lg font-semibold ${
                state.category === "Mexican" ? "bg-yellow-500" : "bg-gray-300"
              }`}
              onClick={() =>
                dispatch({ type: "FILTER_BY_CATEGORY", payload: "Mexican" })
              }
            >
              Mexican
            </button>
          </div>

          {/* Menu Items */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {filteredItems.map((item) => (
              <div
                key={item.id}
                className="bg-white shadow-lg rounded-lg p-6 text-center"
              >
                <Image
                  src={item.image}
                  alt={item.name}
                  width={200}
                  height={200}
                  className="w-full h-48 object-contain rounded-lg mb-4"
                />
                <h3 className="text-xl font-semibold mb-4">{item.name}</h3>
                <p className="text-gray-700 mb-4">{item.category}</p>
                <p className="text-lg font-bold">${item.price}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
