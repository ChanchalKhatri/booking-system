import Link from "next/link";
import React from "react";

const Footer = () => {
  return (
    <>
      <footer className="bg-gray-800 text-white py-6 mt-10">
        <div className="container mx-auto text-center">
          <p className="text-lg">
            &copy; {new Date().getFullYear()} RestoBook. All Rights Reserved.
          </p>
          <div className="mt-4">
            <ul className="flex justify-center space-x-6">
              <li>
                <Link
                  href="/privacy"
                  className="hover:text-yellow-300 transition duration-300"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  href="/terms"
                  className="hover:text-yellow-300 transition duration-300"
                >
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="hover:text-yellow-300 transition duration-300"
                >
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
